import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/atoms/Button'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { TextInput } from '../../../components/atoms/TextInput'
import { FormField } from '../../../components/molecules/FormField'
import { PageIntro } from '../../../components/molecules/PageIntro'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { ApiError } from '../../../services/http'
import { createTourSubmission } from '../api/createTourSubmission'
import { prepareTourSubmissionUpload } from '../api/prepareTourSubmissionUpload'
import { uploadSubmissionImage } from '../api/uploadSubmissionImage'
import type { TourCategory } from '../types/tour'
import {
  MAX_SUBMISSION_IMAGES,
  MAX_SUBMISSION_IMAGE_SIZE_BYTES,
  SUBMISSION_IMAGE_ACCEPT,
  SUBMISSION_IMAGE_MIME_TYPES,
  type SubmissionImageMimeType,
  type TourSubmissionMedia,
} from '../types/submission'
import styles from '../../events/pages/EventSubmissionPage.module.scss'

type SubmissionFormState = {
  name: string
  category: TourCategory
  durationHours: string
  priceFrom: string
  description: string
  contactName: string
  contactMethod: string
  instagram: string
  whatsapp: string
}

type FieldErrors = Partial<Record<string, string>>

const initialFormState: SubmissionFormState = {
  name: '',
  category: 'premium',
  durationHours: '',
  priceFrom: '',
  description: '',
  contactName: '',
  contactMethod: '',
  instagram: '',
  whatsapp: '',
}

const invalidUrlExtensions = ['.html', '.htm', '.php', '.pdf', '.json', '.txt']

function isSubmissionImageMimeType(value: string): value is SubmissionImageMimeType {
  return SUBMISSION_IMAGE_MIME_TYPES.includes(value as SubmissionImageMimeType)
}

function parseValidationDetails(error: unknown): FieldErrors {
  if (!(error instanceof ApiError) || !Array.isArray(error.details)) {
    return {}
  }

  return error.details.reduce<FieldErrors>((accumulator, item) => {
    if (
      typeof item === 'object' &&
      item !== null &&
      'field' in item &&
      'message' in item &&
      typeof item.field === 'string' &&
      typeof item.message === 'string'
    ) {
      accumulator[item.field] = item.message
    }

    return accumulator
  }, {})
}

function validateExternalImageUrl(
  url: string,
  t: ReturnType<typeof useTranslation>['t'],
) {
  try {
    const parsed = new URL(url)

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return t('tours.submit.validation.urlFormat')
    }

    const pathname = parsed.pathname.toLowerCase()

    if (invalidUrlExtensions.some((extension) => pathname.endsWith(extension))) {
      return t('tours.submit.validation.urlImageType')
    }

    return null
  } catch {
    return t('tours.submit.validation.urlFormat')
  }
}

function formatFileSizeLabel(bytes: number) {
  return `${Math.round(bytes / (1024 * 1024))} MB`
}

export function TourSubmissionPage() {
  const { t } = useTranslation()
  const language = useAppLanguage()
  const [form, setForm] = useState<SubmissionFormState>(initialFormState)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [externalImageUrls, setExternalImageUrls] = useState<string[]>([])
  const [draftExternalUrl, setDraftExternalUrl] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [requestError, setRequestError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const totalMediaCount = selectedFiles.length + externalImageUrls.length
  const mediaSummary = useMemo(
    () => ({
      count: totalMediaCount,
      remaining: Math.max(0, MAX_SUBMISSION_IMAGES - totalMediaCount),
    }),
    [totalMediaCount],
  )

  function updateField<Key extends keyof SubmissionFormState>(
    key: Key,
    value: SubmissionFormState[Key],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
    setFieldErrors((current) => ({
      ...current,
      [key]: undefined,
    }))
  }

  function validateForm(): FieldErrors {
    const nextErrors: FieldErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = t('tours.submit.validation.required')
    }
    if (!form.durationHours.trim() || Number(form.durationHours) <= 0) {
      nextErrors.durationHours = t('tours.submit.validation.required')
    }
    if (!form.priceFrom.trim() || Number(form.priceFrom) <= 0) {
      nextErrors.priceFrom = t('tours.submit.validation.required')
    }
    if (!form.description.trim()) {
      nextErrors.description = t('tours.submit.validation.required')
    }
    if (!form.contactName.trim()) {
      nextErrors.contactName = t('tours.submit.validation.required')
    }
    if (!form.contactMethod.trim()) {
      nextErrors.contactMethod = t('tours.submit.validation.required')
    }
    if (totalMediaCount > MAX_SUBMISSION_IMAGES) {
      nextErrors.media = t('tours.submit.validation.maxImages', {
        count: MAX_SUBMISSION_IMAGES,
      })
    }

    return nextErrors
  }

  function handleFileSelection(event: ChangeEvent<HTMLInputElement>) {
    const pickedFiles = Array.from(event.target.files ?? [])

    if (pickedFiles.length === 0) {
      return
    }

    const nextErrors: FieldErrors = {}
    const acceptedFiles: File[] = []
    const remainingSlots = MAX_SUBMISSION_IMAGES - totalMediaCount

    if (pickedFiles.length > remainingSlots) {
      nextErrors.media = t('tours.submit.validation.maxImages', {
        count: MAX_SUBMISSION_IMAGES,
      })
    }

    for (const file of pickedFiles.slice(0, remainingSlots)) {
      if (!isSubmissionImageMimeType(file.type)) {
        nextErrors.media = t('tours.submit.validation.fileType')
        continue
      }

      if (file.size > MAX_SUBMISSION_IMAGE_SIZE_BYTES) {
        nextErrors.media = t('tours.submit.validation.fileSize', {
          maxSize: formatFileSizeLabel(MAX_SUBMISSION_IMAGE_SIZE_BYTES),
        })
        continue
      }

      acceptedFiles.push(file)
    }

    if (acceptedFiles.length > 0) {
      setSelectedFiles((current) => [...current, ...acceptedFiles])
    }

    setFieldErrors((current) => ({
      ...current,
      media: nextErrors.media,
    }))

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function addExternalImageUrl() {
    const trimmedUrl = draftExternalUrl.trim()
    const urlError = validateExternalImageUrl(trimmedUrl, t)

    if (!trimmedUrl) {
      setFieldErrors((current) => ({
        ...current,
        mediaUrl: t('tours.submit.validation.urlRequired'),
      }))
      return
    }

    if (totalMediaCount >= MAX_SUBMISSION_IMAGES) {
      setFieldErrors((current) => ({
        ...current,
        media: t('tours.submit.validation.maxImages', {
          count: MAX_SUBMISSION_IMAGES,
        }),
      }))
      return
    }

    if (urlError) {
      setFieldErrors((current) => ({
        ...current,
        mediaUrl: urlError,
      }))
      return
    }

    setExternalImageUrls((current) => [...current, trimmedUrl])
    setDraftExternalUrl('')
    setFieldErrors((current) => ({
      ...current,
      media: undefined,
      mediaUrl: undefined,
    }))
  }

  function removeFile(index: number) {
    setSelectedFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))
  }

  function removeExternalUrl(index: number) {
    setExternalImageUrls((current) => current.filter((_, itemIndex) => itemIndex !== index))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    setRequestError(null)
    setFieldErrors({})

    try {
      const uploadedMedia: TourSubmissionMedia[] = []

      for (const file of selectedFiles) {
        const uploadTarget = await prepareTourSubmissionUpload(language, {
          filename: file.name,
          mimeType: file.type as SubmissionImageMimeType,
          fileSize: file.size,
        })

        await uploadSubmissionImage(uploadTarget, file)

        uploadedMedia.push({
          kind: 'uploaded',
          url: uploadTarget.assetUrl,
          objectKey: uploadTarget.objectKey,
          mimeType: file.type as SubmissionImageMimeType,
          filename: file.name,
        })
      }

      await createTourSubmission(language, {
        name: form.name.trim(),
        category: form.category,
        durationHours: Number(form.durationHours),
        priceFrom: Number(form.priceFrom),
        description: form.description.trim(),
        contactName: form.contactName.trim(),
        contactMethod: form.contactMethod.trim(),
        instagram: form.instagram.trim() || undefined,
        whatsapp: form.whatsapp.trim() || undefined,
        submittedLocale: language,
        media: [
          ...uploadedMedia,
          ...externalImageUrls.map((url) => ({
            kind: 'external' as const,
            url,
          })),
        ],
      })

      setIsSubmitted(true)
      setForm(initialFormState)
      setSelectedFiles([])
      setExternalImageUrls([])
      setDraftExternalUrl('')
    } catch (error) {
      const validationErrors = parseValidationDetails(error)

      if (Object.keys(validationErrors).length > 0) {
        setFieldErrors(validationErrors)
      }

      setRequestError(
        error instanceof ApiError ? error.message : t('tours.submit.error'),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className={pageStyles.page}>
        <PageIntro
          eyebrow={t('tours.submit.successEyebrow')}
          title={t('tours.submit.successTitle')}
          description={t('tours.submit.successDescription')}
        />
        <ContentPanel className={styles.successCard} tone="warm">
          <p className={styles.successCopy}>{t('tours.submit.successNote')}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryLink} to="/tours">
              {t('tours.backToList')}
            </Link>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsSubmitted(false)}
            >
              {t('tours.submit.submitAnother')}
            </Button>
          </div>
        </ContentPanel>
      </section>
    )
  }

  return (
    <section className={pageStyles.page}>
      <PageIntro
        eyebrow={t('tours.submit.eyebrow')}
        title={t('tours.submit.title')}
        description={t('tours.submit.description')}
      />

      <ContentPanel>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.grid}>
            <FormField label={t('tours.submit.fields.name')}>
              <TextInput
                aria-label={t('tours.submit.fields.name')}
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
              />
              {fieldErrors.name ? <span className={styles.error}>{fieldErrors.name}</span> : null}
            </FormField>
            <FormField label={t('tours.submit.fields.category')}>
              <select
                className={styles.select}
                aria-label={t('tours.submit.fields.category')}
                value={form.category}
                onChange={(event) => updateField('category', event.target.value as TourCategory)}
              >
                <option value="premium">{t('tours.categories.premium')}</option>
                <option value="group">{t('tours.categories.group')}</option>
                <option value="adventure">{t('tours.categories.adventure')}</option>
              </select>
            </FormField>
            <FormField label={t('tours.submit.fields.durationHours')}>
              <TextInput
                aria-label={t('tours.submit.fields.durationHours')}
                value={form.durationHours}
                onChange={(event) => updateField('durationHours', event.target.value)}
                aria-invalid={Boolean(fieldErrors.durationHours)}
                inputMode="numeric"
              />
              {fieldErrors.durationHours ? (
                <span className={styles.error}>{fieldErrors.durationHours}</span>
              ) : null}
            </FormField>
            <FormField label={t('tours.submit.fields.priceFrom')}>
              <TextInput
                aria-label={t('tours.submit.fields.priceFrom')}
                value={form.priceFrom}
                onChange={(event) => updateField('priceFrom', event.target.value)}
                aria-invalid={Boolean(fieldErrors.priceFrom)}
                inputMode="numeric"
              />
              {fieldErrors.priceFrom ? (
                <span className={styles.error}>{fieldErrors.priceFrom}</span>
              ) : null}
            </FormField>
            <FormField label={t('tours.submit.fields.contactName')}>
              <TextInput
                aria-label={t('tours.submit.fields.contactName')}
                value={form.contactName}
                onChange={(event) => updateField('contactName', event.target.value)}
                aria-invalid={Boolean(fieldErrors.contactName)}
              />
              {fieldErrors.contactName ? (
                <span className={styles.error}>{fieldErrors.contactName}</span>
              ) : null}
            </FormField>
            <FormField label={t('tours.submit.fields.contactMethod')}>
              <TextInput
                aria-label={t('tours.submit.fields.contactMethod')}
                value={form.contactMethod}
                onChange={(event) => updateField('contactMethod', event.target.value)}
                aria-invalid={Boolean(fieldErrors.contactMethod)}
                placeholder={t('tours.submit.placeholders.contactMethod')}
              />
              {fieldErrors.contactMethod ? (
                <span className={styles.error}>{fieldErrors.contactMethod}</span>
              ) : null}
            </FormField>
            <FormField label={t('tours.submit.fields.instagram')} hint={t('tours.submit.optional')}>
              <TextInput
                aria-label={t('tours.submit.fields.instagram')}
                value={form.instagram}
                onChange={(event) => updateField('instagram', event.target.value)}
              />
            </FormField>
            <FormField label={t('tours.submit.fields.whatsapp')} hint={t('tours.submit.optional')}>
              <TextInput
                aria-label={t('tours.submit.fields.whatsapp')}
                value={form.whatsapp}
                onChange={(event) => updateField('whatsapp', event.target.value)}
              />
            </FormField>
          </div>
          <FormField label={t('tours.submit.fields.description')}>
            <textarea
              className={styles.textarea}
              aria-label={t('tours.submit.fields.description')}
              value={form.description}
              onChange={(event) => updateField('description', event.target.value)}
              rows={6}
              aria-invalid={Boolean(fieldErrors.description)}
            />
            {fieldErrors.description ? (
              <span className={styles.error}>{fieldErrors.description}</span>
            ) : null}
          </FormField>
          <ContentPanel compact className={styles.mediaPanel}>
            <div className={styles.mediaHeader}>
              <div>
                <h2 className={styles.sectionTitle}>{t('tours.submit.media.title')}</h2>
                <p className={styles.sectionDescription}>{t('tours.submit.media.description')}</p>
              </div>
              <p className={styles.mediaCount}>
                {t('tours.submit.media.count', {
                  count: mediaSummary.count,
                  max: MAX_SUBMISSION_IMAGES,
                })}
              </p>
            </div>
            <div className={styles.mediaGrid}>
              <FormField
                label={t('tours.submit.media.uploadLabel')}
                hint={t('tours.submit.media.uploadHint')}
              >
                <input
                  ref={fileInputRef}
                  className={styles.fileInput}
                  type="file"
                  aria-label={t('tours.submit.media.uploadLabel')}
                  accept={SUBMISSION_IMAGE_ACCEPT}
                  multiple
                  onChange={handleFileSelection}
                />
              </FormField>
              <FormField
                label={t('tours.submit.media.externalUrlLabel')}
                hint={t('tours.submit.media.externalUrlHint')}
              >
                <div className={styles.inlineField}>
                  <TextInput
                    aria-label={t('tours.submit.media.externalUrlLabel')}
                    value={draftExternalUrl}
                    onChange={(event) => {
                      setDraftExternalUrl(event.target.value)
                      setFieldErrors((current) => ({
                        ...current,
                        mediaUrl: undefined,
                      }))
                    }}
                    placeholder="https://"
                  />
                  <Button type="button" variant="secondary" onClick={addExternalImageUrl}>
                    {t('tours.submit.media.addUrl')}
                  </Button>
                </div>
                {fieldErrors.mediaUrl ? (
                  <span className={styles.error}>{fieldErrors.mediaUrl}</span>
                ) : null}
              </FormField>
            </div>

            {fieldErrors.media ? <span className={styles.error}>{fieldErrors.media}</span> : null}

            <div className={styles.mediaLists}>
              <div>
                <h3 className={styles.listTitle}>{t('tours.submit.media.selectedUploads')}</h3>
                <ul className={styles.mediaList}>
                  {selectedFiles.map((file, index) => (
                    <li key={`${file.name}-${index}`}>
                      <span>{file.name}</span>
                      <button type="button" className={styles.removeButton} onClick={() => removeFile(index)}>
                        {t('tours.submit.media.remove')}
                      </button>
                    </li>
                  ))}
                  {selectedFiles.length === 0 ? <li>{t('tours.submit.media.none')}</li> : null}
                </ul>
              </div>
              <div>
                <h3 className={styles.listTitle}>{t('tours.submit.media.selectedLinks')}</h3>
                <ul className={styles.mediaList}>
                  {externalImageUrls.map((url, index) => (
                    <li key={`${url}-${index}`}>
                      <span>{url}</span>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removeExternalUrl(index)}
                      >
                        {t('tours.submit.media.remove')}
                      </button>
                    </li>
                  ))}
                  {externalImageUrls.length === 0 ? <li>{t('tours.submit.media.none')}</li> : null}
                </ul>
              </div>
            </div>
          </ContentPanel>

          {requestError ? <p className={styles.error}>{requestError}</p> : null}

          <div className={styles.actions}>
            <Button type="submit" variant="accent" disabled={isSubmitting}>
              {isSubmitting ? t('tours.submit.submitting') : t('tours.submit.action')}
            </Button>
            <Link className={styles.secondaryLink} to="/tours">
              {t('tours.backToList')}
            </Link>
          </div>
        </form>
      </ContentPanel>
    </section>
  )
}

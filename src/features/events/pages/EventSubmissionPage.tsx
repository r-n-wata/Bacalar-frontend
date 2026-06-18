import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Seo } from '../../../app/seo/Seo'
import { seoContentByLanguage } from '../../../app/seo/seoContent'
import { Button } from '../../../components/atoms/Button'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { TextInput } from '../../../components/atoms/TextInput'
import { FormField } from '../../../components/molecules/FormField'
import { PageIntro } from '../../../components/molecules/PageIntro'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { ApiError } from '../../../services/http'
import { createEventSubmission } from '../api/createEventSubmission'
import { prepareEventSubmissionUpload } from '../api/prepareEventSubmissionUpload'
import { uploadSubmissionImage } from '../api/uploadSubmissionImage'
import type { EventCategory } from '../types/event'
import {
  MAX_SUBMISSION_IMAGES,
  MAX_SUBMISSION_IMAGE_SIZE_BYTES,
  SUBMISSION_IMAGE_ACCEPT,
  SUBMISSION_IMAGE_MIME_TYPES,
  type EventSubmissionMedia,
  type SubmissionImageMimeType,
} from '../types/submission'
import styles from './EventSubmissionPage.module.scss'

type SubmissionFormState = {
  title: string
  startsAt: string
  location: string
  category: EventCategory
  description: string
  contactName: string
  contactMethod: string
  instagram: string
  whatsapp: string
}

type FieldErrors = Partial<Record<string, string>>

const initialFormState: SubmissionFormState = {
  title: '',
  startsAt: '',
  location: '',
  category: 'music',
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
      return t('events.submit.validation.urlFormat')
    }

    const pathname = parsed.pathname.toLowerCase()

    if (invalidUrlExtensions.some((extension) => pathname.endsWith(extension))) {
      return t('events.submit.validation.urlImageType')
    }

    return null
  } catch {
    return t('events.submit.validation.urlFormat')
  }
}

function formatFileSizeLabel(bytes: number) {
  return `${Math.round(bytes / (1024 * 1024))} MB`
}

export function EventSubmissionPage() {
  const { t } = useTranslation()
  const language = useAppLanguage()
  const seo = seoContentByLanguage[language].eventSubmit
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

    if (!form.title.trim()) {
      nextErrors.title = t('events.submit.validation.required')
    }
    if (!form.startsAt) {
      nextErrors.startsAt = t('events.submit.validation.required')
    }
    if (!form.location.trim()) {
      nextErrors.location = t('events.submit.validation.required')
    }
    if (!form.description.trim()) {
      nextErrors.description = t('events.submit.validation.required')
    }
    if (!form.contactName.trim()) {
      nextErrors.contactName = t('events.submit.validation.required')
    }
    if (!form.contactMethod.trim()) {
      nextErrors.contactMethod = t('events.submit.validation.required')
    }
    if (totalMediaCount > MAX_SUBMISSION_IMAGES) {
      nextErrors.media = t('events.submit.validation.maxImages', {
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
      nextErrors.media = t('events.submit.validation.maxImages', {
        count: MAX_SUBMISSION_IMAGES,
      })
    }

    for (const file of pickedFiles.slice(0, remainingSlots)) {
      if (!isSubmissionImageMimeType(file.type)) {
        nextErrors.media = t('events.submit.validation.fileType')
        continue
      }

      if (file.size > MAX_SUBMISSION_IMAGE_SIZE_BYTES) {
        nextErrors.media = t('events.submit.validation.fileSize', {
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
        mediaUrl: t('events.submit.validation.urlRequired'),
      }))
      return
    }

    if (totalMediaCount >= MAX_SUBMISSION_IMAGES) {
      setFieldErrors((current) => ({
        ...current,
        media: t('events.submit.validation.maxImages', {
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
      const uploadedMedia: EventSubmissionMedia[] = []

      for (const file of selectedFiles) {
        const uploadTarget = await prepareEventSubmissionUpload(language, {
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

      const startsAt = new Date(form.startsAt).toISOString()

      await createEventSubmission(language, {
        title: form.title.trim(),
        startsAt,
        location: form.location.trim(),
        category: form.category,
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
        error instanceof ApiError
          ? error.message
          : t('events.submit.error'),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className={pageStyles.page}>
        <PageIntro
          eyebrow={t('events.submit.successEyebrow')}
          title={t('events.submit.successTitle')}
          description={t('events.submit.successDescription')}
        />
        <ContentPanel className={styles.successCard} tone="warm">
          <p className={styles.successCopy}>{t('events.submit.successNote')}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryLink} to="/events">
              {t('events.backToList')}
            </Link>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsSubmitted(false)}
            >
              {t('events.submit.submitAnother')}
            </Button>
          </div>
        </ContentPanel>
      </section>
    )
  }

  return (
    <section className={pageStyles.page}>
      <Seo title={seo.title} description={seo.description} noIndex />
      <PageIntro
        eyebrow={t('events.submit.eyebrow')}
        title={t('events.submit.title')}
        description={t('events.submit.description')}
      />

      <ContentPanel>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.grid}>
            <FormField label={t('events.submit.fields.title')}>
              <TextInput
                aria-label={t('events.submit.fields.title')}
                value={form.title}
                onChange={(event) => updateField('title', event.target.value)}
                aria-invalid={Boolean(fieldErrors.title)}
              />
              {fieldErrors.title ? <span className={styles.error}>{fieldErrors.title}</span> : null}
            </FormField>

            <FormField label={t('events.submit.fields.startsAt')}>
              <TextInput
                type="datetime-local"
                aria-label={t('events.submit.fields.startsAt')}
                value={form.startsAt}
                onChange={(event) => updateField('startsAt', event.target.value)}
                aria-invalid={Boolean(fieldErrors.startsAt)}
              />
              {fieldErrors.startsAt ? (
                <span className={styles.error}>{fieldErrors.startsAt}</span>
              ) : null}
            </FormField>

            <FormField label={t('events.submit.fields.location')}>
              <TextInput
                aria-label={t('events.submit.fields.location')}
                value={form.location}
                onChange={(event) => updateField('location', event.target.value)}
                aria-invalid={Boolean(fieldErrors.location)}
              />
              {fieldErrors.location ? (
                <span className={styles.error}>{fieldErrors.location}</span>
              ) : null}
            </FormField>

            <FormField label={t('events.submit.fields.category')}>
              <select
                className={styles.select}
                aria-label={t('events.submit.fields.category')}
                value={form.category}
                onChange={(event) => updateField('category', event.target.value as EventCategory)}
              >
                <option value="music">{t('events.categories.music')}</option>
                <option value="food">{t('events.categories.food')}</option>
                <option value="wellness">{t('events.categories.wellness')}</option>
              </select>
            </FormField>

            <FormField label={t('events.submit.fields.contactName')}>
              <TextInput
                aria-label={t('events.submit.fields.contactName')}
                value={form.contactName}
                onChange={(event) => updateField('contactName', event.target.value)}
                aria-invalid={Boolean(fieldErrors.contactName)}
              />
              {fieldErrors.contactName ? (
                <span className={styles.error}>{fieldErrors.contactName}</span>
              ) : null}
            </FormField>

            <FormField label={t('events.submit.fields.contactMethod')}>
              <TextInput
                aria-label={t('events.submit.fields.contactMethod')}
                value={form.contactMethod}
                onChange={(event) => updateField('contactMethod', event.target.value)}
                aria-invalid={Boolean(fieldErrors.contactMethod)}
                placeholder={t('events.submit.placeholders.contactMethod')}
              />
              {fieldErrors.contactMethod ? (
                <span className={styles.error}>{fieldErrors.contactMethod}</span>
              ) : null}
            </FormField>

            <FormField label={t('events.submit.fields.instagram')} hint={t('events.submit.optional')}>
              <TextInput
                aria-label={t('events.submit.fields.instagram')}
                value={form.instagram}
                onChange={(event) => updateField('instagram', event.target.value)}
              />
            </FormField>

            <FormField label={t('events.submit.fields.whatsapp')} hint={t('events.submit.optional')}>
              <TextInput
                aria-label={t('events.submit.fields.whatsapp')}
                value={form.whatsapp}
                onChange={(event) => updateField('whatsapp', event.target.value)}
              />
            </FormField>
          </div>

          <FormField label={t('events.submit.fields.description')}>
            <textarea
              className={styles.textarea}
              aria-label={t('events.submit.fields.description')}
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
                <h2 className={styles.sectionTitle}>{t('events.submit.media.title')}</h2>
                <p className={styles.sectionDescription}>{t('events.submit.media.description')}</p>
              </div>
              <p className={styles.mediaCount}>
                {t('events.submit.media.count', {
                  count: mediaSummary.count,
                  max: MAX_SUBMISSION_IMAGES,
                })}
              </p>
            </div>

            <div className={styles.mediaGrid}>
              <FormField
                label={t('events.submit.media.uploadLabel')}
                hint={t('events.submit.media.uploadHint')}
              >
                <input
                  ref={fileInputRef}
                  className={styles.fileInput}
                  type="file"
                  aria-label={t('events.submit.media.uploadLabel')}
                  accept={SUBMISSION_IMAGE_ACCEPT}
                  multiple
                  onChange={handleFileSelection}
                />
              </FormField>

              <FormField
                label={t('events.submit.media.externalUrlLabel')}
                hint={t('events.submit.media.externalUrlHint')}
              >
                <div className={styles.inlineField}>
                  <TextInput
                    aria-label={t('events.submit.media.externalUrlLabel')}
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
                    {t('events.submit.media.addUrl')}
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
                <h3 className={styles.listTitle}>{t('events.submit.media.selectedUploads')}</h3>
                <ul className={styles.mediaList}>
                  {selectedFiles.map((file, index) => (
                    <li key={`${file.name}-${index}`}>
                      <span>{file.name}</span>
                      <button type="button" className={styles.removeButton} onClick={() => removeFile(index)}>
                        {t('events.submit.media.remove')}
                      </button>
                    </li>
                  ))}
                  {selectedFiles.length === 0 ? <li>{t('events.submit.media.none')}</li> : null}
                </ul>
              </div>
              <div>
                <h3 className={styles.listTitle}>{t('events.submit.media.selectedLinks')}</h3>
                <ul className={styles.mediaList}>
                  {externalImageUrls.map((url, index) => (
                    <li key={`${url}-${index}`}>
                      <span>{url}</span>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removeExternalUrl(index)}
                      >
                        {t('events.submit.media.remove')}
                      </button>
                    </li>
                  ))}
                  {externalImageUrls.length === 0 ? <li>{t('events.submit.media.none')}</li> : null}
                </ul>
              </div>
            </div>
          </ContentPanel>

          {requestError ? <p className={styles.error}>{requestError}</p> : null}

          <div className={styles.actions}>
            <Button type="submit" variant="accent" disabled={isSubmitting}>
              {isSubmitting ? t('events.submit.submitting') : t('events.submit.action')}
            </Button>
            <Link className={styles.secondaryLink} to="/events">
              {t('events.backToList')}
            </Link>
          </div>
        </form>
      </ContentPanel>
    </section>
  )
}

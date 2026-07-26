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
import posthog from '../../../services/posthog'
import { createRestaurantSubmission } from '../api/createRestaurantSubmission'
import { prepareRestaurantSubmissionUpload } from '../api/prepareRestaurantSubmissionUpload'
import { uploadSubmissionImage } from '../api/uploadSubmissionImage'
import type { RestaurantMoment } from '../types/restaurant'
import {
  MAX_SUBMISSION_IMAGES,
  MAX_SUBMISSION_IMAGE_SIZE_BYTES,
  SUBMISSION_IMAGE_ACCEPT,
  SUBMISSION_IMAGE_MIME_TYPES,
  type RestaurantSubmissionMedia,
  type SubmissionImageMimeType,
} from '../types/submission'
import styles from '../../events/pages/EventSubmissionPage.module.scss'

type SubmissionFormState = {
  name: string
  cuisine: string
  moment: RestaurantMoment
  priceBand: '$' | '$$' | '$$$'
  address: string
  mapUrl: string
  mapEmbedUrl: string
  description: string
  contactName: string
  contactMethod: string
  instagram: string
  whatsapp: string
}

type FieldErrors = Partial<Record<string, string>>

const initialFormState: SubmissionFormState = {
  name: '',
  cuisine: '',
  moment: 'breakfast',
  priceBand: '$$',
  address: '',
  mapUrl: '',
  mapEmbedUrl: '',
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
      return t('restaurants.submit.validation.urlFormat')
    }

    const pathname = parsed.pathname.toLowerCase()

    if (invalidUrlExtensions.some((extension) => pathname.endsWith(extension))) {
      return t('restaurants.submit.validation.urlImageType')
    }

    return null
  } catch {
    return t('restaurants.submit.validation.urlFormat')
  }
}

function formatFileSizeLabel(bytes: number) {
  return `${Math.round(bytes / (1024 * 1024))} MB`
}

export function RestaurantSubmissionPage() {
  const { t } = useTranslation()
  const language = useAppLanguage()
  const seo = seoContentByLanguage[language].restaurantSubmit
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
      nextErrors.name = t('restaurants.submit.validation.required')
    }
    if (!form.cuisine.trim()) {
      nextErrors.cuisine = t('restaurants.submit.validation.required')
    }
    if (!form.description.trim()) {
      nextErrors.description = t('restaurants.submit.validation.required')
    }
    if (!form.contactName.trim()) {
      nextErrors.contactName = t('restaurants.submit.validation.required')
    }
    if (!form.contactMethod.trim()) {
      nextErrors.contactMethod = t('restaurants.submit.validation.required')
    }
    if (totalMediaCount > MAX_SUBMISSION_IMAGES) {
      nextErrors.media = t('restaurants.submit.validation.maxImages', {
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
      nextErrors.media = t('restaurants.submit.validation.maxImages', {
        count: MAX_SUBMISSION_IMAGES,
      })
    }

    for (const file of pickedFiles.slice(0, remainingSlots)) {
      if (!isSubmissionImageMimeType(file.type)) {
        nextErrors.media = t('restaurants.submit.validation.fileType')
        continue
      }

      if (file.size > MAX_SUBMISSION_IMAGE_SIZE_BYTES) {
        nextErrors.media = t('restaurants.submit.validation.fileSize', {
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
        mediaUrl: t('restaurants.submit.validation.urlRequired'),
      }))
      return
    }

    if (totalMediaCount >= MAX_SUBMISSION_IMAGES) {
      setFieldErrors((current) => ({
        ...current,
        media: t('restaurants.submit.validation.maxImages', {
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
      const uploadedMedia: RestaurantSubmissionMedia[] = []

      for (const file of selectedFiles) {
        const uploadTarget = await prepareRestaurantSubmissionUpload(language, {
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

      await createRestaurantSubmission(language, {
        name: form.name.trim(),
        cuisine: form.cuisine.trim(),
        moment: form.moment,
        priceBand: form.priceBand,
        address: form.address.trim() || undefined,
        mapUrl: form.mapUrl.trim() || undefined,
        mapEmbedUrl: form.mapEmbedUrl.trim() || undefined,
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

      posthog.capture('restaurant_submission_completed', {
        locale: language,
        media_count: totalMediaCount,
        moment: form.moment,
        price_band: form.priceBand,
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
        error instanceof ApiError ? error.message : t('restaurants.submit.error'),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className={pageStyles.page}>
        <PageIntro
          eyebrow={t('restaurants.submit.successEyebrow')}
          title={t('restaurants.submit.successTitle')}
          description={t('restaurants.submit.successDescription')}
        />
        <ContentPanel className={styles.successCard} tone="warm">
          <p className={styles.successCopy}>{t('restaurants.submit.successNote')}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryLink} to="/restaurants">
              {t('restaurants.backToList')}
            </Link>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsSubmitted(false)}
            >
              {t('restaurants.submit.submitAnother')}
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
        eyebrow={t('restaurants.submit.eyebrow')}
        title={t('restaurants.submit.title')}
        description={t('restaurants.submit.description')}
      />

      <ContentPanel>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.grid}>
            <FormField label={t('restaurants.submit.fields.name')}>
              <TextInput
                aria-label={t('restaurants.submit.fields.name')}
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
              />
              {fieldErrors.name ? <span className={styles.error}>{fieldErrors.name}</span> : null}
            </FormField>
            <FormField label={t('restaurants.submit.fields.cuisine')}>
              <TextInput
                aria-label={t('restaurants.submit.fields.cuisine')}
                value={form.cuisine}
                onChange={(event) => updateField('cuisine', event.target.value)}
                aria-invalid={Boolean(fieldErrors.cuisine)}
              />
              {fieldErrors.cuisine ? <span className={styles.error}>{fieldErrors.cuisine}</span> : null}
            </FormField>
            <FormField label={t('restaurants.submit.fields.moment')}>
              <select
                className={styles.select}
                aria-label={t('restaurants.submit.fields.moment')}
                value={form.moment}
                onChange={(event) => updateField('moment', event.target.value as RestaurantMoment)}
              >
                <option value="breakfast">{t('restaurants.categories.breakfast')}</option>
                <option value="lunch">{t('restaurants.categories.lunch')}</option>
                <option value="dinner">{t('restaurants.categories.dinner')}</option>
              </select>
            </FormField>
            <FormField label={t('restaurants.submit.fields.priceBand')}>
              <select
                className={styles.select}
                aria-label={t('restaurants.submit.fields.priceBand')}
                value={form.priceBand}
                onChange={(event) => updateField('priceBand', event.target.value as '$' | '$$' | '$$$')}
              >
                <option value="$">$</option>
                <option value="$$">$$</option>
                <option value="$$$">$$$</option>
              </select>
            </FormField>
            <FormField label={t('restaurants.submit.fields.address')} hint={t('restaurants.submit.optional')}>
              <TextInput
                aria-label={t('restaurants.submit.fields.address')}
                value={form.address}
                onChange={(event) => updateField('address', event.target.value)}
                aria-invalid={Boolean(fieldErrors.address)}
              />
              {fieldErrors.address ? (
                <span className={styles.error}>{fieldErrors.address}</span>
              ) : null}
            </FormField>
            <FormField label={t('restaurants.submit.fields.mapUrl')} hint={t('restaurants.submit.optional')}>
              <TextInput
                aria-label={t('restaurants.submit.fields.mapUrl')}
                value={form.mapUrl}
                onChange={(event) => updateField('mapUrl', event.target.value)}
                aria-invalid={Boolean(fieldErrors.mapUrl)}
              />
              {fieldErrors.mapUrl ? (
                <span className={styles.error}>{fieldErrors.mapUrl}</span>
              ) : null}
            </FormField>
            <FormField label={t('restaurants.submit.fields.mapEmbedUrl')} hint={t('restaurants.submit.optional')}>
              <TextInput
                aria-label={t('restaurants.submit.fields.mapEmbedUrl')}
                value={form.mapEmbedUrl}
                onChange={(event) => updateField('mapEmbedUrl', event.target.value)}
                aria-invalid={Boolean(fieldErrors.mapEmbedUrl)}
              />
              {fieldErrors.mapEmbedUrl ? (
                <span className={styles.error}>{fieldErrors.mapEmbedUrl}</span>
              ) : null}
            </FormField>
            <FormField label={t('restaurants.submit.fields.contactName')}>
              <TextInput
                aria-label={t('restaurants.submit.fields.contactName')}
                value={form.contactName}
                onChange={(event) => updateField('contactName', event.target.value)}
                aria-invalid={Boolean(fieldErrors.contactName)}
              />
              {fieldErrors.contactName ? (
                <span className={styles.error}>{fieldErrors.contactName}</span>
              ) : null}
            </FormField>
            <FormField label={t('restaurants.submit.fields.contactMethod')}>
              <TextInput
                aria-label={t('restaurants.submit.fields.contactMethod')}
                value={form.contactMethod}
                onChange={(event) => updateField('contactMethod', event.target.value)}
                aria-invalid={Boolean(fieldErrors.contactMethod)}
                placeholder={t('restaurants.submit.placeholders.contactMethod')}
              />
              {fieldErrors.contactMethod ? (
                <span className={styles.error}>{fieldErrors.contactMethod}</span>
              ) : null}
            </FormField>
            <FormField label={t('restaurants.submit.fields.instagram')} hint={t('restaurants.submit.optional')}>
              <TextInput
                aria-label={t('restaurants.submit.fields.instagram')}
                value={form.instagram}
                onChange={(event) => updateField('instagram', event.target.value)}
              />
            </FormField>
            <FormField label={t('restaurants.submit.fields.whatsapp')} hint={t('restaurants.submit.optional')}>
              <TextInput
                aria-label={t('restaurants.submit.fields.whatsapp')}
                value={form.whatsapp}
                onChange={(event) => updateField('whatsapp', event.target.value)}
              />
            </FormField>
          </div>
          <FormField label={t('restaurants.submit.fields.description')}>
            <textarea
              className={styles.textarea}
              aria-label={t('restaurants.submit.fields.description')}
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
                <h2 className={styles.sectionTitle}>{t('restaurants.submit.media.title')}</h2>
                <p className={styles.sectionDescription}>{t('restaurants.submit.media.description')}</p>
              </div>
              <p className={styles.mediaCount}>
                {t('restaurants.submit.media.count', {
                  count: mediaSummary.count,
                  max: MAX_SUBMISSION_IMAGES,
                })}
              </p>
            </div>
            <div className={styles.mediaGrid}>
              <FormField
                label={t('restaurants.submit.media.uploadLabel')}
                hint={t('restaurants.submit.media.uploadHint')}
              >
                <input
                  ref={fileInputRef}
                  className={styles.fileInput}
                  type="file"
                  aria-label={t('restaurants.submit.media.uploadLabel')}
                  accept={SUBMISSION_IMAGE_ACCEPT}
                  multiple
                  onChange={handleFileSelection}
                />
              </FormField>
              <FormField
                label={t('restaurants.submit.media.externalUrlLabel')}
                hint={t('restaurants.submit.media.externalUrlHint')}
              >
                <div className={styles.inlineField}>
                  <TextInput
                    aria-label={t('restaurants.submit.media.externalUrlLabel')}
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
                    {t('restaurants.submit.media.addUrl')}
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
                <h3 className={styles.listTitle}>{t('restaurants.submit.media.selectedUploads')}</h3>
                <ul className={styles.mediaList}>
                  {selectedFiles.map((file, index) => (
                    <li key={`${file.name}-${index}`}>
                      <span>{file.name}</span>
                      <button type="button" className={styles.removeButton} onClick={() => removeFile(index)}>
                        {t('restaurants.submit.media.remove')}
                      </button>
                    </li>
                  ))}
                  {selectedFiles.length === 0 ? <li>{t('restaurants.submit.media.none')}</li> : null}
                </ul>
              </div>
              <div>
                <h3 className={styles.listTitle}>{t('restaurants.submit.media.selectedLinks')}</h3>
                <ul className={styles.mediaList}>
                  {externalImageUrls.map((url, index) => (
                    <li key={`${url}-${index}`}>
                      <span>{url}</span>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removeExternalUrl(index)}
                      >
                        {t('restaurants.submit.media.remove')}
                      </button>
                    </li>
                  ))}
                  {externalImageUrls.length === 0 ? <li>{t('restaurants.submit.media.none')}</li> : null}
                </ul>
              </div>
            </div>
          </ContentPanel>

          {requestError ? <p className={styles.error}>{requestError}</p> : null}

          <div className={styles.actions}>
            <Button type="submit" variant="accent" disabled={isSubmitting}>
              {isSubmitting
                ? t('restaurants.submit.submitting')
                : t('restaurants.submit.action')}
            </Button>
            <Link className={styles.secondaryLink} to="/restaurants">
              {t('restaurants.backToList')}
            </Link>
          </div>
        </form>
      </ContentPanel>
    </section>
  )
}

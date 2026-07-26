import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Seo } from '../../../app/seo/Seo'
import { seoContentByLanguage } from '../../../app/seo/seoContent'
import { useAppLanguage } from '../../../app/i18n/useAppLanguage'
import { Button } from '../../../components/atoms/Button'
import { ContentPanel } from '../../../components/atoms/ContentPanel'
import { TextInput } from '../../../components/atoms/TextInput'
import { FormField } from '../../../components/molecules/FormField'
import { PageIntro } from '../../../components/molecules/PageIntro'
import { queryKeys } from '../../../lib/queryKeys'
import { ApiError } from '../../../services/http'
import posthog from '../../../services/posthog'
import pageStyles from '../../../styles/FeaturePage.module.scss'
import { prepareEventSubmissionUpload } from '../../events/api/prepareEventSubmissionUpload'
import { uploadSubmissionImage } from '../../events/api/uploadSubmissionImage'
import {
  MAX_SUBMISSION_IMAGES,
  MAX_SUBMISSION_IMAGE_SIZE_BYTES,
  SUBMISSION_IMAGE_ACCEPT,
  SUBMISSION_IMAGE_MIME_TYPES,
  type EventSubmissionMedia,
  type SubmissionImageMimeType,
} from '../../events/types/submission'
import { prepareRestaurantSubmissionUpload } from '../../restaurants/api/prepareRestaurantSubmissionUpload'
import { prepareTourSubmissionUpload } from '../../tours/api/prepareTourSubmissionUpload'
import { updateAdminPublishedContent } from '../api/updateAdminPublishedContent'
import { useAdminAuth } from '../auth/useAdminAuth'
import { AdminEditPlaceholder } from '../components/AdminPagePlaceholders'
import { useAdminPublishedContentDetail } from '../hooks/useAdminPublishedContentDetail'
import type {
  AdminPublishedContentDetail,
  AdminPublishedContentType,
  UpdateAdminPublishedContentRequest,
} from '../types/admin'
import styles from './AdminPublishedContentEditPage.module.scss'

type AdminMediaValue = EventSubmissionMedia
type MediaDraft = AdminMediaValue | { kind: 'pending-file'; file: File }
type FieldErrors = Partial<Record<string, string>>

type EventFormState = {
  type: 'events'
  category: 'music' | 'wellness' | 'food'
  startsAt: string
  organizerName: string
  whatsapp: string
  phone: string
  website: string
  instagram: string
  facebook: string
  email: string
  address: string
  mapUrl: string
  mapEmbedUrl: string
  translations: {
    en: { title: string; dateLabel: string; venue: string; description: string }
    es: { title: string; dateLabel: string; venue: string; description: string }
  }
}

type RestaurantFormState = {
  type: 'restaurants'
  priceBand: '$' | '$$' | '$$$'
  moments: Array<'breakfast' | 'lunch' | 'dinner'>
  whatsapp: string
  phone: string
  website: string
  instagram: string
  facebook: string
  email: string
  address: string
  mapUrl: string
  mapEmbedUrl: string
  translations: {
    en: { name: string; cuisine: string; vibe: string; description: string }
    es: { name: string; cuisine: string; vibe: string; description: string }
  }
}

type TourFormState = {
  type: 'tours'
  category: string
  durationHours: string
  priceFrom: string
  privateOrShared: string
  bestFor: string
  difficulty: string
  suitableForKids: string
  meetingPoint: string
  providerName: string
  whatsapp: string
  phone: string
  website: string
  instagram: string
  facebook: string
  email: string
  address: string
  mapUrl: string
  mapEmbedUrl: string
  operatorName: string
  operatorWhatsapp: string
  operatorInstagram: string
  operatorWebsite: string
  operatorPrimaryContactMethod: string
  translations: {
    en: {
      name: string
      description: string
      included: string
      whatToBring: string
      operatorDescription: string
    }
    es: {
      name: string
      description: string
      included: string
      whatToBring: string
      operatorDescription: string
    }
  }
}

type AdminEditFormState = EventFormState | RestaurantFormState | TourFormState

function isSubmissionImageMimeType(value: string): value is SubmissionImageMimeType {
  return SUBMISSION_IMAGE_MIME_TYPES.includes(value as SubmissionImageMimeType)
}

function formatFileSizeLabel(bytes: number) {
  return `${Math.round(bytes / (1024 * 1024))} MB`
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

function validateExternalImageUrl(url: string) {
  const invalidUrlExtensions = ['.html', '.htm', '.php', '.pdf', '.json', '.txt']

  try {
    const parsed = new URL(url)

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false
    }

    return !invalidUrlExtensions.some((extension) =>
      parsed.pathname.toLowerCase().endsWith(extension),
    )
  } catch {
    return false
  }
}

function toMediaDrafts(item: AdminPublishedContentDetail): MediaDraft[] {
  return item.media.map((media) =>
    media.source === 'UPLOADED' && media.objectKey && media.mimeType && media.originalFilename
      ? {
          kind: 'uploaded',
          url: media.url,
          objectKey: media.objectKey,
          mimeType: media.mimeType as SubmissionImageMimeType,
          filename: media.originalFilename,
        }
      : {
          kind: 'external',
          url: media.url,
        },
  )
}

function toFormState(item: AdminPublishedContentDetail): AdminEditFormState {
  switch (item.type) {
    case 'events':
      return {
        type: 'events',
        category: item.category,
        startsAt: item.startsAt.slice(0, 16),
        organizerName: item.organizerName ?? '',
        whatsapp: item.whatsapp ?? '',
        phone: item.phone ?? '',
        website: item.website ?? '',
        instagram: item.instagram ?? '',
        facebook: item.facebook ?? '',
        email: item.email ?? '',
        address: item.address ?? '',
        mapUrl: item.mapUrl ?? '',
        mapEmbedUrl: item.mapEmbedUrl ?? '',
        translations: item.translations,
      }
    case 'restaurants':
      return {
        type: 'restaurants',
        priceBand: item.priceBand,
        moments: item.moments,
        whatsapp: item.whatsapp ?? '',
        phone: item.phone ?? '',
        website: item.website ?? '',
        instagram: item.instagram ?? '',
        facebook: item.facebook ?? '',
        email: item.email ?? '',
        address: item.address ?? '',
        mapUrl: item.mapUrl ?? '',
        mapEmbedUrl: item.mapEmbedUrl ?? '',
        translations: item.translations,
      }
    case 'tours':
      return {
        type: 'tours',
        category: item.category,
        durationHours: String(item.durationHours),
        priceFrom: String(item.priceFrom),
        privateOrShared: item.privateOrShared,
        bestFor: item.bestFor,
        difficulty: item.difficulty,
        suitableForKids: item.suitableForKids,
        meetingPoint: item.meetingPoint ?? '',
        providerName: item.providerName ?? item.operatorName,
        whatsapp: item.whatsapp ?? item.operatorWhatsapp ?? '',
        phone: item.phone ?? '',
        website: item.website ?? item.operatorWebsite ?? '',
        instagram: item.instagram ?? item.operatorInstagram ?? '',
        facebook: item.facebook ?? '',
        email: item.email ?? '',
        address: item.address ?? '',
        mapUrl: item.mapUrl ?? '',
        mapEmbedUrl: item.mapEmbedUrl ?? '',
        operatorName: item.operatorName,
        operatorWhatsapp: item.operatorWhatsapp ?? '',
        operatorInstagram: item.operatorInstagram ?? '',
        operatorWebsite: item.operatorWebsite ?? '',
        operatorPrimaryContactMethod: item.operatorPrimaryContactMethod ?? '',
        translations: {
          en: {
            name: item.translations.en.name,
            description: item.translations.en.description,
            included: item.translations.en.included ?? '',
            whatToBring: item.translations.en.whatToBring ?? '',
            operatorDescription: item.translations.en.operatorDescription ?? '',
          },
          es: {
            name: item.translations.es.name,
            description: item.translations.es.description,
            included: item.translations.es.included ?? '',
            whatToBring: item.translations.es.whatToBring ?? '',
            operatorDescription: item.translations.es.operatorDescription ?? '',
          },
        },
      }
  }
}

function momentOptions() {
  return ['breakfast', 'lunch', 'dinner'] as const
}

function getValidationSummaryMessage(
  t: ReturnType<typeof useTranslation>['t'],
  fieldCount: number,
) {
  return t('admin.content.edit.validationSummary', {
    count: fieldCount,
  })
}

function getTrimmedLength(value: string) {
  return value.trim().length
}

function isLocalizedBlockComplete(
  fields: Record<string, string>,
  minimumLengths: Record<string, number>,
) {
  return Object.entries(minimumLengths).every(
    ([field, minimumLength]) => getTrimmedLength(fields[field] ?? '') >= minimumLength,
  )
}

function getFilledFieldCount(fields: Record<string, string>) {
  return Object.values(fields).filter((value) => getTrimmedLength(value) > 0).length
}

function getLocalizedFieldErrors(
  values: { en: Record<string, string>; es: Record<string, string> },
  minimumLengths: Record<string, number>,
  message: string,
  preferredLocale: 'en' | 'es',
) {
  if (
    isLocalizedBlockComplete(values.en, minimumLengths) ||
    isLocalizedBlockComplete(values.es, minimumLengths)
  ) {
    return {}
  }

  const enFilledCount = getFilledFieldCount(values.en)
  const esFilledCount = getFilledFieldCount(values.es)
  const localeToValidate =
    enFilledCount === esFilledCount
      ? preferredLocale
      : enFilledCount > esFilledCount
        ? 'en'
        : 'es'

  return Object.entries(minimumLengths).reduce<FieldErrors>((accumulator, [field, minimumLength]) => {
    if (getTrimmedLength(values[localeToValidate][field] ?? '') < minimumLength) {
      accumulator[`translations.${localeToValidate}.${field}`] = message
    }

    return accumulator
  }, {})
}

export function AdminPublishedContentEditPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()
  const queryClient = useQueryClient()
  const { session } = useAdminAuth()
  const token = session?.access_token ?? null
  const language = useAppLanguage()
  const contentType = params.type as AdminPublishedContentType | undefined
  const id = params.id ?? ''
  const query = useAdminPublishedContentDetail(contentType ?? 'events', id, token)
  const item = query.data?.item
  const [form, setForm] = useState<AdminEditFormState | null>(null)
  const [mediaDrafts, setMediaDrafts] = useState<MediaDraft[]>([])
  const [draftExternalUrl, setDraftExternalUrl] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [requestError, setRequestError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const locale = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const seo = seoContentByLanguage[locale].adminContent

  useEffect(() => {
    if (!item) {
      return
    }

    let cancelled = false

    queueMicrotask(() => {
      if (cancelled) {
        return
      }

      setForm(toFormState(item))
      setMediaDrafts(toMediaDrafts(item))
      setFieldErrors({})
      setRequestError(null)
    })

    return () => {
      cancelled = true
    }
  }, [item])

  const mutation = useMutation({
    mutationFn: async (payload: UpdateAdminPublishedContentRequest) =>
      updateAdminPublishedContent(contentType ?? 'events', id, payload, token ?? ''),
    onSuccess: async () => {
      posthog.capture('published_content_updated', {
        content_type: contentType ?? 'events',
      })
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.admin.contentRoot }),
        queryClient.invalidateQueries({ queryKey: queryKeys.admin.contentDetail(contentType ?? 'events', id) }),
        queryClient.invalidateQueries({ queryKey: ['home'] }),
        queryClient.invalidateQueries({ queryKey: ['events'] }),
        queryClient.invalidateQueries({ queryKey: ['restaurants'] }),
        queryClient.invalidateQueries({ queryKey: ['tours'] }),
      ])

      navigate('/admin/content', {
        replace: true,
        state: {
          flashMessage: t('admin.content.edit.success'),
        },
      })
    },
    onError: (error) => {
      const validationErrors = parseValidationDetails(error)

      if (Object.keys(validationErrors).length > 0) {
        setFieldErrors(validationErrors)
      }

      setRequestError(
        error instanceof ApiError ? error.message : t('admin.content.edit.error'),
      )
    },
  })

  const totalMediaCount = mediaDrafts.length
  const listErrorMessage =
    query.error instanceof ApiError ? query.error.message : t('admin.content.edit.error')

  const title = useMemo(() => {
    if (!item) {
      return t('admin.content.edit.title')
    }

    if (item.type === 'events') {
      return item.translations.en.title || item.translations.es.title
    }

    return item.translations.en.name || item.translations.es.name
  }, [item, t])

  if (!contentType || !['events', 'restaurants', 'tours'].includes(contentType)) {
    return (
      <section className={pageStyles.page}>
        <ContentPanel>
          <p className={styles.errorText}>{t('admin.content.edit.invalidType')}</p>
        </ContentPanel>
      </section>
    )
  }

  function setTextError(key: string) {
    setFieldErrors((current) =>
      Object.fromEntries(
        Object.entries(current).filter(
          ([field]) => field !== key && !field.startsWith(`${key}.`),
        ),
      ),
    )
  }

  function getFieldError(key: string) {
    return fieldErrors[key]
  }

  function getInputClassName(errorKey?: string, baseClassName?: string) {
    return [baseClassName, errorKey && fieldErrors[errorKey] ? styles.fieldError : undefined]
      .filter(Boolean)
      .join(' ')
  }

  function handleFileSelection(event: ChangeEvent<HTMLInputElement>) {
    const pickedFiles = Array.from(event.target.files ?? [])

    if (pickedFiles.length === 0) {
      return
    }

    const nextErrors: FieldErrors = {}
    const acceptedFiles: MediaDraft[] = []
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

      acceptedFiles.push({
        kind: 'pending-file',
        file,
      })
    }

    if (acceptedFiles.length > 0) {
      setMediaDrafts((current) => [...current, ...acceptedFiles])
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

    if (!validateExternalImageUrl(trimmedUrl)) {
      setFieldErrors((current) => ({
        ...current,
        mediaUrl: t('events.submit.validation.urlFormat'),
      }))
      return
    }

    setMediaDrafts((current) => [...current, { kind: 'external', url: trimmedUrl }])
    setDraftExternalUrl('')
    setFieldErrors((current) => ({
      ...current,
      media: undefined,
      mediaUrl: undefined,
    }))
  }

  function removeMedia(index: number) {
    setMediaDrafts((current) => current.filter((_, itemIndex) => itemIndex !== index))
  }

  function updateEventField<Key extends keyof EventFormState>(key: Key, value: EventFormState[Key]) {
    setForm((current) =>
      current?.type === 'events'
        ? {
            ...current,
            [key]: value,
          }
        : current,
    )
    setTextError(String(key))
  }

  function updateRestaurantField<Key extends keyof RestaurantFormState>(
    key: Key,
    value: RestaurantFormState[Key],
  ) {
    setForm((current) =>
      current?.type === 'restaurants'
        ? {
            ...current,
            [key]: value,
          }
        : current,
    )
    setTextError(String(key))
  }

  function updateTourField<Key extends keyof TourFormState>(key: Key, value: TourFormState[Key]) {
    setForm((current) =>
      current?.type === 'tours'
        ? {
            ...current,
            [key]: value,
          }
        : current,
    )
    setTextError(String(key))
  }

  function validateFormState(): FieldErrors {
    if (!form) {
      return { form: t('admin.content.edit.error') }
    }

    const nextErrors: FieldErrors = {}

    if (mediaDrafts.length > MAX_SUBMISSION_IMAGES) {
      nextErrors.media = t('events.submit.validation.maxImages', {
        count: MAX_SUBMISSION_IMAGES,
      })
    }

    if (form.type === 'events') {
      if (!form.startsAt) nextErrors.startsAt = t('events.submit.validation.required')
      Object.assign(
        nextErrors,
        getLocalizedFieldErrors(
          form.translations as { en: Record<string, string>; es: Record<string, string> },
          {
            title: 3,
            dateLabel: 2,
            venue: 2,
            description: 20,
          },
          t('events.submit.validation.required'),
          locale,
        ),
      )
    }

    if (form.type === 'restaurants') {
      if (form.moments.length === 0) nextErrors.moments = t('restaurants.submit.validation.required')
      Object.assign(
        nextErrors,
        getLocalizedFieldErrors(
          form.translations as { en: Record<string, string>; es: Record<string, string> },
          {
            name: 2,
            cuisine: 2,
            vibe: 2,
            description: 20,
          },
          t('restaurants.submit.validation.required'),
          locale,
        ),
      )
    }

    if (form.type === 'tours') {
      if (!form.category.trim()) nextErrors.category = t('tours.submit.validation.required')
      if (!form.durationHours.trim() || Number(form.durationHours) <= 0) nextErrors.durationHours = t('tours.submit.validation.required')
      if (!form.priceFrom.trim() || Number(form.priceFrom) <= 0) nextErrors.priceFrom = t('tours.submit.validation.required')
      if (!form.privateOrShared.trim()) nextErrors.privateOrShared = t('tours.submit.validation.required')
      if (!form.bestFor.trim()) nextErrors.bestFor = t('tours.submit.validation.required')
      if (!form.difficulty.trim()) nextErrors.difficulty = t('tours.submit.validation.required')
      if (!form.suitableForKids.trim()) nextErrors.suitableForKids = t('tours.submit.validation.required')
      if (!form.operatorName.trim()) nextErrors.operatorName = t('tours.submit.validation.required')
      Object.assign(
        nextErrors,
        getLocalizedFieldErrors(
          form.translations as { en: Record<string, string>; es: Record<string, string> },
          {
            name: 2,
            description: 20,
          },
          t('tours.submit.validation.required'),
          locale,
        ),
      )
    }

    return nextErrors
  }

  async function uploadPendingFiles() {
    const uploadedMedia: AdminMediaValue[] = []

    for (const entry of mediaDrafts) {
      if (entry.kind === 'pending-file') {
        const mimeType = entry.file.type as SubmissionImageMimeType

        const uploadTarget =
          contentType === 'events'
            ? await prepareEventSubmissionUpload(language, {
                filename: entry.file.name,
                mimeType,
                fileSize: entry.file.size,
              })
            : contentType === 'restaurants'
              ? await prepareRestaurantSubmissionUpload(language, {
                  filename: entry.file.name,
                  mimeType,
                  fileSize: entry.file.size,
                })
              : await prepareTourSubmissionUpload(language, {
                  filename: entry.file.name,
                  mimeType,
                  fileSize: entry.file.size,
                })

        await uploadSubmissionImage(uploadTarget, entry.file)

        uploadedMedia.push({
          kind: 'uploaded',
          url: uploadTarget.assetUrl,
          objectKey: uploadTarget.objectKey,
          mimeType,
          filename: entry.file.name,
        })
        continue
      }

      uploadedMedia.push(entry)
    }

    return uploadedMedia
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateFormState()

    if (Object.keys(nextErrors).length > 0 || !form) {
      setFieldErrors(nextErrors)
      setRequestError(
        getValidationSummaryMessage(t, Object.keys(nextErrors).length),
      )
      return
    }

    setFieldErrors({})
    setRequestError(null)

    try {
      const media = await uploadPendingFiles()
      const payload: UpdateAdminPublishedContentRequest =
        form.type === 'events'
          ? {
              category: form.category,
              startsAt: new Date(form.startsAt).toISOString(),
              organizerName: form.organizerName.trim() || undefined,
              whatsapp: form.whatsapp.trim() || undefined,
              phone: form.phone.trim() || undefined,
              website: form.website.trim() || undefined,
              instagram: form.instagram.trim() || undefined,
              facebook: form.facebook.trim() || undefined,
              email: form.email.trim() || undefined,
              address: form.address.trim() || undefined,
              mapUrl: form.mapUrl.trim() || undefined,
              mapEmbedUrl: form.mapEmbedUrl.trim() || undefined,
              media,
              translations: form.translations,
            }
          : form.type === 'restaurants'
            ? {
                priceBand: form.priceBand,
                moments: form.moments,
                whatsapp: form.whatsapp.trim() || undefined,
                phone: form.phone.trim() || undefined,
                website: form.website.trim() || undefined,
                instagram: form.instagram.trim() || undefined,
                facebook: form.facebook.trim() || undefined,
                email: form.email.trim() || undefined,
                address: form.address.trim() || undefined,
                mapUrl: form.mapUrl.trim() || undefined,
                mapEmbedUrl: form.mapEmbedUrl.trim() || undefined,
                media,
                translations: form.translations,
              }
            : {
                category: form.category.trim(),
                durationHours: Number(form.durationHours),
                priceFrom: Number(form.priceFrom),
                privateOrShared: form.privateOrShared.trim(),
                bestFor: form.bestFor.trim(),
                difficulty: form.difficulty.trim(),
                suitableForKids: form.suitableForKids.trim(),
                meetingPoint: form.meetingPoint.trim() || undefined,
                providerName: form.providerName.trim() || undefined,
                whatsapp: form.whatsapp.trim() || undefined,
                phone: form.phone.trim() || undefined,
                website: form.website.trim() || undefined,
                instagram: form.instagram.trim() || undefined,
                facebook: form.facebook.trim() || undefined,
                email: form.email.trim() || undefined,
                address: form.address.trim() || undefined,
                mapUrl: form.mapUrl.trim() || undefined,
                mapEmbedUrl: form.mapEmbedUrl.trim() || undefined,
                operatorName: form.operatorName.trim(),
                operatorWhatsapp: form.operatorWhatsapp.trim() || undefined,
                operatorInstagram: form.operatorInstagram.trim() || undefined,
                operatorWebsite: form.operatorWebsite.trim() || undefined,
                operatorPrimaryContactMethod:
                  form.operatorPrimaryContactMethod.trim() || undefined,
                media,
                translations: {
                  en: {
                    ...form.translations.en,
                    included: form.translations.en.included.trim() || undefined,
                    whatToBring: form.translations.en.whatToBring.trim() || undefined,
                    operatorDescription:
                      form.translations.en.operatorDescription.trim() || undefined,
                  },
                  es: {
                    ...form.translations.es,
                    included: form.translations.es.included.trim() || undefined,
                    whatToBring: form.translations.es.whatToBring.trim() || undefined,
                    operatorDescription:
                      form.translations.es.operatorDescription.trim() || undefined,
                  },
                },
              }

      mutation.mutate(payload)
    } catch (error) {
      setRequestError(
        error instanceof Error ? error.message : t('admin.content.edit.error'),
      )
    }
  }

  return (
    <section className={pageStyles.page}>
      <Seo title={`${title} | ${seo.title}`} description={seo.description} noIndex />
      <PageIntro
        eyebrow={t('admin.content.edit.eyebrow')}
        title={t('admin.content.edit.title')}
        description={t('admin.content.edit.description')}
      />

      <div className={styles.page}>
        <ContentPanel className={styles.toolbar}>
          <Link className={styles.link} to="/admin/content">
            {t('admin.content.edit.back')}
          </Link>
        </ContentPanel>

        {query.isLoading ? (
          <AdminEditPlaceholder testIdPrefix="admin-content-edit" />
        ) : null}
        {query.isError ? (
          <ContentPanel>
            <p role="alert" className={styles.errorText}>
              {listErrorMessage}
            </p>
          </ContentPanel>
        ) : null}

        {form && !query.isLoading && !query.isError ? (
          <ContentPanel>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.grid}>
                {form.type === 'events' ? (
                  <>
                    <FormField label={t('admin.dashboard.meta.category')}>
                      <select
                        className={styles.select}
                        value={form.category}
                        onChange={(value) => updateEventField('category', value.target.value as EventFormState['category'])}
                      >
                        <option value="music">{t('events.categories.music')}</option>
                        <option value="wellness">{t('events.categories.wellness')}</option>
                        <option value="food">{t('events.categories.food')}</option>
                      </select>
                    </FormField>
                    <FormField label={t('admin.dashboard.meta.startsAt')}>
                      <TextInput
                        type="datetime-local"
                        className={getInputClassName('startsAt')}
                        value={form.startsAt}
                        aria-invalid={Boolean(getFieldError('startsAt'))}
                        onChange={(value) => updateEventField('startsAt', value.target.value)}
                      />
                      {fieldErrors.startsAt ? <span className={styles.errorText}>{fieldErrors.startsAt}</span> : null}
                    </FormField>
                    <FormField label={t('admin.content.edit.fields.organizerName')}>
                      <TextInput value={form.organizerName} onChange={(value) => updateEventField('organizerName', value.target.value)} />
                    </FormField>
                  </>
                ) : null}

                {form.type === 'restaurants' ? (
                  <>
                    <FormField label={t('admin.dashboard.meta.priceBand')}>
                      <select
                        className={styles.select}
                        value={form.priceBand}
                        onChange={(value) => updateRestaurantField('priceBand', value.target.value as RestaurantFormState['priceBand'])}
                      >
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                      </select>
                    </FormField>
                    <FormField label={t('admin.dashboard.meta.moment')}>
                      <div
                        className={getInputClassName('moments', styles.checkboxRow)}
                        aria-invalid={Boolean(getFieldError('moments'))}
                      >
                        {momentOptions().map((moment) => (
                          <label key={moment} className={styles.checkbox}>
                            <input
                              type="checkbox"
                              checked={form.moments.includes(moment)}
                              onChange={(value) =>
                                updateRestaurantField(
                                  'moments',
                                  value.target.checked
                                    ? [...form.moments, moment]
                                    : form.moments.filter((item) => item !== moment),
                                )
                              }
                            />
                            <span>{t(`restaurants.categories.${moment}`)}</span>
                          </label>
                        ))}
                      </div>
                      {fieldErrors.moments ? <span className={styles.errorText}>{fieldErrors.moments}</span> : null}
                    </FormField>
                  </>
                ) : null}

                {form.type === 'tours' ? (
                  <>
                    <FormField label={t('admin.dashboard.meta.category')}>
                      <TextInput
                        className={getInputClassName('category')}
                        value={form.category}
                        aria-invalid={Boolean(getFieldError('category'))}
                        onChange={(value) => updateTourField('category', value.target.value)}
                      />
                      {fieldErrors.category ? <span className={styles.errorText}>{fieldErrors.category}</span> : null}
                    </FormField>
                    <FormField label={t('admin.dashboard.meta.duration')}>
                      <TextInput
                        className={getInputClassName('durationHours')}
                        value={form.durationHours}
                        aria-invalid={Boolean(getFieldError('durationHours'))}
                        onChange={(value) => updateTourField('durationHours', value.target.value)}
                      />
                      {fieldErrors.durationHours ? <span className={styles.errorText}>{fieldErrors.durationHours}</span> : null}
                    </FormField>
                    <FormField label={t('admin.dashboard.meta.priceFrom')}>
                      <TextInput
                        className={getInputClassName('priceFrom')}
                        value={form.priceFrom}
                        aria-invalid={Boolean(getFieldError('priceFrom'))}
                        onChange={(value) => updateTourField('priceFrom', value.target.value)}
                      />
                      {fieldErrors.priceFrom ? <span className={styles.errorText}>{fieldErrors.priceFrom}</span> : null}
                    </FormField>
                    <FormField label={t('admin.content.edit.fields.privateOrShared')}>
                      <TextInput
                        className={getInputClassName('privateOrShared')}
                        value={form.privateOrShared}
                        aria-invalid={Boolean(getFieldError('privateOrShared'))}
                        onChange={(value) => updateTourField('privateOrShared', value.target.value)}
                      />
                      {fieldErrors.privateOrShared ? <span className={styles.errorText}>{fieldErrors.privateOrShared}</span> : null}
                    </FormField>
                    <FormField label={t('admin.content.edit.fields.bestFor')}>
                      <TextInput
                        className={getInputClassName('bestFor')}
                        value={form.bestFor}
                        aria-invalid={Boolean(getFieldError('bestFor'))}
                        onChange={(value) => updateTourField('bestFor', value.target.value)}
                      />
                      {fieldErrors.bestFor ? <span className={styles.errorText}>{fieldErrors.bestFor}</span> : null}
                    </FormField>
                    <FormField label={t('admin.content.edit.fields.difficulty')}>
                      <TextInput
                        className={getInputClassName('difficulty')}
                        value={form.difficulty}
                        aria-invalid={Boolean(getFieldError('difficulty'))}
                        onChange={(value) => updateTourField('difficulty', value.target.value)}
                      />
                      {fieldErrors.difficulty ? <span className={styles.errorText}>{fieldErrors.difficulty}</span> : null}
                    </FormField>
                    <FormField label={t('admin.content.edit.fields.suitableForKids')}>
                      <TextInput
                        className={getInputClassName('suitableForKids')}
                        value={form.suitableForKids}
                        aria-invalid={Boolean(getFieldError('suitableForKids'))}
                        onChange={(value) => updateTourField('suitableForKids', value.target.value)}
                      />
                      {fieldErrors.suitableForKids ? <span className={styles.errorText}>{fieldErrors.suitableForKids}</span> : null}
                    </FormField>
                    <FormField label={t('admin.content.edit.fields.meetingPoint')}>
                      <TextInput value={form.meetingPoint} onChange={(value) => updateTourField('meetingPoint', value.target.value)} />
                    </FormField>
                    <FormField label={t('admin.content.edit.fields.providerName')}>
                      <TextInput value={form.providerName} onChange={(value) => updateTourField('providerName', value.target.value)} />
                    </FormField>
                    <FormField label={t('admin.content.edit.fields.operatorName')}>
                      <TextInput
                        className={getInputClassName('operatorName')}
                        value={form.operatorName}
                        aria-invalid={Boolean(getFieldError('operatorName'))}
                        onChange={(value) => updateTourField('operatorName', value.target.value)}
                      />
                      {fieldErrors.operatorName ? <span className={styles.errorText}>{fieldErrors.operatorName}</span> : null}
                    </FormField>
                    <FormField label={t('admin.content.edit.fields.operatorWhatsapp')}>
                      <TextInput value={form.operatorWhatsapp} onChange={(value) => updateTourField('operatorWhatsapp', value.target.value)} />
                    </FormField>
                    <FormField label={t('admin.content.edit.fields.operatorInstagram')}>
                      <TextInput value={form.operatorInstagram} onChange={(value) => updateTourField('operatorInstagram', value.target.value)} />
                    </FormField>
                    <FormField label={t('admin.content.edit.fields.operatorWebsite')}>
                      <TextInput value={form.operatorWebsite} onChange={(value) => updateTourField('operatorWebsite', value.target.value)} />
                    </FormField>
                    <FormField label={t('admin.content.edit.fields.operatorPrimaryContactMethod')}>
                      <TextInput value={form.operatorPrimaryContactMethod} onChange={(value) => updateTourField('operatorPrimaryContactMethod', value.target.value)} />
                    </FormField>
                  </>
                ) : null}

                <FormField label={t('admin.content.edit.fields.whatsapp')}>
                  <TextInput
                    value={form.whatsapp}
                    onChange={(value) =>
                      form.type === 'events'
                        ? updateEventField('whatsapp', value.target.value)
                        : form.type === 'restaurants'
                          ? updateRestaurantField('whatsapp', value.target.value)
                          : updateTourField('whatsapp', value.target.value)
                    }
                  />
                </FormField>
                <FormField label={t('admin.content.edit.fields.phone')}>
                  <TextInput
                    value={form.phone}
                    onChange={(value) =>
                      form.type === 'events'
                        ? updateEventField('phone', value.target.value)
                        : form.type === 'restaurants'
                          ? updateRestaurantField('phone', value.target.value)
                          : updateTourField('phone', value.target.value)
                    }
                  />
                </FormField>
                <FormField label={t('admin.content.edit.fields.website')}>
                  <TextInput
                    value={form.website}
                    onChange={(value) =>
                      form.type === 'events'
                        ? updateEventField('website', value.target.value)
                        : form.type === 'restaurants'
                          ? updateRestaurantField('website', value.target.value)
                          : updateTourField('website', value.target.value)
                    }
                  />
                </FormField>
                <FormField label={t('admin.content.edit.fields.instagram')}>
                  <TextInput
                    value={form.instagram}
                    onChange={(value) =>
                      form.type === 'events'
                        ? updateEventField('instagram', value.target.value)
                        : form.type === 'restaurants'
                          ? updateRestaurantField('instagram', value.target.value)
                          : updateTourField('instagram', value.target.value)
                    }
                  />
                </FormField>
                <FormField label={t('admin.content.edit.fields.facebook')}>
                  <TextInput
                    value={form.facebook}
                    onChange={(value) =>
                      form.type === 'events'
                        ? updateEventField('facebook', value.target.value)
                        : form.type === 'restaurants'
                          ? updateRestaurantField('facebook', value.target.value)
                          : updateTourField('facebook', value.target.value)
                    }
                  />
                </FormField>
                <FormField label={t('admin.content.edit.fields.email')}>
                  <TextInput
                    value={form.email}
                    onChange={(value) =>
                      form.type === 'events'
                        ? updateEventField('email', value.target.value)
                        : form.type === 'restaurants'
                          ? updateRestaurantField('email', value.target.value)
                          : updateTourField('email', value.target.value)
                    }
                  />
                </FormField>

                <FormField label={t('admin.dashboard.meta.address')}>
                  <TextInput
                    value={form.address}
                    onChange={(value) =>
                      form.type === 'events'
                        ? updateEventField('address', value.target.value)
                        : form.type === 'restaurants'
                          ? updateRestaurantField('address', value.target.value)
                          : updateTourField('address', value.target.value)
                    }
                  />
                </FormField>
                <FormField label={t('admin.dashboard.meta.mapUrl')}>
                  <TextInput
                    value={form.mapUrl}
                    onChange={(value) =>
                      form.type === 'events'
                        ? updateEventField('mapUrl', value.target.value)
                        : form.type === 'restaurants'
                          ? updateRestaurantField('mapUrl', value.target.value)
                          : updateTourField('mapUrl', value.target.value)
                    }
                  />
                </FormField>
                <FormField label={t('admin.dashboard.meta.mapEmbedUrl')}>
                  <TextInput
                    value={form.mapEmbedUrl}
                    onChange={(value) =>
                      form.type === 'events'
                        ? updateEventField('mapEmbedUrl', value.target.value)
                        : form.type === 'restaurants'
                          ? updateRestaurantField('mapEmbedUrl', value.target.value)
                          : updateTourField('mapEmbedUrl', value.target.value)
                    }
                  />
                </FormField>
              </div>

              <div className={styles.translationGrid}>
                <ContentPanel className={styles.translationCard}>
                  <h2 className={styles.sectionTitle}>{t('admin.content.edit.languages.english')}</h2>
                  {form.type === 'events' ? (
                    <>
                      <FormField label={t('admin.content.edit.fields.title')}>
                        <TextInput
                          className={getInputClassName('translations.en.title')}
                          value={form.translations.en.title}
                          aria-invalid={Boolean(getFieldError('translations.en.title'))}
                          onChange={(value) => updateEventField('translations', { ...form.translations, en: { ...form.translations.en, title: value.target.value } })}
                        />
                        {fieldErrors['translations.en.title'] ? <span className={styles.errorText}>{fieldErrors['translations.en.title']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.dateLabel')}>
                        <TextInput
                          className={getInputClassName('translations.en.dateLabel')}
                          value={form.translations.en.dateLabel}
                          aria-invalid={Boolean(getFieldError('translations.en.dateLabel'))}
                          onChange={(value) => updateEventField('translations', { ...form.translations, en: { ...form.translations.en, dateLabel: value.target.value } })}
                        />
                        {fieldErrors['translations.en.dateLabel'] ? <span className={styles.errorText}>{fieldErrors['translations.en.dateLabel']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.venue')}>
                        <TextInput
                          className={getInputClassName('translations.en.venue')}
                          value={form.translations.en.venue}
                          aria-invalid={Boolean(getFieldError('translations.en.venue'))}
                          onChange={(value) => updateEventField('translations', { ...form.translations, en: { ...form.translations.en, venue: value.target.value } })}
                        />
                        {fieldErrors['translations.en.venue'] ? <span className={styles.errorText}>{fieldErrors['translations.en.venue']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.description')}>
                        <textarea
                          className={getInputClassName('translations.en.description', styles.textarea)}
                          value={form.translations.en.description}
                          aria-invalid={Boolean(getFieldError('translations.en.description'))}
                          onChange={(value) => updateEventField('translations', { ...form.translations, en: { ...form.translations.en, description: value.target.value } })}
                        />
                        {fieldErrors['translations.en.description'] ? <span className={styles.errorText}>{fieldErrors['translations.en.description']}</span> : null}
                      </FormField>
                    </>
                  ) : null}
                  {form.type === 'restaurants' ? (
                    <>
                      <FormField label={t('admin.content.edit.fields.name')}>
                        <TextInput
                          className={getInputClassName('translations.en.name')}
                          value={form.translations.en.name}
                          aria-invalid={Boolean(getFieldError('translations.en.name'))}
                          onChange={(value) => updateRestaurantField('translations', { ...form.translations, en: { ...form.translations.en, name: value.target.value } })}
                        />
                        {fieldErrors['translations.en.name'] ? <span className={styles.errorText}>{fieldErrors['translations.en.name']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.dashboard.meta.cuisine')}>
                        <TextInput
                          className={getInputClassName('translations.en.cuisine')}
                          value={form.translations.en.cuisine}
                          aria-invalid={Boolean(getFieldError('translations.en.cuisine'))}
                          onChange={(value) => updateRestaurantField('translations', { ...form.translations, en: { ...form.translations.en, cuisine: value.target.value } })}
                        />
                        {fieldErrors['translations.en.cuisine'] ? <span className={styles.errorText}>{fieldErrors['translations.en.cuisine']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.vibe')}>
                        <TextInput
                          className={getInputClassName('translations.en.vibe')}
                          value={form.translations.en.vibe}
                          aria-invalid={Boolean(getFieldError('translations.en.vibe'))}
                          onChange={(value) => updateRestaurantField('translations', { ...form.translations, en: { ...form.translations.en, vibe: value.target.value } })}
                        />
                        {fieldErrors['translations.en.vibe'] ? <span className={styles.errorText}>{fieldErrors['translations.en.vibe']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.description')}>
                        <textarea
                          className={getInputClassName('translations.en.description', styles.textarea)}
                          value={form.translations.en.description}
                          aria-invalid={Boolean(getFieldError('translations.en.description'))}
                          onChange={(value) => updateRestaurantField('translations', { ...form.translations, en: { ...form.translations.en, description: value.target.value } })}
                        />
                        {fieldErrors['translations.en.description'] ? <span className={styles.errorText}>{fieldErrors['translations.en.description']}</span> : null}
                      </FormField>
                    </>
                  ) : null}
                  {form.type === 'tours' ? (
                    <>
                      <FormField label={t('admin.content.edit.fields.name')}>
                        <TextInput
                          className={getInputClassName('translations.en.name')}
                          value={form.translations.en.name}
                          aria-invalid={Boolean(getFieldError('translations.en.name'))}
                          onChange={(value) => updateTourField('translations', { ...form.translations, en: { ...form.translations.en, name: value.target.value } })}
                        />
                        {fieldErrors['translations.en.name'] ? <span className={styles.errorText}>{fieldErrors['translations.en.name']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.description')}>
                        <textarea
                          className={getInputClassName('translations.en.description', styles.textarea)}
                          value={form.translations.en.description}
                          aria-invalid={Boolean(getFieldError('translations.en.description'))}
                          onChange={(value) => updateTourField('translations', { ...form.translations, en: { ...form.translations.en, description: value.target.value } })}
                        />
                        {fieldErrors['translations.en.description'] ? <span className={styles.errorText}>{fieldErrors['translations.en.description']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.included')}>
                        <textarea className={styles.textareaSmall} value={form.translations.en.included} onChange={(value) => updateTourField('translations', { ...form.translations, en: { ...form.translations.en, included: value.target.value } })} />
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.whatToBring')}>
                        <textarea className={styles.textareaSmall} value={form.translations.en.whatToBring} onChange={(value) => updateTourField('translations', { ...form.translations, en: { ...form.translations.en, whatToBring: value.target.value } })} />
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.operatorDescription')}>
                        <textarea className={styles.textareaSmall} value={form.translations.en.operatorDescription} onChange={(value) => updateTourField('translations', { ...form.translations, en: { ...form.translations.en, operatorDescription: value.target.value } })} />
                      </FormField>
                    </>
                  ) : null}
                </ContentPanel>

                <ContentPanel className={styles.translationCard}>
                  <h2 className={styles.sectionTitle}>{t('admin.content.edit.languages.spanish')}</h2>
                  {form.type === 'events' ? (
                    <>
                      <FormField label={t('admin.content.edit.fields.title')}>
                        <TextInput
                          className={getInputClassName('translations.es.title')}
                          value={form.translations.es.title}
                          aria-invalid={Boolean(getFieldError('translations.es.title'))}
                          onChange={(value) => updateEventField('translations', { ...form.translations, es: { ...form.translations.es, title: value.target.value } })}
                        />
                        {fieldErrors['translations.es.title'] ? <span className={styles.errorText}>{fieldErrors['translations.es.title']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.dateLabel')}>
                        <TextInput
                          className={getInputClassName('translations.es.dateLabel')}
                          value={form.translations.es.dateLabel}
                          aria-invalid={Boolean(getFieldError('translations.es.dateLabel'))}
                          onChange={(value) => updateEventField('translations', { ...form.translations, es: { ...form.translations.es, dateLabel: value.target.value } })}
                        />
                        {fieldErrors['translations.es.dateLabel'] ? <span className={styles.errorText}>{fieldErrors['translations.es.dateLabel']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.venue')}>
                        <TextInput
                          className={getInputClassName('translations.es.venue')}
                          value={form.translations.es.venue}
                          aria-invalid={Boolean(getFieldError('translations.es.venue'))}
                          onChange={(value) => updateEventField('translations', { ...form.translations, es: { ...form.translations.es, venue: value.target.value } })}
                        />
                        {fieldErrors['translations.es.venue'] ? <span className={styles.errorText}>{fieldErrors['translations.es.venue']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.description')}>
                        <textarea
                          className={getInputClassName('translations.es.description', styles.textarea)}
                          value={form.translations.es.description}
                          aria-invalid={Boolean(getFieldError('translations.es.description'))}
                          onChange={(value) => updateEventField('translations', { ...form.translations, es: { ...form.translations.es, description: value.target.value } })}
                        />
                        {fieldErrors['translations.es.description'] ? <span className={styles.errorText}>{fieldErrors['translations.es.description']}</span> : null}
                      </FormField>
                    </>
                  ) : null}
                  {form.type === 'restaurants' ? (
                    <>
                      <FormField label={t('admin.content.edit.fields.name')}>
                        <TextInput
                          className={getInputClassName('translations.es.name')}
                          value={form.translations.es.name}
                          aria-invalid={Boolean(getFieldError('translations.es.name'))}
                          onChange={(value) => updateRestaurantField('translations', { ...form.translations, es: { ...form.translations.es, name: value.target.value } })}
                        />
                        {fieldErrors['translations.es.name'] ? <span className={styles.errorText}>{fieldErrors['translations.es.name']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.dashboard.meta.cuisine')}>
                        <TextInput
                          className={getInputClassName('translations.es.cuisine')}
                          value={form.translations.es.cuisine}
                          aria-invalid={Boolean(getFieldError('translations.es.cuisine'))}
                          onChange={(value) => updateRestaurantField('translations', { ...form.translations, es: { ...form.translations.es, cuisine: value.target.value } })}
                        />
                        {fieldErrors['translations.es.cuisine'] ? <span className={styles.errorText}>{fieldErrors['translations.es.cuisine']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.vibe')}>
                        <TextInput
                          className={getInputClassName('translations.es.vibe')}
                          value={form.translations.es.vibe}
                          aria-invalid={Boolean(getFieldError('translations.es.vibe'))}
                          onChange={(value) => updateRestaurantField('translations', { ...form.translations, es: { ...form.translations.es, vibe: value.target.value } })}
                        />
                        {fieldErrors['translations.es.vibe'] ? <span className={styles.errorText}>{fieldErrors['translations.es.vibe']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.description')}>
                        <textarea
                          className={getInputClassName('translations.es.description', styles.textarea)}
                          value={form.translations.es.description}
                          aria-invalid={Boolean(getFieldError('translations.es.description'))}
                          onChange={(value) => updateRestaurantField('translations', { ...form.translations, es: { ...form.translations.es, description: value.target.value } })}
                        />
                        {fieldErrors['translations.es.description'] ? <span className={styles.errorText}>{fieldErrors['translations.es.description']}</span> : null}
                      </FormField>
                    </>
                  ) : null}
                  {form.type === 'tours' ? (
                    <>
                      <FormField label={t('admin.content.edit.fields.name')}>
                        <TextInput
                          className={getInputClassName('translations.es.name')}
                          value={form.translations.es.name}
                          aria-invalid={Boolean(getFieldError('translations.es.name'))}
                          onChange={(value) => updateTourField('translations', { ...form.translations, es: { ...form.translations.es, name: value.target.value } })}
                        />
                        {fieldErrors['translations.es.name'] ? <span className={styles.errorText}>{fieldErrors['translations.es.name']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.description')}>
                        <textarea
                          className={getInputClassName('translations.es.description', styles.textarea)}
                          value={form.translations.es.description}
                          aria-invalid={Boolean(getFieldError('translations.es.description'))}
                          onChange={(value) => updateTourField('translations', { ...form.translations, es: { ...form.translations.es, description: value.target.value } })}
                        />
                        {fieldErrors['translations.es.description'] ? <span className={styles.errorText}>{fieldErrors['translations.es.description']}</span> : null}
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.included')}>
                        <textarea className={styles.textareaSmall} value={form.translations.es.included} onChange={(value) => updateTourField('translations', { ...form.translations, es: { ...form.translations.es, included: value.target.value } })} />
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.whatToBring')}>
                        <textarea className={styles.textareaSmall} value={form.translations.es.whatToBring} onChange={(value) => updateTourField('translations', { ...form.translations, es: { ...form.translations.es, whatToBring: value.target.value } })} />
                      </FormField>
                      <FormField label={t('admin.content.edit.fields.operatorDescription')}>
                        <textarea className={styles.textareaSmall} value={form.translations.es.operatorDescription} onChange={(value) => updateTourField('translations', { ...form.translations, es: { ...form.translations.es, operatorDescription: value.target.value } })} />
                      </FormField>
                    </>
                  ) : null}
                </ContentPanel>
              </div>

              <ContentPanel className={styles.mediaPanel}>
                <div className={styles.mediaHeader}>
                  <div>
                    <h2 className={styles.sectionTitle}>{t('admin.content.edit.mediaTitle')}</h2>
                    <p className={styles.sectionDescription}>
                      {t('admin.content.edit.mediaSummary', {
                        count: totalMediaCount,
                        cap: MAX_SUBMISSION_IMAGES,
                      })}
                    </p>
                  </div>
                </div>

                <div className={styles.mediaGrid}>
                  <FormField label={t('admin.content.edit.actions.upload')}>
                    <input
                      ref={fileInputRef}
                      className={styles.fileInput}
                      type="file"
                      accept={SUBMISSION_IMAGE_ACCEPT}
                      multiple
                      onChange={handleFileSelection}
                    />
                  </FormField>
                  <FormField label={t('admin.content.edit.actions.addUrl')}>
                    <div className={styles.inlineField}>
                      <TextInput
                        value={draftExternalUrl}
                        onChange={(value) => setDraftExternalUrl(value.target.value)}
                        placeholder="https://"
                      />
                      <Button onClick={addExternalImageUrl}>
                        {t('admin.content.edit.actions.addMedia')}
                      </Button>
                    </div>
                  </FormField>
                </div>

                {fieldErrors.media ? <p className={styles.errorText}>{fieldErrors.media}</p> : null}
                {fieldErrors.mediaUrl ? <p className={styles.errorText}>{fieldErrors.mediaUrl}</p> : null}

                <ul className={styles.mediaList}>
                  {mediaDrafts.map((entry, index) => (
                    <li key={`${entry.kind}-${index}`}>
                      <span>
                        {entry.kind === 'pending-file'
                          ? entry.file.name
                          : entry.kind === 'external'
                            ? entry.url
                            : entry.filename}
                      </span>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removeMedia(index)}
                      >
                        {t('admin.content.edit.actions.removeMedia')}
                      </button>
                    </li>
                  ))}
                </ul>
              </ContentPanel>

              {requestError ? (
                <div className={styles.errorPanel} role="alert">
                  <p className={styles.errorText}>{requestError}</p>
                </div>
              ) : null}

              <div className={styles.actions}>
                <Button
                  type="submit"
                  variant="accent"
                  className={styles.saveButton}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending
                    ? t('admin.content.edit.saving')
                    : t('admin.content.edit.save')}
                </Button>
                <Link className={styles.secondaryLink} to="/admin/content">
                  {t('admin.content.edit.cancel')}
                </Link>
              </div>
            </form>
          </ContentPanel>
        ) : null}
      </div>
    </section>
  )
}

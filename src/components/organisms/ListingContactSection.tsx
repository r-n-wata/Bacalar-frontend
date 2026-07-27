import { useTranslation } from 'react-i18next'
import posthog from '../../services/posthog'
import type { AppLanguage } from '../../app/i18n/config'
import {
  buildContactActions,
  type ContactInfo,
  type ListingType,
} from '../../features/shared/lib/contact'
import styles from './ListingContactSection.module.scss'

type ListingContactSectionProps = {
  contact?: ContactInfo
  listingType: ListingType
  currentLanguage: AppLanguage
  eyebrow?: string
  title?: string
  description?: string
}

function ContactLink({
  href,
  label,
  className,
  external,
  onClick,
}: {
  href: string
  label: string
  className: string
  external: boolean
  onClick: () => void
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={onClick}
      {...(external
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {})}
    >
      {label}
    </a>
  )
}

export function ListingContactSection({
  contact,
  listingType,
  currentLanguage,
  eyebrow,
  title,
  description,
}: ListingContactSectionProps) {
  const { t } = useTranslation()
  const actions = buildContactActions(contact, currentLanguage)

  if (!contact) {
    return null
  }

  const primaryAction = actions.find((action) => action.key === 'whatsapp')
  const secondaryActions = actions.filter((action) => action.key !== 'whatsapp')

  const renderLabel = (key: string) => t(`common.contact.methods.${key}`)
  const handleTrack = (contactMethod: string) => {
    posthog.capture('listing_contact_clicked', {
      contact_method: contactMethod,
      listing_type: listingType,
      locale: currentLanguage,
    })
  }

  return (
    <>
      <section className={styles.section} aria-label={t('common.contact.title')}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow ?? t('common.contact.eyebrow')}</p>
          <h2 className={styles.title}>{title ?? contact.providerName}</h2>
          <p className={styles.provider}>
            {description ?? t('common.contact.provider', { providerName: contact.providerName })}
          </p>
        </div>

        <div className={styles.actions}>
          {primaryAction ? (
            <ContactLink
              href={primaryAction.href}
              label={renderLabel(primaryAction.key)}
              className={styles.primaryAction}
              external={primaryAction.external}
              onClick={() => handleTrack(primaryAction.key)}
            />
          ) : null}

          {secondaryActions.length > 0 ? (
            <div className={styles.secondaryActions}>
              {secondaryActions.map((action) => (
                <ContactLink
                  key={action.key}
                  href={action.href}
                  label={renderLabel(action.key)}
                  className={styles.secondaryAction}
                  external={action.external}
                  onClick={() => handleTrack(action.key)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <div className={styles.stickyBar} aria-label={t('common.contact.stickyLabel')}>
        {actions.map((action) => (
          <ContactLink
            key={`sticky-${action.key}`}
            href={action.href}
            label={renderLabel(action.key)}
            className={`${styles.stickyAction} ${action.key === 'whatsapp' ? styles.stickyPrimary : ''}`.trim()}
            external={action.external}
            onClick={() => handleTrack(action.key)}
          />
        ))}
      </div>
    </>
  )
}

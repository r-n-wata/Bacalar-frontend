import { useTranslation } from 'react-i18next'
import { trackCustomEvent } from '../../services/analytics'
import type { AppLanguage } from '../../app/i18n/config'
import phoneIcon from '../../assets/icons/phone.png'
import websiteIcon from '../../assets/icons/website.png'
import whatsappIcon from '../../assets/icons/whatsapp.png'
import {
  buildContactActions,
  type ContactAction,
  type ContactInfo,
  type ListingType,
} from '../../features/shared/lib/contact'
import styles from './ListingContactSection.module.scss'

type ListingContactSectionProps = {
  contact?: ContactInfo
  listingId: string
  listingType: ListingType
  listingName: string
  currentLanguage: AppLanguage
  eyebrow?: string
  title?: string
  description?: string
}

function getInitials(value: string) {
  const words = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)

  if (words.length === 0) {
    return '?'
  }

  return words.map((word) => word[0]?.toUpperCase() ?? '').join('')
}

function ContactLink({
  href,
  label,
  className,
  external,
  iconSrc,
  onClick,
}: {
  href: string
  label: string
  className: string
  external: boolean
  iconSrc?: string
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
      {iconSrc ? (
        <img
          className={styles.actionIcon}
          src={iconSrc}
          alt=""
          aria-hidden="true"
        />
      ) : null}
      {label}
    </a>
  )
}

function getActionIcon(actionKey: ContactAction['key']) {
  switch (actionKey) {
    case 'whatsapp':
      return whatsappIcon
    case 'phone':
      return phoneIcon
    case 'website':
      return websiteIcon
    default:
      return undefined
  }
}

export function ListingContactSection({
  contact,
  listingId,
  listingType,
  listingName,
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

  const payload = {
    listingId,
    listingType,
    listingName,
    providerName: contact.providerName,
    currentLanguage,
  }
  const primaryAction = actions.find((action) => action.key === 'whatsapp')
  const secondaryActions = actions.filter((action) => action.key !== 'whatsapp')
  const displayName = title?.trim() || contact.providerName
  const profileLabel = eyebrow?.trim() || t('common.contact.title')
  const initials = getInitials(displayName)

  const renderLabel = (key: string) => t(`common.contact.methods.${key}`)
  const handleTrack = (eventName: string) => {
    trackCustomEvent(eventName, payload)
  }

  return (
    <>
      <section className={styles.section} aria-label={t('common.contact.title')}>
        <div className={styles.profileCard}>
          <div className={styles.profileContent}>
            <div className={styles.profileHeader}>
              <div className={styles.avatar} aria-hidden="true">
                {initials}
              </div>
              <div className={styles.identity}>
                <p className={styles.eyebrow}>{profileLabel}</p>
                <h2 className={styles.title}>{displayName}</h2>
              </div>
            </div>

            <p className={styles.provider}>
              {description ?? t('common.contact.prompt')}
            </p>
          </div>

          {actions.length > 0 ? (
            <div className={styles.actionGroup}>
              {primaryAction ? (
                <ContactLink
                  href={primaryAction.href}
                  label={renderLabel(primaryAction.key)}
                  className={styles.primaryAction}
                  external={primaryAction.external}
                  iconSrc={getActionIcon(primaryAction.key)}
                  onClick={() => handleTrack(primaryAction.eventName)}
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
                      iconSrc={getActionIcon(action.key)}
                      onClick={() => handleTrack(action.eventName)}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {actions.length > 0 ? (
        <div className={styles.stickyBar} aria-label={t('common.contact.stickyLabel')}>
          {actions.map((action) => (
            <ContactLink
              key={`sticky-${action.key}`}
              href={action.href}
              label={renderLabel(action.key)}
              className={`${styles.stickyAction} ${action.key === 'whatsapp' ? styles.stickyPrimary : ''}`.trim()}
              external={action.external}
              iconSrc={getActionIcon(action.key)}
              onClick={() => handleTrack(action.eventName)}
            />
          ))}
        </div>
      ) : null}
    </>
  )
}

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet } from 'react-router-dom'
import { Button } from '../atoms/Button'
import styles from './AppShell.module.scss'

export function AppShell() {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const activeLanguage = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const navigation = [
    { to: '/', label: t('shell.nav.overview'), end: true },
    { to: '/events', label: t('shell.nav.events') },
    { to: '/restaurants', label: t('shell.nav.restaurants') },
    { to: '/tours', label: t('shell.nav.tours') },
  ]

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerBar}>
          <div className={styles.brandBlock}>
            <div className={styles.brandMark} aria-hidden="true">
              B
            </div>
            <div>
              <p className={styles.brandKicker}>{t('shell.brandKicker')}</p>
              <h1 className={styles.brandTitle}>{t('shell.brandTitle')}</h1>
            </div>
          </div>

          <Button
            className={styles.menuToggle}
            variant="inverse"
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className={styles.menuToggleLabel}>{t('shell.menu')}</span>
            <span className={styles.menuToggleIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </Button>
        </div>

        <div className={styles.headerMeta}>
          <p className={styles.headerSummary}>{t('shell.summary')}</p>

          <a className={styles.headerCta} href="#content">
            {t('shell.startExploring')}
          </a>
        </div>

        <div className={styles.languageRow}>
          <span className={styles.languageLabel}>{t('shell.languageLabel')}</span>
          <div className={styles.languageActions}>
            <Button
              variant={activeLanguage === 'en' ? 'chipActive' : 'chip'}
              onClick={() => void i18n.changeLanguage('en')}
            >
              EN
            </Button>
            <Button
              variant={activeLanguage === 'es' ? 'chipActive' : 'chip'}
              onClick={() => void i18n.changeLanguage('es')}
            >
              ES
            </Button>
          </div>
        </div>

        <nav
          id="primary-navigation"
          className={
            isMenuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav
          }
          aria-label="Primary"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.navLinkActive}`
                  : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main id="content" className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>{t('shell.footer')}</p>
      </footer>
    </div>
  )
}

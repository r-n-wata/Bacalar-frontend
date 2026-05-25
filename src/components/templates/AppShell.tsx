import { useTranslation } from 'react-i18next'
import { NavLink, Outlet } from 'react-router-dom'
import { Button } from '../atoms/Button'
import styles from './AppShell.module.scss'

export function AppShell() {
  const { t, i18n } = useTranslation()
  const activeLanguage = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const navigation = [
    { to: '/', label: t('shell.nav.overview'), end: true },
    { to: '/tours', label: t('shell.nav.tours') },
    { to: '/restaurants', label: t('shell.nav.restaurants') },
    { to: '/events', label: t('shell.nav.events') },
  ]
  const footerLinks = [
    { to: '/', label: t('shell.nav.overview') },
    { to: '/tours', label: t('shell.nav.tours') },
    { to: '/restaurants', label: t('shell.nav.restaurants') },
    { to: '/events', label: t('shell.nav.events') },
  ]

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerBar}>
          <h1 className={styles.brandTitle}>{t('shell.brandKicker')}</h1>

          <div className={styles.languageActions} aria-label={t('shell.languageLabel')}>
            <Button
              className={styles.languageButton}
              variant={activeLanguage === 'en' ? 'secondary' : 'inverse'}
              onClick={() => void i18n.changeLanguage('en')}
            >
              EN
            </Button>
            <Button
              className={styles.languageButton}
              variant={activeLanguage === 'es' ? 'secondary' : 'inverse'}
              onClick={() => void i18n.changeLanguage('es')}
            >
              ES
            </Button>
          </div>
        </div>

        <nav id="primary-navigation" className={styles.nav} aria-label="Primary">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
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
        <div className={styles.footerGrid}>
          <section className={styles.footerBrand}>
            <p className={styles.footerKicker}>{t('shell.brandKicker')}</p>
            <h2 className={styles.footerTitle}>{t('shell.footer.brandTitle')}</h2>
            <p className={styles.footerCopy}>{t('shell.footer.brandCopy')}</p>
          </section>

          <section className={styles.footerColumn}>
            <h3>{t('shell.footer.navTitle')}</h3>
            <div className={styles.footerLinks}>
              {footerLinks.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </section>

          <section className={styles.footerColumn}>
            <h3>{t('shell.footer.supportTitle')}</h3>
            <p>{t('shell.footer.location')}</p>
            <p>{t('shell.footer.contact')}</p>
          </section>
        </div>

        <p className={styles.footerLegal}>{t('shell.footer.legal')}</p>
      </footer>
    </div>
  )
}

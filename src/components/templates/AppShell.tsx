import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import footerLogo from '../../assets/logo-dark.svg'
import footerMobileLogo from '../../assets/logo-mobile-dark.svg'
import mobileHeaderLogo from '../../assets/logo-mobile-light.svg'
import suenoBacalarLogo from '../../assets/logo-new.svg'
import { ScrollToTop } from '../../app/router/ScrollToTop'
import { useAdminAuth } from '../../features/admin/auth/useAdminAuth'
import { Button } from '../atoms/Button'
import styles from './AppShell.module.scss'

type AppShellProps = {
  children?: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { session, logout } = useAdminAuth()
  const activeLanguage = i18n.resolvedLanguage === 'es' ? 'es' : 'en'
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false)
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

  async function handleLogout() {
    setIsAdminMenuOpen(false)
    await logout()
    navigate('/admin/login')
  }

  function closeAdminMenu() {
    setIsAdminMenuOpen(false)
  }

  async function handleLanguageChange(language: 'en' | 'es') {
    closeAdminMenu()
    await i18n.changeLanguage(language)
  }

  useEffect(() => {
    document.body.style.overflow = isAdminMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isAdminMenuOpen])

  return (
    <div className={styles.shell}>
      <ScrollToTop />
      <header className={styles.header}>
        <div className={styles.headerBar}>
          <picture>
            <source media="(max-width: 920px)" srcSet={mobileHeaderLogo} />
            <img
              className={styles.headerLogo}
              src={suenoBacalarLogo}
              alt="Sueno Bacalar"
            />
          </picture>

          <nav
            id="primary-navigation"
            className={styles.nav}
            aria-label="Primary"
          >
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
                onClick={closeAdminMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.headerActions}>
            {session ? (
              <button
                type="button"
                className={`${styles.adminLink} ${styles.desktopAdminLink}`}
                onClick={() => void handleLogout()}
                aria-label={t("shell.nav.logout")}
              >
                <svg
                  className={styles.adminIcon}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 8l-4 4 4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 12h10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{t("shell.nav.logout")}</span>
              </button>
            ) : (
              <NavLink
                to="/admin/login"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.adminLink} ${styles.desktopAdminLink} ${styles.adminLinkActive}`
                    : `${styles.adminLink} ${styles.desktopAdminLink}`
                }
                aria-label={t("shell.nav.admin")}
                onClick={closeAdminMenu}
              >
                <svg
                  className={styles.adminIcon}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 8l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 12H4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{t("shell.nav.admin")}</span>
              </NavLink>
            )}

            <div
              className={`${styles.languageActions} ${styles.desktopLanguageActions}`}
              aria-label={t("shell.languageLabel")}
            >
              <Button
                className={styles.languageButton}
                variant={activeLanguage === "en" ? "secondary" : "inverse"}
                onClick={() => void handleLanguageChange("en")}
              >
                EN
              </Button>
              <Button
                className={styles.languageButton}
                variant={activeLanguage === "es" ? "secondary" : "inverse"}
                onClick={() => void handleLanguageChange("es")}
              >
                ES
              </Button>
            </div>

            <button
              type="button"
              className={
                isAdminMenuOpen
                  ? `${styles.menuButton} ${styles.menuButtonOpen}`
                : styles.menuButton
              }
              aria-expanded={isAdminMenuOpen}
              aria-controls="primary-navigation"
              aria-label={t("shell.menu")}
              onClick={() => setIsAdminMenuOpen((current) => !current)}
            >
              <span className={styles.menuIcon} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        {isAdminMenuOpen ? (
          <div className={styles.mobileOverlay}>
            <div className={styles.mobileOverlayHeader}>
              <p className={styles.mobileOverlayTitle}>More</p>
              <button
                type="button"
                className={`${styles.menuButton} ${styles.menuButtonOpen} ${styles.mobileOverlayClose}`}
                aria-label={t("shell.menu")}
                onClick={() => setIsAdminMenuOpen(false)}
              >
                <span className={styles.menuIcon} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </button>
            </div>
            <div
              id="mobile-admin-menu"
              className={`${styles.mobileMenu} ${styles.mobileMenuOpen}`}
            >
              <div
                className={styles.mobileMenuInner}
                aria-label={t("shell.languageLabel")}
              >
                {session ? (
                  <button
                    type="button"
                    className={`${styles.adminLink} ${styles.mobileAdminLink}`}
                    onClick={() => void handleLogout()}
                    aria-label={t("shell.nav.logout")}
                  >
                    <svg
                      className={styles.adminIcon}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 8l-4 4 4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 12h10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{t("shell.nav.logout")}</span>
                  </button>
                ) : (
                  <NavLink
                    to="/admin/login"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.adminLink} ${styles.mobileAdminLink} ${styles.adminLinkActive}`
                        : `${styles.adminLink} ${styles.mobileAdminLink}`
                    }
                    aria-label={t("shell.nav.admin")}
                    onClick={closeAdminMenu}
                  >
                    <svg
                      className={styles.adminIcon}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 8l4 4-4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 12H4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{t("shell.nav.admin")}</span>
                  </NavLink>
                )}
            <div className={styles.mobileLanguageActions}>
              <Button
                className={
                  activeLanguage === "en"
                    ? `${styles.languageButton} ${styles.mobileLanguageButton} ${styles.mobileLanguageButtonActive}`
                    : `${styles.languageButton} ${styles.mobileLanguageButton}`
                }
                variant={activeLanguage === "en" ? "secondary" : "inverse"}
                onClick={() => void handleLanguageChange("en")}
              >
                EN
              </Button>
              <Button
                className={
                  activeLanguage === "es"
                    ? `${styles.languageButton} ${styles.mobileLanguageButton} ${styles.mobileLanguageButtonActive}`
                    : `${styles.languageButton} ${styles.mobileLanguageButton}`
                }
                variant={activeLanguage === "es" ? "secondary" : "inverse"}
                onClick={() => void handleLanguageChange("es")}
              >
                ES
              </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main id="content" className={styles.main}>
              {children ?? <Outlet />}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <section className={styles.footerBrand}>
            <picture>
              <source media="(max-width: 920px)" srcSet={footerMobileLogo} />
              <img
                className={styles.footerLogo}
                src={footerLogo}
                alt="Sueno Bacalar"
              />
            </picture>
            <p className={styles.footerCopy}>{t("shell.footer.brandCopy")}</p>
          </section>

          <section className={styles.footerColumn}>
            <h3>{t("shell.footer.navTitle")}</h3>
            <div className={styles.footerLinks}>
              {footerLinks.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === "/"}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </section>

          <section className={styles.footerColumn}>
            <h3>{t("shell.footer.supportTitle")}</h3>
            <p>{t("shell.footer.location")}</p>
            <p>{t("shell.footer.contact")}</p>
          </section>
        </div>

        <p className={styles.footerLegal}>{t("shell.footer.legal")}</p>
      </footer>
    </div>
  );
}

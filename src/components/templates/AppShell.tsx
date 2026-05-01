import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Button } from '../atoms/Button'
import styles from './AppShell.module.scss'

const navigation = [
  { to: '/', label: 'Overview', end: true },
  { to: '/events', label: 'Events' },
  { to: '/restaurants', label: 'Restaurants' },
  { to: '/tours', label: 'Tours' },
  { to: '/booking', label: 'Booking' },
]

export function AppShell() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerBar}>
          <div className={styles.brandBlock}>
            <div className={styles.brandMark} aria-hidden="true">
              B
            </div>
            <div>
              <p className={styles.brandKicker}>Bacalar</p>
              <h1 className={styles.brandTitle}>Plan your lagoon stay with confidence</h1>
            </div>
          </div>

          <Button
            className={styles.menuToggle}
            variant="inverse"
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className={styles.menuToggleLabel}>Menu</span>
            <span className={styles.menuToggleIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </Button>
        </div>

        <div className={styles.headerMeta}>
          <p className={styles.headerSummary}>
            Discover stays, food, tours, and timely local picks built around the
            colors and calm of Bacalar.
          </p>

          <a className={styles.headerCta} href="#content">
            Start exploring
          </a>
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
        <p>Frontend foundation aligned to the feature-based architecture.</p>
      </footer>
    </div>
  )
}

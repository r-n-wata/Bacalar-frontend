import { NavLink, Outlet } from 'react-router-dom'
import styles from './AppShell.module.scss'

const navigation = [
  { to: '/', label: 'Overview', end: true },
  { to: '/events', label: 'Events' },
  { to: '/restaurants', label: 'Restaurants' },
  { to: '/tours', label: 'Tours' },
  { to: '/booking', label: 'Booking' },
]

export function AppShell() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p className={styles.brandKicker}>Bacalar</p>
          <h2 className={styles.brandTitle}>Travel platform boilerplate</h2>
        </div>
        <nav className={styles.nav} aria-label="Primary">
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

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>Frontend foundation aligned to the feature-based architecture.</p>
      </footer>
    </div>
  )
}

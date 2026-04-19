import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const LINKS = [
  { to: '/',     label: 'top',  end: true },
  { to: '/new',  label: 'new'  },
  { to: '/ask',  label: 'ask'  },
  { to: '/show', label: 'show' },
  { to: '/jobs', label: 'jobs' },
]

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.brand}>HN</NavLink>
      <div className={styles.links}>
        {LINKS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
      <a
        href="https://news.ycombinator.com/submit"
        target="_blank"
        rel="noreferrer"
        className={styles.submit}
      >
        submit
      </a>
    </nav>
  )
}
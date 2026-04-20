import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const LINKS = [
  { to: '/',     label: 'Top',  end: true },
  { to: '/new',  label: 'New'  },
  { to: '/ask',  label: 'Ask'  },
  { to: '/show', label: 'Show' },
  { to: '/jobs', label: 'Jobs' },
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
      {/* <a
        href="https://news.ycombinator.com/submit"
        target="_blank"
        rel="noreferrer"
        className={styles.submit}
      >
        submit
      </a> */}
    </nav>
  )
}
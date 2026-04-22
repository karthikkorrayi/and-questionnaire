import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        {/* Large A lettermark — matches the uploaded logo screenshot */}
        <div className={styles.logoIcon}>
          <svg viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22 4 L40 48 M22 4 L4 48 M10 34 L34 34"
              stroke="#B8641A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoAnd}>A<em>n</em>D</span>
          <span className={styles.logoSub}>DESIGN STUDIO</span>
        </div>
      </Link>
    </header>
  )
}

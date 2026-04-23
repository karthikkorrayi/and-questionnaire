import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img
          src="/logo.png"
          alt="AnD Design Studio"
          className={styles.logoImg}
          draggable={false}
        />
      </Link>
    </header>
  )
}
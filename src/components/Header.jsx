import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header({ submissionCount = 0 }) {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoWrap}>
        <span className={styles.logoA}>A</span>
        <div className={styles.logoText}>
          <span className={styles.logoAnd}>AnD</span>
          <span className={styles.logoStudio}>Design Studio</span>
        </div>
      </Link>

      <span className={styles.headerTitle}>Discovery Questionnaire</span>

      <nav className={styles.headerNav}>
        <Link to="/submissions" className={styles.navBtn}>
          Submissions
          {submissionCount > 0 && (
            <span className={styles.badge}>{submissionCount}</span>
          )}
        </Link>
      </nav>
    </header>
  )
}

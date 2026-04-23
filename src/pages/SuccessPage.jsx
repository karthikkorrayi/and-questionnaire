import { useLocation, Link } from 'react-router-dom'
import styles from './SuccessPage.module.css'

export default function SuccessPage() {
  const { state } = useLocation()
  const firstName = (state?.name || 'there').split(' ')[0]

  return (
    <div className={styles.page}>
      {/* Minimal top bar */}
      <div className={styles.topBar}>
        <Link to="/" className={styles.homeLink}>
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4L6 9l5 5"/>
          </svg>
          Back to home
        </Link>
      </div>

      <div className={styles.content}>
        <div className={styles.ring}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="20" stroke="var(--amber)" strokeWidth="1"/>
            <path d="M13 22.5l6 6L31 15" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <p className={styles.eyebrow}>Questionnaire received</p>
        <h1 className={styles.title}>Thank you,<br />{firstName}.</h1>

        <p className={styles.body}>
          Your discovery brief has been submitted and a branded PDF
          has been downloaded to your device.
        </p>
        <p className={styles.body}>
          The AnD Studio team will review your brief and reach out
          within <strong>1–2 business days</strong>.
        </p>

        <div className={styles.divider} />
        <p className={styles.phone}>+91 93988 14073</p>

        <Link to="/" className={styles.btn}>Submit Another Response</Link>
      </div>
    </div>
  )
}

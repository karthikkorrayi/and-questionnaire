import { useLocation, Link } from 'react-router-dom'
import styles from './SuccessPage.module.css'

export default function SuccessPage() {
  const { state } = useLocation()
  const name = state?.name || 'dear client'
  const firstName = name.split(' ')[0]

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="var(--amber)" strokeWidth="1"/>
            <path d="M15 24.5l6 6L33 17" stroke="var(--amber)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <p className={styles.eyebrow}>Questionnaire received</p>

        <h1 className={styles.title}>
          Thank you,<br />{firstName}.
        </h1>

        <p className={styles.body}>
          Your discovery brief has been submitted. A branded PDF has been
          downloaded to your device, and your responses have been recorded.
        </p>

        <p className={styles.body}>
          The AnD Studio team will review your brief and reach out within
          <strong> 1–2 business days</strong>.
        </p>

        <div className={styles.rule} />

        <p className={styles.contact}>
          Questions? &nbsp;
          <a href="tel:+919398814073">+91 93988 14073</a>
        </p>

        <Link to="/" className={styles.btnPrimary}>
          Submit Another Response
        </Link>
      </div>
    </div>
  )
}

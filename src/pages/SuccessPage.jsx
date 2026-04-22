import { useLocation, Link } from 'react-router-dom'
import styles from './SuccessPage.module.css'

export default function SuccessPage() {
  const { state } = useLocation()
  const name = state?.name || 'dear client'
  const firstName = name.split(' ')[0]

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        {/* Gold checkmark */}
        <div className={styles.iconWrap}>
          <svg viewBox="0 0 48 48" fill="none" className={styles.icon}>
            <circle cx="24" cy="24" r="23" stroke="#B5924C" strokeWidth="1.5" />
            <path d="M14 24.5L20.5 31L34 17" stroke="#B5924C" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className={styles.eyebrow}>Questionnaire received</p>
        <h1 className={styles.title}>
          Thank you,<br />
          <em>{firstName}.</em>
        </h1>
        <p className={styles.body}>
          Your discovery brief has been submitted successfully. A branded PDF
          has been downloaded to your device, and your responses have been
          recorded in our system.
        </p>
        <p className={styles.body}>
          The AnD Studio team will review your brief and reach out within
          <strong> 1–2 business days</strong> to schedule your design consultation.
        </p>

        {/* Divider rule */}
        <div className={styles.rule} />

        <p className={styles.contact}>
          Questions in the meantime?{' '}
          <a href="tel:+919398814073">+91 93988 14073</a>
        </p>

        <div className={styles.actions}>
          <Link to="/submissions" className={styles.btnGhost}>
            View All Submissions
          </Link>
          <Link to="/" className={styles.btnPrimary}>
            Submit Another →
          </Link>
        </div>
      </div>

      {/* Background decoration */}
      <div className={styles.bgDecor} aria-hidden="true" />
    </div>
  )
}

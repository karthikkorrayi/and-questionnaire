import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './SuccessPage.module.css'

export default function SuccessPage() {
  const { state }  = useLocation()
  const navigate   = useNavigate()
  const firstName  = (state?.name || 'there').split(' ')[0]

  // Guard: if someone lands here directly (no state), send to home
  useEffect(() => {
    if (!state?.name) navigate('/', { replace: true })
  }, [state, navigate])

  return (
    <div className={styles.page}>
      <div className={styles.content}>

        <div className={styles.ring}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="24" stroke="var(--amber)" strokeWidth="1.2"/>
            <path d="M16 26.5l7 7L36 18" stroke="var(--amber)" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <p className={styles.eyebrow}>Brief received</p>
        <h1 className={styles.title}>Thank you,<br />{firstName}.</h1>

        <p className={styles.body}>
          We've received your discovery brief and our team will
          carefully go through every detail you've shared.
        </p>
        <p className={styles.body}>
          Expect a call or message from us within{' '}
          <strong>1–2 business days</strong> to discuss your
          vision and next steps.
        </p>

        <div className={styles.divider} />

        <p className={styles.contactLabel}>Have questions? Reach us directly</p>
        <a href="tel:+919398814073" className={styles.phone}>
          +91 93988 14073
        </a>

        <button
          className={styles.btn}
          onClick={() => navigate('/', { replace: true })}
        >
          Back to Home
        </button>

      </div>
    </div>
  )
}
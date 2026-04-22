import { useState } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Header from './components/Header'
import FormPage from './pages/FormPage'
import SuccessPage from './pages/SuccessPage'
import styles from './App.module.css'

function LandingPage() {
  return (
    <div className={styles.landing}>
      <div className={styles.landingInner}>
        <p className={styles.landingEyebrow}>AnD Design Studio &nbsp;·&nbsp; Discovery Brief</p>

        <h1 className={styles.landingHeading}>
          Let's understand<br />
          <span className={styles.landingAccent}>your home</span>
        </h1>

        <p className={styles.landingBody}>
          Before we begin designing your space, we'd love to know more about you —
          your lifestyle, your preferences, and your vision. This questionnaire takes about{' '}
          <strong>10–15 minutes</strong> and helps us create something that feels truly yours.
        </p>

        <div className={styles.landingNotice}>
          <p>
            <strong>Confidential:</strong> All responses are used exclusively for your
            project scope and are never shared with third parties.
          </p>
        </div>

        <div className={styles.landingMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaNum}>8</span>
            <span className={styles.metaLabel}>Sections</span>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={styles.metaNum}>15</span>
            <span className={styles.metaLabel}>Minutes</span>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={styles.metaNum}>∞</span>
            <span className={styles.metaLabel}>Impact</span>
          </div>
        </div>

        <Link to="/questionnaire" className={styles.landingCta}>
          Begin Questionnaire
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Subtle decorative arch line — architectural reference */}
      <div className={styles.landingDecor} aria-hidden="true">
        <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 400 Q300 40 500 400" stroke="rgba(184,100,26,0.07)" strokeWidth="1" fill="none"/>
          <path d="M60 400 Q300 0 540 400"  stroke="rgba(184,100,26,0.04)" strokeWidth="1" fill="none"/>
        </svg>
      </div>
    </div>
  )
}

export default function App() {
  const [submissions, setSubmissions] = useState([])

  const handleSubmitSuccess = (form) => {
    setSubmissions((prev) => [
      ...prev,
      { ...form, id: Date.now(), submittedAt: new Date().toISOString() },
    ])
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Header />
      <Routes>
        <Route path="/"              element={<LandingPage />} />
        <Route path="/questionnaire" element={<FormPage onSubmitSuccess={handleSubmitSuccess} />} />
        <Route path="/success"       element={<SuccessPage />} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

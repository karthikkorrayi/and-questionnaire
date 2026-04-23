import { useState } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import FormPage from './pages/FormPage'
import SuccessPage from './pages/SuccessPage'
import styles from './App.module.css'

/* ── Standalone logo used on landing only ───────────────────────────────── */
function LogoMark({ size = 48 }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Big A letterform matching the uploaded logo */}
      <path d="M24 4 L44 52" stroke="#B8641A" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M24 4 L4 52"  stroke="#B8641A" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M10 36 L38 36" stroke="#B8641A" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Landing page ────────────────────────────────────────────────────────── */
function LandingPage() {
  return (
    <div className={styles.landing}>
      <div className={styles.inner}>

        {/* Logo block — enlarged, centered */}
        <div className={styles.logoBlock}>
          <LogoMark size={56} />
          <div className={styles.logoWords}>
            <span className={styles.logoAnd}>A<em>n</em>D</span>
            <span className={styles.logoPipe}>|</span>
            <span className={styles.logoStudio}>Design Studio</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className={styles.heading}>
          Let's understand<br />
          <span className={styles.headingAccent}>your home</span>
        </h1>

        <p className={styles.body}>
          Before we begin designing your space, we'd love to know more about
          you — your lifestyle, your preferences, and your vision. This takes
          about <strong>10–15 minutes</strong> and helps us create something
          that feels truly yours.
        </p>

        {/* CTA */}
        <Link to="/questionnaire" className={styles.cta}>
          Begin Questionnaire
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </Link>

        {/* Confidential note — small, below CTA */}
        <p className={styles.conf}>
          All responses are confidential and used only for your project scope.
        </p>

      </div>

      {/* Subtle arch decoration */}
      <svg className={styles.arch} viewBox="0 0 600 500" fill="none" aria-hidden="true">
        <path d="M80 500 Q300 60 520 500"  stroke="rgba(184,100,26,0.06)" strokeWidth="1.5"/>
        <path d="M40 500 Q300 20 560 500"  stroke="rgba(184,100,26,0.035)" strokeWidth="1"/>
        <path d="M120 500 Q300 100 480 500" stroke="rgba(184,100,26,0.035)" strokeWidth="1"/>
      </svg>
    </div>
  )
}

export default function App() {
  const [submissions, setSubmissions] = useState([])

  const handleSubmitSuccess = (form) => {
    setSubmissions(p => [...p, { ...form, id: Date.now(), submittedAt: new Date().toISOString() }])
  }

  return (
    <Routes>
      <Route path="/"              element={<LandingPage />} />
      <Route path="/questionnaire" element={<FormPage onSubmitSuccess={handleSubmitSuccess} />} />
      <Route path="/success"       element={<SuccessPage />} />
      <Route path="*"              element={<Navigate to="/" replace />} />
    </Routes>
  )
}

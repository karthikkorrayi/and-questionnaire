// src/App.jsx
import { useState } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import FormPage from './pages/FormPage'
import SuccessPage from './pages/SuccessPage'
import styles from './App.module.css'

/* ── Landing page ────────────────────────────────────────────────────────── */
function LandingPage() {
  return (
    <div className={styles.landing}>
      <div className={styles.inner}>

        {/* Logo — using actual brand image */}
        <div className={styles.logoBlock}>
          <img
            src="/logo.png"
            alt="AnD Design Studio"
            className={styles.logoImg}
            draggable={false}
          />
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
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
            stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </Link>

        <p className={styles.conf}>
          All responses are confidential and used only for your project scope.
        </p>
      </div>

      {/* Subtle arch decoration */}
      <svg className={styles.arch} viewBox="0 0 600 500" fill="none" aria-hidden="true">
        <path d="M80 500 Q300 60 520 500"  stroke="rgba(74,26,26,0.06)"  strokeWidth="1.5"/>
        <path d="M40 500 Q300 20 560 500"  stroke="rgba(74,26,26,0.035)" strokeWidth="1"/>
        <path d="M120 500 Q300 100 480 500" stroke="rgba(74,26,26,0.035)" strokeWidth="1"/>
      </svg>
    </div>
  )
}

export default function App() {
  const [submissions, setSubmissions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('and_submissions') || '[]')
    } catch { return [] }
  })

  const handleSubmitSuccess = (form) => {
    setSubmissions(p => {
      const next = [
        ...p,
        { ...form, id: Date.now(), submittedAt: new Date().toISOString() }
      ]
      localStorage.setItem('and_submissions', JSON.stringify(next))
      return next
    })
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
// src/components/StepNav.jsx
import { useNavigate } from 'react-router-dom'
import { STEPS } from '../lib/schema'
import styles from './StepNav.module.css'

/* ── Themed SVG icons — one per step ─────────────────────────────────────── */
const STEP_ICONS = [
  // 0 — Personal Info — person silhouette
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="6" r="3.5"/>
    <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7"/>
  </svg>,

  // 1 — Project Overview — building / floor plan
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="16" height="11" rx="1"/>
    <path d="M5 7V5a5 5 0 0110 0v2"/>
    <path d="M8 13h4M10 11v4"/>
  </svg>,

  // 2 — Budget & Timeline — coin / currency
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="7.5"/>
    <path d="M10 6v8M8 8.5c0-.828.895-1.5 2-1.5s2 .672 2 1.5S11.105 10 10 10s-2 .672-2 1.5S8.895 13 10 13s2-.672 2-1.5"/>
  </svg>,

  // 3 — Design Preferences — diamond / gem
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 17L2 8l2.5-4h11L18 8l-8 9z"/>
    <path d="M2 8h16M7 4l-2 4 5 9M13 4l2 4-5 9"/>
  </svg>,

  // 4 — Space Requirements — sofa / room
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="9" width="14" height="6" rx="1.5"/>
    <path d="M3 12V9.5A2.5 2.5 0 015.5 7h9A2.5 2.5 0 0117 9.5V12"/>
    <path d="M5 15v2M15 15v2"/>
  </svg>,

  // 5 — Electrical & Lighting — lightbulb
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2a6 6 0 016 6c0 2.22-1.2 4.15-3 5.19V15a1 1 0 01-1 1H8a1 1 0 01-1-1v-1.81A6.001 6.001 0 0110 2z"/>
    <path d="M8 17h4M9 19h2"/>
  </svg>,

  // 6 — Assets & Priorities — layers / stack
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 10l8-5 8 5-8 5-8-5z"/>
    <path d="M2 14l8 5 8-5"/>
    <path d="M2 6l8 5 8-5"/>
  </svg>,

  // 7 — Final Details — sparkle / star
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"
    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v3M10 15v3M2 10h3M15 10h3"/>
    <path d="M4.22 4.22l2.12 2.12M13.66 13.66l2.12 2.12M4.22 15.78l2.12-2.12M13.66 6.34l2.12-2.12"/>
    <circle cx="10" cy="10" r="3"/>
  </svg>,
]

export default function StepNav({ currentStep, onStepClick, totalSteps }) {
  const navigate = useNavigate()
  const isFirst  = currentStep === 0
  const pct      = ((currentStep + 1) / totalSteps) * 100

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (isFirst) navigate('/', { replace: false })
    else onStepClick(currentStep - 1)
  }

  return (
    <div className={styles.wrap}>
      {/* ── Top bar ── */}
      <div className={styles.topBar}>

        <button
          className={styles.backBtn}
          onClick={handleBack}
          aria-label={isFirst ? 'Back to home' : 'Previous step'}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
            stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4L6 9l5 5"/>
          </svg>
        </button>

        {/* Center — icon + section name */}
        <div className={styles.centerInfo}>
          <span className={styles.stepIcon} aria-hidden="true">
            {STEP_ICONS[currentStep]}
          </span>
          <span className={styles.stepName}>{STEPS[currentStep]}</span>
        </div>

        {/* Step count */}
        <div className={styles.stepCount}>
          <span className={styles.stepCurrent}>{currentStep + 1}</span>
          <span className={styles.stepSep}>/</span>
          <span className={styles.stepTotal}>{totalSteps}</span>
        </div>

      </div>

      {/* ── Progress bar ── */}
      <div className={styles.progressTrack}
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemax={totalSteps}>
        <div className={styles.progressFill} style={{ width: `${pct}%` }} />
      </div>

      {/* ── Dot indicators ── */}
      <div className={styles.dotsRow}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <button
            key={i}
            className={`${styles.dot}
              ${i === currentStep ? styles.dotActive : ''}
              ${i < currentStep  ? styles.dotDone   : ''}`}
            onClick={() => onStepClick(i)}
            aria-label={`Go to step ${i + 1}: ${STEPS[i]}`}
          />
        ))}
      </div>
    </div>
  )
}
import { useNavigate } from 'react-router-dom'
import { STEPS } from '../lib/schema'
import styles from './StepNav.module.css'

const STEP_ICONS = ['👤','🏠','💰','🎨','🛋️','💡','📦','✨']

export default function StepNav({ currentStep, onStepClick, totalSteps }) {
  const navigate = useNavigate()
  const isFirst  = currentStep === 0
  const pct      = ((currentStep + 1) / totalSteps) * 100

  const handleBack = () => {
    if (isFirst) navigate('/')
    else onStepClick(currentStep - 1)
  }

  return (
    <div className={styles.wrap}>
      {/* ── Top bar: back | section name | step count ── */}
      <div className={styles.topBar}>

        {/* Back arrow */}
        <button
          className={styles.backBtn}
          onClick={handleBack}
          aria-label={isFirst ? 'Back to home' : 'Previous step'}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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

        {/* Right — step count */}
        <div className={styles.stepCount}>
          <span className={styles.stepCurrent}>{currentStep + 1}</span>
          <span className={styles.stepSep}>/</span>
          <span className={styles.stepTotal}>{totalSteps}</span>
        </div>

      </div>

      {/* ── Progress bar ── */}
      <div className={styles.progressTrack} role="progressbar" aria-valuenow={currentStep+1} aria-valuemax={totalSteps}>
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

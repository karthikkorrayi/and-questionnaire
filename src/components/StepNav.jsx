import { STEPS } from '../lib/schema'
import styles from './StepNav.module.css'

export default function StepNav({ currentStep, onStepClick }) {
  const progress = ((currentStep + 1) / STEPS.length) * 100

  return (
    <>
      {/* Progress bar */}
      <div className={styles.progressWrap}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={currentStep + 1}
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
          />
        </div>
        <span className={styles.progressLabel}>
          {currentStep + 1} / {STEPS.length}
        </span>
      </div>

      {/* Step tabs */}
      <nav className={styles.stepsNav} aria-label="Form steps">
        {STEPS.map((step, i) => (
          <button
            key={i}
            className={`${styles.stepTab}
              ${i === currentStep ? styles.active : ''}
              ${i < currentStep ? styles.done : ''}
              ${i > currentStep ? styles.upcoming : ''}`}
            onClick={() => onStepClick(i)}
            aria-current={i === currentStep ? 'step' : undefined}
          >
            {i < currentStep && <span className={styles.checkMark}>✓ </span>}
            {step}
          </button>
        ))}
      </nav>
    </>
  )
}

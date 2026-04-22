import { STEPS } from '../lib/schema'
import styles from './StepNav.module.css'

export default function StepNav({ currentStep, onStepClick }) {
  const progress = ((currentStep + 1) / STEPS.length) * 100

  return (
    <div className={styles.wrap}>
      {/* Thin amber progress line */}
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

      {/* Step counter + dot nav */}
      <div className={styles.stepRow}>
        <span className={styles.stepCounter}>
          {currentStep + 1} <span className={styles.stepOf}>/ {STEPS.length}</span>
        </span>

        <div className={styles.dots} aria-label="Form progress">
          {STEPS.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot}
                ${i === currentStep ? styles.dotActive : ''}
                ${i < currentStep ? styles.dotDone : ''}`}
              onClick={() => onStepClick(i)}
              aria-label={`Step ${i + 1}: ${STEPS[i]}`}
            />
          ))}
        </div>

        <span className={styles.stepName}>{STEPS[currentStep]}</span>
      </div>
    </div>
  )
}

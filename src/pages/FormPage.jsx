import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepNav from '../components/StepNav'
import { STEPS, STEP_DESCRIPTIONS, EMPTY_FORM } from '../lib/schema'
import { downloadPDF } from '../lib/pdfGenerator'
import {
  Step0, Step1, Step2, Step3,
  Step4, Step5, Step6, Step7,
} from './FormSteps'
import styles from './FormPage.module.css'

const STEP_COMPONENTS = [Step0, Step1, Step2, Step3, Step4, Step5, Step6, Step7]

export default function FormPage({ onSubmitSuccess }) {
  const navigate = useNavigate()
  const [step, setStep]         = useState(0)
  const [form, setForm]         = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]       = useState(null)

  const set = (name, val) => setForm((f) => ({ ...f, [name]: val }))

  const goTo = (i) => {
    setStep(i)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const next = () => goTo(Math.min(step + 1, STEPS.length - 1))
  const prev = () => goTo(Math.max(step - 1, 0))

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)

    try {
      // 1 — POST to Vercel serverless function → Google Sheets
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Server error ${res.status}`)
      }

      // 2 — Generate + download branded PDF
      await downloadPDF(form)

      // 3 — Notify parent, navigate to success
      onSubmitSuccess(form)
      navigate('/success', { state: { name: form.fullName } })
    } catch (err) {
      console.error('Submit error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const StepComponent = STEP_COMPONENTS[step]
  const isLast = step === STEPS.length - 1

  return (
    <div className={styles.wrap}>
      <StepNav currentStep={step} onStepClick={goTo} />

      <main className={styles.main}>
        {/* Section header */}
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Step {step + 1} of {STEPS.length}</span>
          <h1 className={styles.title}>{STEPS[step]}</h1>
          <p className={styles.desc}>{STEP_DESCRIPTIONS[step]}</p>
        </div>

        {/* Step content — re-mounts on step change for animation */}
        <div key={step} className={styles.stepContent}>
          <StepComponent form={form} set={set} />
        </div>

        {/* Error */}
        {error && (
          <div className={styles.errorBanner}>
            <span>⚠</span> {error}
          </div>
        )}

        {/* Navigation */}
        <div className={styles.navRow}>
          <button
            className={styles.btnGhost}
            onClick={prev}
            disabled={step === 0}
            type="button"
          >
            ← Previous
          </button>

          <div className={styles.navRight}>
            {/* Save progress hint */}
            <span className={styles.saveHint}>
              {step > 0 && `${step} of ${STEPS.length - 1} steps complete`}
            </span>

            {isLast ? (
              <button
                className={styles.btnGold}
                onClick={handleSubmit}
                disabled={submitting}
                type="button"
              >
                {submitting ? (
                  <span className={styles.spinner}>
                    <span className={styles.spinnerDot} /> Submitting…
                  </span>
                ) : (
                  'Submit Questionnaire →'
                )}
              </button>
            ) : (
              <button
                className={styles.btnPrimary}
                onClick={next}
                type="button"
              >
                Continue →
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

import { useState, useRef } from 'react'
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
  const [step, setStep]             = useState(0)
  const [direction, setDirection]   = useState('forward')
  const [form, setForm]             = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]           = useState(null)
  const sliderRef = useRef(null)

  const set = (name, val) => setForm((f) => ({ ...f, [name]: val }))

  const goTo = (i) => {
    setDirection(i > step ? 'forward' : 'back')
    setStep(i)
    if (sliderRef.current) sliderRef.current.scrollTop = 0
  }

  const next = () => { if (step < STEPS.length - 1) goTo(step + 1) }
  const prev = () => { if (step > 0) goTo(step - 1) }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      // Call backend — falls back gracefully in local dev (no /api folder)
      try {
        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ form }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || `Server error ${res.status}`)
      } catch (apiErr) {
        // In local dev (npm run dev) /api/submit returns 404 because
        // Vercel functions don't run. Use `vercel dev` locally instead.
        // On production this will always work.
        if (apiErr.message.includes('404')) {
          console.warn('Local dev: /api/submit not found. Run `vercel dev` to test locally.')
          // Don't block the user in dev — still show success
        } else {
          throw apiErr
        }
      }

      // Generate + download branded PDF
      await downloadPDF(form)

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
  const isFirst = step === 0
  const animClass = direction === 'forward' ? styles.slideInRight : styles.slideInLeft

  return (
    <div className={styles.wrap}>
      <StepNav currentStep={step} onStepClick={goTo} />

      <main className={styles.main} ref={sliderRef}>
        {/* Section header */}
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>
            {step + 1} &nbsp;/&nbsp; {STEPS.length} &nbsp;—&nbsp; {STEPS[step]}
          </p>
          <h1 className={styles.title}>{STEPS[step]}</h1>
          <p className={styles.desc}>{STEP_DESCRIPTIONS[step]}</p>
        </div>

        {/* Animated step content */}
        <div key={step} className={`${styles.stepContent} ${animClass}`}>
          <StepComponent form={form} set={set} />
        </div>

        {/* Error message */}
        {error && (
          <div className={styles.errorBox} role="alert">
            <span className={styles.errorIcon}>!</span>
            <span>{error}</span>
          </div>
        )}

        {/* Navigation */}
        <div className={styles.navRow}>
          <button
            className={styles.btnPrev}
            onClick={prev}
            disabled={isFirst}
            type="button"
            aria-label="Previous step"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back</span>
          </button>

          <div className={styles.navRight}>
            <span className={styles.stepHint}>
              {step > 0 && !isLast && `${STEPS.length - step - 1} step${STEPS.length - step - 1 !== 1 ? 's' : ''} remaining`}
            </span>

            {isLast ? (
              <button
                className={styles.btnSubmit}
                onClick={handleSubmit}
                disabled={submitting}
                type="button"
              >
                {submitting ? (
                  <>
                    <svg className={styles.spinner} width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="10"/>
                    </svg>
                    Submitting
                  </>
                ) : (
                  <>
                    Submit
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            ) : (
              <button
                className={styles.btnNext}
                onClick={next}
                type="button"
              >
                Continue
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

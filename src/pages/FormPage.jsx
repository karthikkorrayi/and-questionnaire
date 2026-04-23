import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import StepNav from '../components/StepNav'
import { STEPS, STEP_DESCRIPTIONS, EMPTY_FORM } from '../lib/schema'
import { downloadPDF } from '../lib/pdfGenerator'
import { Step0, Step1, Step2, Step3, Step4, Step5, Step6, Step7 } from './FormSteps'
import styles from './FormPage.module.css'

const STEP_COMPONENTS = [Step0, Step1, Step2, Step3, Step4, Step5, Step6, Step7]

export default function FormPage({ onSubmitSuccess }) {
  const navigate    = useNavigate()
  const scrollRef   = useRef(null)
  const [step, setStep]         = useState(0)
  const [dir,  setDir]          = useState('fwd')
  const [form, setForm]         = useState(EMPTY_FORM)
  const [submitting, setSub]    = useState(false)
  const [error, setError]       = useState(null)

  const set = (name, val) => setForm(f => ({ ...f, [name]: val }))

  const goTo = (i) => {
    setDir(i > step ? 'fwd' : 'bck')
    setStep(i)
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }

  const next = () => { if (step < STEPS.length - 1) goTo(step + 1) }

  const handleSubmit = async () => {
    setSub(true); setError(null)
    try {
      try {
        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ form }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || `Server error ${res.status}`)
      } catch (apiErr) {
        // 404 = running `npm run dev` without Vercel — expected locally
        if (!apiErr.message.includes('404')) throw apiErr
        console.warn('Local dev: run `vercel dev` to test the API.')
      }
      await downloadPDF(form)
      onSubmitSuccess(form)
      navigate('/success', { state: { name: form.fullName } })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSub(false)
    }
  }

  const isLast = step === STEPS.length - 1
  const StepComponent = STEP_COMPONENTS[step]
  const animClass = dir === 'fwd' ? styles.animFwd : styles.animBck

  // Next button label changes per step
  const nextLabels = [
    'Personal Info →',
    'Project Details →',
    'Budget & Timeline →',
    'Design Preferences →',
    'Space Requirements →',
    'Electrical & Lighting →',
    'Assets & Priorities →',
    'Review & Submit',
  ]

  return (
    <div className={styles.shell}>
      {/* Sticky top nav */}
      <StepNav
        currentStep={step}
        onStepClick={goTo}
        totalSteps={STEPS.length}
      />

      {/* Scrollable content */}
      <div className={styles.scrollArea} ref={scrollRef}>
        <div className={styles.contentWrap}>

          {/* Step heading — clean, no duplicate section name */}
          <div className={styles.stepHead}>
            <p className={styles.stepDesc}>{STEP_DESCRIPTIONS[step]}</p>
          </div>

          {/* Animated step */}
          <div key={step} className={`${styles.stepContent} ${animClass}`}>
            <StepComponent form={form} set={set} />
          </div>

          {/* Error */}
          {error && (
            <div className={styles.errorBox} role="alert">
              <span className={styles.errIcon}>!</span>
              <span>{error}</span>
            </div>
          )}

          {/* Bottom spacer so content clears the fixed footer */}
          <div style={{ height: 'calc(var(--bottombar-h) + 16px)' }} />
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          {isLast ? (
            <button
              className={styles.btnSubmit}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <svg className={styles.spinner} width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="10"/>
                  </svg>
                  Submitting…
                </>
              ) : (
                <>
                  Submit Questionnaire
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </>
              )}
            </button>
          ) : (
            <button className={styles.btnNext} onClick={next}>
              {nextLabels[step]}
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

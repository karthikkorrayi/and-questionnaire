import styles from './FormControls.module.css'

/* ── CheckGroup ─────────────────────────────────────────────────────────── */
export function CheckGroup({ name, options, value = [], onChange }) {
  const toggle = (opt) => {
    const next = value.includes(opt)
      ? value.filter(v => v !== opt)
      : [...value, opt]
    onChange(name, next)
  }
  return (
    <div className={styles.chipGroup}>
      {options.map(opt => {
        const on = value.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            className={`${styles.chip} ${on ? styles.chipOn : styles.chipOff}`}
            onClick={() => toggle(opt)}
            aria-pressed={on}
          >
            {on && (
              <svg className={styles.chipCheck} width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6.5l3 3 5-5"/>
              </svg>
            )}
            {opt}
          </button>
        )
      })}
    </div>
  )
}

/* ── RadioGroup ─────────────────────────────────────────────────────────── */
export function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className={styles.radioGroup} role="radiogroup">
      {options.map(opt => {
        const on = value === opt
        return (
          <button
            key={opt}
            type="button"
            className={`${styles.radio} ${on ? styles.radioOn : styles.radioOff}`}
            onClick={() => onChange(name, opt)}
            role="radio"
            aria-checked={on}
          >
            <span className={`${styles.radioRing} ${on ? styles.radioRingOn : ''}`} aria-hidden="true">
              {on && <span className={styles.radioDot} />}
            </span>
            {opt}
          </button>
        )
      })}
    </div>
  )
}

/* ── YesNo ──────────────────────────────────────────────────────────────── */
export function YesNo({ name, value, onChange, label }) {
  return (
    <div className={styles.ynRow}>
      <p className={styles.ynLabel}>{label}</p>
      <div className={styles.ynGroup}>
        <button
          type="button"
          className={`${styles.ynBtn} ${value === 'Yes' ? styles.ynYes : styles.ynOff}`}
          onClick={() => onChange(name, 'Yes')}
        >
          {value === 'Yes' && (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6.5l3 3 5-5"/>
            </svg>
          )}
          Yes
        </button>
        <button
          type="button"
          className={`${styles.ynBtn} ${value === 'No' ? styles.ynNo : styles.ynOff}`}
          onClick={() => onChange(name, 'No')}
        >
          No
        </button>
      </div>
    </div>
  )
}

/* ── Field ──────────────────────────────────────────────────────────────── */
export function Field({ label, name, type = 'text', placeholder, value, onChange, textarea, required }) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={name} className={styles.fieldLabel}>
          {label}
          {required && <span className={styles.req}> *</span>}
        </label>
      )}
      {textarea
        ? <textarea id={name} name={name} value={value||''} placeholder={placeholder}
            onChange={e => onChange(name, e.target.value)} className={styles.textarea} rows={3}/>
        : <input id={name} type={type} name={name} value={value||''} placeholder={placeholder}
            onChange={e => onChange(name, e.target.value)} className={styles.input} required={required}/>
      }
    </div>
  )
}

/* ── FieldRow ────────────────────────────────────────────────────────────── */
export function FieldRow({ children }) {
  return <div className={styles.fieldRow}>{children}</div>
}

/* ── Card ────────────────────────────────────────────────────────────────── */
export function Card({ label, children }) {
  return (
    <div className={styles.card}>
      {label && (
        <div className={styles.cardHead}>
          <span className={styles.cardDot} aria-hidden="true"/>
          <span className={styles.cardLabel}>{label}</span>
        </div>
      )}
      <div className={styles.cardBody}>{children}</div>
    </div>
  )
}

/* ── SubLabel ────────────────────────────────────────────────────────────── */
export function SubLabel({ children }) {
  return <p className={styles.subLabel}>{children}</p>
}

/* ── Divider ─────────────────────────────────────────────────────────────── */
export function Divider() {
  return <hr className={styles.divider}/>
}

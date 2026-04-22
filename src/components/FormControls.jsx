import styles from './FormControls.module.css'

/* ─── CheckGroup (multi-select chips) ─────────────────────────────────────── */
export function CheckGroup({ name, options, value = [], onChange }) {
  const toggle = (opt) => {
    const next = value.includes(opt)
      ? value.filter((v) => v !== opt)
      : [...value, opt]
    onChange(name, next)
  }
  return (
    <div className={styles.chipGroup}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`${styles.chip} ${value.includes(opt) ? styles.chipOn : ''}`}
          onClick={() => toggle(opt)}
          aria-pressed={value.includes(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

/* ─── RadioGroup (single-select) ──────────────────────────────────────────── */
export function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className={styles.radioGroup} role="radiogroup">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`${styles.radioChip} ${value === opt ? styles.radioOn : ''}`}
          onClick={() => onChange(name, opt)}
          aria-checked={value === opt}
          role="radio"
        >
          <span className={styles.radioIndicator} aria-hidden="true" />
          {opt}
        </button>
      ))}
    </div>
  )
}

/* ─── YesNo ───────────────────────────────────────────────────────────────── */
export function YesNo({ name, value, onChange, label }) {
  return (
    <div className={styles.yesnoWrap}>
      <p className={styles.yesnoLabel}>{label}</p>
      <div className={styles.yesnoGroup}>
        <button
          type="button"
          className={`${styles.yesnoBtn} ${value === 'Yes' ? styles.yesOn : ''}`}
          onClick={() => onChange(name, 'Yes')}
        >Yes</button>
        <button
          type="button"
          className={`${styles.yesnoBtn} ${value === 'No' ? styles.noOn : ''}`}
          onClick={() => onChange(name, 'No')}
        >No</button>
      </div>
    </div>
  )
}

/* ─── Field ───────────────────────────────────────────────────────────────── */
export function Field({ label, name, type = 'text', placeholder, value, onChange, textarea, required }) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={name} className={styles.fieldLabel}>
          {label}
          {required && <span className={styles.req} aria-hidden="true"> *</span>}
        </label>
      )}
      {textarea ? (
        <textarea
          id={name} name={name}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(name, e.target.value)}
          className={styles.textarea}
          rows={3}
        />
      ) : (
        <input
          id={name} type={type} name={name}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(name, e.target.value)}
          className={styles.input}
          required={required}
        />
      )}
    </div>
  )
}

/* ─── FieldRow ────────────────────────────────────────────────────────────── */
export function FieldRow({ children }) {
  return <div className={styles.fieldRow}>{children}</div>
}

/* ─── Card ────────────────────────────────────────────────────────────────── */
export function Card({ label, children }) {
  return (
    <div className={styles.card}>
      {label && (
        <div className={styles.cardHeader}>
          <span className={styles.cardDot} aria-hidden="true" />
          <span className={styles.cardLabel}>{label}</span>
        </div>
      )}
      <div className={styles.cardBody}>{children}</div>
    </div>
  )
}

/* ─── SubLabel ────────────────────────────────────────────────────────────── */
export function SubLabel({ children }) {
  return <p className={styles.subLabel}>{children}</p>
}

/* ─── Divider ─────────────────────────────────────────────────────────────── */
export function Divider() {
  return <hr className={styles.divider} />
}

import styles from './FormControls.module.css'

/* ─── CheckGroup ─────────────────────────────────────────────────────────── */
export function CheckGroup({ name, options, value = [], onChange }) {
  const toggle = (opt) => {
    const next = value.includes(opt)
      ? value.filter((v) => v !== opt)
      : [...value, opt]
    onChange(name, next)
  }
  return (
    <div className={styles.checkGroup}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`${styles.checkItem} ${value.includes(opt) ? styles.selected : ''}`}
          onClick={() => toggle(opt)}
          aria-pressed={value.includes(opt)}
        >
          <span className={styles.checkBox} aria-hidden="true" />
          <span className={styles.checkLabel}>{opt}</span>
        </button>
      ))}
    </div>
  )
}

/* ─── RadioGroup ─────────────────────────────────────────────────────────── */
export function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className={styles.radioGroup} role="radiogroup">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`${styles.radioItem} ${value === opt ? styles.selected : ''}`}
          onClick={() => onChange(name, opt)}
          aria-checked={value === opt}
          role="radio"
        >
          <span className={styles.radioDot} aria-hidden="true" />
          <span className={styles.radioLabel}>{opt}</span>
        </button>
      ))}
    </div>
  )
}

/* ─── Field ──────────────────────────────────────────────────────────────── */
export function Field({
  label, name, type = 'text', placeholder,
  value, onChange, textarea, required,
}) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={name} className={styles.fieldLabel}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
      )}
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(name, e.target.value)}
          className={styles.textarea}
          rows={3}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
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

/* ─── FieldRow ───────────────────────────────────────────────────────────── */
export function FieldRow({ children }) {
  return <div className={styles.fieldRow}>{children}</div>
}

/* ─── Card ───────────────────────────────────────────────────────────────── */
export function Card({ label, children }) {
  return (
    <div className={styles.card}>
      {label && <span className={styles.cardLabel}>{label}</span>}
      <div className={styles.cardBody}>{children}</div>
    </div>
  )
}

/* ─── SubLabel ───────────────────────────────────────────────────────────── */
export function SubLabel({ children }) {
  return <p className={styles.subLabel}>{children}</p>
}

/* ─── Divider ────────────────────────────────────────────────────────────── */
export function Divider() {
  return <hr className={styles.divider} />
}

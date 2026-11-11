import styles from './ResearchSymbol.module.css'

// A subject-neutral data sheet and inspection lens, not a result or trend.
// Reuse beside any study title. The adjacent title supplies its accessible name.
export default function ResearchSymbol({ compact = false }) {
  return <svg className={`${styles.symbol}${compact ? ` ${styles.compact}` : ''}`} data-research-symbol="inquiry" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <rect data-symbol-part="sheet" className={styles.sheet} x="6" y="5" width="39" height="49" rx="7" />
    <path data-symbol-part="heading" className={styles.heading} d="M15 16H35" fill="none" strokeWidth="4" strokeLinecap="round" />
    <path data-symbol-part="notes" className={styles.notes} d="M15 25H25M15 33H21M15 41H21" fill="none" strokeWidth="2.2" strokeLinecap="round" />
    <path data-symbol-part="handle" className={styles.handle} d="M47 47L58 58" fill="none" strokeWidth="8" strokeLinecap="round" />
    <circle data-symbol-part="lens" className={styles.lens} cx="39" cy="36" r="14" />
    <circle data-symbol-part="data-point" className={styles.data} cx="34" cy="32" r="2.7" />
    <circle data-symbol-part="data-point" className={styles.data} cx="43" cy="32" r="2.7" />
    <circle data-symbol-part="data-point" className={styles.data} cx="34" cy="41" r="2.7" />
    <circle data-symbol-part="data-point" className={styles.highlight} cx="43" cy="41" r="2.7" />
  </svg>
}

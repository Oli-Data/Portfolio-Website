import ProductSymbol from './ProductSymbol'
import styles from './LuzBrand.module.css'

// Exact Clash Display Regular 400 outlines, not generated lettering.
// Regular keeps the open, light character readable at compact card sizes.
export default function LuzBrand({ compact = false }) {
  return <span className={`${styles.brand}${compact ? ` ${styles.compact}` : ''}`} data-luz-brand={compact ? 'compact' : 'full'}>
    <ProductSymbol product="luz" compact={compact} />
    <svg className={styles.wordmark} viewBox="36 -694 1697 728" role="img" aria-label="Luz" focusable="false">
      <path fill="currentColor" d="M556 0H60V-670H131V-65H556Z" />
      <path fill="currentColor" d="M843 10Q742 10 687.5 -51.0Q633 -112 633 -205V-494H704V-216Q704 -54 868 -54Q958 -54 1005.0 -106.0Q1052 -158 1052 -254V-494H1123V0H1059V-154H1054Q1040 -85 985.0 -37.5Q930 10 843 10Z" />
      <path fill="currentColor" d="M1709 0H1208V-62L1494 -335L1598 -427V-432L1494 -430H1223V-494H1694V-431L1389 -143L1300 -66V-61L1389 -63H1709Z" />
    </svg>
  </span>
}

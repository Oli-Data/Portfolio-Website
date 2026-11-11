import styles from './ProductSymbol.module.css'


// Small, colored vectors echo the approved product concepts. Separate shape
// layers keep details crisp without gradients, filters or shared SVG IDs. The
// adjacent exact wordmark supplies the accessible product name.
export default function ProductSymbol({ product, compact = false }) {
  return <svg className={`${styles.symbol}${compact ? ` ${styles.compact}` : ''}`} data-product-symbol={product} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true" focusable="false">
    {product === 'night-owl' && <>
      <path data-symbol-part="face" className={styles.owlFace} d="M8.5 13C14 16.5 18 17 23 15Q32 12.5 41 15C46 17 50 16.5 55.5 13L54 23C59.5 30 59.5 41 51 49C45 54.5 37.5 58 32 59C26.5 58 19 54.5 13 49C4.5 41 4.5 30 10 23Z" />
      <path data-symbol-part="brow" className={styles.owlBrow} d="M16 20Q23 17 32 18Q41 17 48 20Q39 19 32 23Q25 19 16 20Z" />
      <path data-symbol-part="eye-left" className={styles.owlGold} d="M18 23C9.5 22 8 32.5 13.5 40.5C17.5 46 24 47 28.5 42C28 34 25.5 25 18 23Z" />
      <path data-symbol-part="eye-right" className={styles.owlGold} d="M18 23C9.5 22 8 32.5 13.5 40.5C17.5 46 24 47 28.5 42C28 34 25.5 25 18 23Z" transform="translate(64 0) scale(-1 1)" />
      <circle data-symbol-part="pupil" className={styles.owlPupil} cx="20" cy="35" r="4.6" />
      <circle data-symbol-part="pupil" className={styles.owlPupil} cx="44" cy="35" r="4.6" />
      <path data-symbol-part="beak" className={styles.owlGold} d="M28 44Q32 41 36 44L32 53Z" />
    </>}
    {product === 'lumitudy' && <>
      {/* Curved roots tuck beneath the hub without crossing adjacent outlines. */}
      <g className={styles.flowerPetals}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => <path key={angle} data-symbol-part="petal" d="M29 25C29 21.5 26.5 19.2 26.5 15.5V9.5C26.5 2.2 37.5 2.2 37.5 9.5V15.5C37.5 19.2 35 21.5 35 25Z" transform={`rotate(${angle} 32 32)`} />)}
      </g>
      <circle data-symbol-part="flower-hub" className={styles.flowerHub} cx="32" cy="32" r="10.5" />
      <circle data-symbol-part="flower-center" className={styles.flowerCenter} cx="32" cy="32" r="7.2" />
    </>}
    {product === 'selah' && <>
      <g className={styles.selahFlames}>
        <path data-symbol-part="leaf-top" d="M32 3C33.5 10 40 15.5 37.5 22C36.5 25.5 33.5 27.5 32 30C30 26.5 26 24.5 26 20C25.5 13 32 10.5 32 3Z" />
        <path data-symbol-part="leaf-upper-left" d="M13 16C14.5 23 24.5 23.5 25 31.5L25 37.5C21 33 13 34.5 10.5 27C9 22.5 11.5 18 13 16Z" />
        <path data-symbol-part="leaf-upper-right" d="M13 16C14.5 23 24.5 23.5 25 31.5L25 37.5C21 33 13 34.5 10.5 27C9 22.5 11.5 18 13 16Z" transform="translate(64 0) scale(-1 1)" />
        <path data-symbol-part="leaf-lower-left" d="M4 35C9 41.5 20.5 37 24.5 46.5L25 50.5C20 47 10 51 5.5 44C3.5 41 3.5 38 4 35Z" />
        <path data-symbol-part="leaf-lower-right" d="M4 35C9 41.5 20.5 37 24.5 46.5L25 50.5C20 47 10 51 5.5 44C3.5 41 3.5 38 4 35Z" transform="translate(64 0) scale(-1 1)" />
      </g>
      <path data-symbol-part="branches" className={styles.selahBranches} d="M32 33V61M32 46Q30 41 24 37M32 46Q34 41 40 37M32 57Q30 52 24 49M32 57Q34 52 40 49" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </>}
    {product === 'luz' && <>
      <circle data-symbol-part="orb" className={styles.luzOrb} cx="32" cy="32" r="28" />
      <path data-symbol-part="ribbon" className={styles.luzRibbon} d="M8 44C16 24 45 41 57 20C55 37 27 36 16 51" fill="none" strokeWidth="1.4" strokeLinecap="round" />
      <circle data-symbol-part="rim" className={styles.luzRim} cx="32" cy="32" r="28" fill="none" strokeWidth="1.4" />
      <g className={styles.luzStars}>
        <path data-symbol-part="star-center" d="M32 17C33.1 28.6 34.4 29.9 46 31C34.4 32.1 33.1 33.4 32 45C30.9 33.4 29.6 32.1 18 31C29.6 29.9 30.9 28.6 32 17Z" />
        <path data-symbol-part="star-upper" d="M45 12C45.4 17.1 45.9 17.6 51 18C45.9 18.4 45.4 18.9 45 24C44.6 18.9 44.1 18.4 39 18C44.1 17.6 44.6 17.1 45 12Z" />
        <path data-symbol-part="star-lower" d="M20 40C20.3 44.1 20.9 44.7 25 45C20.9 45.3 20.3 45.9 20 50C19.7 45.9 19.1 45.3 15 45C19.1 44.7 19.7 44.1 20 40Z" />
        <circle cx="19" cy="19" r="1" /><circle cx="46" cy="43" r="1" />
      </g>
    </>}
  </svg>
}

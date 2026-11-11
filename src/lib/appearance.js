// Calendar colors are a local display preference, not a remote service.
export const monthlyPalettes = [
  { month: 'January', name: 'Silver mist', hue: 210, secondary: 180, saturation: 32 },
  { month: 'February', name: 'Honey light', hue: 43, secondary: 20, saturation: 74 },
  { month: 'March', name: 'Mint current', hue: 157, secondary: 194, saturation: 56 },
  { month: 'April', name: 'Rose glass', hue: 334, secondary: 277, saturation: 62 },
  { month: 'May', name: 'Fresh canopy', hue: 106, secondary: 161, saturation: 49 },
  { month: 'June', name: 'Lavender haze', hue: 263, secondary: 316, saturation: 58 },
  { month: 'July', name: 'Blue horizon', hue: 202, secondary: 166, saturation: 74 },
  { month: 'August', name: 'Lagoon', hue: 181, secondary: 139, saturation: 65 },
  { month: 'September', name: 'Violet dusk', hue: 279, secondary: 223, saturation: 57 },
  { month: 'October', name: 'Amber glow', hue: 28, secondary: 54, saturation: 74 },
  { month: 'November', name: 'Azure tide', hue: 219, secondary: 179, saturation: 65 },
  { month: 'December', name: 'Winter rose', hue: 350, secondary: 294, saturation: 58 },
]

export function monthlyPalette(date = new Date()) {
  // getMonth deliberately follows the visitor's local calendar, including the
  // December/January boundary. No UTC conversion or stored month can go stale.
  return monthlyPalettes[date.getMonth()]
}

export function applyMonthlyPalette(date = new Date()) {
  const palette = monthlyPalette(date)
  const root = document.documentElement
  root.dataset.month = String(date.getMonth() + 1)
  root.style.setProperty('--month-hue', String(palette.hue))
  root.style.setProperty('--month-secondary', String(palette.secondary))
  root.style.setProperty('--month-saturation', `${palette.saturation}%`)
}

// Resolve both month and appearance before paint. Storage failure must not
// prevent the monthly palette or the operating-system fallback from working.
export const appearanceInitScript = `(function(){var r=document.documentElement,m=new Date().getMonth(),p=${JSON.stringify(monthlyPalettes.map(({ hue, secondary, saturation }) => [hue, secondary, saturation]))}[m];r.dataset.month=String(m+1);r.style.setProperty('--month-hue',String(p[0]));r.style.setProperty('--month-secondary',String(p[1]));r.style.setProperty('--month-saturation',p[2]+'%');var t;try{t=localStorage.getItem('portfolio-appearance')}catch(e){}r.dataset.theme=t==='day'||t==='night'?t:matchMedia('(prefers-color-scheme: dark)').matches?'night':'day'})()`
const key = 'portfolio-appearance'
let fallbackPreference = 'system'
let volatilePreference = null
export function readPreference() {
  if (volatilePreference !== null) return volatilePreference
  // Storage may be unavailable in private or restricted browser contexts.
  try { const value = localStorage.getItem(key); return value === 'day' || value === 'night' ? value : fallbackPreference } catch { return fallbackPreference }
}
function apply(preference) {
  const theme = preference === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day') : preference
  document.documentElement.dataset.theme = theme
  applyMonthlyPalette()
}
export function subscribeAppearance(update) {
  const media = matchMedia('(prefers-color-scheme: dark)')
  const sync = () => { apply(readPreference()); update() }
  window.addEventListener('portfolio-appearance', sync)
  const storageSync = (event) => {
    if (event.key !== key && event.key !== null) return
    fallbackPreference = 'system'
    volatilePreference = null
    sync()
  }
  window.addEventListener('storage', storageSync)
  media.addEventListener('change', sync)
  const visible = () => { if (!document.hidden) sync() }
  document.addEventListener('visibilitychange', visible)
  // An open tab follows local month boundaries without a reload. Hidden tabs
  // catch up on return; cleanup prevents duplicate timers after navigation.
  const timer = window.setInterval(visible, 60_000)
  sync()
  return () => {
    window.removeEventListener('portfolio-appearance', sync)
    window.removeEventListener('storage', storageSync)
    media.removeEventListener('change', sync)
    document.removeEventListener('visibilitychange', visible)
    window.clearInterval(timer)
  }
}

  export function chooseAppearance(value) {
    fallbackPreference = value
    try {
      if (value === 'system') localStorage.removeItem(key)
      else localStorage.setItem(key, value)
      volatilePreference = null
    } catch {
      // A readable old value must not override a new choice when writes fail.
      volatilePreference = value
    }
    apply(value)
    window.dispatchEvent(new Event('portfolio-appearance'))
  }

const getHtmlScrollbarWidth = (): number => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 0
  const doc = document.documentElement

  return Math.max(0, window.innerWidth - doc.clientWidth)
}

const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false

  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

const setScrollbarWidth = (width: number) => {
  document.documentElement.style.setProperty('--scrollbar-width', `${width}px`)
}

let prevHtmlOverflowX = ''
let prevHtmlOverflowY = ''
let prevHtmlHeight = ''
let prevHtmlMargin = ''
let prevBodyPaddingRight = ''

export const disableScroll = (disable: boolean) => {
  if (typeof document === 'undefined') return

  const html = document.documentElement
  const body = document.body

  // если нет вертикального контента и устройство не тач — можно не трогать
  if (!isTouchDevice() && html.clientHeight >= html.scrollHeight) {
    return
  }

  if (disable) {
    // 1) Сначала измеряем ширину скролла у html (пока он ещё виден)
    const scrollbarWidth = getHtmlScrollbarWidth()

    setScrollbarWidth(scrollbarWidth)

    // 2) Сохраняем исходные inline‑стили
    prevHtmlOverflowX = html.style.overflowX
    prevHtmlOverflowY = html.style.overflowY
    prevHtmlHeight = html.style.height
    prevHtmlMargin = html.style.margin
    prevBodyPaddingRight = body.style.paddingRight

    // 3) Блокируем скролл на html
    html.style.overflowX = 'hidden'
    html.style.overflowY = 'hidden'
    html.style.height = '100%'
    html.style.margin = '0'

    // 4) Компенсируем ширину скролла на body (а не на html)
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }
  } else {
    setScrollbarWidth(0)

    // Восстанавливаем исходные inline‑стили
    html.style.overflowX = prevHtmlOverflowX || 'hidden'
    html.style.overflowY = prevHtmlOverflowY || 'scroll'
    html.style.height = prevHtmlHeight
    html.style.margin = prevHtmlMargin
    body.style.paddingRight = prevBodyPaddingRight
  }
}

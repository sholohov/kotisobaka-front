type SwipeDirection = 'up' | 'down' | 'left' | 'right'

interface SwipeOptions {
  threshold?: number      // минимальная дистанция в px
  maxTime?: number        // максимальное время свайпа в мс
  onSwipe: (dir: SwipeDirection) => void
}

export function useSwipe(elem: HTMLElement, options: SwipeOptions) {
  const threshold = options.threshold ?? 50
  const maxTime = options.maxTime ?? 500
  let startX = 0
  let startY = 0
  let startTime = 0

  elem.addEventListener('touchstart', e => {
    const touch = e.changedTouches[0]

    if (!touch) return
    startX = touch.clientX
    startY = touch.clientY
    startTime = Date.now()
  })

  elem.addEventListener('touchend', e => {
    const touch = e.changedTouches[0]

    if (!touch) return

    const dx = touch.clientX - startX
    const dy = touch.clientY - startY
    const dt = Date.now() - startTime

    // проверяем время и дистанцию
    if (dt > maxTime) return
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return

    if (Math.abs(dx) > Math.abs(dy)) {
      options.onSwipe(dx > 0 ? 'right' : 'left')
    } else {
      options.onSwipe(dy > 0 ? 'down' : 'up')
    }
  })
}

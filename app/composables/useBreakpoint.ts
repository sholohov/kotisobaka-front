import { useCookie } from '#imports'
import {
  BREAKPOINT_NAMES,
  BREAKPOINT_CONFIG,
  type Breakpoint,
} from '~/constants/breakpoints'

export function useBreakpoint() {
  const device = useDevice()
  const screenWidthCookie = useCookie<number>('x-screen-width', {
    default: function () { return 0 },
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    watch: true,
  })

  // Функция определения брейкпоинта по ширине
  function getBreakpointByWidth(width: number): Breakpoint {
    const entries = Object.entries(BREAKPOINT_CONFIG) as [Breakpoint, typeof BREAKPOINT_CONFIG[Breakpoint]][]
    const sorted = entries.sort(function (a, b) {
      return b[1].index - a[1].index // desktop-first
    })

    for (const [key, config] of sorted) {
      const minMatch = config.min === undefined || width >= config.min
      const maxMatch = config.max === undefined || width <= config.max

      if (minMatch && maxMatch) {
        return key
      }
    }

    return BREAKPOINT_NAMES.DESKTOP
  }

  // Вычисляемый брейкпоинт на основе куки
  const breakpoint = computed<Breakpoint>(function () {
    const width = screenWidthCookie.value

    return width > 0
      ? getBreakpointByWidth(width)
      : getInitialBreakpoint()
  })

  // Текущая ширина экрана
  const screenWidth = computed(function () {
    return screenWidthCookie.value
  })

  // Определение начального брейкпоинта по устройству (для первого посещения)
  function getInitialBreakpoint(): Breakpoint {
    if (device.isMobile) return BREAKPOINT_NAMES.MOBILE
    if (device.isTablet) return BREAKPOINT_NAMES.TABLET

    return BREAKPOINT_NAMES.DESKTOP
  }

  // Клиентская инициализация с отпиской
  if (import.meta.client) {
    initClientLogic()
  }

  function initClientLogic() {
    function updateScreenWidth() {
      const width = window.innerWidth

      if (screenWidthCookie.value !== width) {
        screenWidthCookie.value = width
      }
    }

    // Первое обновление при загрузке
    updateScreenWidth()

    // Хранилище для MediaQuery listeners
    const mediaQueryListeners: {
      mq: MediaQueryList
      handler: (event: MediaQueryListEvent) => void
    }[] = []

    // MediaQuery слушатели для всех брейкпоинтов
    const allBreakpoints = Object.keys(BREAKPOINT_CONFIG) as Breakpoint[]

    allBreakpoints.forEach(function (bp) {
      const query = BREAKPOINT_CONFIG[bp].query
      const mq = window.matchMedia(query)

      function handler(event: MediaQueryListEvent) {
        if (event.matches) {
          updateScreenWidth()
        }
      }

      mq.addEventListener('change', handler)
      mediaQueryListeners.push({ mq, handler })
    })
    // Очистка при анмаунте
    onUnmounted(function () {
      mediaQueryListeners.forEach(function (listener) {
        listener.mq.removeEventListener('change', listener.handler)
      })
    })
  }

  // Boolean проверки для удобного использования
  const isMobile = computed(function () {
    return breakpoint.value === BREAKPOINT_NAMES.MOBILE
  })

  const isTabletSmall = computed(function () {
    return breakpoint.value === BREAKPOINT_NAMES.TABLET_SMALL
  })

  const isTablet = computed(function () {
    return breakpoint.value === BREAKPOINT_NAMES.TABLET
  })

  const isDesktop = computed(function () {
    return breakpoint.value === BREAKPOINT_NAMES.DESKTOP
  })

  return {
    // Состояние
    breakpoint,
    screenWidth,

    // Boolean проверки
    isMobile,
    isTabletSmall,
    isTablet,
    isDesktop,

    // Информация об устройстве
    device,
  }
}

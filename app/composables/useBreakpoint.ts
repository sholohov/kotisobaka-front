import { useCookie } from '#imports'
import {
  BREAKPOINT_NAMES,
  BREAKPOINT_CONFIG,
  type Breakpoint,
} from '~/constants/breakpoints'

export function useBreakpoint() {
  const device = useDevice()

  const screenWidthCookie = useCookie<number>('x-screen-width', {
    default: () => 0,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    watch: true,
  })

  function getBreakpointByWidth(width: number): Breakpoint {
    const entries = Object.entries(BREAKPOINT_CONFIG) as [Breakpoint, typeof BREAKPOINT_CONFIG[Breakpoint]][]

    const sorted = entries.sort(function (a, b) {
      return a[1].index - b[1].index // mobile-first
    })

    for (const [key, config] of sorted) {
      const minMatch = config.min === undefined || width >= config.min
      const maxMatch = config.max === undefined || width <= config.max

      if (minMatch && maxMatch) {
        return key
      }
    }

    return BREAKPOINT_NAMES.MOBILE
  }

  const breakpoint = computed<Breakpoint>(() => {
    const width = screenWidthCookie.value

    return width > 0
      ? getBreakpointByWidth(width)
      : getInitialBreakpoint()
  })

  const screenWidth = computed(() => {
    return screenWidthCookie.value
  })

  function getInitialBreakpoint(): Breakpoint {
    if (device.isMobile) return BREAKPOINT_NAMES.MOBILE
    if (device.isTablet) return BREAKPOINT_NAMES.TABLET

    return BREAKPOINT_NAMES.DESKTOP
  }

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

    updateScreenWidth()

    const mediaQueryListeners: {
      mq: MediaQueryList
      handler: (event: MediaQueryListEvent) => void
    }[] = []

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

    onUnmounted(() => {
      mediaQueryListeners.forEach(function (listener) {
        listener.mq.removeEventListener('change', listener.handler)
      })
    })
  }

  const isMobile = computed(() => {
    return breakpoint.value === BREAKPOINT_NAMES.MOBILE
  })

  const isTabletSmall = computed(() => {
    return breakpoint.value === BREAKPOINT_NAMES.TABLET_SMALL
  })

  const isTablet = computed(() => {
    return breakpoint.value === BREAKPOINT_NAMES.TABLET
  })

  const isLaptopSmall = computed(() => {
    return breakpoint.value === BREAKPOINT_NAMES.LAPTOP_SMALL
  })

  const isLaptop = computed(() => {
    return breakpoint.value === BREAKPOINT_NAMES.LAPTOP
  })

  const isDesktop = computed(() => {
    return breakpoint.value === BREAKPOINT_NAMES.DESKTOP
  })

  const isMobileView = computed(() => isMobile.value || isTabletSmall.value || isTablet.value);

  return {
    breakpoint,
    screenWidth,

    isMobile,
    isTabletSmall,
    isTablet,
    isLaptopSmall,
    isLaptop,
    isDesktop,
    isMobileView,

    device,
  }
}

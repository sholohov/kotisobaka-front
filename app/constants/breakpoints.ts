export const BREAKPOINT_NAMES = {
  MOBILE: 'mobile',
  TABLET_SMALL: 'tablet-small',
  TABLET: 'tablet',
  LAPTOP_SMALL: 'laptop-small',
  LAPTOP: 'laptop',
  DESKTOP: 'desktop',
} as const

export type Breakpoint = typeof BREAKPOINT_NAMES[keyof typeof BREAKPOINT_NAMES]

export const BREAKPOINT_CONFIG = {
  [BREAKPOINT_NAMES.MOBILE]: {
    min: 0,
    max: 374,
    defaultWidth: 360,
    query: '(max-width: 374px)',
    index: 0,
  },
  [BREAKPOINT_NAMES.TABLET_SMALL]: {
    min: 375,
    max: 767,
    defaultWidth: 375,
    query: '(min-width: 375px) and (max-width: 767px)',
    index: 1,
  },
  [BREAKPOINT_NAMES.TABLET]: {
    min: 768,
    max: 1023,
    defaultWidth: 768,
    query: '(min-width: 768px) and (max-width: 1023px)',
    index: 2,
  },
  [BREAKPOINT_NAMES.LAPTOP_SMALL]: {
    min: 1024,
    max: 1199,
    defaultWidth: 1024,
    query: '(min-width: 1024px) and (max-width: 1199px)',
    index: 3,
  },
  [BREAKPOINT_NAMES.LAPTOP]: {
    min: 1200,
    max: 1439,
    defaultWidth: 1366,
    query: '(min-width: 1200px) and (max-width: 1439px)',
    index: 4,
  },
  [BREAKPOINT_NAMES.DESKTOP]: {
    min: 1440,
    max: Infinity,
    defaultWidth: 1920,
    query: '(min-width: 1440px)',
    index: 5,
  },
} satisfies Record<Breakpoint, {
  min: number
  max: number
  defaultWidth: number
  query: string
  index: number
}>

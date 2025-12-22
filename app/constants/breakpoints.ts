// Строковые константы брейкпоинтов
export const BREAKPOINT_NAMES = {
  MOBILE: 'mobile',
  TABLET_SMALL: 'tablet-small',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
} as const

export type Breakpoint = typeof BREAKPOINT_NAMES[keyof typeof BREAKPOINT_NAMES]

// Основная карта конфигурации
export const BREAKPOINT_CONFIG: Record<Breakpoint, {
  min: number | undefined
  max: number | undefined
  defaultWidth: number
  query: string
  index: number
}> = {
  [BREAKPOINT_NAMES.MOBILE]: {
    min: undefined,
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
    max: 1439,
    defaultWidth: 1024,
    query: '(min-width: 768px) and (max-width: 1439px)',
    index: 2,
  },
  [BREAKPOINT_NAMES.DESKTOP]: {
    min: 1440,
    max: undefined,
    defaultWidth: 1920,
    query: '(min-width: 1440px)',
    index: 3,
  },
}

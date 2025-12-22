import { api } from '~/api'
import type { SettingsData } from '~/api/settings/types'

export const TECH_WORKS_COOKIE = 'tech_works_disabled'
export const TECH_WORKS_QUERY_PARAM = 'tech_works_disabled'

export function useTechnicalWorks() {
  const disableTechWorksCookie = useCookie<boolean>(TECH_WORKS_COOKIE, {
    default: () => false,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })

  const route = useRoute()
  const settings = ref<SettingsData | null>()

  const checkQueryParam = () => {
    const paramValue = route.query[TECH_WORKS_QUERY_PARAM]

    if (paramValue === '1') {
      disableTechWorksCookie.value = true
    }
    else if (paramValue === '0') {
      disableTechWorksCookie.value = false
    }
  }

  async function checkTechnicalWorksStatus() {
    checkQueryParam()

    const { data } = await useAsyncData('settings', () => api.settings.get())

    settings.value = data.value?.data ?? null
  }

  const showTechnicalWorks = computed(() => {
    return settings.value?.isTechnicalWorks === true
      && !disableTechWorksCookie.value
  })

  return {
    showTechnicalWorks,
    checkTechnicalWorksStatus,
  }
}

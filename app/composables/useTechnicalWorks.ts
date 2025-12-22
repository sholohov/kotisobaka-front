import { api } from '~/api'

export const TECH_WORKS_COOKIE = 'tech_works_disabled'
export const TECH_WORKS_QUERY_PARAM = 'tech_works_disabled'

export function useTechnicalWorks() {
  const disableTechWorksCookie = useCookie<boolean>(TECH_WORKS_COOKIE, {
    default: () => false,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })

  const route = useRoute()
  const settings = ref<any>(null)

  // Проверяем query-параметр
  const checkQueryParam = () => {
    const paramValue = route.query[TECH_WORKS_QUERY_PARAM]

    if (paramValue === '1') {
      disableTechWorksCookie.value = true
    } else if (paramValue === '0') {
      disableTechWorksCookie.value = false
    }
  }

  async function checkTechnicalWorksStatus() {
    checkQueryParam()

    const { data } = await useAsyncData('settings', () => api.settings.get())

    settings.value = data.value
  }

  const showTechnicalWorks = computed(() => {
    return settings.value?.data?.isTechnicalWorks === true &&
        !disableTechWorksCookie.value
  })

  return {
    showTechnicalWorks,
    checkTechnicalWorksStatus
  }
}
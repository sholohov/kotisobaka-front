import type { SeoPage } from '~/api/seoPages/types';
import { apiSeoPages } from '~/api/seoPages';

interface State {
  map: Record<string, SeoPage>
}

export const useSeoPagesStore = defineStore('seo-pages', () => {
  const state = reactive<State>({
    map: {},
  })

  async function fetch() {
    const { data } = await apiSeoPages.get({
      populate: '*',
      pagination: {
        page: 1,
        pageSize: 100,
      },
    })

    state.map = data.reduce((all, curr) => {
      all[curr.slug] = curr

      return all
    }, {} as Record<string, SeoPage>)
  }

  return {
    ...toRefs(state),
    fetch,
  }
})

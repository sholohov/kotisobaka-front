import debounce from 'lodash/debounce'
import { api } from '~/api';
import type { AnimalData } from '~/api/animals/types';
import type { ArticleData } from '~/api/articles/types';
import type { ContentPageData } from '~/api/contentPages/types';

export function useSearch() {
  const history = useLocalStorage<string[]>('search-history', {
    default: () => [],
  })

  const results = ref({
    animals: [] as AnimalData[],
    articles: [] as ArticleData[],
    pages: [] as ContentPageData[],
  })

  const query = ref('')
  const loadCount = ref(0)
  const loading = computed(() => loadCount.value > 0)

  const hasResults = computed(() => {
    return Boolean(
      results.value.animals.length
      || results.value.articles.length
      || results.value.pages.length,
    )
  })

  const filteredHistory = computed(() => {
    return history.value.filter((item, index) => {
      return history.value.indexOf(item) === index
    })
  })

  function updateHistory(query: string) {
    history.value = [query, ...filteredHistory.value].slice(0, 6)
  }

  async function fetchData(query: string, short: boolean) {
    loadCount.value++

    try {
      const [animals, articles, pages] = await Promise.all([
        api.animals.get({
          filters: {
            $or: [
              { name: { $containsi: query } },
              { description: { $containsi: query } },
            ],
          },
          populate: ['photo'],
          pagination: short ? { limit: 3 } : { page: 1, pageSize: 15 },
        }),
        api.articles.get({
          filters: {
            $or: [
              { title: { $containsi: query } },
              { excerpt: { $containsi: query } },
              { content: { $containsi: query } },
            ],
          },
          populate: ['coverImage'],
          pagination: short ? { limit: 4 } : { page: 1, pageSize: 15 },
        }),
        api.contentPages.get({
          filters: {
            $or: [
              { title: { $containsi: query } },
              { summary: { $containsi: query } },
              { content: { $containsi: query } },
            ],
          },
          pagination: short ? { limit: 4 } : { page: 1, pageSize: 15 },
        }),
      ])

      results.value = {
        animals: animals.data,
        articles: articles.data,
        pages: pages.data,
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      loadCount.value--
    }
  }

  function clear() {
    results.value = {
      animals: [],
      articles: [],
      pages: [],
    }
  }

  watch(query, async () => {
    loadCount.value++

    setTimeout(() => {
      loadCount.value--
    }, 1000)

    await search(query.value.trim(), true)
  })

  const search = debounce(async (query: string, short = false) => {
    if (query.length >= 3) {
      updateHistory(query)
      await fetchData(query, short)
    } else {
      clear()
    }
  }, 1000)

  return {
    history: filteredHistory,
    results,
    hasResults,
    loading,
    query,
    clear,
  }
}

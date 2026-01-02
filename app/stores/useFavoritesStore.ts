import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', () => {
  // Состояние
  const list = ref<string[]>([])
  const isInitialized = ref(false)
  // Геттеры
  const count = computed(() => list.value?.length ?? 0)

  // Действия
  function add(id: string): void {
    if (!has(id)) {
      list.value = [...list.value, id]
    }
  }

  function remove(id: string): void {
    const index = list.value.indexOf(id)

    if (index !== -1) {
      list.value = list.value.filter(fav => fav !== id)
    }
  }

  function toggle(id: string): void {
    if (has(id)) {
      remove(id)
    } else {
      add(id)
    }
  }

  function has(id: string): boolean {
    return list.value.includes(id)
  }

  // Приватные методы для работы с localStorage
  function _loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('favorites')

      list.value = stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error)
      list.value = []
    }
  }

  function _saveToStorage(): void {
    try {
      localStorage.setItem('favorites', JSON.stringify(list.value))
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error)
    }
  }

  function _onStorageChange(event: StorageEvent): void {
    if (event.key === 'favorites') {
      _loadFromStorage()
    }
  }

  function initialize(): void {
    if (import.meta.client && !isInitialized.value) {
      _loadFromStorage()

      watch(list, _saveToStorage, { deep: true })

      window.addEventListener('storage', _onStorageChange)

      isInitialized.value = true
      console.log('Favorites store initialized')
    }
  }

  function cleanup(): void {
    if (import.meta.client && isInitialized.value) {
      window.removeEventListener('storage', _onStorageChange)

      isInitialized.value = false
      console.log('Favorites store cleaned up')
    }
  }

  return {
    // Состояние
    list,
    isInitialized,

    // Геттеры
    count,

    // Действия
    add,
    remove,
    toggle,
    has,

    // Методы жизненного цикла
    initialize,
    cleanup,
  }
})

import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', () => {
  // Cookie для хранения списка
  const cookie = useCookie<string[]>('favorites', {
    default: () => [],
    watch: true, // автоматически обновляет cookie при изменении
  })

  // Состояние
  const list = ref<string[]>(cookie.value ?? [])
  // Геттеры
  const count = computed(() => list.value.length)

  // Действия
  function add(id: string): void {
    if (!has(id)) {
      list.value = [...list.value, id]
      cookie.value = list.value
    }
  }

  function remove(id: string): void {
    list.value = list.value.filter(fav => fav !== id)
    cookie.value = list.value
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

  return {
    // Состояние
    list,

    // Геттеры
    count,

    // Действия
    add,
    remove,
    toggle,
    has,
  }
})

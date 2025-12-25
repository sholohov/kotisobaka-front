// stores/menu.ts
import { defineStore } from 'pinia'

export const useMenuMobileStore = defineStore('menuMobile', {
  state: () => ({
    isOpen: false,
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    close() {
      this.isOpen = false
    },
  },
})

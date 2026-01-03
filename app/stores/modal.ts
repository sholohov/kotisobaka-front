export type ModalPropsMap = {
  'donate-with-qr': null
  'donate-with-guide': null
  'animal-filters': {
    reset(): void,
    apply(filters: unknown): void
  }
}

export const useModalStore = defineStore('modal', () => {
  const state = reactive({
    name: null as keyof ModalPropsMap | null,
    props: null as ModalPropsMap[keyof ModalPropsMap] | null,
  })

  const isOpen = computed(() => state.name !== null)

  function open<K extends keyof ModalPropsMap>(name: K, props?: ModalPropsMap[K]) {
    state.name = name
    state.props = props ?? null
  }

  function close() {
    state.name = null
    state.props = null
  }

  return {
    ...toRefs(state),
    isOpen,
    open,
    close,
  }
})

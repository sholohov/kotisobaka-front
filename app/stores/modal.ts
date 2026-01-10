import type { AnimalsFilters } from '~/helpers/filters/animals';

export type ModalPropsMap = {
  'donate-with-qr': null
  'donate-with-guide': null
  'animal-list-filters': {
    filters: AnimalsFilters
    reset(): void
    apply(filters: AnimalsFilters): void
  }
  'modal-favorite-info': null
}

interface State {
  name: keyof ModalPropsMap | null
  props: ModalPropsMap[keyof ModalPropsMap] | null
}

export const useModalStore = defineStore('modal', () => {
  const state = reactive<State>({
    name: null,
    props: null,
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

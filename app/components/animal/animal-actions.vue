<script setup lang="ts">
import type { AnimalData } from '~/api/animals/types'

const props = defineProps({
  animal: {
    type: Object as PropType<AnimalData>,
    required: true,
  },
})

const favoritesStore = useFavoritesStore()

const tooltipText = computed(() =>
  favoritesStore.has(props.animal.documentId)
    ? 'Удалить из избранного'
    : 'Добавить в избранное',
)

const favoriteIconName = computed(() => {
  return favoritesStore.has(props.animal.documentId)
    ? 'heart-icon'
    : 'heart-round-icon'
})

function handleToggleFavoriteBtn() {
  favoritesStore.toggle(props.animal.documentId)
}
</script>

<template>
  <div class="animal-actions">
    <tooltip-box
      :text="tooltipText"
      position="bottom-left"
    >
      <btn-default
        class="animal-actions__btn"
        style="color: var(--color-pink-dark)"
        circle
        @click="handleToggleFavoriteBtn"
      >
        <svg-icon :name="favoriteIconName" />
      </btn-default>
    </tooltip-box>

    <tooltip-box
      v-if="animal.animalStatus === 'available'"
      text="Ищу дом"
      position="bottom-left"
    >
      <btn-default
        class="animal-actions__btn animal-actions__btn--no-click"
        style="color: var(--color-green-dark)"
        circle
      >
        <svg-icon name="home-icon" />
      </btn-default>
    </tooltip-box>

    <tooltip-box
      v-if="animal.animalStatus === 'under_treatment'"
      text="Помоги мне"
      position="bottom-left"
    >
      <btn-default
        style="color: var(--color-orange)"
        class="animal-actions__btn animal-actions__btn--no-click"
        circle
      >
        <svg-icon name="health-icon" />
      </btn-default>
    </tooltip-box>
  </div>
</template>

<style lang="scss">
.animal-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__btn {
    &--no-click {
      pointer-events: none;
    }
  }
}
</style>

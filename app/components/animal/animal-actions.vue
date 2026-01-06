<script setup lang="ts">
import HeartIcon from '~/assets/svg/heart-icon.svg'
import HeartRoundIcon from '~/assets/svg/heart-round-icon.svg'
import HomeIcon from '~/assets/svg/home-icon.svg'
import HealthIcon from '~/assets/svg/health-icon.svg'

import type { Animal } from '~/api/animals/types'

const props = defineProps({
  animal: {
    type: Object as PropType<Animal>,
    required: true,
  },
})

const favoritesStore = useFavoritesStore()

const tooltipText = computed(() =>
  favoritesStore.has(props.animal.documentId)
    ? 'Удалить из избранного'
    : 'Добавить в избранное',
)

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
        <heart-icon
          v-if="favoritesStore.has(animal.documentId)"
          width="24"
        />
        <heart-round-icon
          v-else
          width="24"
        />
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
        <home-icon width="24" />
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
        <health-icon width="24" />
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

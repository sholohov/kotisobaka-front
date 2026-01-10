<script setup lang="ts">
import type { AnimalData } from '~/api/animals/types';
import { BREAKPOINT_CONFIG } from '~/constants/breakpoints';

defineProps({
  animal: {
    type: Object as PropType<AnimalData>,
    required: true,
  },
})

const { screenWidth } = useBreakpoint()
const { isMobileView } = useBreakpoint()

const fundsSegments = computed(() => {
  if (screenWidth.value < BREAKPOINT_CONFIG.laptop.min) {
    return 28
  }

  if (screenWidth.value < BREAKPOINT_CONFIG.desktop.min) {
    return 36
  }

  return 40
})

function truncate(text: string, maxLength = 100) {
  if (!text || text.length <= maxLength) return text

  return text.slice(0, maxLength)
}

</script>

<template>
  <div class="animal-card">
    <div class="animal-card__img-wrapper">
      <img
        :src="animal.photo?.url"
        :alt="animal.photo?.alternativeText || animal.name"
        class="animal-card__img"
      >
    </div>

    <div class="animal-card__details">
      <div class="animal-card__name">
        {{ animal.name }}
      </div>
      <div class="animal-card__description">
        {{ truncate(animal.description) }}
      </div>
    </div>

    <animal-info
      class="animal-card__info"
      :animal="animal"
      :short="isMobileView"
    />

    <fundraising-bar
      v-if="animal.fundsIsNeeded"
      :segments="fundsSegments"
      :goal="animal.fundsAmountTarget!"
      :raised="animal.fundsAmountCollected!"
      class="animal-card__fundraising"
    />

    <nuxt-link
      :to="`/animals/${animal.slug}`"
      class="animal-card__link"
      :aria-label="`Подробнее о ${animal.name}`"
    />

    <div class="animal-card__actions">
      <animal-actions :animal="animal" />
    </div>
  </div>
</template>

<style lang="scss">
.animal-card {
  $this: ".animal-card";

  background-color: var(--color-white);
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07),
      0 4px 8px rgba(0, 0, 0, 0.035);

      #{$this}__img {
        transform: scale(1.1);
      }
    }
  }

  &__img-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding: calc(100% * 0.70) 0 0;
  }

  &__img {
    position: absolute;
    display: flex;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &__details {
    padding: 14px 10px;

    @media (min-width: $mq-lg) {
      padding: 20px 14px;
    }
  }

  &__name {
    font-size: 22px;
    font-weight: 800;

    @media (min-width: $mq-lg) {
      font-size: 22px;
    }

    @media (min-width: $mq-xl) {
      font-size: 24px;
    }
  }

  &__description {
    position: relative;
    font-weight: 400;
    line-height: 1.2;
    color: var(--color-text-chocolate);
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    height: calc(1.2em * 2);
  }

  &__info {
    padding: 10px;
    border-top: 1px solid var(--color-background-pink);
  }

  &__info-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 10px 18px;

    &:not(:last-child) {
      border-right: 1px solid var(--color-background-pink);
    }
  }

  &__info-item__value {
    color: var(--color-text-brown);
    font-weight: 700;
    font-size: 24px;
    line-height: 1.2;
    z-index: 1;
  }

  &__info-label {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    color: var(--color-text-chocolate);
  }

  &__fundraising {
    padding: 16px;
    border-top: 1px solid var(--color-background-pink);
  }

  &__link {
    position: absolute;
    inset: 0;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    position: absolute;
    inset: 10px auto auto 10px;
    gap: 6px;

    @media (min-width: $mq-lg) {
      inset: 20px auto auto 20px;
    }
  }

  &__actions-btn {
    &--no-click {
      pointer-events: none;
    }

    &--favorites {
      color: var(--color-pink-light);
    }

    &--favorites-active {
      color: var(--color-orange);
    }
  }
}
</style>

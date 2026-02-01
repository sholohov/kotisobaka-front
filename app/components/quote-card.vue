<script setup lang="ts">
import type { QuoteData } from '~/api/quotes/types';

const icons = {
  paw: defineAsyncComponent(() => import('~/assets/icons/paw-icon.svg')),
  health: defineAsyncComponent(() => import('~/assets/icons/health-icon.svg')),
}

defineProps({
  color: {
    type: String as PropType<'purple' | 'yellow' | 'green' | 'blue' | 'orange' | string>,
    required: true,
  },
  quote: {
    type: Object as PropType<QuoteData>,
    required: true,
  },
  isHealth: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="quote-card"
    :class="[
      'quote-card--' + color,
      { 'quote-card--is-health': isHealth }
    ]"
  >
    <div class="quote-card__header">
      <btn-default
        class="quote-card__btn"
        circle
        color="white"
        no-border
      >
        <component
          :is="isHealth ? icons.health : icons.paw"
          width="24"
          :color="isHealth ? 'var(--color-orange)' : `var(--color-${color})`"
        />
      </btn-default>
      <div class="quote-card__tag">
        #{{ quote.tag }}
      </div>
    </div>
    <div class="quote-card__text">
      {{ quote.text }}
    </div>
  </div>
</template>

<style lang="scss">
.quote-card {
  $this: '.quote-card';

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 24px;
  overflow: hidden;
  color: var(--color-white);
  padding: 10px;
  min-height: 380px;

  @media (min-width: $mq-lg) {
    padding: 20px;
  }

  &--purple {
    background-color: var(--color-purple);
  }

  &--yellow {
    background-color: var(--color-yellow);
  }

  &--green {
    background-color: var(--color-green);
  }

  &--blue {
    background-color: var(--color-blue);
  }

  &--is-health {
    background-color: var(--color-orange);
  }

  &__header {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  &__tag {
    font-weight: 800;
    font-size: 22px;
  }

  &__text {
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 700;

  }

  &__btn {
    pointer-events: none;
  }
}
</style>

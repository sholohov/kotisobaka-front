<script setup lang="ts">
import type { Quote } from "~/api/quotes/types";

const icons = {
  paw: defineAsyncComponent(() => import('~/assets/svg/paw-icon.svg')),
  health: defineAsyncComponent(() => import('~/assets/svg/health-icon.svg')),
}

defineProps({
  color: {
    type: String as PropType<"purple" | "yellow" | "green" | "blue" | "orange">,
    required: true,
  },
  quote: {
    type: Object as PropType<Quote>,
    required: true,
  },
  icon: {
    type: String as PropType<'paw' | 'health'>,
    required: true,
  },
})
</script>

<template>
  <div
    class="quote-card"
    :class="['quote-card--' + color]"
  >
    <div class="quote-card__header">
      <btn-default
        class="quote-card__icon"
        circle
        color="white"
        no-border
      >
        <component
          :is="icons[icon]"
          width="24"
          :color="`var(--color-${color})`"
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

  @media (min-width: $breakpoint-lg) {
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

  &--orange {
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
    padding: 10px 0;
  }
}
</style>

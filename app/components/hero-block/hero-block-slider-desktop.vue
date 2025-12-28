<script setup lang="ts">
import type { Animal } from "~/api/animals/types";
import HeroBlockCard from "~/components/hero-block/hero-block-card.vue";

const props = defineProps({
  cards: {
    type: Array as PropType<Animal[]>,
    required: true,
  },
})

const activeIndex = ref(0)
const isAnimating = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null

const visibleCards = computed(() => {
  if (!props.cards.length) return []

  return [
    props.cards[activeIndex.value % props.cards.length],
    props.cards[(activeIndex.value + 1) % props.cards.length],
    props.cards[(activeIndex.value - 1 + props.cards.length) % props.cards.length],
  ].filter(card => !!card)
})

function resetInterval() {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(moveRight, 10000)
}

function moveLeft() {
  if (isAnimating.value) return
  isAnimating.value = true
  activeIndex.value = (activeIndex.value - 1 + props.cards.length) % props.cards.length
  setTimeout(() => { isAnimating.value = false }, 500)
  resetInterval()
}

function moveRight() {
  if (isAnimating.value) return
  isAnimating.value = true
  activeIndex.value = (activeIndex.value + 1) % props.cards.length
  setTimeout(() => { isAnimating.value = false }, 500)
  resetInterval()
}

onMounted(() => {
  resetInterval()
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div
    v-if="visibleCards.length"
    class="hero-block-slider-desktop"
  >
    <transition-group name="hero-block-slider-desktop__card-">
      <hero-block-card
        v-for="(card, idx) in visibleCards"
        :key="card.documentId"
        :card="card"
        class="hero-block-slider-desktop__card"
        :class="{
          'hero-block-slider-desktop__card--prev': idx === 0,
          'hero-block-slider-desktop__card--active': idx === 1,
          'hero-block-slider-desktop__card--next': idx === 2
        }"
        @click="idx === 0 ? moveRight() : idx === 2 ? moveLeft() : null"
      />
    </transition-group>
  </div>
</template>

<style lang="scss">
.hero-block-slider-desktop {
  $this: '.hero-block-slider-desktop';

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  &__card {
    position: relative;
    z-index: 2;
    transition: all 0.7s cubic-bezier(0.55, 0.085, 0.68, 0.53);

    &--prev {
      top: -20px;
      transform: rotate(15deg);
      z-index: 1;
      cursor: pointer;
    }

    &--active {
      transform: rotate(-5deg);
      z-index: 3;
      opacity: 1;
    }

    &--next {
      top: -20px;
      transform: rotate(9deg);
      z-index: 1;
      cursor: pointer;
    }

    &--move {
      transition: transform 0.5s ease;
    }

    &--enter-active,
    &--leave-active {
      transition: all 0.5s ease;
    }

    &--enter-from {
      opacity: 0;
      transform: translateX(10px) scale(0.98);
    }

    &--leave-to {
      opacity: 0;
      transform: translateX(-10px) scale(0.98);
    }

    &--leave-active {
      position: absolute;
    }
  }
}
</style>

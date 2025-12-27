<script setup lang="ts">
import type { Animal } from "~/api/animals/types";

defineProps({
  cards: {
    type: Array as PropType<Animal[]>,
    required: true,
  },
})
</script>

<template>
  <swiper-container
    :space-between="10"
    :slides-per-view="'auto'"
    :centered-slides="true"
    :loop="cards.length > 3"
    :initial-slide="1"
    :autoplay="cards.length > 3 ? { delay: 5000 } : undefined"
    class="hero-block-slider-mobile"
  >
    <swiper-slide
      v-for="card in cards"
      :key="card.documentId"
      class="hero-block-slider-mobile__slide"
    >
      <hero-block-card :card="card" />
    </swiper-slide>
  </swiper-container>
</template>

<style lang="scss">
.hero-block-slider-mobile {
  $this: '.hero-block-slider-mobile';
  overflow: visible;

  &__slide {
    margin: auto;
    flex: 0 0 270px;
  }
}
</style>

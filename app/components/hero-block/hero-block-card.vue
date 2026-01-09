<script setup lang="ts">
import StarIcon from '~/assets/svg/star-icon.svg';
import type { AnimalData } from '~/api/animals/types';

defineProps({
  card: {
    type: Object as PropType<AnimalData>,
    required: true,
  },
})
</script>

<template>
  <div class="hero-block-card">
    <img
      :src="card.photo.url"
      :alt="card.photo.alternativeText || card.name"
      class="hero-block-card__img"
    >
    <div class="hero-block-card__description">
      <div class="hero-block-card__tag">
        # ищу дом
      </div>
      <div class="hero-block-card__title">
        {{ card.name }}
      </div>
      <btn-default
        circle
        class="hero-block-card__btn"
      >
        <star-icon
          width="24"
          class="hero-block-card__icon"
        />
      </btn-default>
    </div>
  </div>
</template>

<style lang="scss">
.hero-block-card {
  $this: '.hero-block-card';

  position: relative;
  display: flex;
  width: 270px;
  height: 366px;
  padding: 14px;
  flex-direction: column;
  background-color: var(--color-text-beige);
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 0 6px var(--color-text-chocolate);

  @media (min-width: $mq-xxl) {
    width: 350px;
    height: 445px;
    padding: 20px;
  }

  &__img {
    display: flex;
    flex: 1;
    background-color: var(--color-beige-light);
    overflow: hidden;
    border-radius: 12px;
    margin: 0 0 20px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__description {
    display: flex;
    position: relative;
    color: var(--color-text-chocolate);
    line-height: 1;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }

  &__tag {
    font-size: 18px;
    font-weight: 600;
  }

  &__title {
    font-size: 30px;
    font-weight: 800;
  }

  &__btn {
    pointer-events: none;
    position: absolute;
    inset: 50% 0 0 0;
    transform: translateY(-50%);
    color: var(--color-orange);
  }
}
</style>

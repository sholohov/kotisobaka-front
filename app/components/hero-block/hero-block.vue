<script setup lang="ts">
import PawIcon from '~/assets/svg/paw-icon.svg'
import type { AnimalData } from '~/api/animals/types';

defineProps({
  items: {
    type: Array as PropType<AnimalData[]>,
    required: true,
  },
})

const { isMobileView } = useBreakpoint()
</script>

<template>
  <div
    v-if="items"
    class="hero-block"
  >
    <content-box>
      <div class="hero-block__inner">
        <img
          src="/img/tails-text.webp"
          alt="tails-text"
          class="hero-block__tail-img"
        >

        <hero-block-slider-mobile
          v-if="isMobileView"
          class="hero-block__slider hero-block__slider--mobile"
          :cards="items"
        />
        <hero-block-slider-desktop
          v-else
          class="hero-block__slider"
          :cards="items"
        />

        <div class="hero-block__words">
          <span class="hero-block__word-left">Твой</span>
          <span class="hero-block__word-right">Личный</span>
        </div>

        <div class="hero-block__find-friend-btn">
          <btn-default
            color="blue"
            to="/animals"
            style="width: 240px"
          >
            Найти друга
          </btn-default>
          <btn-default
            color="blue"
            circle
            to="/animals"
          >
            <paw-icon width="24" />
          </btn-default>
        </div>
      </div>
    </content-box>
  </div>
</template>

<style lang="scss">
.hero-block {
  $this: '.hero-block';

  background-color: var(--color-pink-dark);

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 620px;

    @media (min-width: $mq-xs) {
      height: 580px;
    }

    @media (min-width: $mq-sm) {
      height: 580px;
    }

    @media (min-width: $mq-lg) {
      height: 100vh;
      max-height: 730px;
      min-height: auto;
    }

    @media (min-width: $mq-xl) {
      height: 100vh;
      max-height: 940px;
      min-height: auto;
    }
  }

  &__slider {
    position: absolute;
    inset: 64px 0 auto;

    @media (min-width: $mq-sm) {
      inset: 80px 0 auto;
    }

    @media (min-width: $mq-lg) {
      inset: 20% 0 auto 0;
    }
  }

  &__tail-img {
    position: absolute;
    inset: 460px 0 auto 0;
    margin: 20px 0;
    width: 100%;
    height: auto;

    @media (min-width: $mq-xs) {
      inset: 420px 0 auto 0;
    }

    @media (min-width: $mq-sm) {
      inset: auto 0 0 0;
    }
  }

  &__words {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    inset: 460px 0 auto 0;

    @media (min-width: $mq-xs) {
      margin: 5vw 0 0;
    }

    @media (min-width: $mq-lg) {
      inset: auto 0 20px 0;
      margin: 0 0 8vw;
    }
  }

  &__word-left, &__word-right {
    display: inline-flex;
    line-height: 1;
    font-size: 32px;
    font-weight: 900;
    text-shadow: 0 0 6px var(--color-text-chocolate);
    color: var(--color-text-beige);
    z-index: 2;
    text-transform: uppercase;

    @media (min-width: $mq-sm) {
      font-size: 45px;
    }

    @media (min-width: $mq-xl) {
      font-size: 100px;
    }
  }

  &__word-left {
    position: absolute;
    left: 0;
  }

  &__word-right {
    position: absolute;
    right: 0;
  }

  &__find-friend-btn {
    z-index: 2;
    display: flex;
    justify-content: center;
    position: absolute;
    inset: 550px 0 auto 0;

    @media (min-width: $mq-xs) {
      top: 520px;
    }

    @media (min-width: $mq-lg) {
      inset: auto 0 0 0;
      margin: 0 0 8vw;
    }
  }
}
</style>

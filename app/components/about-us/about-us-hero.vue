<script setup lang="ts">
import type { StatisticData } from '~/api/statistic/types'

const props = defineProps({
  statistic: {
    type: Object as PropType<StatisticData>,
    required: true,
  },
  membersCount: {
    type: Number,
    required: true,
  },
})

const statItems = computed(() => [{
  icon: defineAsyncComponent(() => import('~/assets/icons/calendar-icon.svg')),
  key: 'yearsOfCare',
  color: 'var(--color-purple)',
  value: props.statistic.yearsOfCare,
}, {
  icon: defineAsyncComponent(() => import('~/assets/icons/paw-icon.svg')),
  key: 'savedLives',
  color: 'var(--color-blue)',
  value: props.statistic.savedLives,
}, {
  icon: defineAsyncComponent(() => import('~/assets/icons/home-icon.svg')),
  key: 'adoptedPets',
  color: 'var(--color-pink)',
  value: props.statistic.adoptedPets,
}, {
  icon: defineAsyncComponent(() => import('~/assets/icons/heart-icon.svg')),
  key: 'membersCount',
  color: 'var(--color-orange)',
  value: props.membersCount,
}])
</script>

<template>
  <div class="about-us-hero">
    <div class="about-us-hero__bg">
      <img
        class="about-us-hero__bg-hand"
        src="/img/about-us-hero-hand.webp"
        alt="about-us-hero-hand"
      >
      <img
        class="about-us-hero__bg-cat"
        src="/img/about-us-hero-cat.webp"
        alt="about-us-hero-cat"
      >
    </div>

    <content-box>
      <div class="about-us-hero__content">
        <h1 class="about-us-hero__title">
          Мы находим хвостикам — семью, а людям — настоящих друзей
        </h1>
        <div class="about-us-hero__description">
          Наша команда уже 13 лет спасает, лечит и находит новые семьи для бездомных животных.
          Но наша миссия шире: мы меняем общество, воспитывая гуманное и ответственное отношение
          к каждому живому существу.
        </div>
      </div>
    </content-box>

    <ul class="about-us-hero__statistic">
      <li
        v-for="item in statItems"
        :key="item.key"
        class="about-us-hero__statistic-item"
        :style="{ color: item.color }"
      >
        <component
          :is="item.icon"
          class="about-us-hero__statistic-icon"
          width="24px"
        />
        <span class="about-us-hero__statistic-value">
          {{ item.value }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.about-us-hero {
  $this: '.about-us-hero';

  position: relative;
  background-color: var(--color-green-dark);

  &__bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  &__bg-hand {
    position: absolute;
    bottom: 39%;
    left: 0;
    transform: scale(-1, 1) translate(28%, 50%) rotate(-15deg);
    width: 50%;

    @media (min-width: $mq-sm) {
      top: 100px;
      transform: scale(-1, 1) translate(42%, 0) rotate(-15deg);
    }
  }

  &__bg-cat {
    position: absolute;
    inset: auto 0 auto auto;
    right: 0;
    bottom: 0;
    width: 50%;
    transform: scale(-1, 1) translate(-8%, 0);

    @media (min-width: $mq-sm) {
      width: 60%;
      transform: scale(-1, 1) translate(-8%, 18%);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 80px 10px 28%;
    color: var(--color-white);

    @media (min-width: $mq-sm) {
      padding: 180px 10px 20%;
    }
  }

  &__title {
    font-weight: 900;
    font-size: 45px;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
    margin: 0 0 20px;
    max-width: 700px;

    @media (min-width: $mq-md) {
      font-size: 60px;
      max-width: 900px;
      margin: 0 0 40px;
    }
  }

  &__description {
    font-weight: 700;

    text-align: center;
    max-width: 500px;
  }

  &__statistic {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  &__statistic-item {
    display: inline-flex;
    align-items: center;
    padding: 3px;
    border-radius: 22px;
    background-color: currentColor;
    border: 1px solid var(--color-white);

    &:nth-child(1) {
      position: absolute;
      top: 40px;
      left: 15vw;

      @media (min-width: $mq-sm) {
        top: 80px;
        left: 45vw;
      }
    }

    &:nth-child(2) {
      position: absolute;
      top: 70px;
      right: 4vw;

      @media (min-width: $mq-sm) {
        top: 200px;
      }

      @media (min-width: $mq-lg) {
        top: 140px;
        right: calc(30% - 180px);
      }
    }

    &:nth-child(3) {
      position: absolute;
      top: 200px;
      left: 2vw;

      @media (min-width: $mq-sm) {
        top: 300px;
      }

      @media (min-width: $mq-lg) {
        top: 240px;
        left: calc(30% - 150px);
      }
    }

    &:nth-child(4) {
      position: absolute;
      bottom: 55px;
      left: 6vw;

      @media (min-width: $mq-sm) {
        left: 25vw;
        top: 470px;
        bottom: auto;
      }

      @media (min-width: $mq-lg) {
        top: 480px;
        left: 35vw;
      }
    }
  }

  &__statistic-icon {
    color: currentColor;
    background-color: var(--color-white);
    padding: 6px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  &__statistic-value {
    font-weight: 800;
    font-size: 22px;
    line-height: 100%;
    color: var(--color-white);
    padding: 0 10px;
  }
}
</style>

<script setup lang="ts">
import type { Statistic, StatisticData } from "~/api/statistic/types";

const props = defineProps({
  stats: {
    type: Object as PropType<Statistic>,
    required: true,
  },
})

const items = computed((): { key: keyof StatisticData, value: number }[] => {
  return [{
    key: 'adoptedPets',
    value: props.stats.adoptedPets,
  }, {
    key: 'savedLives',
    value: props.stats.savedLives,
  }, {
    key: 'yearsOfCare',
    value: props.stats.yearsOfCare,
  }, {
    key: 'patientsInTreatment',
    value: props.stats.patientsInTreatment,
  }]
})

const { isMobile, isTabletSmall } = useBreakpoint()
</script>

<template>
  <div class="rescue-stats">
    <content-box>
      <swiper-container
        v-if="isMobile || isTabletSmall"
        slides-per-view="auto"
        space-between="10px"
        class="rescue-stats__slider"
      >
        <swiper-slide
          v-for="item in items"
          :key="item.key"
          class="rescue-stats__slide"
        >
          <rescue-stats-card :card="item" />
        </swiper-slide>
      </swiper-container>

      <div
        v-else
        class="rescue-stats__list"
      >
        <div
          v-for="item in items"
          :key="item.key"
          class="rescue-stats__item"
        >
          <rescue-stats-card :card="item" />
        </div>
      </div>

      <div class="rescue-stats__text">
        Каждый день мы спасаем жизни, но нам нужна ваша помощь
      </div>
    </content-box>
  </div>
</template>

<style lang="scss">
.rescue-stats {
  $his: '.rescue-stats';

  &__slide {
    width: 270px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    max-width: 640px;
    margin: 0 auto;

    @media (min-width: $mq-lg) {
      max-width: none;
      flex-wrap: nowrap;
      gap: 20px;
    }
  }

  &__item {
    width: 275px;
  }

  &__text {
    display: flex;
    color: var(--color-pink-dark);
    font-size: 30px;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: 0;
    text-transform: uppercase;
    margin: 30px auto 0;
    text-align: center;
    max-width: 728px;

    @media (min-width: $mq-lg) {
      font-size: 50px;
      margin: 50px auto 0;
      max-width: 1022px;
    }
  }
}
</style>

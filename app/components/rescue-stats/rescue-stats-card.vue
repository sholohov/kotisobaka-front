<script setup lang="ts">
import type { StatisticData } from '~/api/statistic/types';

const icons = {
  adoptedPets: defineAsyncComponent(() => import('~/assets/svg/rescue-stats/man-and-cat.svg')),
  savedLives: defineAsyncComponent(() => import('~/assets/svg/rescue-stats/cat-and-heart.svg')),
  yearsOfCare: defineAsyncComponent(() => import('~/assets/svg/rescue-stats/dog.svg')),
  patientsInTreatment: defineAsyncComponent(() => import('~/assets/svg/rescue-stats/sick-cat.svg')),
};

const text = {
  adoptedPets: 'нашли семью',
  savedLives: 'жизней спасено',
  yearsOfCare: 'лет заботы о животных',
  patientsInTreatment: 'пациентов на лечении',
}

type ResultObj<T> = { key: keyof T; value: T[keyof T]; };

defineProps({
  card: {
    type: Object as PropType<ResultObj<StatisticData>>,
    required: true,
  },
});
</script>

<template>
  <div
    class="rescue-stats-card"
    :class="['rescue-stats-card--' + card.key]"
  >
    <div class="rescue-stats-card__count">
      {{ card.value }}
    </div>

    <component
      :is="icons[card.key]"
      class="rescue-stats-card__icon"
    />

    <div class="rescue-stats-card__text">
      {{ text[card.key] }}
    </div>
  </div>
</template>

<style lang="scss">
.rescue-stats-card {
  $his: '.rescue-stats-card';

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  border-radius: 24px;
  padding: 20px;

  &--adoptedPets {
    background-color: var(--color-orange);
  }

  &--savedLives {
    background-color: var(--color-blue);
  }

  &--yearsOfCare {
    background-color: var(--color-purple);
  }

  &--patientsInTreatment {
    background-color: var(--color-yellow);
  }

  &__count {
    font-size: 45px;
    font-weight: 900;
    letter-spacing: 0;
    text-transform: uppercase;
    color: var(--color-text-beige);
    margin: 0 0 10px;

    @media (min-width: $mq-lg) {
      font-size: 70px;
    }
  }

  &__icon {
    display: flex;
    color: var(--color-text-brown);
    margin: 0 0 10px;
    height: 120px;
  }

  &__text {
    color: var(--color-text-brown);
    font-size: 20px;
    font-weight: 700;

    text-align: center;
    text-transform: uppercase;
    max-width: 220px;

    @media (min-width: $mq-lg) {
      font-size: 24px;
    }
  }
}
</style>

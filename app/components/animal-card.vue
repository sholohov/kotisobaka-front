<script setup lang="ts">
import HeartIcon from '~/assets/svg/heart-icon.svg'
import HomeIcon from '~/assets/svg/home-icon.svg'
import HealthIcon from '~/assets/svg/health-icon.svg'

import type { Animal } from "~/api/animals/types";

interface AnimalInfo {
  key: string,
  label: string,
  value: string | number,
  tooltip?: string,
}

const props = defineProps({
  animal: {
    type: Object as PropType<Animal>,
    required: true,
  },
})

const { isMobileView } = useBreakpoint()

const animalGender = computed((): string => {
  return props.animal.gender === 'male' ? 'мальчик' : 'девочка'
})

const animalInfo = computed(() => {
  const { birthDate, sterilized, gender } = props.animal

  const list: AnimalInfo[] = [{
    key: 'age',
    label: 'возраст',
    tooltip: formatDate(birthDate),
    value: getAge(birthDate, true),
  }, {
    key: 'gender',
    label: 'пол',
    value: animalGender.value,
  }]

  if (!isMobileView.value) {
    list.push({
      key: 'sterilized',
      label: gender === 'male' ? 'кастр.' : 'стерил.',
      value: sterilized ? 'да' : 'нет',
    })
  }

  return list
})

function truncate(text: string, maxLength = 100) {
  if (!text || text.length <= maxLength) return text

  return text.slice(0, maxLength)
}
</script>

<template>
  <div class="animal-card">
    <img
      :src="animal.photo.url"
      :alt="animal.photo.alternativeText || animal.name"
      class="animal-card__img"
    >

    <div class="animal-card__details">
      <div class="animal-card__name">
        {{ animal.name }}
      </div>
      <div class="animal-card__description">
        {{ truncate(animal.description) }}
      </div>
    </div>

    <div class="animal-card__info">
      <div
        v-for="animalInfoItem in animalInfo"
        :key="animalInfoItem.key"
        class="animal-card__info-item"
      >
        <tooltip-box
          position="top-left"
          :text="animalInfoItem?.tooltip || ''"
        >
          <div class="animal-card__info-item__value">
            {{ animalInfoItem.value }}
          </div>
        </tooltip-box>
        <div class="animal-card__info-label">
          {{ animalInfoItem.label }}
        </div>
      </div>
    </div>

    <div
      class="animal-card__fundraising"
    >
      <div class="animal-card__fundraising-progress" />
      <div class="animal-card__fundraising-finance">
        <div class="animal-card__fundraising-need" />
        <div class="animal-card__fundraising-collected" />
      </div>
    </div>

    <div class="animal-card__actions">
      <btn-default
        class="animal-card__actions-btn"
        style="color: var(--color-light-pink)"
        circle
      >
        <heart-icon width="24" />
      </btn-default>

      <btn-default
        v-if="animal.animalStatus === 'available'"
        class="animal-card__actions-btn"
        style="color: var(--color-dark-green)"
        circle
      >
        <home-icon width="24" />
      </btn-default>

      <btn-default
        v-else-if="animal.animalStatus === 'under_treatment'"
        class="animal-card__actions-btn"
        circle
      >
        <health-icon width="24" />
      </btn-default>
    </div>
  </div>
</template>

<style lang="scss">
.animal-card {
  $his: ".animal-card";

  background-color: var(--color-white);
  border-radius: 24px;
  overflow: hidden;

  &__img {
    display: block;
    height: 210px;
    width: 100%;
    object-fit: cover;

    @media (min-width: $breakpoint-md) {
      height: 210px;
    }

    @media (min-width: $breakpoint-xl) {
      height: 310px;
    }
  }

  &__details {
    padding: 14px 10px;

    @media (min-width: $breakpoint-lg) {
      padding: 20px 14px;
    }
  }

  &__name {
    font-size: 22px;
    font-weight: 800;

    @media (min-width: $breakpoint-lg) {
      margin: 0 0 6px;
    }
  }

  &__description {
    position: relative;
    font-weight: 400;
    line-height: 1.2;
    color: var(--color-chocolate);
    height: 38px;
    overflow: hidden;

    &::after {
      content: '...';
      display: inline-flex;
      position: absolute;
      inset: auto 0 0 auto;
    }
  }

  &__info {
    display: flex;
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
    color: var(--text-brown);
    font-weight: 700;
    font-size: 24px;
    line-height: 1.2;
  }

  &__info-label {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    color: var(--color-chocolate);
  }

  &__fundraising {

  }

  &__fundraising-progress {

  }

  &__fundraising-finance {

  }

  &__fundraising-need {

  }

  &__fundraising-collected {

  }

  &__actions {
    display: flex;
    flex-direction: column;
    position: absolute;
    inset: 10px auto auto 10px;
    gap: 6px;

    @media (min-width: $breakpoint-lg) {
      inset: 20px auto auto 20px;
    }
  }

  &__actions-btn {

  }
}
</style>

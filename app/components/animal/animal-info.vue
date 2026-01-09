<script setup lang="ts">
import type { AnimalData } from '~/api/animals/types';

interface AnimalInfo {
  key: string,
  label: string,
  value: string | number,
  tooltip?: string,
}

const props = defineProps({
  animal: {
    type: Object as PropType<AnimalData>,
    required: true,
  },
  full: {
    type: Boolean,
    default: false,
  },
  short: {
    type: Boolean,
    default: false,
  },
})

const animalGender = computed((): string => {
  return props.animal.gender === 'male' ? 'мальчик' : 'девочка'
})

// Функция для форматирования веса
const formatWeight = (weight?: number): string => {
  if (!weight) return '—'

  return `${weight} кг`
}

// Функция для отображения статуса вакцинации
const getVaccinationStatus = (vaccinated: boolean): string => {
  return vaccinated ? 'да' : 'нет'
}

// Первая строка (основная информация) - всегда показывается
const primaryInfo = computed(() => {
  const { birthDate, sterilized, gender } = props.animal

  const info: AnimalInfo[] = [{
    key: 'age',
    label: 'возраст',
    tooltip: formatDate(birthDate),
    value: getAge(birthDate, true),
  }, {
    key: 'gender',
    label: 'пол',
    value: animalGender.value,
  }]

  if (props.full || !props.short) {
    info.push({
      key: 'sterilized',
      label: gender === 'male' ? 'кастрирован' : 'стерилизована',
      value: sterilized ? 'да' : 'нет',
    })
  }

  return info
})

// Вторая строка (показывается только в full режиме)
const secondaryInfo = computed(() => {
  if (!props.full) return []

  const { weightKg, color, vaccinated, gender } = props.animal

  const info: AnimalInfo[] = [{
    key: 'weight',
    label: 'вес',
    value: formatWeight(weightKg),
  }, {
    key: 'color',
    label: 'окрас',
    value: color || '—',
  }]

  if (!props.short) {
    info.push({
      key: 'vaccinated',
      label: 'вакцинирован' + (gender === 'female' ? 'а' : ''),
      value: getVaccinationStatus(vaccinated),
    })
  }

  return info
})
</script>

<template>
  <div
    class="animal-info"
    :class="{ 'animal-info--full': full }"
  >
    <div class="animal-info__row">
      <div
        v-for="animalInfoItem in primaryInfo"
        :key="animalInfoItem.key"
        class="animal-info__item"
      >
        <tooltip-box
          position="top-left"
          :text="animalInfoItem?.tooltip || ''"
        >
          <div class="animal-info__value">
            {{ animalInfoItem.value }}
          </div>
        </tooltip-box>
        <div class="animal-info__label">
          {{ animalInfoItem.label }}
        </div>
      </div>
    </div>

    <div
      v-if="full && secondaryInfo.length > 0"
      class="animal-info__row"
    >
      <div
        v-for="animalInfoItem in secondaryInfo"
        :key="animalInfoItem.key"
        class="animal-info__item"
      >
        <tooltip-box
          position="top-left"
          :text="animalInfoItem?.tooltip || ''"
        >
          <div class="animal-info__value">
            {{ animalInfoItem.value }}
          </div>
        </tooltip-box>
        <div class="animal-info__label">
          {{ animalInfoItem.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.animal-info {
  $this: '.animal-info';

  display: flex;
  flex-direction: column;

  &__row {
    display: flex;

   & + & {
      border-top: 1px solid var(--color-background-pink);
    }
  }

  &__item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:not(:last-child) {
      border-right: 1px solid var(--color-background-pink);
    }
  }

  &__value {
    color: var(--color-text-brown);
    font-weight: 700;
    font-size: 20px;
    line-height: 1.2;
    z-index: 1;
  }

  &__label {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    color: var(--color-text-chocolate);
  }

  &--full {
    .animal-info__row {
      padding: 12px 0;
    }
  }
}
</style>

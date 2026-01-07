<script setup lang="ts">
import type { CheckboxOption, RadioOption } from '~/types/formElements';
import PawIcon from '~/assets/svg/paw-icon.svg';
import { type AnimalsFilters, makeAnimalsFilters } from '~/helpers/filters/animals';

import type { AnimalData } from '~/api/animals/types'

const props = defineProps({
  filters: {
    type: Object as PropType<AnimalsFilters>,
    default: () => ({}),
  },
})

const ageOptions = computed(() => getAgeOptions(localFilters.species))

const genderOptions: RadioOption[] = [
  { label: 'Все', value: null, key: '0' },
  { label: 'Мальчики', value: 'male', key: '1' },
  { label: 'Девочки', value: 'female', key: '2' },
]

const compatibilityOptions: CheckboxOption[] = [
  { label: 'С кошками', value: 'cat', key: '1' },
  { label: 'С собаками', value: 'dog', key: '2' },
  { label: 'С детьми', value: 'children', key: '3' },
]

const specialNeedsOptions: RadioOption[] = [
  { label: 'Неважно', value: null, key: '0' },
  { label: 'Есть', value: true, key: '1' },
  { label: 'Нет', value: false, key: '2' },
]

const beginnersOptions: RadioOption[] = [
  { label: 'Неважно', value: null, key: '0' },
  { label: 'Да', value: true, key: '1' },
  { label: 'Нет', value: false, key: '2' },
]

const localFilters = reactive(makeAnimalsFilters())

watch(() => props.filters, () => {
  Object.assign(localFilters, props.filters)
}, { immediate: true })

const emit = defineEmits(['reset', 'apply'])

function handleApplyBtn() {
  emit('apply', localFilters)
}

function handleResetBtn() {
  Object.assign(localFilters, makeAnimalsFilters())
  emit('reset', localFilters)
}

function getAgeOptions(species: AnimalData['species'] | null): RadioOption[] {
  if (species === 'dog') {
    return [
      { label: 'Все', value: null, key: '0' },
      { label: 'до 1 года', value: 'now-1y', key: '1' },
      { label: '1–6 лет', value: '1y-6y', key: '2' },
      { label: '6+ лет', value: '6y-30y', key: '3' },
    ]
  }

  if (species === 'cat') {
    return [
      { label: 'Все', value: null, key: '0' },
      { label: 'до 6 мес', value: 'now-6m', key: '1' },
      { label: '6 мес – 7 лет', value: '6m-7y', key: '2' },
      { label: '7+ лет', value: '7y-30y', key: '3' },
    ]
  }

  // Общий вариант для неопределённого вида или универсальный
  return [
    { label: 'Все', value: null, key: '0' },
    { label: 'Малыши', value: 'now-1y', key: '1' },
    { label: 'Молодые', value: '1y-7y', key: '2' },
    { label: 'Взрослые', value: '7y-30y', key: '3' },
  ]
}

</script>

<template>
  <div class="animal-list-filters">
    <ul class="animal-list-filters__list">
      <li class="animal-list-filters__item">
        <div class="animal-list-filters__item-label">
          Возраст
        </div>
        <radio-group
          v-model="localFilters.age"
          :options="ageOptions"
        />
      </li>

      <li class="animal-list-filters__item">
        <div class="animal-list-filters__item-label">
          Пол
        </div>
        <radio-group
          v-model="localFilters.gender"
          :options="genderOptions"
        />
      </li>

      <li class="animal-list-filters__item">
        <div class="animal-list-filters__item-label">
          Совместимость
        </div>
        <checkbox-group
          v-model="localFilters.compatibility"
          :options="compatibilityOptions"
        />
      </li>

      <li class="animal-list-filters__item">
        <div class="animal-list-filters__item-label">
          Особые потребности
        </div>
        <radio-group
          v-model="localFilters.specialNeeds"
          :options="specialNeedsOptions"
        />
      </li>

      <li class="animal-list-filters__item">
        <div class="animal-list-filters__item-label">
          Подходит новичкам
        </div>
        <radio-group
          v-model="localFilters.beginners"
          :options="beginnersOptions"
        />
      </li>
    </ul>

    <div class="animal-list-filters__actions">
      <div class="animal-list-filters__actions-item">
        <btn-default
          style="color: var(--color-pink-dark)"
          @click="handleResetBtn"
        >
          Сбросить
        </btn-default>
      </div>
      <div class="animal-list-filters__actions-item">
        <btn-default
          color="blue"
          @click="handleApplyBtn"
        >
          Применить
        </btn-default>
        <btn-default
          circle
          color="blue"
          @click="handleApplyBtn"
        >
          <paw-icon width="24" />
        </btn-default>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.animal-list-filters {
  $this: '.animal-list-filters';

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    display: flex;
    gap: 10px;
    padding: 10px 0;
    flex-direction: column;
    border-bottom: 1px solid var(--color-white);

    @media (min-width: $mq-md) {
      flex-direction: row;
    }
  }

  &__item-label {
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 24px;
    line-height: 1.2;
    font-weight: 700;
    width: 250px;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0 0;
  }

  &__actions-item {
    display: flex;
  }
}
</style>

<script setup lang="ts">
import type { RadioOption } from '~/types/formElements';
import PawIcon from '~/assets/svg/paw-icon.svg';

const ageOptions: RadioOption[] = [
  { label: 'Все', value: '0-now', key: '0' },
  { label: '3 мес – 2 года', value: '3m-2y', key: '1' },
  { label: '2 – 6 лет', value: '2y-6y', key: '2' },
  { label: 'от 6 лет', value: '6y-now', key: '3' },
]

const filters = reactive({
  age: null as null | string,
})

const emit = defineEmits(['reset', 'apply'])
</script>

<template>
  <div class="animal-filters">
    <ul class="animal-filters__list">
      <li class="animal-filters__item">
        <div class="animal-filters__item-label">
          Возраст
        </div>

        <radio-group
          v-model="filters.age"
          :options="ageOptions"
        />
      </li>
    </ul>
    <div class="animal-filters__actions">
      <div class="animal-filters__actions-item">
        <btn-default
          style="color: var(--color-pink-dark)"
          @click="emit('reset')"
        >
          Очистить фильтр
        </btn-default>
      </div>
      <div class="animal-filters__actions-item">
        <btn-default
          color="blue"
          @click="emit('apply', filters)"
        >
          Применить
        </btn-default>
        <btn-default
          circle
          color="blue"
          @click="emit('apply', filters)"
        >
          <paw-icon width="24" />
        </btn-default>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.animal-filters {
  $this: '.animal-filters';

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    display: flex;
    gap: 10px;

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-white);
    }
  }

  &__item-label {
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 24px;
    line-height: 1.2;
    font-weight: 700;
    width: 166px;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 0 ;
  }

  &__actions-item {
    display: flex;
  }

}
</style>

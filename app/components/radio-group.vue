<script setup lang="ts">
import type { RadioOption } from '~/types/formElements';

const props = defineProps<{
  options: RadioOption[]
  modelValue: unknown
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()

function select(option: RadioOption) {
  emit('update:modelValue', option.value)
}
</script>

<template>
  <div class="radio-group">
    <div
      v-for="option in props.options"
      :key="option.key"
      class="radio-group__item"
      @click="select(option)"
    >
      <div
        class="radio-group__marker"
        :class="{ 'radio-group__marker--checked': props.modelValue === option.value }"
      >
        <div
          v-if="props.modelValue === option.value"
          class="radio-group__dot"
        />
      </div>
      <span class="radio-group__label">{{ option.label }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.radio-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;

  &__item {
    display: flex;
    align-items: center;
    height: 40px;
    border-radius: 20px;
    padding: 0 8px;
    cursor: pointer;
    border: 1px solid var(--color-pink-dark);
    background-color: var(--color-white);
    transition: background-color 0.3s ease;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color-background-beige);
      }
    }
  }

  &__marker {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid var(--color-pink-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 4px 0 0;
    background-color: var(--color-white);
    transition: background-color 0.3s, border-color 0.3s;

    &--checked {
      border-color: var(--color-green-dark);
    }
  }

  &__dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--color-green-dark);
  }

  &__label {
    padding: 0 6px;
    font-size: 16px;
    font-weight: 400;
    color: var(--color-text-brown);
    white-space: nowrap;
  }
}
</style>

<script setup lang="ts">
import type { CheckboxOption } from '~/types/formElements'
import CheckboxIcon from '~/assets/svg/checkbox-icon.svg'

const props = defineProps<{
  options: CheckboxOption[]
  modelValue: unknown[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown[]): void
}>()

function toggle(option: CheckboxOption) {
  const exists = props.modelValue.includes(option.value)

  const newValue = exists
    ? props.modelValue.filter(v => v !== option.value)
    : [...props.modelValue, option.value]

  emit('update:modelValue', newValue)
}
</script>

<template>
  <div class="checkbox-group">
    <div
      v-for="option in props.options"
      :key="option.key"
      class="checkbox-group__item"
      @click="toggle(option)"
    >
      <div
        class="checkbox-group__marker"
        :class="[
          { 'checkbox-group__marker--checked': props.modelValue.includes(option.value) }
        ]"
      >
        <CheckboxIcon
          v-if="props.modelValue.includes(option.value)"
          width="24"
        />
      </div>
      <span class="checkbox-group__label">{{ option.label }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.checkbox-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;

  @media (min-width: $mq-md) {
    gap: 10px;
  }

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
    border-radius: 6px;
    border: 1px solid var(--color-pink-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 4px;
    color: var(--color-white);
    background-color: var(--color-white);
    transition: background-color 0.3s;

    &--checked {
      background-color: var(--color-green-dark);
    }
  }

  &__icon {
    width: 14px;
    height: 14px;
    color: var(--color-white);
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

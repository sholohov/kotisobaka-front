<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to || undefined"
    :class="[
      'button-default',
      `button-default--${color}`,
      { 'button-default--circle': circle }
    ]"
    :type="to ? undefined : 'button'"
  >
    <span
      v-if="$slots['icon-left']"
      class="button-default__icon button-default__icon--left"
    >
      <slot name="icon-left" />
    </span>

    <span class="button-default__text">
      <slot />
    </span>

    <span
      v-if="$slots['icon-right']"
      class="button-default__icon button-default__icon--right"
    >
      <slot name="icon-right" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";

const props = defineProps({
  color: {
    type: String as PropType<'white' | 'blue' | 'green' | 'yellow'>,
    default: 'white',
  },
  iconPosition: {
    type: String as PropType<'left' | 'right'>,
    default: '',
  },
  size: {
    type: [Number, String],
    default: 44,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: '',
  },
})

const sizePx = computed(() => props.size + 'px')
</script>

<style lang="scss">
.button-default {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: v-bind(sizePx);
  padding: 0 14px;
  line-height: 1;
  font-size: 20px;
  font-weight: 700;
  border: 1px solid;
  cursor: pointer;
  border-radius: calc(v-bind(sizePx) / 2);
  transition: color 0.3s, background-color 0.3s, filter 0.3s, border-color 0.3s;

  &__text {
    position: relative;
    z-index: 1;
    display: inline-flex;
    white-space: nowrap;
  }

  &__icon {
    position: relative;
    z-index: 1;
    display: inline-flex;

    &--left {
      margin-left: -4px;
    }

    &--right {
      margin-right: -4px;
    }
  }

  &--white {
    background-color: var(--color-white-darken);
    border-color: var(--color-orange-lighten);
    color: var(--color-brown-darkest);

    &:hover {
      background-color: var(--color-pink-lighten);
    }

    &:active {
      border-color: var(--color-brown-darkest);
      color: var(--color-brown-darkest);
    }
  }

  &--blue {
    background-color: var(--color-blue);
    border-color: var(--color-white);
    color: var(--color-white);
  }

  &--green {
    background-color: var(--color-green);
    border-color: var(--color-white);
    color: var(--color-brown-darkest);
  }

  &--yellow {
    background-color: var(--color-yellow);
    border-color: var(--color-brown-darken);
    color: var(--color-brown-darkest);
  }

  &--circle {
    width: v-bind(sizePx);
    height: v-bind(sizePx);
    border-radius: 50%;
    padding: 0;
  }
}
</style>

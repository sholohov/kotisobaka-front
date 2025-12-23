<template>
  <button
    :class="[
      'button-default',
      `button-default--${color}`,
      { 'button-default--circle': circle }
    ]"
    type="button"
  >
    <span
      v-if="$slots['icon-right']"
      class="button-default__icon button-default__icon--left"
    >
      <slot name="icon-left" />
    </span>

    <span class="button-default__text">
      <slot />
    </span>

    <span
      v-if="$slots['icon-right'] && iconPosition === 'right'"
      class="button-default__icon button-default__icon--right"
    >
      <slot name="icon-right" />
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String as PropType<'white' | 'blue' | 'green' | 'yellow'>,
    default: 'white',
  },
  iconPosition: {
    type: String as PropType<'left' | 'right'>,
    default: '',
  },
  circle: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss">
.button-default {
  $size: 44px;

  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: $size;
  padding: 0 14px;
  line-height: 1;
  font-size: 20px;
  font-weight: 700;
  border: 1px solid;
  cursor: pointer;
  border-radius: calc($size / 2);
  transition: color 0.3s, background-color 0.3s, filter 0.3s, border-color 0.3s;

  &__text {
    position: relative;
    z-index: 1;
    display: inline-flex;
  }

  &__icon {
    position: relative;
    z-index: 1;
    display: inline-flex;

    svg {
      width: 1em;
      height: 1em;
    }

    &--left {
      margin-right: 0.5em;
    }

    &--right {
      margin-left: 0.5em;
    }
  }

  &:hover {
    filter: brightness(0.9) saturate(110%);
  }

  &:active {
    filter: brightness(1);
  }

  &--white {
    background-color: var(--color-white-darken);
    border-color: var(--color-brown-darkest);
    color: var(--color-brown-darkest);

    &:hover {
      background-color: var(--color-pink-lighten);
      border-color: var(--color-red-darken);
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
    border-color: var(--color-brown-darkest);
    color: var(--color-brown-darkest);
  }

  &--circle {
    width: $size;
    height: $size;
    border-radius: 50%;
    padding: 0;
  }
}
</style>

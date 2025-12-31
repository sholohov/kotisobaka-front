<script setup lang="ts">
import { NuxtLink } from "#components";

const props = defineProps({
  color: {
    type: String as PropType<'white' | 'blue' | 'green' | 'yellow'>,
    default: '',
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
  noBorder: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: '',
  },
})

const sizePx = computed(() => props.size + 'px')
const emit = defineEmits(['click'])
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to || undefined"
    :class="[
      'btn-default',
      `btn-default--${color}`,
      { 'btn-default--circle': circle },
      { 'btn-default--no-border': noBorder }
    ]"
    :type="to ? undefined : 'button'"
    @click="emit('click')"
  >
    <span
      v-if="$slots['icon-left']"
      class="btn-default__icon btn-default__icon--left"
    >
      <slot name="icon-left" />
    </span>

    <span class="btn-default__text">
      <slot />
    </span>

    <span
      v-if="$slots['icon-right']"
      class="btn-default__icon btn-default__icon--right"
    >
      <slot name="icon-right" />
    </span>
  </component>
</template>

<style lang="scss">
.btn-default {
  $this: ".btn-default";

  position: relative;
  overflow: hidden;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: v-bind(sizePx);
  padding: 0 14px;
  line-height: 1;
  font-size: 20px;
  font-weight: 700;
  border: 1px solid currentColor;
  cursor: pointer;
  border-radius: calc(v-bind(sizePx) / 2);
  transition: opacity 0.3s, color 0.3s, background-color 0.3s, filter 0.3s, border-color 0.3s;
  background-color: var(--color-white-dark);
  color: var(--color-text-brown);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-color: black;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.3s;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      &::after {
        opacity: 0.1;
      }
    }
  }

  &:active {
    &::after {
      opacity: 0;
    }
  }

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
    background-color: var(--color-white-dark);
    border-color: var(--color-beige-light);
    color: var(--color-text-brown);

    &#{$this}--no-border {
      border-color: var(--color-white-dark);
    }
  }

  &--blue {
    background-color: var(--color-blue);
    border-color: var(--color-white);
    color: var(--color-white);

    &#{$this}--no-border {
      border-color: var(--color-blue);
    }
  }

  &--green {
    background-color: var(--color-green);
    border-color: var(--color-white);
    color: var(--color-white);

    &#{$this}--no-border {
      border-color: var(--color-green);
    }
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
    align-items: center;
    justify-content: center;
  }
}
</style>

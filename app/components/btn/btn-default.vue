<script setup lang="ts">
import { NuxtLink } from '#components';

const props = defineProps({
  color: {
    type: String as PropType<'white' | 'blue' | 'green' | 'yellow' | 'orange'>,
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
  disabled: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: '',
  },
  badge: {
    type: [Number, String],
    default: null,
    validator: (value: unknown) => {
      if (value === null || value === undefined) return true;
      const num = parseInt(value as string);

      return !isNaN(num) && num >= 0;
    },
  },
})

const sizePx = computed(() => props.size + 'px')
const emit = defineEmits(['click', 'camelCase'])

const formattedBadge = computed(() => {
  if (props.badge === null || props.badge === undefined) return null;

  const num = parseInt(props.badge.toString());

  if (isNaN(num)) return null;
  if (num > 99) return '99+';

  return num.toString();
})
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to || undefined"
    :class="[
      'btn-default',
      `btn-default--${color}`,
      { 'btn-default--circle': circle },
      { 'btn-default--no-border': noBorder },
      { 'btn-default--has-badge': formattedBadge }
    ]"
    :disabled="disabled"
    :type="to ? undefined : 'button'"
    @click="emit('click')"
  >
    <span
      v-if="formattedBadge"
      class="btn-default__badge"
    >
      {{ formattedBadge }}
    </span>

    <span class="btn-default__text">
      <slot />
    </span>
  </component>
</template>

<style lang="scss">
.btn-default {
  $this: ".btn-default";

  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: v-bind(sizePx);
  padding: 0 20px;
  line-height: 1;
  font-size: 20px;
  font-weight: 700;
  border: 1px solid currentColor;
  cursor: pointer;
  border-radius: calc(v-bind(sizePx) / 2);
  transition: all 0.3s ease;
  background-color: var(--color-text-beige);
  color: var(--color-text-brown);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    pointer-events: none;
    user-select: none;
  }

  &--no-border {
    border: var(--color-text-beige);
  }

  &__text {
    position: relative;
    z-index: 1;
    display: inline-flex;
    white-space: nowrap;
  }

  @include hover {
    box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.98);
    transition-duration: 0.1s;
  }

  &__badge {
    position: absolute;
    top: -8px;
    right: -8px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 5px;
    background-color: var(--color-beige-light);
    color: var(--color-text-brown);
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    border-radius: 10px;
    box-sizing: border-box;
    white-space: nowrap;
    pointer-events: none;
    transition: inherit;

    #{$this}--circle & {
      top: -5px;
      right: -5px;
    }
  }

  &--white {
    background-color: var(--color-text-beige);
    border-color: var(--color-beige-light);
    color: var(--color-text-brown);

    &#{$this}--no-border {
      border-color: var(--color-text-beige);
    }
  }

  &--blue {
    background-color: var(--color-blue);
    border-color: var(--color-white);
    color: var(--color-white);

    &#{$this}--no-border {
      border-color: var(--color-blue);
    }

    @include hover {
      box-shadow: inset 0 0 0 1000px rgba(255, 255, 255, 0.2);
    }
  }

  &--green {
    background-color: var(--color-green);
    border-color: var(--color-white);
    color: var(--color-white);

    &#{$this}--no-border {
      border-color: var(--color-green);
    }

    @include hover {
      box-shadow: inset 0 0 0 1000px rgba(255, 255, 255, 0.2);
    }
  }

  &--yellow {
    background-color: var(--color-yellow);
    border-color: var(--color-white);
    color: var(--color-white);

    &#{$this}--no-border {
      border-color: var(--color-yellow);
    }
  }

  &--yellow-light {
    background-color: var(--color-yellow-light);
    border-color: var(--color-white);
    color: var(--color-white);

    &#{$this}--no-border {
      border-color: var(--color-yellow);
    }
  }

  &--orange {
    background-color: var(--color-orange);
    border-color: var(--color-white);
    color: var(--color-white);

    &#{$this}--no-border {
      border-color: var(--color-orange);
    }
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

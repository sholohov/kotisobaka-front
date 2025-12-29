<template>
  <div
    class="tooltip-box"
    @mouseenter="startShow"
    @mouseleave="hide"
    @focusin="startShow"
    @focusout="hide"
  >
    <slot />

    <transition name="tooltip-box-">
      <div
        v-if="show && !isMobileOrTablet"
        class="tooltip-box__message"
        :class="`tooltip-box__message--${position}`"
      >
        {{ text }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  position: {
    type: String as PropType<'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' >,
    default: 'top',
  },
  delay: {
    type: Number,
    default: 500,
  },
})

const { isMobileOrTablet } = useDevice()
const show = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

function startShow() {
  if (!props.text) return

  timer = setTimeout(() => {
    show.value = true
  }, props.delay)
}

function hide() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  show.value = false
}
</script>

<style lang="scss">
.tooltip-box {
  position: relative;
  display: inline-flex;
  user-select: none;

  &__message {
    position: absolute;
    background-color: var(--color-white-darken);
    border: 1px solid var(--color-orange-lighten);
    color: var(--text-brown);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    z-index: 10;

    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: var(--color-white-darken);
      border: 1px solid var(--color-orange-lighten);
      transform: rotate(45deg);
    }

    /* --- уже существующие top/bottom --- */

    &--top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 10px;

      &::after {
        top: calc(100% - 4px);
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        border-top: none;
        border-left: none;
      }
    }

    &--bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 10px;

      &::after {
        bottom: calc(100% - 4px);
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        border-bottom: none;
        border-right: none;
      }
    }

    /* --- новые варианты --- */

    &--top-left {
      bottom: 100%;
      left: 0;
      transform: translateX(0);
      margin-bottom: 10px;

      &::after {
        top: calc(100% - 4px);
        left: 10px; // стрелка ближе к левому краю
        transform: rotate(45deg);
        border-top: none;
        border-left: none;
      }
    }

    &--top-right {
      bottom: 100%;
      right: 0;
      transform: translateX(0);
      margin-bottom: 10px;

      &::after {
        top: calc(100% - 4px);
        right: 10px; // стрелка ближе к правому краю
        transform: rotate(45deg);
        border-top: none;
        border-left: none;
      }
    }

    &--bottom-left {
      top: 100%;
      left: 0;
      transform: translateX(0);
      margin-top: 10px;

      &::after {
        bottom: calc(100% - 4px);
        left: 10px;
        transform: rotate(45deg);
        border-bottom: none;
        border-right: none;
      }
    }

    &--bottom-right {
      top: 100%;
      right: 0;
      transform: translateX(0);
      margin-top: 10px;

      &::after {
        bottom: calc(100% - 4px);
        right: 10px;
        transform: rotate(45deg);
        border-bottom: none;
        border-right: none;
      }
    }
  }
}
</style>

<template>
  <div
    class="content-box"
    :class="{
      'content-box--no-padding': props.noPadding
    }"
  >
    <div class="content-box__inner">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  noPadding: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})
</script>

<style lang="scss">
.content-box {
  $this: '.content-box';

  &__inner {
    width: 100%;
    min-height: 100%;
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
    max-width: $container-max-width;
  }

  &:not(#{$this}--no-padding) {
    padding-left: $container-padding-xs;
    padding-right: $container-padding-xs;

    @media (min-width: $breakpoint-xs) {
      padding-left: $container-padding-xs;
      padding-right: $container-padding-xs;
    }

    @media (min-width: $breakpoint-md) {
      padding-left: $container-padding-md;
      padding-right: $container-padding-md;
    }

    @media (min-width: $breakpoint-xl) {
      padding-left: $container-padding-xl;
      padding-right: $container-padding-xl;
    }
  }

  &--no-padding {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>

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
    padding-left: $container-padding-xxs;
    padding-right: $container-padding-xxs;

    @media (min-width: $mq-xxs) {
      padding-left: $container-padding-xxs;
      padding-right: $container-padding-xxs;
    }

    @media (min-width: $mq-xs) {
      padding-left: $container-padding-xs;
      padding-right: $container-padding-xs;
    }

    @media (min-width: $mq-lg) {
      padding-left: $container-padding-lg;
      padding-right: $container-padding-lg;
    }

    @media (min-width: $mq-xl) {
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

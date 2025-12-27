<template>
  <section
    class="page-section"
    :style="elementsStyle"
  >
    <a
      :href="`#${anchor}`"
      class="page-section__title"
    />

    <h2 class="page-section__title">
      {{ title }}
    </h2>

    <content-box class="page-section__content">
      <slot />
    </content-box>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType, CSSProperties } from 'vue'

const props = defineProps({
  title: {
    type: String as PropType<string>,
    default: '',
  },
  anchor: {
    type: String as PropType<string>,
    default: '',
  },
  backgroundImage: {
    type: String as PropType<string>,
    default: '',
  },
  backgroundColor: {
    type: String as PropType<string>,
    default: '',
  },
  minHeight: {
    type: String as PropType<string>,
    default: 'auto',
  },
})

const elementsStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    minHeight: props.minHeight,
  }

  if (props.backgroundImage) {
    style.backgroundImage = `url('${props.backgroundImage}')`
  }

  if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor
  }

  return style
})
</script>

<style lang="scss">
.page-section {
  $this: ".page-section";

  position: relative;
  width: 100%;
  box-sizing: border-box;

  &__title {
    font-weight: 800;
    font-style: normal;
    font-size: 50px;
    line-height: 100%;
  }

  &__content {
    position: relative;
    z-index: 2;
    width: 100%;
  }
}
</style>

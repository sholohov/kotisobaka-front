<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    class="svg-icon"
    aria-hidden="true"
    :style="size ? {
      width: size + 'px',
      height: size + 'px',
    } : {}"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const icons = import.meta.glob('@/assets/icons/**/*.svg', {
  eager: true,
  import: 'default',
})

type IconName = keyof typeof icons extends `@/assets/icons/${infer Name}.svg` ? Name : string

const props = defineProps({
  name: {
    type: String as PropType<IconName>,
    required: true,
  },
  size: {
    type: [Number, String],
    default: null,
  },
})

const iconComponent = computed(() => {
  const path = `/assets/icons/${props.name}.svg`

  return icons[path] || icons[`@/assets/icons/${props.name}.svg`]
})
</script>

<style lang="scss">
.svg-icon {
  fill: currentColor;
  width: 24px;
  height: 24px;
}
</style>

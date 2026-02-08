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
  const path = Object.keys(icons).find(key => key.endsWith(`${props.name}.svg`))

  if (!path) {
    console.warn(`Icon "${props.name}" not found in assets/icons`)

    return 'span'
  }

  return icons[path]
})
</script>

<template>
  <component
    :is="iconComponent"
    :key="name"
    class="svg-icon"
    :class="[
      { 'svg-icon--not-found': !iconComponent }
    ]"
    aria-hidden="true"
    :style="size ? {
      width: size + 'px',
      height: size + 'px',
    } : {}"
  />
</template>

<style lang="scss">
.svg-icon {
  width: 24px;
  height: 24px;
}
</style>

<template>
  <section
    class="page-section"
    :style="{ minHeight: minHeight }"
  >
    <a
      v-if="anchor"
      :href="`#${anchor}`"
      class="page-section__anchor"
    />

    <h2
      v-if="title"
      class="page-section__title"
    >
      {{ title }}
    </h2>

    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String as PropType<string>,
    default: '',
  },
  anchor: {
    type: String as PropType<string>,
    default: '',
  },
  minHeight: {
    type: String as PropType<string>,
    default: 'auto',
  },
})
</script>

<style lang="scss">
.page-section {
  $this: ".page-section";

  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0 80px;

  &__anchor {
    position: absolute;
    top: -64px;
  }

  &__title {
    font-weight: 800;
    font-style: normal;
    font-size: 50px;
    line-height: 100%;
  }
}
</style>

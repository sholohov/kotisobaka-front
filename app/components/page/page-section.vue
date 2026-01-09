<template>
  <section
    class="page-section"
    :style="{ minHeight: minHeight }"
  >
    <div
      v-if="anchor"
      :id="anchor"
      class="page-section__anchor"
    />

    <content-box v-if="title || $slots['header-end']">
      <div
        class="page-section__header"
        :class="[
          {'page-section__header--right-padding': rightPadding}
        ]"
      >
        <h2 class="page-section__title">
          {{ title }}
        </h2>
        <slot name="header-end" />
      </div>
    </content-box>

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
  rightPadding: {
    type: Boolean,
    default: false,
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
    font-size: 26px;
    line-height: 0.85;
    height: 44px;
    display: flex;
    align-items: flex-end;

    @media (min-width: $mq-lg) {
      font-size: 36px;
    }
  }

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    margin: 0 0 20px;
    gap: 10px;

    @media (min-width: $mq-sm) {
      gap: 20px;
      flex-direction: row;
    }

    @media (min-width: $mq-lg) {
      margin: 0 0 30px;
      gap: 30px;
    }

    &--right-padding {
      padding-right: 100px;
    }
  }
}
</style>

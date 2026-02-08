<script setup lang="ts">
import type { ReviewData } from '~/api/reviews/types';

defineProps({
  stories: {
    type: Array as PropType<ReviewData[]>,
    required: true,
  },
})

</script>

<template>
  <div class="stories-slider">
    <content-box>
      <common-slider
        :items="stories"
        two-column
        class="stories-slider__slider"
      >
        <template #default="{ data }">
          <stories-card
            :story="data"
            short
          />
        </template>
      </common-slider>

      <div class="stories-slider__link">
        <btn-default
          to="/about/stories"
          color="green"
          style="width: 240px"
        >
          Все истории
        </btn-default>
        <btn-default
          to="/about/stories"
          color="green"
          circle
        >
          <svg-icon name="paw-icon" />
        </btn-default>
      </div>
    </content-box>
  </div>
</template>

<style lang="scss">
.stories-slider {
  $this: '.stories-slider';

  &__slider {
    margin: 0 0 20px;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

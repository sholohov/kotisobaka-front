<script setup lang="ts">
import type { Article } from '~/api/articles/types';
import BlogIcon from '~/assets/svg/blog-icon.svg'

defineProps({
  articles: {
    type: Array as PropType<Article[]>,
    required: true,
  },
})
</script>

<template>
  <div class="articles-slider">
    <content-box>
      <common-slider
        :items="articles"
        class="articles-slider__slider"
      >
        <template #default="{ slide }">
          <articles-card :article="slide" />
        </template>
      </common-slider>

      <div class="articles-slider__link">
        <btn-default
          to="/articles"
          color="green"
          style="width: 240px"
        >
          Все статьи
        </btn-default>
        <btn-default
          to="/articles"
          color="green"
          circle
        >
          <blog-icon width="24" />
        </btn-default>
      </div>
    </content-box>
  </div>
</template>

<style lang="scss">
.articles-slider {
  $this: '.articles-slider';

  &__slider {
    margin: 0 0 20px;
  }

  &__link {
    display: flex;
    justify-content: center;
  }
}
</style>

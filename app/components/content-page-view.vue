<script setup lang="ts">
import { api } from '~/api';

const route = useRoute()

const { data: infoPageResponse } = await useAsyncData('content-page-view--' + route.path, () => {
  return api.contentPages.get({
    filters: {
      path: { $eq: route.path },
    },
  })
})

const infoPage = infoPageResponse.value?.data[0]
</script>

<template>
  <content-box class="content-page-view">
    <div
      v-if="infoPage"
      class="content-page-view__inner"
    >
      <h1 class="content-page-view__title">
        {{ infoPage.title }}
      </h1>
      <p class="content-page-view__summary">
        {{ infoPage.summary }}
      </p>
      <markdown-viewer
        :content="infoPage.content"
        class="content-page-view__content"
      />
    </div>
    <div
      v-else
      class="content-page-view__empty"
    >
      Данные для "{{ route.path }}" отсутствуют
    </div>
  </content-box>
</template>

<style lang="scss">
.content-page-view {
  $this: '.content-page-view';

  display: flex;
  flex-direction: column;
  padding: 100px 0 50px;

  @media (min-width: $mq-sm) {
    padding: 100px 0 50px;
  }

  @media (min-width: $mq-md) {
    padding: 120px 0 60px;
  }

  @media (min-width: $mq-lg) {
    padding: 140px 0 70px;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    max-width: 900px;
    margin: 0 auto;
  }

  &__title {
    font-weight: 800;
    font-size: 26px;
    line-height: 100%;
    margin: 0 0 20px;
    color: var(--color-pink-dark);

    @media (min-width: $mq-lg) {
      font-size: 30px;
    }
  }

  &__summary {
    font-weight: 700;
    font-size: 18px;
    line-height: 120%;
    margin: 0 0 30px;
    color: var(--color-text-chocolate);

    @media (min-width: $mq-lg) {
      margin: 0 0 50px;
    }
  }

  &__empty {
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: center;
  }
}
</style>

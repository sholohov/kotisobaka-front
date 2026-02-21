<script setup lang="ts">
import { api } from '~/api';

definePageMeta({
  pageTitle: 'Счастливые истории',
  pageTitleIcon: 'stories',
})

const iconCards: {
  id: string
  icon: Component
}[] = [{
  id: '1',
  icon: defineAsyncComponent(() => import('~/assets/svg/stories/girl-with-cat.svg')),
}, {
  id: '2',
  icon: defineAsyncComponent(() => import('~/assets/svg/stories/man-with-dog.svg')),
}, {
  id: '3',
  icon: defineAsyncComponent(() => import('~/assets/svg/stories/girl-with-cat.svg')),
}, {
  id: '4',
  icon: defineAsyncComponent(() => import('~/assets/svg/stories/man-with-dog.svg')),
}, {
  id: '5',
  icon: defineAsyncComponent(() => import('~/assets/svg/stories/girl-with-cat.svg')),
}, {
  id: '6',
  icon: defineAsyncComponent(() => import('~/assets/svg/stories/man-with-dog.svg')),
}]

const { data: storiesResponse } = await useAsyncData('stories-page', () => {
  return api.reviews.get({
    populate: ['photo'],
    sort: ['date:desc'],
  })
})
</script>

<template>
  <div
    v-if="storiesResponse?.data"
    class="stories-page"
  >
    <page-section>
      <content-box>
        <common-grid
          two-column
          :interspersed="iconCards"
          :interspersed-indexes="[2,5,8,11,14,17,20]"
          :items="storiesResponse.data"
        >
          <template #default="{ data }">
            <stories-card :story="data" />
          </template>

          <template #interspersed="{ data }">
            <div
              class="stories-page__interspersed"
              :style="{ color: `var(--color-${data.color}-dark)` }"
            >
              <component
                :is="data.icon"
                class="stories-page__interspersed-icon"
              />
            </div>
          </template>
        </common-grid>
      </content-box>
    </page-section>
  </div>
</template>

<style lang="scss">
.stories-page {
  $this: '.stories-page';

  &__interspersed {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 60% 0 0;
  }

  &__interspersed-icon {
    position: absolute;
    inset: 0;
    width: auto;
    height: 80%;
    margin: auto;
    color: inherit;
    @include imageGradient;
  }
}
</style>

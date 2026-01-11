<script setup lang="ts">
import { api } from '~/api';
import type { ArticleData } from '~/api/articles/types';
import type { ArticleTag } from '~/api/articleTags/types';
import type { RadioOption } from '~/types/formElements';

definePageMeta({
  pageTitle: 'Блог и новости',
  pageTitleIcon: 'articles',
})

const interspersed: {
  id: string
  color: string
  icon: Component
}[] = [{
  id: '1',
  color: 'orange',
  icon: defineAsyncComponent(() => import('~/assets/svg/articles/cat-on-a-skateboard.svg')),
}, {
  id: '2',
  color: 'blue',
  icon: defineAsyncComponent(() => import('~/assets/svg/articles/dog.svg')),
}, {
  id: '3',
  color: 'pink',
  icon: defineAsyncComponent(() => import('~/assets/svg/articles/cat-with-phone.svg')),
}, {
  id: '4',
  color: 'green',
  icon: defineAsyncComponent(() => import('~/assets/svg/articles/fit-cat.svg')),
}]

const pagination = reactive({
  page: 0,
  pageCount: 0,
})

const filters = reactive({
  tag: null as ArticleTag['name'] | null,
  type: null as ArticleData['type'] | null,
})

// const { data: articleTagsResponse } = await useAsyncData('articles-tags', () => {
//   return api.articleTags.get()
// })

const { data: articlesResponse } = await useAsyncData('articles-page', () => {
  const { tag, type } = filters

  return api.articles.get({
    populate: ['coverImage', 'tag'],
    pagination: {
      page: pagination.page,
      pageSize: 15,
    },
    filters: {
      tag: tag ? { name: { $eq: tag } } : undefined,
      type: type ? { $eq: type } : undefined,
    },
  })
}, {
  watch: [pagination, filters],
  deep: true,
})

const filtersOptions: RadioOption[] = [{
  label: 'Всё',
  key: '0',
  value: null,
}, {
  label: 'Новости',
  key: '1',
  value: 'news',
}, {
  label: 'Блог',
  key: '2',
  value: 'blog',
}]
</script>

<template>
  <div class="articles-page">
    <page-section>
      <content-box>
        <div class="articles-page__filters">
          <radio-group
            v-model="filters.type"
            :options="filtersOptions"
          />
        </div>
        <common-grid
          v-if="articlesResponse"
          :items="articlesResponse?.data"
          :interspersed="interspersed"
          :interspersed-position="2"
          :interspersed-start="1"
        >
          <template #default="{ item }">
            <articles-card :article="item" />
          </template>
          <template #interspersed="{ item }">
            <div
              class="articles-page__interspersed"
              :class="['articles-page__interspersed--' + item.color]"
            >
              <component
                :is="item.icon"
                class="articles-page__interspersed-icon"
              />
            </div>
          </template>
        </common-grid>
      </content-box>
    </page-section>
  </div>
</template>

<style lang="scss">
.articles-page {
  $this: '.articles-page';

  &__filters {
    display: flex;
    justify-content: center;
    margin: 0 0 42px;
  }

  &__interspersed {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 60% 0 0;

    &--orange {
      color: var(--color-orange-dark);
    }

    &--pink {
      color: var(--color-pink-dark);
    }

    &--green {
      color: var(--color-green-dark);
    }

    &--blue {
      color: var(--color-blue-dark);
    }
  }

  &__interspersed-icon {
    position: absolute;
    inset: 0;
    width: auto;
    height: 60%;
    margin: auto;
    color: inherit;
    @include imageGradient;
  }
}
</style>

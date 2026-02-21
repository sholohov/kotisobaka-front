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

const { data: articleTagsResponse } = await useAsyncData('articles-tags', () => {
  return api.articleTags.get({
    populate: {
      articles: {
        fields: ['id'],
      },
    },
  })
})

const { data: articlesResponse } = await useAsyncData('articles-page', () => {
  const { tag, type } = filters
  const now = new Date().toISOString()

  return api.articles.get({
    populate: ['coverImage', 'tag'],
    pagination: {
      page: pagination.page,
      pageSize: 15,
    },
    filters: {
      tag: tag && tag !== 'все' ? { name: { $eq: tag } } : undefined,
      type: type ? { $eq: type } : undefined,
      publishedDate: {
        $lte: now,
      },
    },
    sort: ['publishedDate:desc'],
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

const articlesTags = computed((): (ArticleTag & { isActive: boolean })[] => {
  return [
    { name: 'все', color: 'white', slug: 'all-tags' },
    ...(articleTagsResponse.value?.data ?? []).filter(i => i.articles?.length),
  ].map(tag => {
    const isActive = Boolean(filters.tag?.includes(tag.name))
      || (tag.slug === 'all-tags' && !filters.tag?.length)

    return { ...tag, isActive }
  })
})

function handleTagBtn(tag: ArticleTag) {
  filters.tag = tag.name
}

watch(() => articlesResponse.value?.meta.pagination, (metaPagination) => {
  if (metaPagination && 'page' in metaPagination) {
    pagination.page = metaPagination.page ?? 1
    pagination.pageCount = metaPagination.pageCount ?? 0
  }
}, { immediate: true })

function handlePageChange(page: number) {
  pagination.page = page
  document.querySelector('#articles_list')?.scrollIntoView()
}
</script>

<template>
  <div class="articles-page">
    <page-section
      v-if="articlesResponse?.data.length"
      anchor="articles_list"
    >
      <content-box>
        <div class="articles-page__filters">
          <radio-group
            v-model="filters.type"
            :options="filtersOptions"
          />
        </div>
        <ul
          v-if="articlesTags.length"
          class="articles-page__tags"
        >
          <li
            v-for="tag in articlesTags"
            :key="tag.slug"
            class="articles-page__tags-item"
            :style="{ backgroundColor: tag.color }"
          >
            <button
              class="articles-page__tags-link"
              @click="handleTagBtn(tag)"
            >
              <span
                v-if="tag.isActive"
                class="articles-page__tags-icon"
              >
                <svg-icon name="checkbox-icon" />
              </span>

              <span class="articles-page__tags-name">
                #{{ tag.name }}
              </span>
            </button>
          </li>
        </ul>

        <common-grid
          v-if="articlesResponse"
          :items="articlesResponse?.data"
          :interspersed="interspersed"
          :interspersed-indexes="[3,5,10,15]"
        >
          <template #default="{ data }">
            <articles-card :article="data" />
          </template>
          <template #interspersed="{ data }">
            <div
              class="articles-page__interspersed"
              :style="{ color: `var(--color-${data.color})`}"
            >
              <component
                :is="data.icon"
                class="articles-page__interspersed-icon"
              />
            </div>
          </template>
        </common-grid>

        <div
          v-if="pagination.pageCount - 1"
          class="articles-page__pagination"
        >
          <page-pagination
            :total-pages="pagination.pageCount"
            :current-page="pagination.page"
            :on-change="handlePageChange"
          />
        </div>
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

  &__tags {
    list-style: none;
    display: flex;
    overflow-x: auto;
    margin: 0 0 20px;
    padding: 0;
    gap: 10px;

    @media (min-width: $mq-md) {
      margin: 0 0 30px;
    }
  }

  &__tags-item {
    display: flex;
    flex: none;
    border: 1px solid var(--color-text-chocolate);
    border-radius: 18px;
    overflow: hidden;
    background-color: var(--color-white);
  }

  &__tags-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-green);
    color: var(--color-white);
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }

  &__tags-link {
    height: 36px;
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    color: var(--color-text-chocolate);
    cursor: pointer;
    transition: background-color 0.3s;

    @include hover {
      background-color: rgba(225, 255, 255, 0.5);
    }
  }

  &__tags-name {
    padding: 0 8px;
  }

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
    height: 60%;
    margin: auto;
    @include imageGradient;
  }

  &__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0 0;
  }
}
</style>

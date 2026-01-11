<script setup lang="ts">
import { api } from '~/api';

const route = useRoute()
const slug = computed(() => route.params.slug)

const { data: articleResponse } = await useAsyncData('article-' + slug.value, () => {
  if (!slug.value) {
    throw new Error('Не передан "slug"')
  }

  return api.articles.get({
    populate: ['coverImage', 'tag'],
    filters: {
      slug: {
        $eq: slug.value,
      },
    },
  })
})

const article = articleResponse.value?.data[0] ?? null

const { data: similarNewsData } = await useAsyncData('article-similar-' + article?.tag?.slug || 'default', () => {
  return api.articles.get({
    populate: ['coverImage', 'tag'],
    filters: {
      tag: article?.tag?.slug ? { slug: { $eq: article.tag.slug } } : undefined,
    },
  })
})

const formatedDate = computed(() => {
  const { publishedDate } = article

  if (!publishedDate || !Date.parse(publishedDate)) {
    return 'Invalid Date'
  }

  return Intl.DateTimeFormat('ru', {
    dateStyle: 'short',
  }).format(Date.parse(publishedDate))
})
</script>

<template>
  <div
    v-if="article"
    class="article-page"
  >
    <page-section>
      <content-box>
        <div class="article-page__header">
          <h1 class="article-page__title">
            {{ article.title }}
          </h1>

          <div class="article-page__excerpt">
            {{ article.excerpt }}
          </div>

          <ul class="article-page__tags">
            <li class="article-page__tag">
              <span class="article-page__tag-text">
                {{ formatedDate }}
              </span>
            </li>
            <li
              v-if="article.readingTime"
              class="article-page__tag"
            >
              <span class="article-page__tag-text">
                {{ article.readingTime }} мин
              </span>
            </li>
            <li
              v-if="article.tag"
              class="article-page__tag article-page__tag--hash"
            >
              <span class="article-page__tag-text">
                #{{ article.tag.name }}
              </span>
            </li>
          </ul>

          <div class="article-page__picture">
            <img
              :src="article.coverImage?.url"
              :alt="article.coverImage?.alternativeText || article.slug"
              class="article-page__img"
            >
          </div>
        </div>

        <markdown-viewer
          class="article-page__content"
          :content="article.content"
        />
      </content-box>
    </page-section>

    <page-section
      v-if="similarNewsData?.data.length"
      title="Вам может быть интересно"
    >
      <articles-slider :articles="similarNewsData.data" />
    </page-section>
  </div>
</template>

<style lang="scss">
.article-page {
  $this: '.article-page';

  padding: 80px 0 0;

  @media (min-width: $mq-sm) {
    padding: 100px 0 0;
  }

  @media (min-width: $mq-md) {
    padding: 120px 0 0;
  }

  &__content, &__header {
    max-width: 900px;
    margin: 0 auto 50px;
  }

  &__title {
    font-weight: 800;
    line-height: 1;
    margin: 0 0 20px;
    color: var(--color-pink-dark);
    font-size: 26px;

    @media (min-width: $mq-md) {
      font-size: 30px;
    }
  }

  &__tags {
    display: flex;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0 0 30px;

    @media (min-width: $mq-md) {
      margin: 0 0 50px;
    }
  }

  &__tag {
    position: relative;
    color: var(--color-text-chocolate);
    border: 1px solid var(--color-text-chocolate);
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;

    padding: 2px 6px;
    overflow: hidden;

    &--hash {
      color: rgba(0, 0, 0, 0.7);

      &::before {
        content: '';
        display: flex;
        position: absolute;
        inset: 0;
        background-color: v-bind('article?.tag?.color');
      }
    }
  }

  &__tag-text {
    position: relative;
  }

  &__link {
    position: absolute;
    inset: 0;
  }

  &__excerpt {
    font-size: 18px;
    font-weight: 700;

    margin: 0 0 12px;
  }

  &__picture {
    position: relative;
    display: flex;
    width: 100%;
    padding: 56% 0 0;
    border-radius: 24px;
    overflow: hidden;
  }

  &__img {
    display: flex;
    height: 100%;
    width: 100%;
    position: absolute;
    inset: 0;
    object-fit: cover;
  }
}
</style>

<script setup lang="ts">
import type { ArticleData } from '~/api/articles/types';
import ArrowRightIcon from '~/assets/svg/arrow-right-icon.svg';

const props = defineProps({
  article: {
    type: Object as PropType<ArticleData>,
    required: true,
  },
})

const formatedDate = computed(() => {
  const { publishedDate } = props.article

  if (!publishedDate || !Date.parse(publishedDate)) {
    return 'Invalid Date'
  }

  return Intl.DateTimeFormat('ru', {
    dateStyle: 'short',
  }).format(Date.parse(publishedDate))
})
</script>

<template>
  <div class="articles-card">
    <div class="articles-card__header">
      <div class="articles-card__img-wrapper">
        <img
          :src="article.coverImage?.url"
          :alt="article.coverImage?.alternativeText || article.title"
          class="articles-card__img"
        >
      </div>
      <div class="articles-card__title">
        {{ article.title }}
      </div>
    </div>
    <div class="articles-card__body">
      <div class="articles-card__excerpt">
        {{ article.excerpt }}
      </div>
      <ul class="articles-card__tags">
        <li class="articles-card__tag">
          <span class="articles-card__tag-text">
            {{ formatedDate }}
          </span>
        </li>
        <li
          v-if="article.readingTime"
          class="articles-card__tag"
        >
          <span class="articles-card__tag-text">
            {{ article.readingTime }} мин
          </span>
        </li>
        <li
          v-if="article.tag"
          class="articles-card__tag articles-card__tag--hash"
        >
          <span class="articles-card__tag-text">
            #{{ article.tag.name }}
          </span>
        </li>
      </ul>

      <div class="articles-card__more">
        подробнее
      </div>

      <arrow-right-icon
        class="articles-card__more-icon"
        width="24px"
      />
    </div>
    <nuxt-link
      :to="`/articles/${article.slug}`"
      class="articles-card__link"
      :aria-label="`Прейти к новости '${article.title}'`"
    />
  </div>
</template>

<style lang="scss">
.articles-card {
  $this: '.articles-card';

  @keyframes arrow-right-move {
    0% {
      transform: translateX(0);
    }
    10% {
      transform: translateX(4px);
    }
    20% {
      transform: translateX(-2px);
    }
    30% {
      transform: translateX(4px);
    }
    40% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(0);
    }
  }

  display: flex;
  flex-direction: column;
  position: relative;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      #{$this}__header, #{$this}__body {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07),
        0 4px 8px rgba(0, 0, 0, 0.035);
      }

      #{$this}__img {
        transform: scale(1.1);
      }

      #{$this}__more {
        opacity: 1;
      }

      #{$this}__more-icon {
        animation: arrow-right-move 4s ease-in-out infinite;
      }
    }
  }

  &__header {
    overflow: hidden;
    border-radius: 24px;
    background-color: var(--color-white);
    margin: 0 0 6px;
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  }

  &__img-wrapper {
    position: relative;
    padding: calc(100% * 0.7) 0 0;
    overflow: hidden;
  }

  &__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &__title {
    padding: 14px;
    font-weight: 700;
    font-size: 18px;
    line-height: 1.2;
    height: 72px;
    overflow: hidden;

    @media (min-width: $mq-xl) {
      padding: 20px;
      height: 92px;
      font-size: 20px;
    }
  }

  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 14px;
    border-radius: 24px;
    background-color: var(--color-white);
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;

    @media (min-width: $mq-lg) {
      padding: 20px;
    }
  }

  &__excerpt {
    position: relative;
    font-weight: 400;
    line-height: 1.2;
    height: 100px;
    overflow: hidden;
    margin: 0 0 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    max-height: calc(1.2em * 2);
  }

  &__tags {
    display: flex;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0 24px 0 0;
  }

  &__tag {
    position: relative;
    color: var(--color-text-chocolate);
    border: 1px solid var(--color-text-chocolate);
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    padding: 2px 6px;
    overflow: hidden;

    &--hash {
      color: rgba(0, 0, 0, 0.7);

      &::before {
        content: '';
        display: flex;
        position: absolute;
        inset: 0;
        background-color: v-bind('article.tag?.color');
      }
    }
  }

  &__tag-text {
    position: relative;
  }

  &__more {
    font-weight: 700;
    position: absolute;
    bottom: 0;
    display: flex;
    padding: 14px;
    right: 40px;
    background-color: var(--color-white);
    transition: opacity 0.5s;
    opacity: 0;

    @media (min-width: $mq-lg) {
      padding: 20px;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0 auto 0 -24px;
      width: 24px;
      display: flex;
      background: linear-gradient(to right, rgba(0, 0, 0, 0), var(--color-white));
    }
  }

  &__more-icon {
    position: absolute;
    bottom: 14px;
    right: 14px;
    display: flex;
    color: var(--color-blue);

    @media (min-width: $mq-lg) {
      bottom: 20px;
      right: 20px;
    }
  }

  &__link {
    position: absolute;
    inset: 0;
  }
}
</style>

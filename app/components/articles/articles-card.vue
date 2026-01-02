<script setup lang="ts">
import type { Article } from '~/api/articles/types';

const props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true,
  },
})

export type ArticleTag = NonNullable<Article['tag']>

export interface TagConfig {
  id: ArticleTag
  label: string
  color: string
}

const TAGS_CONFIG: Record<ArticleTag, TagConfig> = {
  cat: {
    id: 'cat',
    label: 'Кошки',
    color: 'orange',
  },
  dog: {
    id: 'dog',
    label: 'Собаки',
    color: 'blue',
  },
  news: {
    id: 'news',
    label: 'Новости',
    color: 'green',
  },
  stories: {
    id: 'stories',
    label: 'Истории',
    color: 'purple',
  },
  advice: {
    id: 'advice',
    label: 'Советы',
    color: 'yellow',
  },
  help: {
    id: 'help',
    label: 'Помощь',
    color: 'pink',
  },
  events: {
    id: 'events',
    label: 'События',
    color: 'indigo',
  },
}

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
          :src="article.coverImage.url"
          :alt="article.coverImage.alternativeText || article.title"
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
          {{ formatedDate }}
        </li>
        <li
          v-if="article.readingTime"
          class="articles-card__tag"
        >
          {{ article.readingTime }} мин
        </li>
        <li
          v-if="article.tag"
          class="articles-card__tag"
          :class="[
            'articles-card__tag--' + TAGS_CONFIG[article.tag].color
          ]"
        >
          #{{ TAGS_CONFIG[article.tag].label }}
        </li>
      </ul>
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

  display: flex;
  flex-direction: column;

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

    @media (min-width: $mq-lg) {
      padding: 20px;
      height: 92px;
      font-size: 22px;
    }

    @media (min-width: $mq-xl) {
      padding: 20px;
      height: 92px;
      font-size: 24px;
    }
  }

  &__body {
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

    &::after {
      content: '...';
      display: inline-flex;
      position: absolute;
      inset: auto 0 0.2em auto;
    }
  }

  &__tags {
    display: flex;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
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

    &::before {
      content: '';
      display: flex;
      position: absolute;
      inset: 0;
      opacity: 0.2;
    }

    &--orange {
      color: var(--color-orange-dark);
      border: 1px solid var(--color-orange);

      &::before {
        background-color: var(--color-orange);
      }
    }

    &--blue {
      color: var(--color-blue-dark);
      border: 1px solid var(--color-blue);

      &::before {
        background-color: var(--color-blue);
      }
    }

    &--green {
      color: var(--color-green-dark);
      border: 1px solid var(--color-green);

      &::before {
        background-color: var(--color-green);
      }
    }

    &--purple {
      color: var(--color-purple-dark);
      border: 1px solid var(--color-purple);

      &::before {
        background-color: var(--color-purple);
      }
    }

    &--yellow {
      color: var(--color-yellow-dark);
      border: 1px solid var(--color-yellow);

      &::before {
        background-color: var(--color-yellow);
      }
    }

    &--pink {
      color: var(--color-pink-dark);
      border: 1px solid var(--color-pink);

      &::before {
        background-color: var(--color-pink);
      }
    }

    &--indigo {
      color: var(--color-indigo-dark);
      border: 1px solid var(--color-indigo);

      &::before {
        background-color: var(--color-indigo);
      }
    }

    &--cyan {
      color: var(--color-cyan-dark);
      border: 1px solid var(--color-cyan);

      &::before {
        background-color: var(--color-cyan);
      }
    }
  }

  &__link {
    position: absolute;
    inset: 0;
  }
}
</style>

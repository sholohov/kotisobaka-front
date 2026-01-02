<script setup lang="ts">
import type { Review } from '~/api/reviews/types';
import HeartIcon from '~/assets/svg/heart-icon.svg'

const props = defineProps({
  story: {
    type: Object as PropType<Review>,
    required: true,
  },
})

export type ReviewTag = NonNullable<Review['tag']>

export interface TagConfig {
  id: ReviewTag
  label: string
  color: string
}

const TAGS_CONFIG: Record<ReviewTag, TagConfig> = {
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
}

const formatedDate = computed(() => {
  const { date } = props.story

  if (!date || !Date.parse(date)) {
    return 'Invalid Date'
  }

  return Intl.DateTimeFormat('ru', {
    dateStyle: 'short',
  }).format(Date.parse(date))
})
</script>

<template>
  <div class="stories-card">
    <div class="stories-card__header">
      <div class="stories-card__img-wrapper">
        <img
          :src="story.photo.url"
          :alt="story.photo.alternativeText || story.name"
          class="stories-card__img"
        >
      </div>
    </div>
    <div class="stories-card__body">
      <div class="stories-card__title">
        {{ story.name }}
      </div>
      <div class="stories-card__text">
        «{{ story.text }}»
      </div>
      <div class="stories-card__footer">
        <ul class="stories-card__tags">
          <li class="stories-card__tag">
            {{ formatedDate }}
          </li>
          <li
            v-if="story.tag"
            class="stories-card__tag"
            :class="[
              'stories-card__tag--' + TAGS_CONFIG[story.tag].color
            ]"
          >
            #{{ TAGS_CONFIG[story.tag].label }}
          </li>
        </ul>
        <btn-default
          circle
          class="stories-card__icon"
          style="color: var(--color-orange)"
        >
          <heart-icon width="24" />
        </btn-default>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.stories-card {
  $this: '.stories-card';

  display: flex;
  flex-direction: column;
  flex: 1;

  @media (min-width: $mq-lg) {
    flex-direction: row-reverse;
    gap: 6px;
  }

  &__header {
    overflow: hidden;
    border-radius: 24px;
    background-color: var(--color-white);
    margin: 0 0 6px;

    @media (min-width: $mq-lg) {
      margin: 0;
      flex: 1;
    }
  }

  &__img-wrapper {
    position: relative;
    padding: calc(100% * 0.7) 0 0;
    overflow: hidden;

    @media (min-width: $mq-lg) {
      padding: 0;
      height: 545px;
    }
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
    font-weight: 700;
    font-size: 18px;
    line-height: 1;
    margin: 0 0 14px;

    @media (min-width: $mq-lg) {
      font-size: 22px;
    }

    @media (min-width: $mq-xl) {
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

    @media (min-width: $mq-lg) {
      padding: 20px;
      flex: 1;
    }
  }

  &__text {
    position: relative;
    font-weight: 400;
    line-height: 1.2;
    overflow: hidden;
    margin: 0 0 14px;
    flex: 1;
  }

  &__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
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
  }

  &__icon {
    pointer-events: none;
  }
}
</style>

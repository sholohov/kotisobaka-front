<script setup lang="ts">
import type { ReviewData } from '~/api/reviews/types';

const props = defineProps({
  story: {
    type: Object as PropType<ReviewData>,
    required: true,
  },
  short: {
    type: Boolean,
    default: false,
  },
})

export type ReviewTag = NonNullable<ReviewData['tag']>

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

const textLines = computed(() => {
  return props.story.text.split('\n').filter(line => line)
})
</script>

<template>
  <div

    class="stories-card"
    :class="[
      { 'stories-card--short': short }
    ]"
  >
    <div
      :id="story.documentId"
      class="stories-card__anchor"
    />

    <div class="stories-card__header">
      <div class="stories-card__img-wrapper">
        <img
          :src="story.photo?.url"
          :alt="story.photo?.alternativeText || story.name"
          class="stories-card__img"
        >
      </div>
    </div>
    <div class="stories-card__body">
      <div class="stories-card__title">
        {{ story.name }}
      </div>
      <div class="stories-card__text">
        <p
          v-for="(textLine, index) in textLines"
          :key="index"
          class="stories-card__text-line"
        >
          {{ textLine }}
        </p>
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
          <svg-icon
            v-if="short"
            name="arrow-right-icon"
          />
          <svg-icon
            v-else
            name="heart-icon"
          />
        </btn-default>
      </div>
    </div>

    <nuxt-link
      v-if="short"
      class="stories-card__link"
      :to="`/about/stories#${story.documentId}`"
    />
  </div>
</template>

<style lang="scss">
.stories-card {
  $this: '.stories-card';

  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;

  @media (min-width: $mq-lg) {
    flex-direction: row-reverse;
    gap: 6px;
  }

  &__anchor {
    position: absolute;
    inset: -80px 0 auto 0;
  }

  &--short {
    &:hover {
      #{$this}__body {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07),
        0 4px 8px rgba(0, 0, 0, 0.035);
      }

      #{$this}__header {
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
    transition: transform 0.3s, box-shadow 0.3s;
    min-height: 240px;

    @media (min-width: $mq-lg) {
      margin: 0;
      flex: 1;
    }
  }

  &__img-wrapper {
    position: relative;
    height: 100%;
    overflow: hidden;
    flex: 1;

    @media (min-width: $mq-lg) {
      &:not(#{$this}--short &) {
        padding: calc(100% * 1.3) 0 0;
      }
    }

    #{$this}--short & {
      padding: calc(100% * 0.7) 0 0;
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
    min-height: 200px;
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    padding: 14px;
    border-radius: 24px;
    background-color: var(--color-white);
    transition: transform 0.3s, box-shadow 0.3s;

    @media (min-width: $mq-lg) {
      padding: 20px;
    }
  }

  &__text {
    position: relative;
    font-weight: 400;
    white-space: pre-line;
    margin: 0 0 14px;
    flex: 1;

    #{$this}--short & {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: calc(1.2em * 4);

      @media (min-width: $mq-lg) {
        -webkit-line-clamp: 8;
        max-height: calc(1.2em * 8);
      }
    }
  }

  &__text-line {
    &:not(:only-child) {
      margin: 0 0 8px;
    }

    &:first-child {
      &:before {
        content: "«";
      }
    }

    &:last-child {
      margin: 0;

      &:after {
        content: "»";
      }
    }
  }

  &__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: auto 0 0;
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

    #{$this}--short & {
      pointer-events: auto;
    }
  }

  &__link {
    position: absolute;
    inset: 0;
  }
}
</style>

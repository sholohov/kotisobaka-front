<script setup lang="ts">
import type { AnimalData } from '~/api/animals/types';
import type { ArticleData } from '~/api/articles/types';
import type { ContentPageData } from '~/api/contentPages/types';

interface Props {
  results: {
    animals?: AnimalData[]
    articles?: ArticleData[]
    pages?: ContentPageData[]
  }
  query: string
  hasResults: boolean
  loading: boolean
}

const props = defineProps<Props>()

function animalGender(animal: AnimalData): string {
  return animal.gender === 'male' ? 'мальчик' : 'девочка'
}

function animalSterilized(animal: AnimalData) {
  const sterilizedPrefix = animal.sterilized ? '' : 'не '
  const sterilized = animal.gender === 'male' ? 'кастр.' : 'стерил.'

  return `${sterilizedPrefix}${sterilized}`
}

watch(() => props.loading, () => {
  console.log(props.loading)
})
</script>

<template>
  <div class="search-results">
    <transition
      name="search-results-"
      mode="out-in"
    >
      <div
        v-if="loading"
        class="search-results__status"
      >
        <span class="search-results__status-spinner" />
        <span class="search-results__status-text">Ищем хвостиков...</span>
      </div>

      <div
        v-else-if="hasResults"
        class="search-results__content"
      >
        <section
          v-if="results.animals?.length"
          class="search-results__section"
        >
          <h3 class="search-results__title">
            Питомцы
          </h3>

          <ul class="search-results__list">
            <li
              v-for="animal in results.animals"
              :key="animal.documentId"
              class="search-results__item"
            >
              <nuxt-link
                :to="`/animals/${animal.slug}`"
                class="search-results__item-link"
              >
                <img
                  v-if="animal.photo?.url"
                  :src="animal.photo.url"
                  :alt="animal.name"
                  class="search-results__img"
                >
                <div class="search-results__item-details">
                  <div class="search-results__name">
                    {{ animal.name }}
                  </div>
                  <div class="search-results__item-text">
                    <span>{{ animalGender(animal) }}</span> /
                    <span>{{ getAge(animal.birthDate, true) }}</span> /
                    <span>{{ animalSterilized(animal) }}</span>
                  </div>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </section>

        <section
          v-if="results.articles?.length"
          class="search-results__section"
        >
          <h3 class="search-results__title">
            Блог и Новости
          </h3>

          <ul class="search-results__list">
            <li
              v-for="article in results.articles"
              :key="article.documentId"
              class="search-results__item"
            >
              <NuxtLink
                :to="`/articles/${article.slug}`"
                class="search-results__item-link"
              >
                <span class="search-results__item-text">{{ article.title }}</span>
              </NuxtLink>
            </li>
          </ul>
        </section>

        <section
          v-if="results.pages?.length"
          class="search-results__section"
        >
          <h3 class="search-results__title">
            Помощь и Информация
          </h3>

          <ul class="search-results__list">
            <li
              v-for="page in results.pages"
              :key="page.documentId"
              class="search-results__item"
            >
              <NuxtLink
                :to="page.path"
                class="search-results__item-link"
              >
                <span class="search-results__item-text">{{ page.title }}</span>
              </NuxtLink>
            </li>
          </ul>
        </section>
      </div>
      <div
        v-else
        class="search-results__empty"
      >
        <div
          v-if="query.length < 3"
          class="search-results__empty-message"
        >
          Введите минимум 3 символа для начала поиска
        </div>
        <div
          v-else
          class="search-results__empty-message"
        >
          Ничего не нашли по запросу <strong>«{{ query }}»</strong>
          <div class="search-results__empty-hint">
            Попробуйте изменить формулировку
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.search-results {
  $this: '.search-results';

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  &--enter-active,
  &-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  &--enter-from {
    opacity: 0;
    transform: translateY(5px);
  }

  &--leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }

  &__status {
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    color: var(--color-beige-light);
  }

  &__status-spinner {
    width: 30px;
    height: 30px;
    border: 3px solid var(--color-background-beige);
    border-top-color: var(--color-pink-dark);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__content {
    display: flex;
    gap: 10px;
    padding: 10px;
    flex-direction: column;
    overflow-y: auto;
    max-height: calc(100vh - 150px);

    @media (min-width: $mq-sm) {
      flex-direction: row;
    }

    @media (min-width: $mq-md) {
      gap: 20px;
    }
  }

  &__section {
    display: flex;
    flex-direction: column;
    width: auto;

    @media (min-width: $mq-sm) {
      width: calc(100% / 3);
    }
  }

  &__title {
    padding: 10px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-beige-light);
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 12px;

    &:after {
      content: '';
      display: flex;
      position: absolute;
      inset: auto 0 0 0;
      height: 1px;
    }

    &:not(:last-child) {
      &:after {
        background-color: var(--color-background-beige);
      }
    }
  }

  &__item-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    color: var(--color-text-chocolate);
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-background-beige);
    }
  }

  &__img {
    display: flex;
    flex: none;
    overflow: hidden;
    width: 80px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
  }

  &__name {
    font-weight: 700;
    font-size: 18px;
    line-height: 120%;
    color: var(--color-pink-dark);
  }

  &__item-text {
    display: -webkit-box;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    max-height: calc(1.2em * 2);
  }

  &__empty {
    padding: 40px 20px;
    text-align: center;
    color: var(--color-text-chocolate);
  }

  &__empty-hint {
    margin-top: 8px;
    font-size: 14px;
    opacity: 0.6;
  }
}
</style>

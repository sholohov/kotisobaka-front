<template>
  <nav class="page-pagination">
    <ul class="page-pagination__list">
      <li
        v-for="item in visiblePages"
        :key="item.key"
        class="page-pagination__item"
        :class="{ 'page-pagination__item--active': item.page === currentPage }"
      >
        <button
          v-if="item.page"
          class="page-pagination__button"
          @click="goToPage(item.page)"
        >
          {{ formatPage(item.page) }}
        </button>
        <span
          v-else
          class="page-pagination__dots"
        >...</span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  totalPages: number
  currentPage: number
  onChange: (page: number) => void
}

const props = defineProps<Props>()

const goToPage = (page: number) => {
  props.onChange(page)
}

const formatPage = (page: number) => {
  return page.toString().padStart(2, '0')
}

const visiblePages = computed(() => {
  const { totalPages } = props
  const pages: { page?: number; key: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ page: i, key: `page-${i}` })
  }

  return pages
})

</script>

<style lang="scss">
.page-pagination {
  $this: '.page-pagination';

  &__list {
    display: flex;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    &--active #{$this}__button {
      border-color: var(--color-pink-dark);;
      background-color: var(--color-background-pink);
      color: var(--color-text-chocolate);
    }
  }

  &__button, &__dots {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 6px;
    line-height: 1;
    border: 1px solid rgb(0,0,0,0);
    color: var(--color-pink-dark);
    font-size: 20px;
    font-weight: 700;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--color-text-chocolate);
      }
    }
  }

  &__dots {
    align-items: flex-end;
  }
}
</style>

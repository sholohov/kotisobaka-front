<template>
  <content-box>
    <nav
      class="breadcrumbs-base"
      aria-label="Хлебные крошки"
    >
      <ul class="breadcrumbs-base__list">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="breadcrumbs-base__item"
        >
          <nuxt-link
            v-if="index < items.length - 1"
            :to="item.to"
            class="breadcrumbs-base__link"
          >
            {{ item.title }}
          </nuxt-link>
          <span
            v-else
            class="breadcrumbs-base__current"
            aria-current="page"
          >
            {{ item.title }}
          </span>

          <span
            v-if="index < items.length - 1"
            class="breadcrumbs-base__separator"
          >
            /
          </span>
        </li>
      </ul>
    </nav>
  </content-box>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  title: string;
  to: string;
}

defineProps({
  items: {
    type: Array as () => BreadcrumbItem[],
    required: true,
  },
});
</script>

<style lang="scss">
.breadcrumbs-base {
  display: flex;
  align-items: center;
  min-height: 44px;

  &__list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    align-items: center;
  }

  &__link {
    color: var(--color-indigo);
    text-decoration: none;
    font-size: 14px;
    line-height: 1;
    padding: 12px 0;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-indigo-dark);
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid var(--color-indigo);
      outline-offset: 2px;
      border-radius: 3px;
    }
  }

  &__current {
    color: var(--color-text-chocolate);
    font-size: 14px;
    line-height: 1;
    padding: 12px 0;
    cursor: default;
  }

  &__separator {
    color: var(--color-text-chocolate);
    opacity: 0.6;
    margin: 0 8px;
    font-size: 14px;
    line-height: 1;
    user-select: none;

    &:last-child {
      display: none;
    }
  }
}
</style>

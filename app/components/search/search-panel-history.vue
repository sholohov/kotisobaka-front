<script setup lang="ts">
interface Props {
  history: string[]
}

defineProps<Props>()

const emit = defineEmits<{
  select: [value: string]
}>()
</script>

<template>
  <div class="search-panel-history">
    <div class="search-panel-history__title">
      Последние запросы
    </div>
    <ul
      v-if="history.length"
      class="search-panel-history__list"
    >
      <li
        v-for="(item, index) in history"
        :key="index"
        class="search-panel-history__item"
      >
        <button
          class="search-panel-history__item-btn"
          type="button"
          @click="emit('select', item)"
        >
          {{ item }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.search-panel-history {
  padding: 10px;

  &__title {
    display: flex;
    align-items: center;
    padding: 10px;
    color: var(--color-beige-light);
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    flex-direction: column;
  }

  &__item-btn {
    display: flex;
    padding: 10px;
    align-items: center;
    color: var(--color-text-chocolate);
    transition: background-color 0.3s;
    text-align: left;
    width: 100%;
    border-radius: 12px;

    @include hover {
      background-color: var(--color-background-beige);
    }
  }
}
</style>

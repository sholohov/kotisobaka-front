<script setup lang="ts">
import type { QuestionData } from '~/api/questions/types';

const props = defineProps({
  items: {
    type: Array as PropType<QuestionData[]>,
    required: true,
  },
})

const openedId = ref('')

const columns = computed(() => {
  const result: QuestionData[][] = [[],[]]

  props.items.forEach((item, index) => {
    if ((index + 1) % 2 === 0) {
      result[1]?.push(item)
    } else {
      result[0]?.push(item)
    }
  })

  return result
})

function handleToggleBtn(id: string) {
  openedId.value = openedId.value === id ? '' : id
}
</script>

<template>
  <div class="faq-spoiler">
    <ul
      v-for="(col, index) in columns"
      :key="index"
      class="faq-spoiler__list"
    >
      <li
        v-for="item in col"
        :key="item.documentId"
        class="faq-spoiler__item"
        :class="[{
          'faq-spoiler__item--opened': item.documentId === openedId
        }]"
      >
        <div class="faq-spoiler__header">
          <span
            :style="{ backgroundColor: item.tagColor }"
            class="faq-spoiler__tag"
          >
            #{{ item.tag }}
          </span>
          <h3 class="faq-spoiler__title">
            {{ item.question }}
          </h3>
          <btn-default
            circle
            class="faq-spoiler__btn"
            @click="handleToggleBtn(item.documentId)"
          >
            <svg-icon name="arrow-down-icon" />
          </btn-default>
        </div>
        <div class="faq-spoiler__body">
          <p class="faq-spoiler__text">
            {{ item.answer }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.faq-spoiler {
  $this: '.faq-spoiler';

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (min-width: $mq-md) {
    gap: 20px;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;

    @media (min-width: $mq-md) {
      width: calc(50% - 10px);
    }
  }

  &__item {
    break-inside: avoid;
    display: flex;
    flex-direction: column;
    margin: 0 0 10px;
    padding: 20px;
    border-radius: 24px;
    border: 1px solid var(--color-pink-dark);
    background-color: var(--color-background-pink);

    @media (min-width: $mq-sm) {
      margin: 0 0 20px;
    }
  }

  &__header {
    position: relative;
    padding: 0;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--color-text-chocolate);
    border-radius: 12px;
    height: 24px;
    font-size: 14px;
    padding: 0 8px;
    background-color: var(--color-white);
    margin: 0 0 36px;
  }

  &__title {
    font-size: 22px;

    @media (min-width: $mq-md) {
      font-size: 24px;
    }
  }

  &__btn {
    position: absolute;
    top: 0;
    right: 0;
    color: var(--color-pink);
    background-color: var(--color-background-pink);
  }

  &__body {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s;

    #{$this}__item--opened & {
      max-height: 1000px;
    }
  }

  &__text {
    margin: 20px 0 0;
    padding: 20px;
    background-color: var(--color-white);
    border-radius: 14px;
    color: var(--color-text-chocolate);
  }
}
</style>

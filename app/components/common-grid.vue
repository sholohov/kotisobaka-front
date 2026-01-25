<script setup lang="ts" generic="TItem, TInterspersed = TItem">
const props = defineProps<{
  items: TItem[]
  interspersed?: TInterspersed[]
  interspersedIndexes?: number[],
  twoColumn?: boolean
}>()

interface GridItem {
  type: 'item'
  data: TItem
}

interface GridInterspersed {
  type: 'interspersed'
  data: TInterspersed
}

type Cell = GridItem | GridInterspersed

defineSlots<{
  default(props: { item: TItem, index: number }): unknown
  interspersed?(props: { item: TInterspersed, index: number }): unknown
}>()

const getItemId = (item: unknown): string => {
  if (item && typeof item === 'object') {
    if ('documentId' in item && typeof item.documentId === 'string') {
      return `doc-${item.documentId}`
    }

    if ('id' in item && (typeof item.id === 'string' || typeof item.id === 'number')) {
      return `id-${item.id}`
    }
  }

  return `unknown-${Math.random().toString(36).substr(2, 9)}`
}

const cells = computed<Cell[]>(() => {
  const result: Cell[] = []
  const items = props.items ?? []
  const interspersed = props.interspersed ?? []
  let interspersedItemIndex = 0
  let itemIndex = 0

  Array(Math.max(items.length + interspersed.length, 0)).fill(0).forEach((_, index) => {
    const shouldInsert = props.interspersedIndexes?.[interspersedItemIndex] === index + 1
    const interspersedItem = props.interspersed?.[interspersedItemIndex]
    const item = props.items?.[itemIndex]

    if (shouldInsert && interspersedItem) {
      result.push({ type: 'interspersed', data: interspersedItem })
      interspersedItemIndex++
    } else if (item) {
      result.push({ type: 'item', data: item })
      itemIndex++
    }
  })

  return result
})
</script>

<template>
  <div class="common-grid">
    <div class="common-grid__inner">
      <div
        v-for="(cell, index) in cells"
        :key="cell.type === 'item' ? getItemId(cell.data) : `interspersed-${getItemId(cell.data)}`"
        class="common-grid__col"
        :class="{ 'common-grid__col--two-column': twoColumn }"
      >
        <slot
          v-if="cell.type === 'item'"
          name="default"
          :item="cell.data"
          :index="index"
        />
        <slot
          v-else-if="cell.type === 'interspersed' && $slots.interspersed"
          name="interspersed"
          :item="cell.data"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.common-grid {
  $this: ".common-grid";

  &__inner {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    @media (min-width: $mq-lg) {
      gap: 20px;
    }
  }

  &__col {
    display: flex;

    @media (min-width: 640px) {
      flex: 0 0 calc((100% - 10px) / 2);
    }

    @media (min-width: 960px) {
      flex: 0 0 calc((100% - (10px * 2)) / 3);
    }

    @media (min-width: $mq-lg) {
      flex: 0 0 calc((100% - (20px * 2)) / 3);
    }

    @media (min-width: $mq-xl) {
      flex: 0 0 calc((100% - (20px * 3)) / 4);
    }

    &--two-column {
      flex: 0 0 100%;

      @media (min-width: 640px) {
        flex: 0 0 calc((100% - 10px) / 2);
      }

      @media (min-width: $mq-md) {
        flex: 0 0 calc((100% - 10px) / 2);
      }

      @media (min-width: $mq-lg) {
        flex: 0 0 calc((100% - 20px) / 2);
      }
    }
  }
}
</style>

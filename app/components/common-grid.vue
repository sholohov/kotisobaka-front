<script setup lang="ts" generic="TItem, TInterspersed = unknown">
const props = defineProps({
  items: {
    type: Array as PropType<TItem[]>,
    required: true,
  },
  interspersed: {
    type: Array as PropType<TInterspersed[]>,
    default: () => [],
  },
  interspersedIndexes: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
  twoColumn: {
    type: Boolean,
    default: false,
  },
})

interface TypedItem {
  type: 'item'
  data: TItem
}

interface TypedInterspersed {
  type: 'interspersed'
  data: TInterspersed & { color?: string }
}

type Item = TypedItem | TypedInterspersed

defineSlots<{
  default(props: { data: TItem, index: number }): unknown
  interspersed?(props: { data: TInterspersed & { color?: string }, index: number }): unknown
}>()

const getItemId = (item: unknown): string => {
  const randomId = `unknown-${Math.random().toString(36).substr(2, 9)}`

  if (!item || typeof item !== 'object') {
    return randomId
  }

  const id = 'id' in item ? String(item.id || '') : ''
  const documentId = 'documentId' in item ? String(item.documentId || '') : ''

  return id || documentId || randomId
}

const colors = [
  'purple', 'yellow', 'blue', 'green', 'pink', 'indigo',
  'purple', 'yellow', 'blue', 'green', 'pink', 'indigo',
] as const

const allItems = computed<Item[]>(() => {
  const { items, interspersed, interspersedIndexes } = props
  const result: Item[] = []
  const itemsLength = items.length
  const interspersedLength = interspersedIndexes?.length || 0
  let interspersedIndex = 0
  let itemIndex = 0

  Array(itemsLength + interspersedLength).fill(null).forEach((_, index) => {
    const item = items[itemIndex]
    const interspersedItem = interspersed?.[interspersedIndex]

    if (interspersedIndexes?.includes(index) && interspersedItem) {
      result.push({
        type: 'interspersed',
        data: {
          color: colors[interspersedIndex],
          ...interspersedItem,
        },
      })

      interspersedIndex++
    } else if (item) {
      result.push({
        type: 'item',
        data: item,
      })

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
        v-for="(item, index) in allItems"
        :key="item.type === 'item' ? getItemId(item.data) : `interspersed-${getItemId(item.data)}`"
        class="common-grid__col"
        :class="{ 'common-grid__col--two-column': twoColumn }"
      >
        <slot
          v-if="item.type === 'item'"
          name="default"
          :data="item.data"
          :index="index"
        />
        <slot
          v-else-if="item.type === 'interspersed'"
          name="interspersed"
          :data="item.data"
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
    width: 100%;
    min-height: 0;

    @media (min-width: 640px) {
      width: calc((100% - 10px) / 2);
    }

    @media (min-width: 960px) {
      width: calc((100% - (10px * 2)) / 3);
    }

    @media (min-width: $mq-lg) {
      width: calc((100% - (20px * 2)) / 3);
    }

    @media (min-width: $mq-xl) {
      width: calc((100% - (20px * 3)) / 4);
    }

    &--two-column {
      width: 100%;

      @media (min-width: 640px) {
        width: calc((100% - 10px) / 2);
      }

      @media (min-width: $mq-md) {
        width: calc((100% - 10px) / 2);
      }

      @media (min-width: $mq-lg) {
        width: calc((100% - 20px) / 2);
      }
    }
  }
}
</style>

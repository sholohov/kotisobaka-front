<script setup lang="ts" generic="TItem, TInterspersed = TItem">
const props = defineProps<{
  items: TItem[]
  interspersed?: TInterspersed[]
  interspersedPosition?: number
  interspersedStart?: number
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
  let interspersedIndex = 0
  const interspersed = props.interspersed ?? []
  const interspersedPosition = props.interspersedPosition ?? 3
  const interspersedStart = props.interspersedStart ?? interspersedPosition

  if (interspersed.length > 0) {
    props.items.forEach((item, index) => {
      result.push({ type: 'item', data: item })

      const shouldInsert =
        (index === interspersedStart - 1) ||
        (index > interspersedStart - 1 && (index - (interspersedStart - 1)) % interspersedPosition === 0)

      if (shouldInsert) {
        const interspersedItem = interspersed[interspersedIndex % interspersed.length]

        if (interspersedItem) {
          result.push({
            type: 'interspersed',
            data: { ...interspersedItem },
          })
          interspersedIndex = (interspersedIndex + 1) % interspersed.length
        }
      }
    })

    if (props.items.length > 0 && props.items.length < interspersedStart && interspersed.length > 0) {
      const interspersedItem = interspersed[interspersedIndex % interspersed.length]

      if (interspersedItem) {
        result.push({
          type: 'interspersed',
          data: { ...interspersedItem },
        })
      }
    }
  } else {
    return props.items.map(item => ({ type: 'item' as const, data: item }))
  }

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

    @media (min-width: 660px) {
      flex: 0 0 calc((100% - 10px) / 2);
    }

    @media (min-width: 990px) {
      flex: 0 0 calc((100% - 10px * 2) / 3);
    }

    @media (min-width: $mq-lg) {
      flex: 0 0 calc((100% - 20px * 2) / 3);
    }

    @media (min-width: $mq-xxl) {
      flex: 0 0 calc((100% - 3 * 20px) / 4);
    }

    &--two-column {
      flex: 0 0 100%;

      @media (min-width: 990px) {
        flex: 0 0 calc((100% - 10px) / 2);
      }

      @media (min-width: $mq-lg) {
        flex: 0 0 calc((100% - 20px) / 2);
      }
    }
  }
}
</style>

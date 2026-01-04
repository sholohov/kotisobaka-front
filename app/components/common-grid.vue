<script setup lang="ts" generic="TItem, TInterspersed = TItem">
const props = defineProps<{
  items: TItem[]
  interspersed?: TInterspersed[]
  interspersedPosition?: number
  interspersedColors?: readonly string[]
  twoColumn?: boolean
}>()

interface GridItem {
  type: 'item'
  data: TItem
}

interface GridInterspersed {
  type: 'interspersed'
  data: TInterspersed & { color: string }
}

type Cell = GridItem | GridInterspersed

defineSlots<{
  default(props: { item: TItem }): unknown
  interspersed?(props: { item: TInterspersed & { color: string } }): unknown
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
  let colorIndex = 0
  const interspersed = props.interspersed ?? []
  const interspersedPosition = props.interspersedPosition ?? 3
  const interspersedColors = props.interspersedColors ?? ['green', 'purple', 'yellow', 'blue'] as const

  if (interspersed.length > 0) {
    props.items.forEach((item, index) => {
      result.push({ type: 'item', data: item })

      if ((index + 1) % interspersedPosition === 0) {
        const randomItem = interspersed[Math.floor(Math.random() * interspersed.length)]
        // гарантируем строку, даже если массив цветов пуст
        const color = interspersedColors[colorIndex % interspersedColors.length] ?? 'green'

        if (randomItem) {
          result.push({ type: 'interspersed', data: { ...randomItem, color } })
          colorIndex = (colorIndex + 1) % Math.max(interspersedColors.length, 1)
        }
      }
    })

    if (props.items.length < interspersedPosition) {
      const randomItem = interspersed[Math.floor(Math.random() * interspersed.length)]
      const color = interspersedColors[colorIndex % interspersedColors.length] ?? 'green'

      if (randomItem) {
        result.push({ type: 'interspersed', data: { ...randomItem, color } })
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
        v-for="cell in cells"
        :key="cell.type === 'item' ? getItemId(cell.data) : `interspersed-${getItemId(cell.data)}`"
        class="common-grid__col"
        :class="{ 'common-grid__col--two-column': twoColumn }"
      >
        <slot
          v-if="cell.type === 'item'"
          name="default"
          :item="cell.data"
        />
        <slot
          v-else-if="cell.type === 'interspersed' && $slots.interspersed"
          name="interspersed"
          :item="cell.data"
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

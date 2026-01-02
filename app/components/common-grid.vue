<script setup lang="ts">
import type { Quote } from '~/api/quotes/types'

interface HasDocumentId {
  documentId: string
}

interface HasId {
  id: string | number
}

const props = defineProps({
  items: {
    type: Array as PropType<Array<HasDocumentId | HasId | unknown>>,
    required: true,
  },
  quotes: {
    type: Array as PropType<Quote[]>,
    default: () => [],
  },
  quoteSlidePosition: {
    type: Number,
    default: 3,
  },
  quoteColors: {
    type: Array as PropType<readonly string[]>,
    default: () => ['green', 'purple', 'yellow', 'blue'] as const,
  },
  twoColumn: {
    type: Boolean,
    default: false,
  },
})

interface GridItem {
  type: 'item'
  data: HasDocumentId | HasId | unknown
}

interface GridQuote {
  type: 'quote'
  data: Quote & { color: string }
}

type Cell = GridItem | GridQuote

defineSlots<{
  default(props: { item: HasDocumentId | HasId | unknown }): unknown
  quote?(props: { item: Quote & { color: string } }): unknown
}>()

const getItemId = (item: HasDocumentId | HasId | unknown): string => {
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

  if (props.quotes && props.quotes.length > 0) {
    props.items.forEach((item, index) => {
      result.push({ type: 'item', data: item })

      if ((index + 1) % props.quoteSlidePosition === 0) {
        const randomQuote = props.quotes[Math.floor(Math.random() * props.quotes.length)]
        // гарантируем строку, даже если массив цветов пуст
        const color = props.quoteColors[colorIndex % props.quoteColors.length] ?? 'green'

        if (randomQuote) {
          result.push({ type: 'quote', data: { ...randomQuote, color } })
          colorIndex = (colorIndex + 1) % Math.max(props.quoteColors.length, 1)
        }
      }
    })

    if (props.items.length < props.quoteSlidePosition) {
      const randomQuote = props.quotes[Math.floor(Math.random() * props.quotes.length)]
      const color = props.quoteColors[colorIndex % props.quoteColors.length] ?? 'green'

      if (randomQuote) {
        result.push({ type: 'quote', data: { ...randomQuote, color } })
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
        :key="cell.type === 'item' ? getItemId(cell.data) : `quote-${getItemId(cell.data)}`"
        class="common-grid__col"
        :class="{ 'common-grid__col--two-column': twoColumn }"
      >
        <slot
          v-if="cell.type === 'item'"
          name="default"
          :item="cell.data"
        />
        <slot
          v-else-if="cell.type === 'quote' && $slots.quote"
          name="quote"
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

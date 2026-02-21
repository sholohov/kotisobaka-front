<script setup lang="ts" generic="TItem, TInterspersed = unknown">
const props = defineProps<{
  items: TItem[]
  interspersed?: TInterspersed[]
  interspersedIndexes?: number[]
  twoColumn?: boolean
}>()

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

const sliderRef = ref(null)
const slider = useSwiper(sliderRef)

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
  let interspersedCount = 0
  let itemIndex = 0

  for (let index = 0; itemIndex < items.length; index++) {
    const isPlaceForInterspersed = interspersedIndexes?.includes(index)
    const currentInterspersed = interspersed?.[interspersedCount]

    if (isPlaceForInterspersed && currentInterspersed) {
      result.push({
        type: 'interspersed',
        data: {
          ...currentInterspersed,
          color: colors[interspersedCount % colors.length],
        } as TInterspersed & { color?: string }, // Приведение к типу для корректного мерджа
      })
      interspersedCount++
    } else {
      result.push({
        type: 'item',
        data: items[itemIndex]!,
      })
      itemIndex++
    }
  }

  return result
})
</script>

<template>
  <div class="common-slider">
    <div class="common-slider__inner">
      <swiper-container
        ref="sliderRef"
        slides-per-view="auto"
        space-between="10"
        :breakpoints="{
          1200: {
            spaceBetween: 20
          }
        }"
        class="common-slider__slider"
      >
        <swiper-slide
          v-for="(item, index) in allItems"
          :key="item.type === 'item' ? getItemId(item.data) : `interspersed-${getItemId(item.data)}`"
          class="common-slider__slide"
          :class="{ 'common-slider__slide--two-column': twoColumn }"
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
        </swiper-slide>
      </swiper-container>

      <div class="common-slider__controls">
        <btn-default
          circle
          no-border
          color="blue"
          @click="slider.prev()"
        >
          <svg-icon
            name="arrow-right-icon"
            style="transform: rotate(180deg)"
          />
        </btn-default>

        <btn-default
          circle
          no-border
          color="blue"
          @click="slider.next()"
        >
          <svg-icon name="arrow-right-icon" />
        </btn-default>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.common-slider {
  $this: ".common-slider";

  ::part(container) {
    overflow: visible;
  }

  &__inner {
    position: relative;
  }

  &__slider {
    margin: 0 0 20px;

    @media (min-width: $mq-sm) {
      margin: 0 0 30px;
    }
  }

  &__slide {
    width: 300px;
    display: flex;
    height: auto;

    @media (min-width: $mq-md) {
      width: 331px;
    }

    &--two-column {
      width: 340px;

      @media (min-width: $mq-md) {
        width: 686px;
      }
    }
  }

  &__controls {
    display: flex;
    position: absolute;
    bottom: 100%;
    right: 0;
    margin: 0 0 20px;
    gap: 10px;

    @media (min-width: $mq-lg) {
      margin: 0 0 30px;
    }
  }
}
</style>

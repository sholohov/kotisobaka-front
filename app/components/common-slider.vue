<script setup lang="ts" generic="TItem, TInterspersed = TItem">
import ArrowRightIcon from '~/assets/svg/arrow-right-icon.svg'

const props = defineProps<{
  items: TItem[]
  interspersed?: TInterspersed[]
  interspersedPosition?: number
  interspersedStart?: number
  interspersedColors?: readonly string[]
  twoColumn?: boolean
}>()

interface SlideItem {
  type: 'item'
  data: TItem
}

interface SlideInterspersed {
  type: 'interspersed'
  data: TInterspersed & { color?: string }
}

type Slide = SlideItem | SlideInterspersed

defineSlots<{
  default(props: { slide: TItem, index: number }): unknown
  interspersed?(props: { slide: TInterspersed & { color?: string }, index: number }): unknown
}>()

const sliderRef = ref(null)
const slider = useSwiper(sliderRef)

const getSlideId = (slide: unknown): string => {
  if (slide && typeof slide === 'object') {
    if ('documentId' in slide && typeof slide.documentId === 'string') {
      return `doc-${slide.documentId}`
    }

    if ('id' in slide && (typeof slide.id === 'string' || typeof slide.id === 'number')) {
      return `id-${slide.id}`
    }
  }

  return `unknown-${Math.random().toString(36).substr(2, 9)}`
}

const slides = computed<Slide[]>(() => {
  const result: Slide[] = []
  let colorIndex = 0
  let interspersedIndex = 0
  const interspersed = props.interspersed ?? []
  const interspersedPosition = props.interspersedPosition ?? 3
  const interspersedStart = props.interspersedStart ?? interspersedPosition
  const interspersedColors = props.interspersedColors ?? ['green', 'purple', 'yellow', 'blue'] as const

  if (interspersed.length > 0) {
    props.items.forEach((item, index) => {
      result.push({ type: 'item', data: item })

      const shouldInsert =
        (index === interspersedStart - 1) ||
        (index > interspersedStart - 1 && (index - (interspersedStart - 1)) % interspersedPosition === 0)

      if (shouldInsert) {
        const interspersedItem = interspersed[interspersedIndex % interspersed.length]
        const color = interspersedColors[colorIndex % interspersedColors.length]

        if (interspersedItem) {
          result.push({
            type: 'interspersed',
            data: {
              ...interspersedItem,
              color: interspersedItem && typeof interspersedItem === 'object' && 'color' in interspersedItem
                ? undefined
                : color,
            },
          })
          colorIndex = (colorIndex + 1) % interspersedColors.length
          interspersedIndex = (interspersedIndex + 1) % interspersed.length
        }
      }
    })

    if (props.items.length > 0 && props.items.length < interspersedStart && interspersed.length > 0) {
      const interspersedItem = interspersed[interspersedIndex % interspersed.length]
      const color = interspersedColors[colorIndex % interspersedColors.length]

      if (interspersedItem) {
        result.push({
          type: 'interspersed',
          data: {
            ...interspersedItem,
            color: interspersedItem && typeof interspersedItem === 'object' && 'color' in interspersedItem
              ? undefined
              : color,
          },
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
          v-for="(slide, index) in slides"
          :key="slide.type === 'item' ? getSlideId(slide.data) : `interspersed-${getSlideId(slide.data)}`"
          class="common-slider__slide"
          :class="{ 'common-slider__slide--two-column': twoColumn }"
        >
          <slot
            v-if="slide.type === 'item'"
            name="default"
            :slide="slide.data"
            :index="index"
          />
          <slot
            v-else-if="slide.type === 'interspersed' && $slots.interspersed"
            name="interspersed"
            :slide="slide.data"
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
          <arrow-right-icon
            width="24"
            style="transform: rotate(180deg)"
          />
        </btn-default>

        <btn-default
          circle
          no-border
          color="blue"
          @click="slider.next()"
        >
          <arrow-right-icon width="24" />
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
    width: 310px;
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

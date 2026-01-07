<script setup lang="ts">
import ArrowRightIcon from '~/assets/svg/arrow-right-icon.svg'
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

interface SlideItem {
  type: 'item'
  data: HasDocumentId | HasId | unknown
}

interface SlideQuote {
  type: 'quote'
  data: Quote & { color: string }
}

type Slide = SlideItem | SlideQuote

defineSlots<{
  default(props: { slide: HasDocumentId | HasId | unknown }): unknown
  quote?(props: { slide: Quote & { color: string } }): unknown
}>()

const sliderRef = ref(null)
const slider = useSwiper(sliderRef)

const getSlideId = (slide: HasDocumentId | HasId | unknown): string => {
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
  let quoteIndex = 0

  if (props.quotes && props.quotes.length > 0) {
    props.items.forEach((item, index) => {
      result.push({
        type: 'item',
        data: item,
      })

      if ((index + 1) % props.quoteSlidePosition === 0) {
        const quote = props.quotes[quoteIndex % props.quotes.length]
        const color = props.quoteColors[colorIndex % props.quoteColors.length]

        if (quote && color) {
          result.push({
            type: 'quote',
            data: {
              ...quote,
              color,
            },
          })
          colorIndex = (colorIndex + 1) % props.quoteColors.length
          quoteIndex = (quoteIndex + 1) % props.quotes.length
        }
      }
    })

    if (props.items.length < props.quoteSlidePosition && props.quotes.length > 0) {
      const quote = props.quotes[quoteIndex % props.quotes.length]
      const color = props.quoteColors[colorIndex % props.quoteColors.length]

      if (quote && color) {
        result.push({
          type: 'quote',
          data: {
            ...quote,
            color,
          },
        })
      }
    }
  } else {
    return props.items.map(item => ({
      type: 'item' as const,
      data: item,
    }))
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
          v-for="slide in slides"
          :key="slide.type === 'item' ? getSlideId(slide.data) : `quote-${getSlideId(slide.data)}`"
          class="common-slider__slide"
          :class="{ 'common-slider__slide--two-column': twoColumn }"
        >
          <slot
            v-if="slide.type === 'item'"
            name="default"
            :slide="slide.data"
          />
          <slot
            v-else-if="slide.type === 'quote' && $slots.quote"
            name="quote"
            :slide="slide.data"
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

    @media (min-width: $mq-lg) {
      width: 374px;
    }

    @media (min-width: $mq-xl) {
      width: 440px;
    }

    &--two-column {
      @media (min-width: $mq-lg) {
        width: calc(374px * 2);
      }

      @media (min-width: $mq-xl) {
        width: calc(440px * 2);
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

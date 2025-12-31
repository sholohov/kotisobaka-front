<script setup lang="ts">
import { computed, ref } from "vue"
import type { Animal } from "~/api/animals/types"
import type { Quote } from "~/api/quotes/types"
import ArrowRightIcon from "~/assets/svg/arrow-right-icon.svg"
import PawIcon from "~/assets/svg/paw-icon.svg"
import { BREAKPOINT_CONFIG } from "~/constants/breakpoints";

const props = defineProps({
  animals: {
    type: Array as PropType<Animal[]>,
    required: true,
  },
  quotes: {
    type: Array as PropType<Quote[]>,
    required: true,
  },
})

const sliderRef = ref(null)
const slider = useSwiper(sliderRef)
const colors = ["green", "purple", "yellow", "blue"] as const

const isNeedHelp = computed(() => props.animals.some(animal => {
  return animal.fundsIsNeeded
}))

const quoteSlidePosition = computed(() => {
  return isNeedHelp.value ? 3 : 2
})

const items = computed(() => {
  const result: (Animal | (Quote & { color: string }))[] = []
  let colorIndex = 0

  props.animals.forEach((animal, index) => {
    result.push(animal)

    if ((index + 1) % quoteSlidePosition.value === 0 && props.quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * props.quotes.length)
      const randomQuote = props.quotes[randomIndex]
      const color = colors[colorIndex % colors.length]

      if (randomQuote && color) {
        result.push({
          ...randomQuote,
          color,
        })
        colorIndex = (colorIndex + 1) % colors.length
      }
    }
  })

  // если животных меньше quoteSlidePosition, добавляем цитату в конец
  if (props.animals.length < quoteSlidePosition.value && props.quotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * props.quotes.length)
    const randomQuote = props.quotes[randomIndex]
    const color = colors[colorIndex % colors.length]

    if (randomQuote && color) {
      result.push({
        ...randomQuote,
        color,
      })
    }
  }

  return result
})

const { screenWidth } = useBreakpoint()

const fundsSegments = computed(() => {
  if (screenWidth.value < BREAKPOINT_CONFIG.laptop.min) {
    return 28
  }

  if (screenWidth.value < BREAKPOINT_CONFIG.desktop.min) {
    return 36
  }

  return 40
})

</script>

<template>
  <div class="animal-slider">
    <content-box>
      <div class="animal-slider__inner">
        <swiper-container
          ref="sliderRef"
          slides-per-view="auto"
          space-between="10"
          :breakpoints="{
            1200: {
              spaceBetween: 20
            }
          }"
          class="animal-slider__slider"
        >
          <swiper-slide
            v-for="item in items"
            :key="item.documentId"
            class="animal-slider__slide"
          >
            <animal-card
              v-if="'name' in item"
              :animal="item"
              :funds-segments="fundsSegments"
              class="animal-slider__card"
            />
            <quote-card
              v-else
              :color="item.color"
              :quote="item"
              :is-health="isNeedHelp"
              class="animal-slider__card"
            />
          </swiper-slide>
        </swiper-container>

        <div class="animal-slider__controls">
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

      <div class="animal-slider__go-to-page">
        <btn-default
          to="/animals"
          color="blue"
        >
          Посмотреть всех
        </btn-default>
        <btn-default
          to="/animals"
          color="blue"
          circle
        >
          <paw-icon width="24" />
        </btn-default>
      </div>
    </content-box>
  </div>
</template>

<style lang="scss">
.animal-slider {
  $this: ".animal-slider";

  &__inner {
    position: relative;
  }

  &__slider {
    margin: 0 0 20px;

    @media (min-width: $mq-xs) {
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

  &__go-to-page {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

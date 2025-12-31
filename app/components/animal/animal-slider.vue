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
      <common-slider
        :items="animals"
        :quotes="quotes"
        :quote-slide-position="quoteSlidePosition"
        :quote-colors="colors"
      >
        <template #default="{ slide: animal }">
          <animal-card
            :animal="animal"
            :funds-segments="fundsSegments"
            class="animal-slider__card"
          />
        </template>

        <template #quote="{ slide: quote }">
          <quote-card
            :color="quote.color"
            :quote="quote"
            :is-health="isNeedHelp"
            class="animal-slider__card"
          />
        </template>
      </common-slider>

      <div class="animal-slider__link">
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

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    @media (min-width: $mq-xs) {
      margin-top: 30px;
    }
  }
}
</style>

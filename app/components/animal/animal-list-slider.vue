<script setup lang="ts">
import type { AnimalData } from '~/api/animals/types'
import type { QuoteData } from '~/api/quotes/types'

const props = defineProps({
  animals: {
    type: Array as PropType<AnimalData[]>,
    required: true,
  },
  quotes: {
    type: Array as PropType<QuoteData[]>,
    required: true,
  },
  hideLink: {
    type: Boolean,
    default: false,
  },
  isNeedHelp: {
    type: Boolean,
    default: false,
  },
  hideFundraising: {
    type: Boolean,
    default: false,
  },
})

const quoteSlidePosition = useState('quote-positions', () => {
  const positions: number[] = []
  let currentPos = props.isNeedHelp ? 1 : 2

  positions.push(currentPos)

  for (let i = 0; i < 30; i++) {
    const gap = Math.floor(Math.random() * (6 - 3 + 1)) + 3

    currentPos += gap
    positions.push(currentPos)
  }

  return positions
})
</script>

<template>
  <div class="animal-list-slider">
    <content-box>
      <common-slider
        :items="animals"
        :interspersed="quotes"
        :interspersed-indexes="quoteSlidePosition"
      >
        <template #default="{ data: animal }">
          <animal-card
            :hide-fundraising="hideFundraising"
            :animal="animal"
            class="animal-list-slider__card"
          />
        </template>

        <template #interspersed="{ data: interspersed }">
          <quote-card
            :color="interspersed.color ?? 'green'"
            :quote="interspersed"
            :is-health="isNeedHelp"
            class="animal-list-slider__card"
          />
        </template>
      </common-slider>

      <div
        v-if="!hideLink"
        class="animal-list-slider__link"
      >
        <btn-default
          to="/animals"
          color="blue"
          style="width: 240px"
        >
          Посмотреть всех
        </btn-default>
        <btn-default
          to="/animals"
          color="blue"
          circle
        >
          <svg-icon name="paw-icon" />
        </btn-default>
      </div>
    </content-box>
  </div>
</template>

<style lang="scss">
.animal-list-slider {
  $this: ".animal-list-slider";

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    @media (min-width: $mq-sm) {
      margin-top: 30px;
    }
  }
}
</style>

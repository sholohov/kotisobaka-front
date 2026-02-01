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
})

const colors = ['green', 'purple', 'yellow', 'blue'] as const

const isNeedHelp = computed(() => props.animals.some(animal => {
  return animal.fundsIsNeeded
}))

const quoteSlidePosition = computed(() => {
  return isNeedHelp.value ? 3 : 2
})

</script>

<template>
  <div class="animal-list-slider">
    <content-box>
      <common-slider
        :items="animals"
        :interspersed="quotes"
        :interspersed-position="quoteSlidePosition"
        :interspersed-colors="colors"
      >
        <template #default="{ slide: animal }">
          <animal-card
            :animal="animal"
            class="animal-list-slider__card"
          />
        </template>

        <template #interspersed="{ slide: interspersed }">
          <quote-card
            :color="interspersed.color"
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

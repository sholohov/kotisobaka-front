<script setup lang="ts">
import type { InfoSectionItem } from '~/types/infoSection';
import ArrowRightIcon from '~/assets/svg/arrow-right-icon.svg';

defineProps({
  section: {
    type: Object as PropType<InfoSectionItem>,
    required: true,
  },
})
</script>

<template>
  <content-box
    class="info-section"
    :class="`info-section--${section.color}`"
  >
    <div class="info-section__inner">
      <h2 class="info-section__title">
        {{ section.title }}
      </h2>

      <div class="info-section__body">
        <div class="info-section__header">
          <h3 class="info-section__subtitle">
            {{ section.subtitle }}
          </h3>

          <p class="info-section__description">
            {{ section.description }}
          </p>

          <component
            :is="section.sectionIcon"
            width="50px"
            class="info-section__icon"
          />
        </div>

        <ul class="info-section__cards">
          <li
            v-for="card in section.cards"
            :key="card.key"
            class="info-section__card"
          >
            <div class="info-section__card-header">
              <component
                :is="section.cardIcon"
                width="24"
                class="info-section__card-icon"
              />
              <span class="info-section__card-position">
                {{ card.position }}
              </span>
            </div>

            <div class="info-section__card-content">
              <h4 class="info-section__card-title">
                {{ card.title }}
              </h4>
              <p class="info-section__card-description">
                {{ card.description }}
              </p>
              <div class="info-section__card-actions">
                <btn-default
                  :to="card.buttonLink"
                  :style="{
                    color: `var(--color-${section.color}-dark)`,
                    flex: 1,
                    maxWidth: '240px'
                  }"
                >
                  {{ card.buttonText }}
                </btn-default>
                <btn-default
                  :to="card.buttonLink"
                  :style="{
                    color: `var(--color-${section.color}-dark)`
                  }"
                  circle
                >
                  <arrow-right-icon width="24" />
                </btn-default>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </content-box>
</template>

<style lang="scss">
.info-section {
  $this: '.info-section';

  &--pink {
    color: var(--color-pink-dark);
  }

  &--green {
    color: var(--color-green-dark);
  }

  &--orange {
    color: var(--color-orange-dark);
  }

  &__inner {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-weight: 800;
    font-size: 30px;
    line-height: 1;
    text-transform: uppercase;
    margin: 0 0 20px;

    @media (min-width: $mq-sm) {
      font-size: 50px;
      text-align: center;
      margin: 0 0 30px;
    }

    @media (min-width: $mq-lg) {
      font-size: 70px;
      margin: 0 0 50px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: $mq-lg) {
      flex-direction: row;
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    flex: none;

    @media (min-width: $mq-lg) {
      width: 440px;
    }
  }

  &__icon {
    display: none;

    @media (min-width: $mq-lg) {
      display: flex;
      width: 165px;
      max-height: 165px;
      margin: auto 0 0;
      @include imageGradient;
    }
  }

  &__subtitle {
    font-weight: 700;
    font-size: 20px;
    text-transform: uppercase;
    margin: 0 0 10px;

    @media (min-width: $mq-lg) {
      font-size: 24px;
    }
  }

  &__description {
    display: flex;
    margin: 0 0 20px;
    font-weight: 400;
    color: var(--color-text-chocolate);
  }

  &__cards {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 10px;

    @media (min-width: $mq-sm) {
      gap: 20px;
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 6px;

    @media (min-width: $mq-sm) {
      display: flex;
      flex-direction: row;
    }
  }

  &__card-header {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    height: 160px;
    flex: none;

    @media (min-width: $mq-sm) {
      height: auto;
      width: 260px;
    }

    #{$this}--pink & {
      background: linear-gradient(
          -120deg,
          var(--color-pink-light) 45%,
          var(--color-pink) 45%
      );
    }

    #{$this}--green & {
      background: linear-gradient(
          -120deg,
          var(--color-green-light) 45%,
          var(--color-green) 45%
      );
    }

    #{$this}--orange & {
      background: linear-gradient(
          -120deg,
          var(--color-orange-light) 45%,
          var(--color-orange) 45%
      );
    }
  }

  &__card-position {
    position: absolute;
    top: 20px;
    right: 20px;
    font-weight: 800;
    font-size: 30px;
    line-height: 100%;
    opacity: 0.5;
  }

  &__card-icon {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: var(--color-white);
    opacity: 0.43;
    width: 50px;
    height: 50px;
  }

  &__card-content {
    flex: 1;
    border-radius: 24px;
    padding: 20px;
    background-color: var(--color-white);
  }

  &__card-title {
    font-weight: 800;
    font-size: 22px;
    line-height: 100%;
    color: var(--color-text-brown);
    margin: 0 0 10px;
  }

  &__card-description {
    font-weight: 400;
    color: var(--color-text-chocolate);
    margin: 0 0 14px;
  }

  &__card-actions {
    display: flex;
  }
}
</style>

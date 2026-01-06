<script setup lang="ts">
import { api } from '~/api';
import PiggyBankIcon from '~/assets/svg/piggy-bank-icon.svg';
import PhoneIcon from '~/assets/svg/phone-icon.svg';
import ArrowRightIcon from '~/assets/svg/arrow-right-icon.svg';

interface TabProps {
  label: string
  name: string
  content: string
}

const route = useRoute()
const sliderRef = ref(null)
const slider = useSwiper(sliderRef)
const modalStore = useModalStore()
const { breakpoint, isMobileView } = useBreakpoint()
const slug = computed(() => route.params.slug)

const { data: animalResponse } = await useAsyncData('animal-' + slug.value, () => {
  if (!slug.value) {
    throw new Error('Не передан "slug"')
  }

  return api.animals.get({
    populate: '*',
    filters: {
      slug: {
        $eq: slug.value,
      },
    },
  })
})

const animal = animalResponse.value?.data[0] ?? null

const fundsSegments = computed(() => {
  if (breakpoint.value === 'mobile') {
    return 26
  }

  if (breakpoint.value === 'tablet-small') {
    return 36
  }

  if (breakpoint.value === 'tablet') {
    return 80
  }

  if (breakpoint.value === 'laptop-small') {
    return 36
  }

  if (breakpoint.value === 'laptop') {
    return 46
  }

  if (breakpoint.value === 'desktop') {
    return 50
  }

  return 26
})

const tabs = computed((): TabProps[] => [{
  name: 'features',
  label: 'Особенности',
  content: animal?.featuresNotes ?? '',
}, {
  name: 'health',
  label: 'Здоровье',
  content: animal?.healthNotes ?? '',
}, {
  name: 'finance',
  label: 'Финансы',
  content: animal?.financeNotes ?? '',
}].filter(tab => tab.content))

const activeTab = ref(tabs.value[0]?.name ?? '')

function handleDonateBtn() {
  if (isMobileView.value) {
    modalStore.open('donate-with-guide')
  } else {
    modalStore.open('donate-with-qr')
  }
}
</script>

<template>
  <content-box
    v-if="animal"
    class="animal-page"
  >
    <page-section>
      <div class="animal-page__card">
        <section class="animal-page__gallery">
          <swiper-container
            ref="sliderRef"
            space-between="10"
            :pagination="{ clickable: true }"
            class="animal-page__gallery-slider"
          >
            <swiper-slide
              v-for="file in animal.gallery"
              :key="file.id"
              class="animal-page__gallery-slide"
            >
              <img
                :src="file.url"
                :alt="file.alternativeText || file.name"
                class="animal-page__gallery-image"
                loading="lazy"
              >
            </swiper-slide>
          </swiper-container>

          <div
            v-if="!isMobileView"
            class="animal-page__gallery-controls"
          >
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

          <div class="animal-page__actions">
            <animal-actions :animal="animal" />
          </div>
        </section>

        <section class="animal-page__details">
          <header class="animal-page__header">
            <h1 class="animal-page__name">
              {{ animal.name }}
            </h1>
          </header>

          <animal-info
            class="animal-page__info"
            :animal="animal"
            full
          />

          <p class="animal-page__desc">
            {{ animal.description }}
          </p>

          <section
            v-if="animal.fundsIsNeeded"
            class="animal-page__fundraising"
          >
            <h2 class="animal-page__fundraising-title">
              Требуется срочное лечение!
            </h2>
            <p class="animal-page__fundraising-reason">
              {{ animal.fundsReason }}
            </p>
            <fundraising-bar
              class="animal-page__fundraising-bar"
              :segments="fundsSegments"
              :goal="animal.fundsAmountTarget"
              :raised="animal.fundsAmountCollected"
            />
            <div class="animal-page__fundraising-actions">
              <btn-default
                class="animal-page__fundraising-btn"
                style="flex: 1"
                color="orange"
                no-border
                @click="handleDonateBtn"
              >
                Хочу помочь
              </btn-default>
              <btn-default
                class="animal-page__fundraising-btn"
                color="orange"
                no-border
                circle
                @click="handleDonateBtn"
              >
                <piggy-bank-icon width="24" />
              </btn-default>
            </div>
          </section>

          <section
            v-else
            class="animal-page__donation"
          >
            <btn-default
              class="animal-page__donation-btn"
              style="flex: 1"
              @click="handleDonateBtn"
            >
              Помочь материально
            </btn-default>
            <btn-default
              class="animal-page__donation-btn"
              circle
              @click="handleDonateBtn"
            >
              <piggy-bank-icon width="24" />
            </btn-default>
          </section>

          <section
            v-if="animal.curator"
            class="animal-page__contact"
          >
            <h2 class="animal-page__contact-title">
              Хотите забрать питомца? Звоните куратору
            </h2>
            <address class="animal-page__contact-info">
              <div class="animal-page__contact-btn">
                <btn-default
                  color="blue"
                  circle
                  no-border
                  :to="`tel:${animal.curator.phone}`"
                >
                  <phone-icon width="24" />
                </btn-default>
              </div>
              <nuxt-link
                class="animal-page__contact-phone"
                :to="`tel:${animal.curator.phone}`"
              >
                {{ formatBelarusPhone(animal.curator.phone) }} {{ animal.curator.firstName }}
              </nuxt-link>
            </address>
          </section>
        </section>
      </div>
    </page-section>

    <page-section>
      <div class="animal-page__tabs">
        <div class="animal-page__tabs-buttons">
          <div class="animal-page__tabs-buttons-inner">
            <button
              v-for="tab in tabs"
              :key="tab.name"
              class="animal-page__tabs-button"
              :class="{ 'animal-page__tabs-button--active': tab.name === activeTab }"
              @click="activeTab = tab.name"
            >
              <arrow-right-icon
                class="animal-page__tabs-button-icon"
                width="24"
              />

              <span class="animal-page__tabs-button-label">
                {{ tab.label }}
              </span>
            </button>
          </div>
        </div>

        <div class="animal-page__tabs-content">
          <transition
            name="animal-page__tabs-pane-"
            mode="out-in"
          >
            <markdown-viewer
              v-if="activeTab"
              :key="activeTab"
              class="animal-page__tabs-pane"
              :content="tabs.find(t => t.name === activeTab)?.content || ''"
            />
          </transition>
        </div>
      </div>
    </page-section>
  </content-box>
</template>

<style lang="scss">
.animal-page {
  $this: '.animal-page';
  padding: 80px 0 0;

  @media (min-width: $mq-sm) {
    padding: 100px 0 0;
  }

  @media (min-width: $mq-md) {
    padding: 120px 0 0;
  }

  &__card {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    max-width: 1440px;

    @media (min-width: $mq-md) {
      flex-direction: row;
      gap: 20px;
      align-items: flex-start;
    }
  }

  &__gallery {
    display: flex;
    position: relative;
    margin: 0 0 24px;

    ::part(pagination) {
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: 0;

      @media (min-width: $mq-md) {
        bottom: 20px;
      }
    }

    ::part(bullet) {
      width: 40px;
      height: 10px;
      border-radius: 5px;
      background-color: var(--color-white);
    }

    ::part(bullet-active) {
      width: 40px;
      height: 10px;
      border-radius: 5px;
      background-color: var(--color-blue);
    }

    @media (min-width: $mq-md) {
      width: 60%;
    }
  }

  &__gallery-slider {
    width: 100%;
  }

  &__gallery-slide {
    position: relative;
    padding: 75% 0 0;
    border-radius: 24px;
    overflow: hidden;

    @media (min-width: $mq-md) {
      padding: 66.66% 0 0;
    }
  }

  &__gallery-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__gallery-controls {
    position: absolute;
    inset: auto 0 0 0;
    z-index: 1;
    padding: 10px;
    display: flex;
    justify-content: center;
    gap: 10px;

    @media (min-width: $mq-md) {
      justify-content: flex-start;
      padding: 20px;
      inset: auto auto 0 0;
    }
  }

  &__actions {
    position: absolute;
    inset: 10px 10px auto auto;
    z-index: 1;
    display: flex;

    @media (min-width: $mq-md) {
      inset: 20px 20px auto auto;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;

    @media (min-width: $mq-md) {
      width: 50%;
    }
  }

  &__header {
  }

  &__name {
    font-weight: 900;
    font-size: 24px;
    color: var(--color-orange);
    margin: 0 0 10px;

    @media (min-width: $mq-sm) {
      font-size: 30px;
    }

    @media (min-width: $mq-md) {
      font-size: 40px;
    }

    @media (min-width: $mq-lg) {
      font-size: 50px;
    }
  }

  &__info {
    border-radius: 24px;
    background-color: var(--color-white);
    margin: 0 0 20px;
  }

  &__desc {
    font-weight: 400;
    line-height: 1.2;
    margin: 0 0 30px;
  }

  &__fundraising {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-orange);
    padding: 20px;
    margin: 0 0 30px;
    border-radius: 24px;
    background-color: var(--color-white);
  }

  &__fundraising-title {
    font-size: 20px;
    line-height: 1.2;
    font-weight: 700;
    margin: 0 0 10px;
    color: var(--color-orange-dark);
  }

  &__fundraising-reason {
    font-weight: 400;
    line-height: 1.2;
    margin: 0 0 14px;
  }

  &__fundraising-bar {
    padding: 14px 0;
    margin: 0 0 14px;
    border-top: 1px solid var(--color-orange-light);
    border-bottom: 1px solid var(--color-orange-light);
  }

  &__fundraising-actions {
    display: flex;
    align-items: center;
  }

  &__donation {
    display: flex;
    align-items: center;
    margin: 0 0 30px;
  }

  &__donation-btn {
    color: var(--color-blue);
  }

  &__contact {
    padding: 20px;
    background-color: var(--color-blue-light);
    border-radius: 24px;
    margin: 0 0 30px;
  }

  &__contact-title {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.2;
    color: var(--color-blue);
    margin: 0 0 10px;
    padding: 0 0 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__contact-info {
    display: flex;
    align-items: center;
    gap: 20px;
    color: var(--color-blue);
    font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
    font-style: inherit;
  }

  &__contact-btn {
  }

  &__contact-phone {
  }

  &__tabs {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 auto;
    max-width: 1440px;

    @media (min-width: $mq-md) {
      flex-direction: row;
    }
  }

  &__tabs-buttons {
    overflow-y: hidden;
    overflow-x: auto;
    width: 100%;

    @media (min-width: $mq-md) {
      width: auto;
      overflow: visible;
    }
  }

  &__tabs-buttons-inner {
    border-radius: 24px;
    background-color: var(--color-white);
    display: flex;
    white-space: nowrap;
    padding: 0 8px;
    width: max-content;
    min-width: 100%;
    overflow: hidden;

    @media (min-width: $mq-md) {
      flex-direction: column;
      width: 255px;
      padding: 0 20px;
    }
  }

  &__tabs-button {
    position: relative;
    display: flex;
    flex: none;
    align-items: center;
    padding: 0 10px;
    height: 48px;
    border: none;
    color: var(--color-pink-dark);
    cursor: pointer;
    transition: background-color 0.3s;
    font-weight: 700;
    font-size: 18px;

    &:not(:last-child) {
      &::after {
        position: absolute;
        content: '';
        display: flex;
        inset: 14px 0 0 auto;
        height: 20px;
        width: 1px;
        background-color: var(--color-background-pink);
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--color-orange);
      }
    }

    @media (min-width: $mq-md) {
      padding: 0;
      border-bottom: 1px solid var(--color-background-pink);

      &:not(:last-child) {
        &::after {
          display: none;
        }
      }
    }

    &--active {
      color: var(--color-pink-dark);

      #{$this}__tabs-button-label {
        transform: translateX(0);
        opacity: 1;
      }

      #{$this}__tabs-button-icon {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }

  &__tabs-button-label {
    transition: transform 0.3s;
    opacity: 0.7;

    @media (min-width: $mq-md) {
      transform: translateX(-24px);
    }
  }

  &__tabs-button-icon {
    display: none;

    @media (min-width: $mq-md) {
      transition: transform 0.3s, opacity 0.3s;
      display: inline-flex;
      opacity: 0;
      transform: translateX(-24px);
    }
  }

  &__tabs-content {
    background: var(--color-background-beige);
    border-radius: 12px;
  }

  &__tabs-pane {
    line-height: 1.4;

    &--enter-active,
    &--leave-active {
      transition: opacity 0.3s ease;
    }

    &--enter-from,
    &--leave-to {
      opacity: 0;
    }
  }
}
</style>

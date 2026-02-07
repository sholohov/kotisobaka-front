<script setup lang="ts">
import { api } from '~/api';
import type { MediaFile } from '~/api/types';
import type { Swiper } from 'swiper'
import type { Animal } from '~/api/animals/types'

interface TabProps {
  label: string
  name: string
  content: string
}

definePageMeta({
  seoPageOverride: true,
})

const route = useRoute()
const sliderRef = ref(null)
const slider = useSwiper(sliderRef)
const modalStore = useModalStore()
const { breakpoint, isMobileView, isMobile, isTabletSmall } = useBreakpoint()
const slug = computed(() => route.params.slug)
const previewSwiperRef = ref<HTMLElement & { swiper: Swiper }>()

// Получаем данные животного
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

if (!animal) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Питомец не найден',
  })
}

const fundraisingTitle = computed(() => {
  return animal.animalStatus === 'under_treatment'
    ? 'Требуется срочно лечение!'
    : 'Сбор средств'
})

usePageSeo({
  title: `${animal.name} ищет дом`,
  description: formatAnimalDescription(animal),
  ogImage: animal.photo?.url,
  ogType: 'profile',
  ogTitle: `${animal.name} ищет дом`,
  ogDescription: `Помогите найти дом для ${animal.name} в Минске. ${formatShortAnimalInfo(animal)}`,
  profileFirstName: animal.name,
  profileGender: animal.gender === 'male' ? 'male' : 'female',
  articleSection: 'Животные ищут дом',
  articleTag: getAnimalTags(animal),
})

function formatAnimalDescription(animal: Animal): string {
  const species = animal.species === 'cat' ? 'кошка' : 'собака'
  const gender = animal.gender === 'male' ? 'мальчик' : 'девочка'
  const age = getAge(animal.birthDate)
  const sterilized = animal.sterilized ? 'стерилизован' : 'не стерилизован'
  const vaccinated = animal.vaccinated ? 'вакцинирован' : 'не вакцинирован'
  const color = animal.color ? `Окрас: ${animal.color}.` : ''
  let description = `${species} ${animal.name}, ${gender}, ${age}. Порода: ${animal.breed}. `
  const sterilizedGender = sterilized + (animal.gender === 'female' ? 'a' : '')
  const vaccinatedGender = vaccinated + (animal.gender === 'female' ? 'a' : '')

  description += `${color} ${sterilizedGender}, ${vaccinatedGender}. `
  description += animal.description.substring(0, 180)

  if (animal.description.length > 180) {
    description += '...'
  }

  return description
}

function formatShortAnimalInfo(animal: Animal): string {
  const species = animal.species === 'cat' ? 'кошка' : 'собака'
  const age = getAge(animal.birthDate)

  return `${species}, порода: ${animal.breed}, ${age}.`
}

function getAnimalTags(animal: Animal): string[] {
  const tags = [
    animal.species === 'cat' ? 'кошка' : 'собака',
    animal.breed,
    animal.color,
    animal.gender === 'male' ? 'мальчик' : 'девочка',
    'ищет дом',
    'Минск',
    'ООЗЖ Кот и Собака',
    'животные из приюта',
  ]

  if (animal.sterilized) tags.push('стерилизован')
  if (animal.vaccinated) tags.push('вакцинирован')
  if (animal.fundsIsNeeded) tags.push('нужна помощь')
  if (animal.goodWithChildren) tags.push('ладит с детьми')
  if (animal.goodWithCats) tags.push('ладит с кошками')
  if (animal.goodWithDogs) tags.push('ладит с собаками')
  if (animal.forBeginners) tags.push('для начинающих')
  if (animal.specialNeeds) tags.push('особые потребности')
  if (animal.animalStatus === 'available') tags.push('ищет хозяина')

  return tags.filter(Boolean)
}

const gallery = computed(() => {
  const items: MediaFile[] = []

  if (!animal) {
    return []
  }

  if (animal.photo) {
    items.push(animal.photo)
  }

  if (animal.gallery?.length) {
    items.push(...animal.gallery)
  }

  return items
})

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
          <div class="animal-page__gallery-view">
            <swiper-container
              ref="sliderRef"
              space-between="10"
              :pagination="isMobileView ? { clickable: true } : false "
              :thumbs="{
                swiper: previewSwiperRef?.swiper
              }"
              class="animal-page__gallery-view-slider"
            >
              <swiper-slide
                v-for="file in gallery"
                :key="file.documentId"
                class="animal-page__gallery-view-slide"
              >
                <img
                  :src="file.formats.large?.url || file.url"
                  :alt="file.alternativeText || file.name"
                  class="animal-page__gallery-view-image"
                  loading="lazy"
                >
              </swiper-slide>
            </swiper-container>

            <div
              v-if="!isMobileView"
              class="animal-page__gallery-view-controls"
            >
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

            <div class="animal-page__actions">
              <animal-actions :animal="animal" />
            </div>
          </div>

          <swiper-container
            v-if="!isMobile && !isTabletSmall"
            ref="previewSwiperRef"
            :slides-per-view="3"
            :space-between="20"
            :direction="'vertical'"
            class="animal-page__gallery-preview"
          >
            <swiper-slide
              v-for="file in gallery"
              :key="file.documentId"
              class="animal-page__gallery-preview-slide"
            >
              <img
                :src="file.formats.small?.url || file.url"
                :alt="file.alternativeText || file.name"
                class="animal-page__gallery-preview-image"
                loading="lazy"
              >
            </swiper-slide>
          </swiper-container>
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
              {{ fundraisingTitle }}
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
                <svg-icon name="piggy-bank-icon" />
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
              <svg-icon name="piggy-bank-icon" />
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
                  <svg-icon name="phone-icon" />
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
              <svg-icon
                name="arrow-right-icon"
                class="animal-page__tabs-button-icon"
              />

              <span class="animal-page__tabs-button-label">
                {{ tab.label }}
              </span>
            </button>
          </div>
        </div>

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

    @media (min-width: $mq-md) {
      flex-direction: row;
      gap: 20px;
      align-items: flex-start;
    }
  }

  &__gallery {
    display: flex;
    margin: 0 0 24px;
    position: relative;
    min-width: 0;
    flex: 1;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row-reverse;
  }

  &__gallery-view {
    display: flex;
    position: relative;
    margin: 0 0 24px;
    width: 100%;
    height: 60vw;

    ::part(container) {
      overflow: visible;
    }

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

    @media (min-width: $mq-sm) {
      width: calc(100% - 200px);
      height: 500px;

      ::part(container) {
        overflow: hidden;
      }
    }

    @media (min-width: $mq-lg) {
      width: calc(100% - 220px);
      height: 600px;
    }
  }

  &__gallery-view-slider {
    width: 100%;
  }

  &__gallery-view-slide {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
  }

  &__gallery-view-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__gallery-view-controls {
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

  &__gallery-preview {
    width: 180px;
    height: 500px;
    margin: 0;

    @media (min-width: $mq-lg) {
      width: 200px;
      height: 600px;
    }
  }

  &__gallery-preview-slide {
    position: relative;
    padding: 75% 0 0;
    border-radius: 24px;
    overflow: hidden;
    opacity: 0.5;
    transition: opacity 0.3s;

    &.swiper-slide-thumb-active {
      opacity: 1;
    }
  }

  &__gallery-preview-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__details {
    display: flex;
    flex-direction: column;

    @media (min-width: $mq-md) {
      flex: none;
      width: 360px;
    }

    @media (min-width: $mq-xl) {
      flex: none;
      width: 460px;
    }
  }

  &__header {
  }

  &__name {
    font-weight: 900;
    font-size: 26px;
    color: var(--color-orange);
    margin: 0 0 10px;

    @media (min-width: $mq-lg) {
      font-size: 36px;
    }
  }

  &__info {
    border-radius: 24px;
    background-color: var(--color-white);
    margin: 0 0 20px;
  }

  &__desc {
    font-weight: 400;

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

    font-weight: 700;
    margin: 0 0 10px;
    color: var(--color-orange-dark);
  }

  &__fundraising-reason {
    font-weight: 400;

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
      width: 280px;
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

    @include hover {
      color: var(--color-orange);
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

  &__tabs-pane {
    max-width: 900px;
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

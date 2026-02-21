<script setup lang="ts">
import { apiFundraising } from '~/api/fundraising';
import type { Swiper } from 'swiper';
import FoudrasingCard from '~/components/fundraising/foudrasing-card.vue';

definePageMeta({
  pageTitle: 'Целевые сборы',
  pageTitleIcon: 'fundraising',
})

const swiperInstances = ref<Record<string, Swiper>>({});

const onSwiperInit = (e: CustomEvent, id: string) => {
  swiperInstances.value[id] = e.detail[0];
};

const nextSlide = (id: string) => {
  swiperInstances.value[id]?.slideNext();
};

const prevSlide = (id: string) => {
  swiperInstances.value[id]?.slidePrev();
};

const { data: fundraisingResponse } = await useAsyncData('fundraising-page', () => {
  return apiFundraising.get({
    populate: {
      animals: {
        populate: '*',
      },
    },
  })
})
</script>

<template>
  <content-box
    v-if="fundraisingResponse?.data.length"
    class="fundraising-page"
  >
    <div class="fundraising-page__grid">
      <div
        v-for="item in fundraisingResponse.data"
        :key="item.documentId"
        class="fundraising-page__grid-item"
      >
        <div class="fundraising-page__fundraising">
          <foudrasing-card
            class="fundraising-page__fundraising-card"
            :title="item.title"
            :description="item.description"
            :amount-target="item.amountTarget"
            :amount-collected="item.amountCollected"
          />
          <div class="fundraising-page__fundraising-text">
            Все чеки и движения средств вы найдёте в карточке питомца, во вкладке «Финансы».
          </div>
        </div>

        <div class="fundraising-page__animals">
          <swiper-container
            space-between="10px"
            class="fundraising-page__animals-slider"
            @swiperinit="(e) => onSwiperInit(e, item.documentId)"
          >
            <swiper-slide
              v-for="animal in item.animals"
              :key="animal.documentId"
              class="fundraising-page__animals-card"
            >
              <animal-card :animal="animal" />
            </swiper-slide>
          </swiper-container>

          <div class="fundraising-page__animals-controls">
            <btn-default
              circle
              no-border
              color="blue"
              @click="prevSlide(item.documentId)"
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
              @click="nextSlide(item.documentId)"
            >
              <svg-icon name="arrow-right-icon" />
            </btn-default>
          </div>
        </div>
      </div>
    </div>
  </content-box>
  <content-box
    v-else
    class="fundraising-page"
  >
    <fundraising-empty />
  </content-box>
</template>

<style lang="scss">
.fundraising-page {
  $this: '.fundraising-page';
  padding: 0 0 120px;

  &__grid {
    display: flex;
    flex-direction: column;
    gap: 60px 10px;

    @media (min-width: $mq-lg) {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 60px 20px;
    }
  }

  &__grid-item {
    display: flex;
    gap: 10px;
    flex-direction: column;

    @media (min-width: $mq-sm) {
      flex-direction: row;
      align-items: flex-start;
    }

    @media (min-width: $mq-lg) {
      width: calc(50% - 10px)
    }
  }

  &__fundraising {
    margin: 10px 0 0;
    width: 100%;

    @media (min-width: $mq-sm) {
      width: 50%
    }
  }

  &__fundraising-card {
    margin: 0 0 20px;
  }

  &__fundraising-text {
    color: var(--color-pink-dark);
  }

  &__animals {
    width: 100%;

    @media (min-width: $mq-sm) {
      width: 50%
    }
  }

  &__animals-slider {
    width: 100%;
    margin: 0 0 10px;
  }

  &__animals-card {
    padding: 10px 0;
  }

  &__animals-controls {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
}
</style>

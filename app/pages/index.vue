<script setup lang="ts">
import { api } from "~/api";
import AnimalSlider from "~/components/animal-slider.vue";

const { data: pageData } = await useAsyncData('home-page', async () => {
  const [
    heroAnimals,
    statsRes,
    availableAnimals,
    quotes,
  ] = await Promise.all([
    api.heroAnimal.get({
      populate: {
        animals: {
          populate: "*",
        },
      },
    }),
    api.statistic.get(),
    api.animals.get({
      populate: 'photo',
      filters: {
        animalStatus: {
          $eq: 'available',
        },
      },
      sort: ['priorityAdoption:desc'],
      pagination: {
        page: 1,
        pageSize: 10,
      },
    }),
    api.quotes.get(),
  ]);

  return {
    heroAnimals: heroAnimals.data,
    rescueStats: statsRes.data,
    availableAnimals: availableAnimals.data,
    quotes: quotes.data,
  }
});
</script>

<template>
  <div
    v-if="pageData"
    class="home-page"
  >
    <page-section>
      <hero-block :items="pageData.heroAnimals.animals" />
    </page-section>

    <page-section anchor="rescue_stats">
      <rescue-stats :stats="pageData.rescueStats" />
    </page-section>

    <page-section
      anchor="available_animals"
      title="Наши хвостики"
    >
      <animal-slider
        :animals="pageData.availableAnimals"
        :quotes="pageData.quotes"
      />
    </page-section>

    <page-section
      anchor="available_animals"
      title="Как можно помочь?"
    >
      <animal-help-guide />
    </page-section>

    <page-section
      anchor="need_help"
      title="Срочно нужна помощь!"
    >
      <animal-slider
        :animals="pageData.availableAnimals"
        :quotes="pageData.quotes"
      />
    </page-section>
  </div>
</template>

<style lang="scss">

</style>

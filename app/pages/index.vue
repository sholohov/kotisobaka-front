<script setup lang="ts">
import { api } from "~/api";
import AnimalSlider from "~/components/animal-slider.vue";

const { data: pageData } = await useAsyncData('home-page', async () => {
  const [
    heroAnimals,
    statsRes,
    availableAnimals,
    quotes,
    fundsIsNeededAnimals,
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
    api.animals.get({
      populate: 'photo',
      filters: {
        fundsIsNeeded: {
          $eq: true,
        },
      },
      sort: ['fundsPriority:desc'],
      pagination: {
        page: 1,
        pageSize: 10,
      },
    }),
  ]);

  return {
    heroAnimals: heroAnimals.data,
    rescueStats: statsRes.data,
    availableAnimals: availableAnimals.data,
    quotes: quotes.data,
    fundsIsNeededAnimals: fundsIsNeededAnimals.data,
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
        is-need-help
        :animals="pageData.fundsIsNeededAnimals"
        :quotes="pageData.quotes"
      />
    </page-section>

    <page-section
      anchor="adoption_process"
      title="Процесс опекунства"
    >
      <adoption-process />
    </page-section>
    <div />
  </div>
</template>

<style lang="scss">

</style>

<script setup lang="ts">
import { api } from "~/api";
import AnimalSlider from "~/components/animal-slider.vue";

const { data: pageData } = await useAsyncData('home-page', async () => {
  const [
    heroAnimals,
    statsRes,
    availableAnimals,
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
  ]);

  return {
    heroAnimalsData: heroAnimals.data,
    rescueStatsData: statsRes.data,
    availableAnimalsData: availableAnimals.data,
  }
});

console.log(pageData.value?.heroAnimalsData)
</script>

<template>
  <div
    v-if="pageData"
    class="home-page"
  >
    <page-section>
      <hero-block :items="pageData.heroAnimalsData.animals" />
    </page-section>

    <page-section>
      <rescue-stats :stats="pageData.rescueStatsData" />
    </page-section>

    <page-section
      anchor="animals"
      title="Наши хвостики"
    >
      <animal-slider :items="pageData.availableAnimalsData" />
    </page-section>
  </div>
</template>

<style lang="scss">

</style>

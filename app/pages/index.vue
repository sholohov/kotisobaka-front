<script setup lang="ts">
import { api } from "~/api";

const { data } = await useAsyncData('home-page', async () => {
  const [animalsRes, statsRes] = await Promise.all([
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
    api.statistic.get(),
  ]);

  return {
    heroBlockAnimalsData: animalsRes.data,
    rescueStatsData: statsRes.data,
  };
});

</script>

<template>
  <div
    v-if="data"
    class="home-page"
  >
    <page-section>
      <hero-block :items="data.heroBlockAnimalsData" />
    </page-section>

    <page-section>
      <rescue-stats :stats="data.rescueStatsData" />
    </page-section>

    <page-section
      anchor="animals"
      title="Наши хвостики"
    >
      //
    </page-section>
  </div>
</template>

<style lang="scss">

</style>

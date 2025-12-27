<script setup lang="ts">
import { api } from "~/api";

const { data: heroBlockAnimals } = await api.animals.get({
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
})

</script>

<template>
  <div class="home-page">
    <div class="home-page__hero-block">
      <hero-block :cards="heroBlockAnimals" />
    </div>
  </div>
</template>

<style lang="scss">

</style>

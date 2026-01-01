<script setup lang="ts">
import { api } from "~/api";
import AnimalSlider from "~/components/animal/animal-slider.vue";

const { data: pageData } = await useAsyncData('home-page', async () => {
  const [
    heroAnimals,
    statsRes,
    availableAnimals,
    quotes,
    fundsIsNeededAnimals,
    articles,
    partners,
    reviews,
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
      populate: ['photo'],
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
      populate: ['photo'],
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
    api.articles.get({
      sort: ["publishedDate:asc"],
      populate: ['coverImage'],
    }),
    api.partners.get({
      populate: ['logo', 'link'],
    }),
    api.reviews.get({
      populate: ['photo'],
    }),
  ]);

  return {
    heroAnimals: heroAnimals.data,
    rescueStats: statsRes.data,
    availableAnimals: availableAnimals.data,
    quotes: quotes.data,
    fundsIsNeededAnimals: fundsIsNeededAnimals.data,
    articles: articles.data,
    partners: partners.data,
    reviews: reviews.data,
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
      <help-guide />
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

    <page-section
      anchor="articles"
      title="Блог и новости"
    >
      <articles-slider
        :articles="pageData.articles"
        :quotes="pageData.quotes"
      />
    </page-section>

    <page-section
      anchor="partners"
      title="Наши партнёры"
    >
      <partners-slider :partners="pageData.partners" />
    </page-section>
    <page-section
      anchor="stories"
      title="Счастливые истории"
    >
      <stories-slider :stories="pageData.reviews" />
    </page-section>
    <div />
  </div>
</template>

<style lang="scss">

</style>

<script setup lang="ts">
import { api } from '~/api';
import type { Animal } from '~/api/animals/types';
import type { Quote } from '~/api/quotes/types';

const pagination = reactive({
  page: 0,
  pageCount: 0,
})

const { data: pageData } = await useAsyncData('animals-page', async () => {
  const [
    availableAnimals,
    quotes,
    fundsIsNeededAnimals,
  ] = await Promise.all([
    api.animals.get({
      populate: ['photo'],
      filters: {
        animalStatus: {
          $eq: 'available',
        },
      },
      sort: ['priorityAdoption:desc'],
      pagination: {
        page: pagination.page,
        pageSize: 15,
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
  ]);

  return {
    availableAnimals,
    quotes,
    fundsIsNeededAnimals,
  }
}, { watch: [() => pagination.page] });

pagination.page = pageData.value?.availableAnimals.meta.pagination.page ?? 1
pagination.pageCount = pageData.value?.availableAnimals.meta.pagination.pageCount ?? 0

const handlePageChange = (page: number) => {
  pagination.page = page
}

</script>

<template>
  <div
    v-if="pageData"
    class="animals-page"
  >
    <page-section
      anchor="need_help"
      title="Нуждаются в помощи"
    >
      <animal-slider
        is-need-help
        hide-link
        :animals="pageData.fundsIsNeededAnimals.data"
        :quotes="pageData.quotes.data"
      />
    </page-section>

    <page-section
      anchor="looking_for_family"
      title="Ищут семью"
    >
      <content-box>
        <common-grid
          :items="pageData.availableAnimals.data"
          :quotes="pageData.quotes.data"
        >
          <template #default="{ item: animal }: { item: Animal }">
            <animal-card
              :animal="animal"
              class="animal-slider__card"
            />
          </template>

          <template #quote="{ item: quote }: { item: Quote & { color: string } }">
            <quote-card
              :color="quote.color"
              :quote="quote"
              class="animal-slider__card"
            />
          </template>
        </common-grid>
        <div
          v-if="pagination.pageCount - 1"
          class="animals-page__pagination"
        >
          <page-pagination
            :total-pages="pagination.pageCount"
            :current-page="pagination.page"
            :on-change="handlePageChange"
          />
        </div>
      </content-box>
    </page-section>
  </div>
</template>

<style lang="scss">
.animals-page {
  padding: 60px 0;

  &__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0 0;
  }
}
</style>

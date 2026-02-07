<script setup lang="ts">
import { api } from '~/api';
import type { RadioOption } from '~/types/formElements';
import { makeAnimalsFilters } from '~/helpers/filters/animals';

definePageMeta({
  pageTitle: 'Наши хвостики',
  pageTitleIcon: 'animals',
})

const modalStore = useModalStore()

const pagination = reactive({
  page: 0,
  pageCount: 0,
})

const filters = reactive(makeAnimalsFilters())

const filterOptions: RadioOption[] = [
  { value: null, key: 'all', label: 'Все' },
  { value: 'cat', key: 'cats', label: 'Кошки' },
  { value: 'dog', key: 'dogs', label: 'Собаки' },
]

const { data: availableAnimals } = await useAsyncData('available-animals', async () => {
  const { species, age, gender, compatibility, beginners } = filters

  return api.animals.get({
    populate: ['photo'],
    filters: {
      animalStatus: { $eq: 'available' },
      species: species ? { $eq: species } : undefined,
      birthDate: age ? { $between: parseAgeRange(age ?? '0-now') } : undefined,
      gender: gender ? { $eq: gender } : undefined,
      goodWithChildren: compatibility.includes('children') ? { $eq: true } : undefined,
      goodWithCats: compatibility.includes('cat') ? { $eq: true } : undefined,
      goodWithDogs: compatibility.includes('dog') ? { $eq: true } : undefined,
      forBeginners: beginners ? { $eq: true } : undefined,
    },
    sort: ['priorityAdoption:desc'],
    pagination: {
      page: pagination.page,
      pageSize: 15,
    },
  })
}, {
  watch: [pagination, filters],
  deep: true,
})

const colors = ['green', 'purple', 'yellow', 'blue']

const { data: pageData } = await useAsyncData('animals-page', async () => {
  const [quotes, fundsIsNeededAnimals] = await Promise.all([
    api.quotes.get(),
    api.animals.get({
      populate: ['photo'],
      filters: { fundsIsNeeded: { $eq: true } },
      sort: ['fundsPriority:desc'],
      pagination: { page: 1, pageSize: 10 },
    }),
  ])

  return { quotes, fundsIsNeededAnimals }
})

pagination.page = availableAnimals.value?.meta.pagination.page ?? 1
pagination.pageCount = availableAnimals.value?.meta.pagination.pageCount ?? 0

function handlePageChange(page: number) {
  pagination.page = page
}

function handleOpenFiltersModalBtn() {
  modalStore.open('animal-list-filters', {
    filters,
    apply(changedFilters: typeof filters) {
      Object.assign(filters, changedFilters)
      modalStore.close()
    },
    reset() {
      Object.assign(filters, makeAnimalsFilters())
      modalStore.close()
    },
  })
}
</script>

<template>
  <div
    v-if="pageData"
    class="animals-page"
  >
    <page-section
      v-if="pageData.fundsIsNeededAnimals.data?.length"
      anchor="need_help"
      title="Нуждаются в помощи"
      right-padding
    >
      <animal-list-slider
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
      <template #header-end>
        <div class="animals-page__filter">
          <radio-group
            v-model="filters.species"
            :options="filterOptions"
          />
          <btn-default
            style="color: var(--color-pink-dark)"
            circle
            @click="handleOpenFiltersModalBtn"
          >
            <svg-icon name="filter-icon" />
          </btn-default>
        </div>
      </template>

      <content-box v-if="availableAnimals?.data && pageData">
        <common-grid
          :items="availableAnimals.data"
          :interspersed="pageData.quotes.data"
          :interspersed-indexes="[3,5,10,15,20,25,30]"
        >
          <template #default="{ item: animal }">
            <animal-card
              :animal="animal"
              hide-fundraising
              class="animal-slider__card"
            />
          </template>

          <template #interspersed="{ item: quote, index }">
            <quote-card
              :color="colors[index] || 'green'"
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
  &__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0 0;
  }

  &__filter {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;

    @media (min-width: $mq-sm) {
      flex: none;
      flex-wrap: nowrap;
    }
  }
}
</style>

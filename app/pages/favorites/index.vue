<script setup lang="ts">
import { api } from '~/api';
import type { AnimalsResponse } from '~/api/animals/types';

definePageMeta({
  pageTitle: 'Ваши питомцы',
  pageTitleIcon: 'favorites',
})

const favoritesStore = useFavoritesStore()

const { data: animalsResponse } = await useAsyncData<AnimalsResponse>('favorites-animals', () => {
  if (!favoritesStore.count) {
    return Promise.resolve({ data: [] } as unknown as AnimalsResponse)
  }

  return api.animals.get({
    populate: ['photo'],
    filters: {
      documentId: {
        $in: favoritesStore.list,
      },
      animalStatus: {
        $in: ['available', 'under_treatment', 'trial_period'],
      },
    },
  })
})
</script>

<template>
  <content-box class="favorites-page">
    <page-section>
      <common-grid
        v-if="animalsResponse?.data.length"
        :items="animalsResponse.data"
      >
        <template #default="{ item }">
          <animal-card
            :animal="item"
            style="align-self: flex-start"
          />
        </template>
      </common-grid>
      <favorites-empty v-else />
    </page-section>

    <favorites-notification />
  </content-box>
</template>

<style lang="scss">

</style>

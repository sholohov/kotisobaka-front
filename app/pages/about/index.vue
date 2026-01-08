<script setup lang="ts">
import { api } from '~/api';

const { data: statResponse } = await useAsyncData(() => {
  return api.statistic.get()
})

const { data: membersResponse } = await useAsyncData(() => {
  return api.members.get()
})
</script>

<template>
  <div class="about-us-page">
    <page-section>
      <about-us-hero
        v-if="statResponse"
        :statistic="statResponse.data"
        :members-count="membersResponse?.data.length ?? 0"
        class="about-us-page__hero"
      />
    </page-section>

    <page-section title="Ключевые проекты и направления">
      <about-us-directions />
    </page-section>

    <page-section>
      <about-us-mission />
    </page-section>

    <page-section title="Наши принципы">
      <about-us-principles />
    </page-section>

    <page-section>
      <about-us-help-actions />
    </page-section>
  </div>
</template>

<style lang="scss">
.about-us-page {
  $this: '.about-us-page';
}
</style>

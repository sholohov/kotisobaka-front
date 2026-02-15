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

    <page-section
      title="Ключевые проекты и направления"
      anchor="directions"
    >
      <about-us-directions />
    </page-section>

    <page-section anchor="mission">
      <about-us-mission />
    </page-section>

    <page-section
      title="Наши принципы"
      anchor="principles"
    >
      <about-us-principles />
    </page-section>

    <page-section anchor="actions">
      <about-us-help-actions />
    </page-section>

    <page-section
      title="Реквизиты"
      anchor="requisite"
    >
      <about-us-requisite />
    </page-section>
  </div>
</template>

<style lang="scss">
.about-us-page {
  $this: '.about-us-page';
}
</style>

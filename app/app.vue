<template>
  <technical-works v-if="showTechnicalWorks" />
  <nuxt-layout v-else />
</template>

<script setup lang="ts">
const {
  showTechnicalWorks,
  checkTechnicalWorksStatus,
} = useTechnicalWorks()

await checkTechnicalWorksStatus()
</script>

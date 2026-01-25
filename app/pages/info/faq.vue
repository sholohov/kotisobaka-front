<script setup lang="ts">
import { apiQuestions } from '~/api/questions';

definePageMeta({
  pageTitle: 'Частые вопросы',
  pageTitleIcon: 'faq',
})

const { data: faqResponse } = await useAsyncData('faq-page', () => {
  return apiQuestions.get()
})

if (!faqResponse.value) {
  throw createError({
    status: 404,
    statusMessage: 'Часто задаваемые вопросы не найдены',
  })
}
</script>

<template>
  <div class="faq-page">
    <content-box>
      <faq-spoilers :items="faqResponse?.data ?? []" />
    </content-box>
  </div>
</template>

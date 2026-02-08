<script setup lang="ts">
import { api } from '~/api';
import type { OrgDocument, OrgDocumentSection } from '~/api/documents/types';

definePageMeta({
  pageTitle: 'Документы отчётность',
  pageTitleIcon: 'about-docs',
})

const { isTabletSmall, isMobile } = useBreakpoint()

const { data: documentsResponse } = await useAsyncData(() => {
  return api.documents.get({
    populate: ['file'],
    sort: 'date:desc',
  })
})

const sections = computed(() => {
  const items = {} as Record<OrgDocumentSection, OrgDocument[]>

  documentsResponse.value?.data.forEach(document => {
    if (!items[document.section]) {
      items[document.section] = []
    }

    items[document.section].push(document)
  })

  return items
})

const sectionKeys = computed(() => {
  return Object.keys(sections.value ?? {}) as OrgDocumentSection[]
})

const colors: ('green' | 'purple' | 'blue')[] = [
  'blue', 'green', 'purple',
]

function getTitle(section: OrgDocumentSection): string {
  switch (section) {
    case 'activity_reports':
      return 'Отчеты о деятельности'
    case 'financial_reports':
      return 'Финансовая отчётность'
    case 'legal_docs':
      return 'Юридические документы'
    default:
      return ''
  }
}
</script>

<template>
  <div class="documents-page">
    <content-box>
      <nav class="documents-page__nav">
        <btn-default
          v-for="section in sectionKeys"
          :key="section"
          :to="`#${section}`"
        >
          {{ getTitle(section) }}
        </btn-default>
      </nav>
    </content-box>

    <page-section
      v-for="(section, sectionKey, sectionIndex) in sections"
      :key="sectionKey"
      :anchor="sectionKey"
      :title="getTitle(sectionKey)"
      :right-padding="isMobile || isTabletSmall"
    >
      <content-box>
        <common-slider
          v-if="isMobile || isTabletSmall"
          :items="section"
        >
          <template #default="{ data }">
            <document-card
              :color="colors[sectionIndex]"
              :org-document="data"
            />
          </template>
        </common-slider>

        <ul
          v-else
          class="documents-page__list"
        >
          <li
            v-for="(orgDocument, orgDocumentKey) in section"
            :key="orgDocumentKey"
            class="documents-page__list-item"
          >
            <document-card
              :color="colors[sectionIndex]"
              :org-document="orgDocument"
            />
          </li>
        </ul>
      </content-box>
    </page-section>

    <page-section>
      <content-box>
        <div class="documents-page__quote">
          Прозрачность — основа доверия. Мы благодарны вам за то,
          что вы интересуетесь нашей работой и помогаете нам менять жизни животных.
        </div>
        <div class="documents-page__help-btn">
          <btn-default
            to="/help"
            color="blue"
          >
            Узнать, как помочь
          </btn-default>
          <btn-default
            to="/help"
            circle
            color="blue"
          >
            <svg-icon name="arrow-right-icon" />
          </btn-default>
        </div>
      </content-box>
    </page-section>
  </div>
</template>

<style lang="scss">
.documents-page {
  $this: '.documents-page';

  &__nav {
    display: flex;
    min-width: 0;
    gap: 10px;
    overflow-x: auto;
    margin: 0 0 20px;
    padding: 10px 0;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  &__list-item {
    width: calc((100% / 2) - 10px);

    @media (min-width: $mq-md) {
      width: calc((100% / 3) - 15px);
    }

    @media (min-width: $mq-lg) {
      width: calc((100% / 4) - 15px);
    }
  }

  &__quote {
    font-weight: 800;
    font-size: 30px;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
    color: var(--color-pink-dark);
    margin: 0 auto 30px;
    max-width: 1100px;

    @media (min-width: $mq-lg) {
      font-size: 36px;
    }
  }

  &__help-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

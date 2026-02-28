<template>
  <!-- Google Tag Manager (noscript) -->
  <noscript>
    <iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-KHJGLX63"
    height="0"
    width="0"
    style="display:none;visibility:hidden">
    </iframe>
  </noscript>
  <!-- End Google Tag Manager (noscript) -->

  <technical-works v-if="showTechnicalWorks" />
  <nuxt-layout v-else />
</template>

<script setup lang="ts">
import { api } from '~/api';

const {
  showTechnicalWorks,
  checkTechnicalWorksStatus,
} = useTechnicalWorks()

const route = useRoute()
const seoPagesStore = useSeoPagesStore()

const { data: seoPages } = await useAsyncData('api/seo-page/' + route.path, () => {
  return api.seoPages.get({
    populate:'*',
    filters: {
      slug: { $eq: route.path },
    },
  })
}, {
  server: true,
})

const seoPage = seoPages.value?.data[0]

usePageSeo({
  title: seoPage?.title,
  description: seoPage?.description,
  ogImage: seoPage?.image?.url,
  robots: seoPage?.robots,
})

onMounted(() => {
  seoPagesStore.fetch()
})

watch(() => [
  route.path,
  route.meta.seoPageOverride,
  seoPagesStore.map,
], () => {
  if (route.meta.seoPageOverride) {
    return
  }

  const found = seoPagesStore.map[route.path]

  usePageSeo({
    title: found?.title,
    description: found?.description,
    ogImage: found?.image?.url,
    robots: found?.robots,
  })
})

useHead({
  script: [{
    src: '/gtm.js',
  }],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-96x96.png',
      sizes: '96x96',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
    {
      rel: 'shortcut icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
  meta: [
    {
      name: 'apple-mobile-web-app-title',
      content: 'KotiSobaka',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
  ],
})

await checkTechnicalWorksStatus()
</script>

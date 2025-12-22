// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxtjs/strapi', '@nuxt/eslint'],

  devtools: { enabled: true },
  devServer: { host: '0.0.0.0', port: 3000 },

  experimental: {
    asyncContext: true,
  },

  compatibilityDate: '2025-07-15',

  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    version: 'v5',
    prefix: '/api',
  },
})

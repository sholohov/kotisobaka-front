// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: { host: '0.0.0.0', port: 3000 },

  devtools: { enabled: true },

  modules: ['@nuxtjs/strapi'],

  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    version: 'v5',
    prefix: '/api'
  },

  compatibilityDate: '2025-07-15',
})

import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/strapi', '@nuxt/eslint', '@nuxtjs/device'],

  devtools: { enabled: true },
  devServer: { host: '0.0.0.0', port: 3000 },

  experimental: {
    asyncContext: true,
  },

  css: [
    '~/assets/styles/tokens.scss',
    '~/assets/styles/fonts.scss',
    '~/assets/styles/main.scss',
  ],

  vite: {
    plugins: [svgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/styles/_variables.scss" as *;
            @use "~/assets/styles/_mixins.scss" as *;
          `,
        },
      },
    },
  },

  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    version: 'v5',
    prefix: '/api',
  },

  compatibilityDate: '2025-07-15',
})

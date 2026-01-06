import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/strapi',
    '@nuxt/eslint',
    '@nuxtjs/device',
    '@pinia/nuxt',
    'nuxt-swiper',
  ],

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

  vue: {
    compilerOptions: {
      isCustomElement: tag => ['swiper-container', 'swiper-slide'].includes(tag),
    },
  },

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
    url: '/',
    prefix: '/cms/api',
    version: 'v5',
  },

  routeRules: {
    '/cms/api/**': { proxy: 'http://127.0.0.1:1337/api/**' },
    '/upload/**': { proxy: 'http://127.0.0.1:1337/upload/**' },
    '/cms/**': { proxy: 'http://127.0.0.1:1337/admin/**' },
  },

  compatibilityDate: '2025-07-15',
})

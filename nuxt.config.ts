export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  colorMode: {
    preference: 'dark',
  },
  nitro: {
    externals: {
      external: ['better-sqlite3', 'dockerode'],
    },
  },
  typescript: {
    strict: true,
  },
})

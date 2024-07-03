// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@tresjs/nuxt"],
  compatibilityDate: "2024-07-03",
  css: ["normalize.css/normalize.css", "@/assets/scss/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/utilities/index.scss";`,
        },
      },
    },
  },
});

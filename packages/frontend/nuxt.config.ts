// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/apollo"],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://api.spacex.land/graphql",
      },
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
});

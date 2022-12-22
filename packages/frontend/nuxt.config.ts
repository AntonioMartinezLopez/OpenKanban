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
  devServer: {
    port: 8000,
  },
  vite: {
    server: {
      hmr: {
        protocol: "ws",
        port: process.env.HMR_PORT ? parseInt(process.env.HMR_PORT) : 8001,
        host: "0.0.0.0",
      },
    },
  },
});

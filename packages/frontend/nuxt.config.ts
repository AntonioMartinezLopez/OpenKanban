// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/apollo"],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: "backend:3002/graphql",
      },
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
  // app: {
  //   baseURL: "/Login",
  // },
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

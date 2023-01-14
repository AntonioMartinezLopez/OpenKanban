// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/apollo"],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      "acceptHMRUpdate",
    ],
  },
  ssr: false,
  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:3002/graphql",
        httpLinkOptions: {
          credentials: "include",
        },
      },
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    config: {
      theme: {
        minHeight: {
          loginBox: "200px",
        },
        extend: {
          gridRow: {
            "span-8": "span 8 / span 8",
          },
          transitionProperty: {
            height: "height",
          },
        },
      },
    },
  },
  app: {
    head: {
      script: [{ src: "/js/three.min.js" }],
    },
    // baseURL: "/Login",
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

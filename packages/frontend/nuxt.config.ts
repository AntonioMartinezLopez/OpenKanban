// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/apollo",
    "@nuxtjs/google-fonts",
  ],
  // alias: {
  //   pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  // },
  googleFonts: {
    download: true,
    base64: true,
    families: {
      Ubuntu: true,
      Saira: true,
    },
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
        fontFamily: {
          components: ["Ubuntu"],
          icon: ["Saira"],
        },
        minHeight: {
          loginBox: "300px",
        },
        extend: {
          gridTemplateRows: {
            // Simple 8 row grid
            "8": "repeat(8, minmax(0, 1fr))",
          },
          gridRow: {
            "span-8": "span 8 / span 8",
          },
          transitionProperty: {
            height: "height",
            width: "width",
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

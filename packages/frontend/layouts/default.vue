<template>
  <div
    class="font-components flex h-screen min-h-[350px] flex-col bg-gray-900 text-sm font-normal text-zinc-300"
  >
    <header
      class="grid h-12 grid-cols-6 border-b border-slate-700 bg-gray-800 subpixel-antialiased"
    >
      <div
        class="col-span-1 ml-2 flex flex-col items-start justify-center overflow-hidden"
        @click="toggleSideMenu"
      >
        <HeaderInteractiveLogo></HeaderInteractiveLogo>
      </div>

      <div
        class="col-span-1 hidden flex-col items-start justify-center md:flex"
      >
        Company Name
      </div>
      <div
        class="col-span-4 flex flex-col items-center justify-center md:col-span-2"
      >
        <input class="w-full rounded-md" />
      </div>
      <!-- <div class="col-span-1"></div> -->
      <div
        class="col-span-1 mr-6 flex flex-col items-end justify-center md:col-span-2"
      >
        <div
          class="flex h-7 w-7 cursor-pointer flex-col items-center justify-center rounded-full border border-slate-500 bg-slate-500 hover:border-green-500"
          @click="setLogOut"
        >
          JD
        </div>
      </div>
    </header>
    <div class="flex flex-1 flex-row overflow-y-auto">
      <LayoutSideMenu :display="sideMenuOpen"></LayoutSideMenu>
      <div class="flex flex-1 overflow-hidden"><slot></slot></div>
    </div>

    <!-- <footer class="h-10 ml-auto text-sm fixed bottom-0 left-1/2">
      OpenKanban 2022
    </footer> -->
  </div>
</template>

<script setup lang="ts">
import { logOut } from "~~/utils/LoginFunctions";
// SITE MENU
const sideMenuOpen = ref<boolean>(true);

const toggleSideMenu = () => {
  sideMenuOpen.value = !sideMenuOpen.value;
};

const setLogOut = () => {
  logOut();
};
</script>

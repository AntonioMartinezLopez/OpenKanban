<template>
  <div
    class="h-screen min-h-[350px] flex flex-col bg-gray-900 text-zinc-300 text-sm"
  >
    <header
      class="h-12 bg-gray-800 subpixel-antialiased grid grid-cols-6 border-slate-700 border-b"
    >
      <div
        class="overflow-hidden col-span-2 md:col-span-1 flex flex-col justify-center items-start ml-2"
      >
        <img class="h-full" src="@/assets/openkanban_logo.png" />
      </div>
      <div
        class="hidden md:flex col-span-1 flex-col justify-center items-start"
      >
        Company Name
      </div>
      <div class="col-span-2 flex flex-col justify-center items-center">
        <input class="rounded-md w-full" />
      </div>
      <div class="col-span-1"></div>
      <div class="col-span-1 flex flex-col justify-center items-end mr-6">
        <div
          class="w-7 h-7 rounded-full bg-slate-500 flex flex-col justify-center items-center cursor-pointer border border-slate-500 hover:border-green-500"
        >
          JD
        </div>
      </div>
    </header>
    <div class="flex-1 flex flex-row overflow-y-auto">
      <LayoutSideMenu></LayoutSideMenu>
      <div class="flex-1"><slot></slot></div>
    </div>

    <!-- <footer class="h-10 ml-auto text-sm fixed bottom-0 left-1/2">
      OpenKanban 2022
    </footer> -->
  </div>
</template>

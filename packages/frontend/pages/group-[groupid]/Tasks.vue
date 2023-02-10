<template>
  <div
    class="m-auto flex h-[95%] w-[95%] flex-col overflow-y-auto rounded-md border border-gray-600 bg-gray-900 p-4 shadow-lg shadow-gray-700/50 md:w-[90%] md:p-10"
  >
    <div
      class="flex h-14 flex-row items-center border-b-2 border-b-gray-500 text-inherit"
    >
      <svg
        class="h-8 w-8 text-inherit"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path
          d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11"
        />
        <line x1="8" y1="8" x2="12" y2="8" />
        <line x1="8" y1="12" x2="12" y2="12" />
        <line x1="8" y1="16" x2="12" y2="16" />
      </svg>
      <span class="ml-2 text-3xl">Tasks</span>
      <button
        class="ml-auto h-8 w-24 rounded-md bg-green-600 text-base text-slate-100 transition-all duration-300 ease-in hover:bg-green-700"
      >
        New Task
      </button>
    </div>
    <div class="grid h-full w-full grid-cols-3 gap-4 pt-4">
      <!-- OPEN TASKS -->
      <div class="col-span-3 rounded-md border border-gray-500 md:col-span-1">
        <div
          class="flex h-12 w-full flex-row items-center justify-end gap-2 rounded-t-md border-b border-gray-500 bg-slate-800 p-2"
        >
          <span class="mr-auto text-base">Open Tasks</span>
          <div class="mr-2 flex flex-row content-center items-center gap-1">
            <svg
              class="h-6 w-6 text-inherit"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path
                d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11"
              />
              <line x1="8" y1="8" x2="12" y2="8" />
              <line x1="8" y1="12" x2="12" y2="12" />
              <line x1="8" y1="16" x2="12" y2="16" />
            </svg>
            <span>12</span>
          </div>
          <div class="mr-2 flex flex-row content-center items-center gap-1">
            <svg
              class="h-5 w-5 text-inherit"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>

            <span>36</span>
          </div>
        </div>
      </div>
      <!-- SELECTED TASKS -->
      <div class="col-span-3 rounded-md border border-gray-500 md:col-span-1">
        <div
          class="flex h-12 w-full flex-row items-center justify-end gap-2 rounded-t-md border-b border-gray-500 bg-slate-800 p-2"
        >
          <span class="mr-auto text-base">Selected</span>
          <div class="mr-2 flex flex-row content-center items-center gap-1">
            <svg
              class="h-6 w-6 text-inherit"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path
                d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11"
              />
              <line x1="8" y1="8" x2="12" y2="8" />
              <line x1="8" y1="12" x2="12" y2="12" />
              <line x1="8" y1="16" x2="12" y2="16" />
            </svg>
            <span>12</span>
          </div>
          <div class="mr-2 flex flex-row content-center items-center gap-1">
            <svg
              class="h-5 w-5 text-inherit"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>

            <span>36</span>
          </div>
        </div>
      </div>
      <!-- CLOSED TASKS -->
      <div class="col-span-3 rounded-md border border-gray-500 md:col-span-1">
        <div
          class="flex h-12 w-full flex-row items-center justify-end gap-2 rounded-t-md border-b border-gray-500 bg-slate-800 p-2"
        >
          <span class="mr-auto text-base">Closed</span>
          <div class="mr-2 flex flex-row content-center items-center gap-1">
            <svg
              class="h-6 w-6 text-inherit"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path
                d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11"
              />
              <line x1="8" y1="8" x2="12" y2="8" />
              <line x1="8" y1="12" x2="12" y2="12" />
              <line x1="8" y1="16" x2="12" y2="16" />
            </svg>
            <span>12</span>
          </div>
          <div class="mr-2 flex flex-row content-center items-center gap-1">
            <svg
              class="h-5 w-5 text-inherit"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>

            <span>36</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: "auth" });
// const routeParams = useRoute().params;
</script>

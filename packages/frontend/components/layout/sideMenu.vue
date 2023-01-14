<template>
  <div
    class="bg-gray-800 subpixel-antialiased w-52 border-slate-700 border-r p-2"
  >
    <div class="h-full w-full flex flex-col">
      <div class="h-14 border-b border-b-slate-600">
        <div class="h-3/6 text-lg flex flex-col">John Doe</div>
        <div class="h-3/6 p-0 flex flex-row justify-start items-center">
          Online
          <span class="w-2 h-2 ml-2 rounded-full bg-green-400"></span>
        </div>
      </div>
      <div
        class="h-[50%] min-h-[50%] max-h-[50%] overflow-y-auto flex flex-col gap-1 border-b border-b-slate-600"
      >
        <div
          class="min-h-10 h-12 flex flex-row justify-start items-center text-base cursor-pointer hover:text-green-500 font-bold"
        >
          <svg
            class="h-4 w-4 text-inherit"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>

          <span class="ml-2">Overview</span>
        </div>
        <div class="flex-grow flex flex-col gap-3">
          <div
            class="text-base flex flex-row justify-start items-center font-bold"
          >
            <svg
              class="h-4 w-4 text-inherit"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="ml-2">Groups</span>
            <div class="flex flex-col justify-center cursor-pointer ml-auto">
              <svg
                class="h-5 w-5 text-inherit hover:text-green-500"
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
                <circle cx="12" cy="12" r="9" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="12" y1="9" x2="12" y2="15" />
              </svg>
            </div>
          </div>

          <div class="flex-grow flex flex-col gap-2">
            <!-- TEST GROUP1 -->

            <div
              class="pl-2 h-5 transition-all duration-600 overflow-hidden"
              :class="{
                ['bg-slate-700 rounded-md h-[7.5rem]']:
                  selectedElement.eventType === 'group' &&
                  selectedElement.id === '1',
              }"
            >
              <div
                class="h-5 flex flex-row justify-start items-center text-base cursor-pointer hover:text-green-500"
                @click="selectElement({ eventType: 'group', id: '1' })"
              >
                <svg
                  class="h-4 w-4 text-inherit"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span class="ml-2">Group 1</span>
              </div>

              <div class="pl-8 mt-1 flex flex-col gap-1">
                <div
                  class="h-5 flex flex-col justify-center text-md cursor-pointer hover:text-green-500"
                >
                  Team
                </div>
                <div
                  class="h-5 flex flex-col justify-center text-md cursor-pointer hover:text-green-500"
                >
                  Chat
                </div>
                <div
                  class="h-5 flex flex-col justify-center text-md cursor-pointer hover:text-green-500"
                >
                  Tasks
                </div>
                <div
                  class="h-5 flex flex-col justify-center text-md cursor-pointer hover:text-green-500"
                >
                  Board
                </div>
              </div>
            </div>
            <!-- TEST GROUP2 -->

            <div
              class="pl-2 h-5 transition-all duration-600 overflow-hidden"
              :class="{
                ['bg-slate-700 rounded-md h-32']:
                  selectedElement.eventType === 'group' &&
                  selectedElement.id === '2',
              }"
            >
              <div
                class="h-5 flex flex-row justify-start items-center text-base cursor-pointer hover:text-green-500"
                @click="selectElement({ eventType: 'group', id: '2' })"
              >
                <svg
                  class="h-4 w-4 text-inherit"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span class="ml-2">Group 2</span>
              </div>

              <div class="pl-8 mt-1 flex flex-col gap-2">
                <div
                  class="h-5 flex flex-col justify-center text-md cursor-pointer hover:text-green-500"
                >
                  Team
                </div>
                <div
                  class="h-5 flex flex-col justify-center text-md cursor-pointer hover:text-green-500"
                >
                  Chat
                </div>
                <div
                  class="h-5 flex flex-col justify-center text-md cursor-pointer hover:text-green-500"
                >
                  Tasks
                </div>
                <div
                  class="h-5 flex flex-col justify-center text-md cursor-pointer hover:text-green-500"
                >
                  Board
                </div>
              </div>
            </div>

            <!-- TEST GROUP3 -->

            <div
              class="pl-2 h-5 transition-all duration-600 overflow-hidden"
              :class="{
                ['bg-slate-700 rounded-md h-32']:
                  selectedElement.eventType === 'group' &&
                  selectedElement.id === '3',
              }"
            >
              <div
                class="h-5 flex flex-row justify-start items-center text-base cursor-pointer hover:text-green-500"
                @click="selectElement({ eventType: 'group', id: '3' })"
              >
                <svg
                  class="h-4 w-4 text-inherit"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span class="ml-2">Group 3</span>
              </div>

              <div class="pl-8 mt-1 flex flex-col gap-2">
                <div
                  class="h-5 flex flex-col justify-center text-md cursor-pointer hover:text-green-500"
                >
                  Team
                </div>
                <div
                  class="h-5 flex flex-col justify-center text-md cursor-pointer hover:text-green-500"
                >
                  Chat
                </div>
                <div
                  class="h-5 flex flex-col justify-center text-md cursor-pointer hover:text-green-500"
                >
                  Tasks
                </div>
                <div
                  class="h-5 flex flex-col justify-center text-md cursor-pointer hover:text-green-500"
                >
                  Board
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="min-h-[25%] flex-1 overflow-scroll">
        <div class="flex-grow flex flex-col gap-2">
          <div
            class="text-base flex flex-row justify-start items-center font-bold pt-2"
          >
            <svg
              class="h-4 w-4 text-inherit"
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
                d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4"
              />
              <line x1="8" y1="9" x2="16" y2="9" />
              <line x1="8" y1="13" x2="14" y2="13" />
            </svg>
            <span class="ml-2"> Messages</span>
            <div class="flex flex-col justify-center cursor-pointer ml-auto">
              <svg
                class="h-5 w-5 text-inherit hover:text-green-500"
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
                <circle cx="12" cy="12" r="9" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="12" y1="9" x2="12" y2="15" />
              </svg>
            </div>
          </div>

          <!-- TEST MESSAGE 1 -->
          <div
            class="pl-2 h-5 transition-all duration-600 overflow-hidden"
            :class="{
              ['bg-slate-700 rounded-md']:
                selectedElement.eventType === 'chat' &&
                selectedElement.id === '1',
            }"
          >
            <div
              class="h-5 flex flex-row justify-start items-center text-base cursor-pointer hover:text-green-500"
              @click="selectElement({ eventType: 'chat', id: '1' })"
            >
              <span class="ml-4">Ian Burgess</span>
            </div>
          </div>

          <!-- TEST MESSAGE 2 -->
          <div
            class="pl-2 h-5 transition-all duration-600 overflow-hidden"
            :class="{
              ['bg-slate-700 rounded-md']:
                selectedElement.eventType === 'chat' &&
                selectedElement.id === '2',
            }"
          >
            <div
              class="h-5 flex flex-row justify-start items-center text-base cursor-pointer hover:text-green-500"
              @click="selectElement({ eventType: 'chat', id: '2' })"
            >
              <span class="ml-4">Dylan Pullman</span>
            </div>
          </div>

          <!-- TEST MESSAGE 3 -->
          <div
            class="pl-2 h-5 transition-all duration-600 overflow-hidden"
            :class="{
              ['bg-slate-700 rounded-md']:
                selectedElement.eventType === 'chat' &&
                selectedElement.id === '3',
            }"
          >
            <div
              class="h-5 flex flex-row justify-start items-center text-base cursor-pointer hover:text-green-500"
              @click="selectElement({ eventType: 'chat', id: '3' })"
            >
              <span class="ml-4">Adam Baker</span>
            </div>
          </div>

          <!-- TEST MESSAGE 4 -->
          <div
            class="pl-2 h-5 transition-all duration-600 overflow-hidden"
            :class="{
              ['bg-slate-700 rounded-md']:
                selectedElement.eventType === 'chat' &&
                selectedElement.id === '4',
            }"
          >
            <div
              class="h-5 flex flex-row justify-start items-center text-base cursor-pointer hover:text-green-500"
              @click="selectElement({ eventType: 'chat', id: '4' })"
            >
              <span class="ml-4">Abigail Walsh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SelectEvent {
  eventType: "group" | "chat" | "";
  id: string;
}

const selectedElement = ref<SelectEvent>({ eventType: "", id: "" });

function selectElement(newSelectEvent: SelectEvent) {
  if (
    selectedElement.value.eventType !== newSelectEvent.eventType ||
    selectedElement.value.id !== newSelectEvent.id
  ) {
    selectedElement.value = newSelectEvent;
  } else {
    selectedElement.value = { eventType: "", id: "" };
  }
}
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

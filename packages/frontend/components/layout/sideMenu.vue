<template>
  <div
    class="h-full border-r border-slate-700 bg-gray-800 p-2 subpixel-antialiased transition-all duration-200"
    :class="props.display ? 'visible w-full md:w-60' : 'collapse w-0'"
  >
    <div v-if="display" class="flex h-full w-full flex-col">
      <div class="h-14 border-b border-b-slate-600">
        <div class="flex h-3/6 flex-col text-lg">John Doe</div>
        <div class="flex h-3/6 flex-row items-center justify-start p-0">
          Online
          <span class="ml-2 h-2 w-2 rounded-full bg-green-400"></span>
        </div>
      </div>
      <div
        class="flex h-[50%] max-h-[50%] min-h-[50%] flex-col gap-1 overflow-y-auto border-b border-b-slate-600"
      >
        <div
          class="min-h-10 flex h-12 cursor-pointer flex-row items-center justify-start text-base font-bold hover:text-green-500"
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

          <span class="ml-2">
            <NuxtLink to="/Overview">Overview</NuxtLink>
          </span>
        </div>
        <div class="flex flex-grow flex-col gap-3 overflow-y-auto">
          <div
            class="flex flex-row items-center justify-start pr-2 text-base font-bold"
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
            <div class="ml-auto flex cursor-pointer flex-col justify-center">
              <NuxtLink :to="`/creategroup`"
                ><svg
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
              </NuxtLink>
            </div>
          </div>

          <div class="flex flex-grow flex-col gap-2 pr-4">
            <div
              v-for="group in groups"
              :key="group.id"
              class="duration-600 h-5 overflow-hidden pl-2 transition-all"
              :class="{
                ['h-[7.5rem] rounded-md bg-slate-700']:
                  selectedElement.eventType === 'group' &&
                  selectedElement.id === group.id,
              }"
            >
              <div
                class="flex h-5 cursor-pointer flex-row items-center justify-start text-base hover:text-green-500"
                @click="
                  selectElement({
                    eventType: 'group',
                    id: group.id,
                  })
                "
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
                <span class="ml-2">{{ group.name }}</span>
              </div>

              <div class="mt-1 flex flex-col gap-1 pl-8">
                <div
                  class="text-md flex h-5 cursor-pointer flex-col justify-center hover:text-green-500"
                  :class="{
                    'text-green-500':
                      groupRoute === group.id && groupElement === 'team',
                  }"
                >
                  <NuxtLink :to="`/group-${group.id}/team`">Team</NuxtLink>
                </div>
                <div
                  class="text-md flex h-5 cursor-pointer flex-col justify-center hover:text-green-500"
                  :class="{
                    'text-green-500':
                      groupRoute === group.id && groupElement === 'chat',
                  }"
                >
                  <NuxtLink :to="`/group-${group.id}/chat`">Chat</NuxtLink>
                </div>
                <div
                  class="text-md flex h-5 cursor-pointer flex-col justify-center hover:text-green-500"
                  :class="{
                    'text-green-500':
                      groupRoute === group.id && groupElement === 'tasks',
                  }"
                >
                  <NuxtLink :to="`/group-${group.id}/tasks`">Tasks</NuxtLink>
                </div>
                <div
                  class="text-md flex h-5 cursor-pointer flex-col justify-center hover:text-green-500"
                  :class="{
                    'text-green-500':
                      groupRoute === group.id && groupElement === 'board',
                  }"
                >
                  <NuxtLink :to="`/group-${group.id}/board`">Board</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="min-h-[25%] flex-1 overflow-y-auto">
        <div class="flex flex-grow flex-col gap-2">
          <div
            class="flex flex-row items-center justify-start pt-2 pr-2 text-base font-bold"
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
            <div class="ml-auto flex cursor-pointer flex-col justify-center">
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
            class="duration-600 h-5 overflow-hidden pl-2 transition-all"
            :class="{
              ['rounded-md bg-slate-700']:
                selectedElement.eventType === 'chat' &&
                selectedElement.id === '1',
            }"
          >
            <div
              class="flex h-5 cursor-pointer flex-row items-center justify-start text-base hover:text-green-500"
              @click="selectElement({ eventType: 'chat', id: '1' })"
            >
              <span class="ml-4">Ian Burgess</span>
            </div>
          </div>

          <!-- TEST MESSAGE 2 -->
          <div
            class="duration-600 h-5 overflow-hidden pl-2 transition-all"
            :class="{
              ['rounded-md bg-slate-700']:
                selectedElement.eventType === 'chat' &&
                selectedElement.id === '2',
            }"
          >
            <div
              class="flex h-5 cursor-pointer flex-row items-center justify-start text-base hover:text-green-500"
              @click="selectElement({ eventType: 'chat', id: '2' })"
            >
              <span class="ml-4">Dylan Pullman</span>
            </div>
          </div>

          <!-- TEST MESSAGE 3 -->
          <div
            class="duration-600 h-5 overflow-hidden pl-2 transition-all"
            :class="{
              ['rounded-md bg-slate-700']:
                selectedElement.eventType === 'chat' &&
                selectedElement.id === '3',
            }"
          >
            <div
              class="flex h-5 cursor-pointer flex-row items-center justify-start text-base hover:text-green-500"
              @click="selectElement({ eventType: 'chat', id: '3' })"
            >
              <span class="ml-4">Adam Baker</span>
            </div>
          </div>

          <!-- TEST MESSAGE 4 -->
          <div
            class="duration-600 h-5 overflow-hidden pl-2 transition-all"
            :class="{
              ['rounded-md bg-slate-700']:
                selectedElement.eventType === 'chat' &&
                selectedElement.id === '4',
            }"
          >
            <div
              class="flex h-5 cursor-pointer flex-row items-center justify-start text-base hover:text-green-500"
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
import { storeToRefs } from "pinia";
import { useUserStore } from "~~/stores/UserStore";

const props = defineProps({
  display: { type: Boolean, required: true },
});

// ---------------- Logic for menu selection -------------------------------------
// -------------------------------------------------------------------------------
interface SelectEvent {
  eventType: "group" | "chat" | "";
  id: string;
}

const selectedElement = ref<SelectEvent>({
  eventType: "",
  id: "",
});

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

const route = useRoute();
const groupRoute = computed(() => {
  return route.params.groupid ? (route.params.groupid as string) : "";
});
const groupElement = computed(() => {
  // determine which part of a group was selected
  return route.path.split("/").pop();
});
watch(
  () => route.params.groupid,
  () => {
    selectedElement.value.eventType = "group";
    selectedElement.value.id = route.params.groupid as string;
  }
);
// ---------------- Logic for menu selection -------------------------------------
// -------------------------------------------------------------------------------
//
//
// ---------------- Load data from store -----------------------------------------
// -------------------------------------------------------------------------------
const userStore = storeToRefs(useUserStore());
const groups = computed(() => {
  return userStore.groups.value;
});
// ---------------- Load data from store -----------------------------------------
// -------------------------------------------------------------------------------
//
//
// ---------------- Life cycle methods -------------------------------------------
// -------------------------------------------------------------------------------
onBeforeMount(async () => {
  await loadUserData();
});
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

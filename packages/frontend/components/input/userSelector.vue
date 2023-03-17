<template>
  <div
    class="duration-600 relative row-span-2 flex flex-col content-center items-start p-2 transition-all"
  >
    <h3 class="w-full text-lg">Assignees</h3>
    <input
      v-model="searchedMember"
      class="duration-400 h-7 w-full max-w-[15rem] resize-none rounded-md border border-gray-600 border-transparent bg-slate-800 p-1 text-base text-gray-400 outline-none transition-all ease-in focus:border-2 focus:border-green-500 focus:shadow-md focus:shadow-green-400/70 focus:outline-none"
      tabindex="1"
      type="text"
      @focus="opened = true"
      @blur="
        () => {
          opened = false;
          searchedMember = '';
        }
      "
    />
    <div class="relative w-full flex-1">
      <div
        class="duration-400 absolute z-20 flex h-full w-full max-w-[15rem] flex-col overflow-y-auto rounded-md bg-slate-800 text-base text-gray-400 transition-all ease-in"
        :class="
          opened ? 'visible top-1 opacity-100' : 'invisible -top-4 opacity-0'
        "
      >
        <div v-for="user in filteredMemberList" :key="user.userId">
          <div
            class="flex h-11 w-full border-b border-gray-500 bg-gray-800 pl-4 shadow-md shadow-gray-700/40 hover:cursor-pointer hover:bg-gray-700"
            @click="addOrRemoveUser(user)"
          >
            <div class="flex w-fit flex-col items-end justify-center">
              <div
                class="m-auto flex h-7 w-7 flex-col items-center justify-center rounded-full border border-slate-500 bg-slate-500"
              >
                JD
              </div>
            </div>
            <div class="flex flex-1 flex-col items-start pl-4">
              {{ user.username }}
              <span class="text-xs text-gray-600">{{ user.email }}</span>
            </div>
            <div
              v-if="userSelected(user)"
              class="mr-2 flex w-4 flex-col items-center justify-center"
            >
              <svg
                class="h-4 w-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex h-full max-h-32 w-full flex-row flex-wrap items-start justify-start gap-2 overflow-y-auto pt-6"
      >
        <!-- USER CARD - TO BE EXTRCATED -->
        <div
          class="grid h-10 w-36 grid-cols-6 rounded-md border border-gray-500 bg-gray-800 shadow-md shadow-gray-700/40"
        >
          <div class="col-span-2 flex flex-col items-end justify-center">
            <div
              class="m-auto flex h-7 w-7 flex-col items-center justify-center rounded-full border border-slate-500 bg-slate-500"
            >
              JD
            </div>
          </div>
          <div
            class="col-span-4 flex flex-row items-center justify-start overflow-hidden"
          >
            John Doe
          </div>
        </div>
        <!-- SELECTED USERS -->
        <div
          v-for="user in props.modelValue"
          :key="user.userId"
          class="grid h-10 w-36 grid-cols-6 rounded-md border border-gray-500 bg-gray-800 shadow-md shadow-gray-700/40 hover:cursor-pointer hover:border-red-500 hover:bg-gray-700"
          @click="addOrRemoveUser(user)"
        >
          <div class="col-span-2 flex flex-col items-end justify-center">
            <div
              class="m-auto flex h-7 w-7 flex-col items-center justify-center rounded-full border border-slate-500 bg-slate-500"
            >
              JD
            </div>
          </div>
          <div
            class="col-span-4 flex flex-row items-center justify-start gap-0 overflow-hidden"
          >
            {{ user.username }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

import { useUserStore } from "~~/stores/UserStore";
import { FragmentUserData } from "~~/types/types";

const props = defineProps({
  users: {
    type: Array as PropType<FragmentUserData[]>,
    default() {
      return [];
    },
  },
  modelValue: {
    type: Array as PropType<FragmentUserData[]>,
    default() {
      return [];
    },
    description: "selected labels",
  },
});

const emit = defineEmits(["update:modelValue"]);

// ----------------- USER DATA---------------------------//
const userStore = useUserStore();

// ----------------- VARIABLES ---------------------------//
const searchedMember = ref("");
const opened = ref(false);

const userSelected = (user: FragmentUserData): boolean => {
  return props.modelValue.some((selectedUser) => {
    return user.userId === selectedUser.userId;
  });
};
const addOrRemoveUser = (user: FragmentUserData) => {
  // check whether user already exists, then delete the user from the group of selected users
  const userIndex = props.modelValue.findIndex((selectedUser) => {
    return user.userId === selectedUser.userId;
  });

  // not found -> add to selected list
  if (userIndex === -1) {
    emit("update:modelValue", [...props.modelValue, user]);
  }
  // found ->remove from list
  else {
    emit(
      "update:modelValue",
      props.modelValue.filter((x) => x.userId !== user.userId)
    );
  }
};

const filteredMemberList = computed(() => {
  if (searchedMember.value !== "") {
    return props.users.filter((user) => {
      return (
        user.email.toLowerCase().includes(searchedMember.value.toLowerCase()) ||
        (user.username
          .toLowerCase()
          .includes(searchedMember.value.toLowerCase()) &&
          user.userId !== userStore.userId)
      );
    });
  }
  return props.users.filter((user) => user.userId !== userStore.userId);
});
</script>

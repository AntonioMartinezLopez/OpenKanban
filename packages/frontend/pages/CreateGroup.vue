<template>
  <div
    class="m-auto flex h-[90%] w-[95%] flex-col overflow-y-auto rounded-md border border-gray-600 bg-gray-900 p-4 shadow-lg shadow-gray-700/50 md:w-[50%] md:p-10"
  >
    <div
      class="flex h-14 flex-row items-center border-b-2 border-b-gray-500 text-inherit"
    >
      <svg
        class="h-8 w-8 text-inherit"
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
      <span class="ml-4 text-3xl">Create New Group</span>
    </div>
    <div class="grid flex-1 grid-rows-6">
      <div class="row-span-1 flex flex-col items-start justify-center p-2">
        <h3 class="w-full text-lg">
          Group name
          <span v-if="groupAlreadyExists" class="text-sm text-red-600"
            >Group already Exists</span
          >
        </h3>
        <input
          v-model="groupNameInput"
          class="duration-400 h-7 w-full rounded-md border border-gray-600 bg-slate-800 pl-2 text-base text-gray-400 outline-none transition-all ease-in focus:border-2 focus:border-green-500 focus:shadow-md focus:shadow-green-400/70 focus:outline-none"
          tabindex="1"
          type="text"
        />
      </div>
      <div
        class="duration-600 row-span-2 flex flex-col content-center items-start p-2 transition-all"
      >
        <h3 class="w-full text-lg">Description</h3>
        <textarea
          class="duration-400 w-full flex-1 resize-none rounded-md border border-gray-600 border-transparent bg-slate-800 p-1 text-base text-gray-400 outline-none transition-all ease-in focus:border-2 focus:border-green-500 focus:shadow-md focus:shadow-green-400/70 focus:outline-none"
          tabindex="1"
          type="text"
        />
      </div>
      <!-- USER OPTION - TO BE EXTRACTED -->
      <div
        class="duration-600 relative row-span-2 flex flex-col content-center items-start border-b-2 border-b-gray-500 p-2 transition-all"
      >
        <h3 class="w-full text-lg">Add Members</h3>
        <input
          v-model="searchedMember"
          class="duration-400 h-7 w-60 resize-none rounded-md border border-gray-600 border-transparent bg-slate-800 p-1 text-base text-gray-400 outline-none transition-all ease-in focus:border-2 focus:border-green-500 focus:shadow-md focus:shadow-green-400/70 focus:outline-none"
          tabindex="1"
          type="text"
          @focus="opened = true"
          @blur="opened = false"
        />
        <div class="relative w-full flex-1">
          <div
            class="duration-400 absolute z-20 flex h-full w-60 flex-col overflow-y-auto rounded-md bg-slate-800 text-base text-gray-400 transition-all ease-in"
            :class="
              opened
                ? 'visible top-0 opacity-100'
                : 'invisible -top-4 opacity-0'
            "
          >
            <div v-for="user in users" :key="user.userId">
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
            class="flex h-full w-full flex-row items-center justify-start gap-2"
          >
            <!-- USER CARD - TO BE EXTRCATED -->
            <div
              class="grid h-10 w-32 grid-cols-6 rounded-md border border-gray-500 bg-gray-800 shadow-md shadow-gray-700/40"
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
              v-for="user in selectedMembers"
              :key="user.userId"
              class="grid h-10 w-32 grid-cols-6 rounded-md border border-gray-500 bg-gray-800 shadow-md shadow-gray-700/40 hover:cursor-pointer hover:border-red-500 hover:bg-gray-700"
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
                class="col-span-4 flex flex-row items-center justify-start overflow-hidden"
              >
                {{ user.username }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="row-span-1 mr-2 flex h-full w-full flex-row items-center justify-end gap-7"
      >
        <button class="h-8 w-16 rounded-md bg-red-500 text-slate-100">
          Abort
        </button>
        <button
          class="h-8 w-24 rounded-md bg-green-600 text-slate-100 hover:bg-green-700"
        >
          Save Group
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~~/gql/gql";
import { User } from "~~/gql/graphql";

const opened = ref(false);

// -----------------FETCH DATA----------------------------//
// fetch name of all groups
const queryGroups = graphql(`
  query groups {
    groups {
      name
    }
  }
`);

const groupData = await sendQuery(queryGroups, {});
const groupNames = groupData.value
  ? groupData.value.groups.map((group) => group.name)
  : [];

// fetch all users that can be selected
// fetch name of all groups
const queryUsers = graphql(`
  query users {
    users {
      username
      userId
      email
    }
  }
`);
const userData = await sendQuery(queryUsers, {});
const users = userData.value ? userData.value.users : [];
// -----------------FETCH DATA----------------------------//
//
// ----------------- HANDLE INPUT---------------------------//

// Group name
const groupNameInput = ref("");
const groupAlreadyExists = computed(() => {
  return groupNames.includes(groupNameInput.value);
});

// selected members
const searchedMember = ref("");
const selectedMembers = ref<Partial<User>[]>([]);

const userSelected = (user: Partial<User>): boolean => {
  return selectedMembers.value.some((selectedUser) => {
    return user.userId === selectedUser.userId;
  });
};
const addOrRemoveUser = (user: Partial<User>) => {
  // check whether user already exists, then delete the user from the group of selected users
  const userIndex = selectedMembers.value.findIndex((selectedUser) => {
    return user.userId === selectedUser.userId;
  });

  // not found -> add to selected list
  if (userIndex === -1) {
    selectedMembers.value.push(user);
  }
  // found ->remove from list
  else {
    selectedMembers.value.splice(userIndex, 1);
  }
};

// ----------------- HANDLE INPUT---------------------------//
</script>

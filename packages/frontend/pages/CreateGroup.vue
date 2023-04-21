<template>
  <div
    class="m-auto flex h-[90%] w-[95%] flex-col overflow-y-auto rounded-md border border-gray-600 bg-gray-900 p-4 shadow-lg shadow-gray-700/50 md:w-[50%] md:p-6"
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
    <div class="grid flex-1 grid-rows-6 gap-1">
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
          v-model="descriptionInput"
          class="duration-400 w-full flex-1 resize-none rounded-md border border-gray-600 border-transparent bg-slate-800 p-1 text-base text-gray-400 outline-none transition-all ease-in focus:border-2 focus:border-green-500 focus:shadow-md focus:shadow-green-400/70 focus:outline-none"
          tabindex="1"
          type="text"
        />
      </div>
      <!-- USER OPTION - TO BE EXTRACTED -->
      <InputUserSelector
        v-model="selectedMembers"
        :users="users"
        title="Select User"
      ></InputUserSelector>
      <div
        class="row-span-1 mr-2 flex h-full w-full flex-row items-center justify-end gap-7 border-t-2 border-t-gray-500"
      >
        <button
          class="h-8 w-16 rounded-md bg-red-500 text-slate-100 hover:bg-red-600"
        >
          Abort
        </button>
        <button
          class="h-8 w-24 rounded-md bg-green-600 text-slate-100 transition-all duration-300 ease-in hover:bg-green-700"
          :class="{
            'pointer-events-none cursor-not-allowed opacity-25':
              groupAlreadyExists || !descriptionInput,
          }"
          @click="submitInput"
        >
          Save Group
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { graphql } from "~~/gql/gql";
import { useUserStore } from "~~/stores/UserStore";
import { FragmentUserData } from "~~/types/types";
import { sendQuery } from "~~/utils/dataFetching";

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

// 1: Group name
const groupNameInput = ref("");
const groupAlreadyExists = computed(() => {
  return groupNames.includes(groupNameInput.value);
});

// 2: description input
const descriptionInput = ref("");

// 3:  selected members
const selectedMembers = ref<FragmentUserData[]>([]);

// ----------------- HANDLE INPUT---------------------------//
//
// ----------------- USER DATA---------------------------//
const userStore = useUserStore();
// ----------------- USER DATA---------------------------//
//
// ----------------- SUBMIT INPUT---------------------------//
const submitInput = async () => {
  const createGroupQuery = graphql(`
    mutation createGroup(
      $name: String!
      $description: String!
      $userId: String!
      $users: [String!]!
    ) {
      createGroup(
        createGroupInput: {
          name: $name
          description: $description
          userId: $userId
          users: $users
        }
      ) {
        id
      }
    }
  `);
  const createdGroup = await sendQuery(createGroupQuery, {
    name: groupNameInput.value,
    description: descriptionInput.value,
    userId: userStore.userId,
    users: selectedMembers.value.map((member) => member.userId),
  });

  // reload user data
  loadUserData();

  navigateTo(`/group-${createdGroup.value?.createGroup.id}/team`);
};
// ----------------- SUBMIT INPUT---------------------------//
</script>

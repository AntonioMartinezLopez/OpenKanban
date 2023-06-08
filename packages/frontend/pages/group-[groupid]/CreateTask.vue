<template>
  <div
    class="m-auto flex h-[90%] w-[95%] flex-col overflow-y-auto rounded-md border border-gray-600 bg-gray-900 p-4 shadow-lg shadow-gray-700/50 lg:w-[50%] lg:p-8"
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
      <span class="ml-4 text-3xl">Create New Task</span>
    </div>
    <div class="grid-rows-7 grid flex-1 p-2">
      <div class="row-span-1 flex flex-col items-start justify-center p-2">
        <h3 class="w-full text-lg">Task Title</h3>
        <input
          v-model="taskNameInput"
          class="duration-400 h-7 w-full rounded-md border border-gray-600 bg-slate-800 pl-2 text-base text-gray-400 outline-none transition-all ease-in focus:border-2 focus:border-green-500 focus:shadow-md focus:shadow-green-400/70 focus:outline-none"
          tabindex="1"
          type="text"
        />
      </div>
      <!-- DESCRIPTION -->
      <div
        class="duration-600 row-span-2 flex flex-col content-center items-start overflow-auto p-2 transition-all"
      >
        <h3 class="w-full text-lg">Description</h3>
        <textarea
          v-model="descriptionInput"
          class="duration-400 w-full flex-1 resize-none rounded-md border border-gray-600 bg-slate-800 p-1 text-base text-gray-400 outline-none transition-all ease-in focus:border-green-500 focus:shadow-md focus:shadow-green-400/70 focus:outline-none"
          tabindex="1"
          type="text"
        />
      </div>
      <!-- WEIGHT AND LABELS -->
      <div class="row-span-1 flex flex-row flex-wrap md:justify-between">
        <!-- WEIGHT -->
        <InputWeightInput
          v-model="weightInput"
          :max-weight="10"
        ></InputWeightInput>
        <!-- LABELS - TO BE EXTRACTED -->
        <div
          class="flex w-full flex-col content-center justify-center p-2 md:w-[60%]"
        >
          <InputLabelSelector
            v-model="selectedLabels"
            :labels="labels"
          ></InputLabelSelector>
        </div>
      </div>
      <!-- USER OPTION - TO BE EXTRACTED -->
      <InputUserSelector
        v-model="selectedMembers"
        :users="users"
        title="Assignees"
      ></InputUserSelector>
      <div
        class="row-span-1 mr-2 flex h-full w-full flex-row items-center justify-end gap-7 border-t-2 border-t-gray-500 pt-2"
      >
        <button
          class="h-8 w-16 rounded-md bg-red-500 text-slate-100 hover:bg-red-600"
          @click="router.back"
        >
          Abort
        </button>
        <button
          class="h-8 w-24 rounded-md bg-green-600 text-slate-100 transition-all duration-300 ease-in hover:bg-green-700"
          :class="{
            'pointer-events-none cursor-not-allowed opacity-25':
              !descriptionInput || !taskNameInput,
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
import { Label } from "~~/gql/graphql";
import { FragmentUserData } from "~~/types/types";
import { sendQuery } from "~~/utils/dataFetching";

const router = useRouter();

// -----------------FETCH DATA----------------------------//

const groupQuery = graphql(`
  query group($id: String!) {
    group(id: $id) {
      name
      users {
        firstName
        lastName
        userId
        username
        email
      }
      labels {
        id
        name
        color
      }
    }
  }
`);
const queryData = await sendQuery(groupQuery, {
  id: useRoute().params.groupid,
});

// extract users
const users: FragmentUserData[] = queryData.value?.group?.users
  ? queryData.value.group?.users
  : [];

// extract label data
const labels = queryData.value?.group?.labels
  ? queryData.value?.group?.labels
  : [];
// -----------------FETCH DATA----------------------------//
//
// ----------------- HANDLE INPUT---------------------------//

// 1: Task name
const taskNameInput = ref("");

// 2: description input
const descriptionInput = ref("");

// 3:  selected members
const selectedMembers = ref<FragmentUserData[]>([]);

// 4: Task weight
const weightInput = ref(0);

// // 5: selected Labels
const selectedLabels = ref<Label[]>([]);

// ----------------- HANDLE INPUT---------------------------//
//
// ----------------- USER DATA---------------------------//
// const userStore = useUserStore();
// ----------------- USER DATA---------------------------//
//
// ----------------- SUBMIT INPUT---------------------------//
const submitInput = async () => {
  const createTaskQuery = graphql(`
    mutation createTask(
      $name: String!
      $description: String!
      $groupId: String!
      $maxWeight: Int!
      $assignees: [String!]!
      $labels: [String!]!
    ) {
      createTask(
        createTaskInput: {
          name: $name
          description: $description
          groupId: $groupId
          maxWeight: $maxWeight
          assignees: $assignees
          labels: $labels
        }
      ) {
        id
      }
    }
  `);

  const groupId = useRoute().params.groupid;

  const createdTask = await sendQuery(createTaskQuery, {
    name: taskNameInput.value,
    description: descriptionInput.value,
    groupId,
    maxWeight: weightInput.value,
    assignees: selectedMembers.value.map((member) => member.userId),
    labels: selectedLabels.value.map((label) => label.id),
  });

  if (createdTask.value?.createTask.id) {
    navigateTo(`/group-${groupId}/tasks`);
  }
};
// ----------------- SUBMIT INPUT---------------------------//
</script>

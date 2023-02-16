<template>
  <div
    class="m-auto flex h-[90%] w-[95%] flex-col overflow-y-auto rounded-md border border-gray-600 bg-gray-900 p-4 shadow-lg shadow-gray-700/50 md:w-[50%] md:p-6"
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
    <div class="grid-rows-7 grid flex-1">
      <div class="row-span-1 flex flex-col items-start justify-center p-2">
        <h3 class="w-full text-lg">Task Title</h3>
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
      <div class="row-span-1">
        <div class="flex flex-col content-center justify-center p-2">
          <h3 class="w-full text-lg">Weight</h3>
          <div class="mt-1 flex w-20 flex-row gap-1">
            <input
              v-model="groupNameInput"
              class="duration-400 h-7 w-10 rounded-md border border-gray-600 bg-slate-800 pl-2 text-base text-gray-400 outline-none transition-all ease-in focus:border-2 focus:border-green-500 focus:shadow-md focus:shadow-green-400/70 focus:outline-none"
              tabindex="1"
            />
            <div class="flex h-7 w-5 flex-col justify-center gap-1">
              <span
                class="flex h-[40%] flex-row content-center items-start justify-center rounded-xl bg-slate-800 text-sm font-bold leading-[0.5rem] text-gray-500 hover:opacity-80"
                >+</span
              >
              <span
                class="flex h-[40%] flex-row content-center justify-center rounded-xl bg-slate-800 text-lg font-bold leading-[0.5rem] text-gray-500 hover:opacity-80"
                >-</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- USER OPTION - TO BE EXTRACTED -->
      <div
        class="duration-600 relative row-span-2 flex flex-col content-center items-start border-b-2 border-b-gray-500 p-2 pt-0 transition-all"
      >
        <h3 class="w-full text-lg">Assignees</h3>
        <input
          v-model="searchedMember"
          class="duration-400 h-7 w-72 resize-none rounded-md border border-gray-600 border-transparent bg-slate-800 p-1 text-base text-gray-400 outline-none transition-all ease-in focus:border-2 focus:border-green-500 focus:shadow-md focus:shadow-green-400/70 focus:outline-none"
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
            class="duration-400 absolute z-20 flex h-full w-72 flex-col overflow-y-auto rounded-md bg-slate-800 text-base text-gray-400 transition-all ease-in"
            :class="
              opened
                ? 'visible top-0 opacity-100'
                : 'invisible -top-4 opacity-0'
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
            class="flex h-full max-h-36 w-full flex-row flex-wrap items-start justify-start gap-2 overflow-y-scroll pt-6"
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
              v-for="user in selectedMembers"
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
      <div
        class="row-span-1 mr-2 flex h-full w-full flex-row items-center justify-end gap-7"
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
              !descriptionInput,
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
import { User } from "~~/gql/graphql";
import { useUserStore } from "~~/stores/UserStore";
import { sendQuery } from "~~/utils/dataFetching";

const opened = ref(false);
const router = useRouter();

// -----------------FETCH DATA----------------------------//

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

// 2: description input
const descriptionInput = ref("");

// 3:  selected members
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

const filteredMemberList = computed(() => {
  if (searchedMember.value !== "") {
    return users.filter((user) => {
      return (
        user.email.toLowerCase().includes(searchedMember.value.toLowerCase()) ||
        (user.username
          .toLowerCase()
          .includes(searchedMember.value.toLowerCase()) &&
          user.userId !== userStore.userId)
      );
    });
  }
  return users.filter((user) => user.userId !== userStore.userId);
});
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
<template>
  <div
    class="flex h-20 flex-col rounded-md border border-slate-500 bg-slate-800 bg-opacity-50 p-0 text-inherit"
  >
    <div
      class="flex w-full flex-1 items-center justify-between pl-2 text-base font-bold"
    >
      {{ props.task.name }}
      <div class="mr-3 flex flex-row content-center text-sm">
        <div class="flex flex-row content-center items-center gap-1">
          <svg
            class="h-4 w-4 text-inherit"
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
          <span>{{ props.task.weight }}</span>
        </div>
      </div>
    </div>

    <div class="flex w-full flex-1 items-center overflow-hidden pl-2">
      <div class="flex w-fit gap-1">
        <TaskLabel
          v-for="label in props.task.labels.slice(0, 3)"
          :key="label.id"
          :label="label"
        ></TaskLabel>
        {{ props.task.labels.length > 3 ? "..." : "" }}
      </div>
      <div class="flex flex-1 justify-end pr-3">
        <UserIcon
          v-for="assignee in props.task.assignees"
          :key="assignee.userId"
          :user-data="assignee"
        ></UserIcon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { LoadedTasks } from "~/types/types";

const props = defineProps({
  task: {
    type: Object as PropType<LoadedTasks>,
    default() {
      return {
        name: "test",
      };
    },
  },
});
</script>

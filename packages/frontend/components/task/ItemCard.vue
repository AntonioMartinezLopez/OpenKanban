<template>
  <div
    class="flex h-16 flex-col rounded-md border border-slate-500 bg-slate-800 bg-opacity-50 p-0 text-inherit"
  >
    <div class="flex flex-1 items-center pl-2 text-base font-bold">
      {{ props.task.name }}
    </div>

    <div class="flex flex-1 items-center pl-2">
      {{ props.task.labels.toString() }}
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

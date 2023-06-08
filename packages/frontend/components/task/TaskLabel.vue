<template>
  <span
    class="flex h-fit min-w-fit flex-col flex-nowrap content-center justify-center whitespace-nowrap rounded-lg border-[1px] p-[0.1rem] pl-[0.3rem] pr-[0.3rem] text-xs shadow-md shadow-inherit brightness-150"
    :style="`border-color: rgb(${props.label.color}); color: rgb(${props.label.color}); background-color: rgb(${props.label.color} / 0.2); --tw-shadow-color: rgb(${props.label.color} / 0.4);`"
    >{{ label.name }}</span
  >
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Label } from "~~/gql/graphql";

const props = defineProps({
  label: {
    type: Object as PropType<Label>,
    default() {
      return {};
    },
  },
});
</script>

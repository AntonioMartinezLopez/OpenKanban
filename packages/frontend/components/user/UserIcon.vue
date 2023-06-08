<template>
  <div class="flex flex-col items-end justify-center">
    <div
      class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-slate-500 bg-slate-500 text-xs font-bold hover:border-green-500"
    >
      {{ props.userData.firstName.at(0) }}{{ props.userData.lastName.at(0) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { FragmentUserData } from "~~/types/types";

const props = defineProps({
  userData: {
    type: Object as PropType<FragmentUserData>,
    default() {
      return {
        firstName: "",
        lastName: "",
      };
    },
  },
});
</script>

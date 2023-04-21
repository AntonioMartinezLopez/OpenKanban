<template>
  <div class="flex w-full flex-col content-center justify-center p-2">
    <h3 class="w-full text-lg">Labels</h3>
    <div class="relative mt-1 flex h-7 w-full flex-row items-center gap-1">
      <div
        class="transition-width flex h-full w-fit flex-row items-center justify-center gap-2 duration-500 ease-in"
      >
        <div
          v-for="label in props.modelValue"
          :key="`label-${label.id}`"
          class="flex items-center justify-center"
        >
          <span
            class="flex h-fit min-w-fit flex-col flex-nowrap content-center justify-center whitespace-nowrap rounded-lg border-[1px] p-[0.1rem] pl-[0.3rem] pr-[0.3rem] text-xs shadow-md shadow-inherit brightness-150"
            :style="`border-color: rgb(${label.color}); ; color: rgb(${label.color}); background-color: rgb(${label.color} / 0.2); --tw-shadow-color: rgb(${label.color} / 0.3);`"
            >{{ label.name }}</span
          >
        </div>
      </div>
      <div
        class="ml-1 flex h-7 w-7 select-none flex-col items-center justify-center rounded-full border border-transparent bg-gray-700 text-base font-bold text-gray-400 hover:cursor-pointer hover:border hover:border-gray-400 hover:opacity-80"
        @click="labelOptionsOpened = !labelOptionsOpened"
      >
        <span v-if="!labelOptionsOpened" class="m-auto h-[50%] leading-3"
          >+</span
        >
        <svg
          v-else
          version="1.1"
          viewBox="0 0 330 330"
          xml:space="preserve"
          class="w-[40%] fill-slate-400"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
            ></path>
          </g>
        </svg>
      </div>

      <div
        class="duration-400 absolute z-20 flex h-40 w-full flex-col overflow-y-auto rounded-md bg-slate-800 text-base text-gray-400 transition-all ease-in"
        :class="
          labelOptionsOpened
            ? 'visible top-8 opacity-100'
            : 'invisible -top-4 opacity-0'
        "
      >
        <input
          v-model="searchLabelTerm"
          class="duration-400 h-7 min-w-[1rem] rounded-md border border-gray-600 bg-slate-800 text-center text-base text-gray-400 caret-green-500 outline-none transition-all ease-in focus:border-2 focus:border-green-500 focus:shadow-md focus:shadow-green-400/70 focus:outline-none"
          tabindex="1"
          @focus="labelOptionsOpened = true"
          @blur="
            () => {
              labelOptionsOpened = false;
            }
          "
        />
        <div v-for="label in filteredLabelList" :key="label.id">
          <div
            class="flex h-9 w-full border-b border-gray-500 bg-gray-800 pl-4 shadow-md shadow-gray-700/40 hover:cursor-pointer hover:bg-gray-700"
            @click="addOrRemoveLabel(label)"
          >
            <div class="flex flex-1 flex-col items-start justify-center pl-4">
              <span
                class="flex h-fit min-w-fit flex-col flex-nowrap content-center justify-center whitespace-nowrap rounded-lg border-[1px] p-[0.1rem] pl-[0.3rem] pr-[0.3rem] text-xs shadow-md shadow-inherit brightness-150"
                :style="`border-color: rgb(${label.color}); color: rgb(${label.color}); background-color: rgb(${label.color} / 0.2); --tw-shadow-color: rgb(${label.color} / 0.4);`"
                >{{ label.name }}</span
              >
            </div>
            <div
              v-if="labelSelected(label)"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Label } from "~~/gql/graphql";

const props = defineProps({
  labels: {
    type: Array as PropType<Label[]>,
    default() {
      return [];
    },
  },
  modelValue: {
    type: Array as PropType<Label[]>,
    default() {
      return [];
    },
    description: "selected labels",
  },
});

const emit = defineEmits(["update:modelValue"]);

const searchLabelTerm = ref("");
const labelOptionsOpened = ref(false);
// const labels = ref<Partial<Label>[]>([
//   { id: "1", color: "204 51 82", name: "Bug fix" },
//   { id: "2", color: "189 184 45", name: "Change Request" },
//   { id: "3", color: "37 186 47", name: "New Feature" },
// ]);

const labelSelected = (label: Label): boolean => {
  return props.modelValue.some((selectedLabel) => {
    return label.id === selectedLabel.id;
  });
};
const addOrRemoveLabel = (label: Label) => {
  // check whether user already exists, then delete the user from the group of selected users
  const labelIndex = props.modelValue.findIndex((selectedLabel) => {
    return label.id === selectedLabel.id;
  });

  // not found -> add to selected list
  if (labelIndex === -1) {
    // selectedLabels.value.push(label);
    emit("update:modelValue", [...props.modelValue, label]);
  }
  // found ->remove from list
  else {
    // selectedLabels.value.splice(labelIndex, 1);
    emit(
      "update:modelValue",
      props.modelValue.filter((x) => x.id !== label.id)
    );
  }
};

const filteredLabelList = computed(() => {
  if (searchLabelTerm.value !== "") {
    return props.labels.filter((label) => {
      return label.name
        ?.toLowerCase()
        .includes(searchLabelTerm.value.toLowerCase());
    });
  }
  return props.labels;
});
</script>

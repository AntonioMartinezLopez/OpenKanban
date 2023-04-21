<template>
  <div
    class="flex w-full flex-col content-center justify-center p-2 md:w-[40%]"
  >
    <h3 class="w-full text-lg">Weight</h3>
    <div class="mt-1 flex w-[50%] flex-row">
      <span
        class="flex h-full w-[20%] select-none flex-row content-center items-center justify-center rounded-tl-md rounded-bl-md border border-transparent bg-gray-700 text-base font-bold text-gray-400 hover:cursor-pointer hover:border hover:border-gray-400 hover:opacity-80"
        @click="removeWeight"
        >-</span
      >
      <input
        v-model="weightInput"
        class="duration-400 h-7 w-[60%] border border-gray-600 bg-slate-800 text-center text-base text-gray-400 outline-none transition-all ease-in focus:border-2 focus:border-green-500 focus:shadow-md focus:shadow-green-400/70 focus:outline-none"
        tabindex="1"
      />

      <span
        class="flex h-full w-[20%] select-none flex-row content-center items-center justify-center rounded-tr-md rounded-br-md border border-transparent bg-gray-700 text-base font-bold text-gray-400 hover:cursor-pointer hover:border hover:border-gray-400 hover:opacity-80"
        @click="addWeight"
        >+</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  maxWeight: { type: Number, default: 10 },
});

const emit = defineEmits(["update:modelValue"]);

const weightInput = ref(props.modelValue);

const addWeight = () => {
  emit("update:modelValue", props.modelValue + 1);
};
const removeWeight = () => {
  if (props.modelValue > 0) {
    emit("update:modelValue", props.modelValue - 1);
  }
};

watch(weightInput, (newValue, oldValue) => {
  const number = Number(newValue);
  if (Number.isInteger(number) && newValue !== null && number <= 10) {
    emit("update:modelValue", Number(newValue));
    weightInput.value = Number(newValue);
  } else {
    emit("update:modelValue", oldValue);
    weightInput.value = oldValue;
  }
});

watch(
  () => props.modelValue,
  (newVal) => {
    weightInput.value = newVal;
  }
);
</script>

<template>
  <div class="relative h-10 w-full rounded-md bg-inherit">
    <label
      class="absolute z-10 flex h-full w-full flex-col justify-center bg-transparent pl-1 text-left transition-all duration-300"
      :class="{ '-translate-y-3 text-xs text-gray-400': focused || modelValue }"
      @click.stop="focused = !focused"
      >{{ label }}</label
    >
    <input
      ref="inputRef"
      :type="inputType"
      class="focus:border-1 h-full w-full rounded-sm border border-transparent bg-gray-600 pl-1 focus:border-green-400 focus:outline-none"
      :class="{ 'pt-3': focused || modelValue }"
      :value="modelValue"
      :tabindex="tabindex"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @blur="focused = false"
      @click.stop="focused = true"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  label: string;
  inputType: "email" | "text" | "password";
  tabindex: number;
}>();

defineEmits(["update:modelValue"]);

const inputRef = ref<HTMLInputElement | null>(null);

const focused = ref(false);

watch(focused, () => {
  if (focused) {
    inputRef.value?.focus();
  } else {
    // inputRef.value?.blur();
  }
});
</script>

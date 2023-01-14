<template>
  <div class="w-full h-11 bg-inherit rounded-md relative">
    <label
      class="absolute h-full w-full z-10 bg-transparent pl-1 text-left transition-all duration-300 flex flex-col justify-center"
      :class="{ 'text-xs -translate-y-3': focused || modelValue }"
      @click.stop="focused = !focused"
      >{{ label }}</label
    >
    <input
      ref="inputRef"
      :type="inputType"
      class="w-full h-full bg-gray-600 border border-transparent rounded-sm focus:border-1 focus:border-green-400 focus:outline-none pl-1"
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

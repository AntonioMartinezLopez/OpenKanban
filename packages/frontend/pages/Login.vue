<template>
  <div class="h-full p-10 flex">
    <div
      class="container relative right-40 opacity-0 m-auto bg-gray-800 border-green-400 border shadow-2xl shadow-green-400/20 rounded-md md:w-2/6 h-3/6 w-4/5 transition-all duration-500"
      :class="{ 'right-0': loaded, 'opacity-100': loaded }"
    >
      Welcome to the Login page
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "unlogged" });

const loaded = ref(false);
onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
  }, 300);
});
</script>

<style lang="postcss"></style>

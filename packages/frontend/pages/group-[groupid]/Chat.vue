<template>
  <div class="">
    <h1 class="">Welcome to the chat page : {{ routeParams.groupid }}</h1>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: "auth" });
const routeParams = useRoute().params;
</script>

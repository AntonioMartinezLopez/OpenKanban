<template>
  <div id="loginWindow" class="flex h-full p-10">
    <div
      class="min-h-loginBox container relative right-40 m-auto flex h-3/6 w-4/5 rounded-md border border-green-400 bg-gray-800 shadow-2xl shadow-green-400/20 transition-all duration-500 lg:h-3/6 lg:w-2/6"
      :class="[loaded ? 'right-0 opacity-100' : 'opacity-0']"
    >
      <div class="grid-rows-7 grid h-full min-h-full w-full grid-flow-row">
        <div class="row-span-2 m-auto w-4/6">
          <div
            class="flex h-full flex-row items-start justify-center text-xl font-semibold"
          >
            <img class="h-full" src="@/assets/openkanban_logo_mono_green.png" />
          </div>
        </div>
        <div class="row-span-1 m-auto w-4/6 text-center">
          <InputField
            v-model="username"
            label="Username"
            input-type="text"
            :tabindex="1"
          ></InputField>
        </div>
        <div class="row-span-1 m-auto w-4/6 text-center">
          <InputField
            v-model="password"
            label="Password"
            input-type="password"
            :tabindex="2"
          ></InputField>
        </div>
        <div class="row-span-1 m-auto w-4/6 text-center">
          <button
            class="h-9 w-full rounded-sm bg-green-600 text-center font-bold"
            @click="sendLoginData"
          >
            Login
          </button>
        </div>
        <div
          class="row-span-2 m-auto flex w-5/6 flex-col items-center justify-center text-center text-xs"
        >
          <div
            class="flex h-full min-h-full w-full flex-col items-center justify-start text-xs text-red-600"
          >
            {{ errorMessage ? errorMessage : "&nbsp;" }}
          </div>
          <br />
          Please contact your admin, if you forgot your login credentials
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NET from "vanta/dist/vanta.net.min";

definePageMeta({ layout: "unlogged" });

const username = ref("");
const password = ref("");
const errorMessage = ref("");

// wait until mounted
const loaded = ref(false);
onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
  }, 500);

  setTimeout(() => {
    NET({
      el: "#loginWindow",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x34d399,
      backgroundColor: 0x111827,
      points: 7.0,
      spacing: 25.0,
    });
  }, 300);
});

const sendLoginData = async () => {
  // call log in function
  const { token, error } = await logIn(username.value, password.value);

  // if log in was successfull, fetch user relevant data and redirect to welcome page
  if (token) {
    navigateTo("/overview");
  }

  if (error) {
    errorMessage.value = error.message;
  }
};
</script>

<style lang="postcss"></style>

<template>
  <div id="loginWindow" class="h-full p-10 flex">
    <div
      class="container flex relative right-40 opacity-0 m-auto bg-gray-800 border-green-400 border shadow-2xl shadow-green-400/20 rounded-md lg:w-2/6 lg:h-3/6 h-3/6 w-4/5 min-h-loginBox transition-all duration-500"
      :class="{ 'right-0': loaded, 'opacity-100': loaded }"
    >
      <div class="h-full w-full grid grid-flow-row grid-rows-7 min-h-full">
        <div class="row-span-2 w-4/6 m-auto">
          <div
            class="h-full text-xl font-semibold flex flex-row justify-center items-start"
          >
            <img class="h-full" src="@/assets/openkanban_logo_mono_green.png" />
          </div>
        </div>
        <div class="row-span-1 text-center w-4/6 m-auto">
          <InputField
            v-model="username"
            label="Username"
            input-type="text"
            :tabindex="1"
          ></InputField>
        </div>
        <div class="row-span-1 text-center w-4/6 m-auto">
          <InputField
            v-model="password"
            label="Password"
            input-type="password"
            :tabindex="2"
          ></InputField>
        </div>
        <div class="row-span-1 text-center w-4/6 m-auto">
          <button
            class="w-full h-9 bg-green-600 text-center font-bold rounded-sm"
            @click="sendLoginData"
          >
            Login
          </button>
        </div>
        <div
          class="row-span-2 w-5/6 m-auto text-center text-xs flex flex-col justify-center items-center"
        >
          <div
            class="text-red-600 min-h-full h-full w-full text-xs flex flex-col items-center justify-start"
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

<template>
  <div class="flex h-screen flex-col bg-gray-900 text-zinc-300">
    <!-- <header
      class="h-12 bg-gray-800 border-green-400 border-b subpixel-antialiased"
    >
      <nav class="h-full w-1/3">
        <ul class="h-full flex flex-row">
          <li class="m-auto hover:text-green-400"> 
            <NuxtLink to="/Login">Login</NuxtLink>
          </li>
          <li class="m-auto hover:text-green-400">
            <NuxtLink to="/Welcome">Welcome</NuxtLink>
          </li>
        </ul>
      </nav>
    </header> -->
    <div class="flex-1"><slot></slot></div>

    <footer class="m-auto h-10 text-sm">OpenKanban 2022</footer>
  </div>
</template>

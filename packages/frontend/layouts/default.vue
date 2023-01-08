<template>
  <div class="h-screen flex flex-col bg-gray-900 text-zinc-300">
    <header class="h-9 bg-gray-800 subpixel-antialiased">
      <nav class="h-full w-1/3">
        <ul class="h-full flex flex-row">
          <li class="m-auto hover:text-green-400">
            <NuxtLink to="/Login">Login</NuxtLink>
          </li>
          <li class="m-auto hover:text-green-400">
            <NuxtLink to="/Welcome">Welcome</NuxtLink>
          </li>
          <li class="m-auto hover:text-green-400">
            <NuxtLink to="/Group">Group</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <div class="flex-1"><slot></slot></div>

    <footer class="h-10 m-auto text-sm">OpenKanban 2022</footer>
  </div>
</template>

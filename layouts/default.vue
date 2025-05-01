<template>
    <UContainer class="min-h-screen flex flex-col">
      <!-- Header -->
      <header class="py-4 flex justify-between items-center border-b">
        <NuxtLink to="/" class="text-xl font-bold flex items-center gap-2">
          <nuxt-icon name="mdi:puzzle" class="text-primary" />
          Enigmata
        </NuxtLink>
        <nav class="flex gap-4">
          <NuxtLink to="/games">Games</NuxtLink>
          <NuxtLink to="/about">About</NuxtLink>
        </nav>
      </header>
  
      <!-- Main Content -->
      <main class="flex-grow py-6">
        <slot />
      </main>
  
      <!-- Footer -->
      <footer class="py-4 border-t text-sm text-center text-gray-500">
        © {{ new Date().getFullYear() }} Enigmata — A world of logic
      </footer>
    </UContainer>
  </template>
  
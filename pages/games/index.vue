<script setup>
import puzzleRegistry from '~/utils/puzzleRegistry'
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">All Puzzle Types</h1>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard v-for="puzzle in puzzleRegistry" :key="puzzle.slug">
        <template #header>
          <h2 class="text-xl font-semibold capitalize">{{ puzzle.name }}</h2>
        </template>
        <p class="text-sm text-gray-600">{{ puzzle.description }}</p>
        <template #footer>
          <UButton :to="`/games/${puzzle.slug}`" icon="i-heroicons-play-circle">
            Learn & Play
          </UButton>
        </template>
      </UCard>
    </div>
  </div>
</template>

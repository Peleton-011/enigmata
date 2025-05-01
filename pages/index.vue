<script setup>
// Eventually this might fetch featured puzzles
</script>

<template>
  <div class="space-y-10">
    <section class="text-center space-y-4">
      <h1 class="text-4xl font-extrabold">Welcome to Enigmata</h1>
      <p class="text-lg text-gray-600 max-w-xl mx-auto">
        A world of logic puzzles, brain teasers, and elegant challenges. Learn, explore, and solve.
      </p>
      <UButton to="/games" icon="i-heroicons-cube" size="lg">Explore Games</UButton>
    </section>

    <section class="grid md:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">What is Enigmata?</h2>
        </template>
        <p>
          Enigmata is a collection of logic puzzles from classics like Sudoku to original new challenges. Each game includes tutorials, curated puzzles, and a random board generator.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="text-xl font-semibold">Getting Started</h2>
        </template>
        <p>
          Pick any puzzle to learn how it works, solve a sample, and dive into challenges. No account or downloads required.
        </p>
      </UCard>
    </section>
  </div>
</template>

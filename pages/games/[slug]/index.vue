<script setup lang="ts">
const route = useRoute();
const puzzleSlug = (route.params.slug as String);

// You might fetch puzzle metadata here later
</script>

<template>
	<div class="space-y-8">
		<UCard>
			<template #header>
				<h1 class="text-2xl font-bold capitalize">{{ puzzleSlug }}</h1>
			</template>
			<p>
				Welcome to {{ puzzleSlug }}! Learn how it works, try a sample,
				and solve your first puzzle.
			</p>
		</UCard>

		<UCard>
			<template #header>
				<h2 class="text-xl font-semibold">Sample Puzzle</h2>
			</template>
			<p>TODO: Render sample puzzle component</p>
		</UCard>

		<div class="flex gap-4">
			<UButton
				to="./catalogue"
				icon="i-heroicons-book-open"
				variant="soft"
				>Curated Catalogue</UButton
			>
			<UButton to="./generator" icon="i-heroicons-sparkles" variant="soft"
				>Puzzle Generator</UButton
			>
		</div>
	</div>
</template>

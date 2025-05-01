<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const PuzzleIntro = usePuzzleComponent(slug, "PuzzleIntro");
const SampleBoard = usePuzzleComponent(slug, "SampleBoard");

</script>

<template>
	<div class="space-y-8">
		<UCard>
			<template #header>
				<h1 class="text-2xl font-bold capitalize">{{ slug }}</h1>
			</template>
			<component :is="PuzzleIntro" v-if="PuzzleIntro" />
			<p v-else>No intro available, yet.</p>
		</UCard>

		<UCard>
			<template #header>
				<h2 class="text-xl font-semibold">Try a Sample</h2>
			</template>
			<component :is="SampleBoard" v-if="SampleBoard" />
			<p v-else>No sample available, yet.</p>
		</UCard>

		<div class="flex gap-4">
			<UButton
				:to="`/games/${slug}/catalogue`"
				icon="i-heroicons-book-open"
				variant="soft"
				>Catalogue</UButton
			>
			<UButton
				:to="`/games/${slug}/generator`"
				icon="i-heroicons-sparkles"
				variant="soft"
				>Generator</UButton
			>
		</div>
	</div>
</template>

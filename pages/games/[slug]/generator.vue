<script setup lang="ts">
import BoardDisplay from "~/components/puzzles/battleship/BoardDisplay.vue";
</script>

<template>
	<UCard>
		<template #header>
			<h2 class="text-xl font-semibold">Battleship Board</h2>
		</template>

		<ClientOnly>
			<BoardDisplay :puzzle="usePuzzleGenerator('battleship')" />
		</ClientOnly>
	</UCard>
</template>

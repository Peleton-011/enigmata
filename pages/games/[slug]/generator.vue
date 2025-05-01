<script setup lang="ts">
import BoardDisplay from "~/components/puzzles/battleship/BoardDisplay.vue";
import {
	generatePuzzleFromSolution,
	generateBattleshipBoard,
} from "~/puzzles/battleship/generate";

const puzzles = ref([]);

if (import.meta.client) {
	const puzzle = generateBattleshipBoard();
	puzzles.value.push(puzzle);
    const puzzle2 = generateBattleshipBoard();
	puzzles.value.push(generatePuzzleFromSolution(puzzle, 0));
}
</script>

<template>
	<UCard v-for='(puzzle, i) in puzzles' :key="i">
		<template #header>
			<h2 class="text-xl font-semibold">Battleship Board</h2>
		</template>

		<ClientOnly>
			<BoardDisplay :puzzle="puzzle" />
			<!-- <BoardDisplay :puzzle="usePuzzleGenerator('battleship')" /> -->
		</ClientOnly>
	</UCard>
</template>

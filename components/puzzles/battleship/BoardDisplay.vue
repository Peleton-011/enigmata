<template>
	<div class="flex justify-center">
		<div class="space-y-4">
			<!-- Column Tally -->
			<div
				class="flex justify-center gap-1 text-sm font-medium text-gray-600"
			>
				<div class="w-8 h-8" />
				<!-- Empty top-left corner -->
				<div
					v-for="(tally, col) in puzzle.colTally"
					:key="'col-' + col"
					class="w-8 h-8 flex items-center justify-center"
				>
					{{ tally }}
				</div>
			</div>

			<!-- Grid Rows + Row Tallies -->
			<div class="flex flex-col gap-1">
				<div
					v-for="(row, i) in puzzle.grid"
					:key="'row-' + i"
					class="flex items-center gap-1"
				>
					<!-- Row Tally -->
					<div
						class="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-600"
					>
						{{ puzzle.rowTally[i] }}
					</div>

					<!-- Grid Row -->
					<div v-for="(cell, j) in row" :key="'cell-' + i + '-' + j">
						<CellDisplay :cell="cell" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Puzzle } from "~/puzzles/battleship/types";
import CellDisplay from "./CellDisplay.vue";

defineProps<{
	puzzle: Puzzle;
}>();
</script>

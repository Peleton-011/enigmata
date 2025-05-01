<template>
	<div
		class="w-8 h-8 border rounded flex items-center justify-center text-lg font-bold [&>*]:font-mono"
		:class="{
			'bg-blue-100 text-blue-900': cell.content === 'water',
			'bg-gray-700 text-white': isShipPart || cell.hint?.type === 'submarine',
		}"
	>
		<!-- Optional hint characters -->
		<template v-if="cell.hint" >
			<span v-if="cell.hint.type === 'shipEnd'">
				{{ arrowFromDirection(cell.hint.direction) }}
			</span>
			<span v-else-if="cell.hint.type === 'shipMiddle'">■</span>
			<span v-else-if="cell.hint.type === 'shipUnknown'">□</span>
			<span v-else-if="cell.hint.type === 'submarine'">●</span>
			<span v-else-if="cell.hint.type === 'water'">~</span>
		</template>
	</div>
</template>

<script lang="ts" setup>
import type { Cell } from "@/puzzles/battleship/types";

const props = defineProps<{
	cell: Cell;
}>();

function arrowFromDirection(dir: "up" | "down" | "left" | "right") {
	return {
		up: "▼",
		down: "▲",
		left: "▶",
		right: "◀",
	}[dir];
}

const isShipPart = computed(() =>
	["shipMiddle", "shipEnd", "shipUnknown"].includes(
		props.cell.hint?.type ?? ""
	)
);
</script>

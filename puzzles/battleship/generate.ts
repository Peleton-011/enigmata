import type { BattleshipBoard } from "./types";

export function generateBattleshipBoard(
	difficulty: "easy" | "medium" | "hard"
): BattleshipBoard {
	// Logic to generate a board (grid of numbers)
	// Return it in a predictable format
	return [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	];
}

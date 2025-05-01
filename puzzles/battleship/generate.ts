import type { Cell, CellContent, Fleet, Grid, HintType, Puzzle } from "./types";

export function generateSolvedBoard(
	rows: number = 5,
	cols: number = 5,
	fleet: Fleet = { 1: 2, 2: 1, 3: 1, 4: 0 }
): Puzzle {
	const grid: Grid = Array.from({ length: rows }, () =>
		Array.from({ length: cols }, () => ({
			content: "water" as CellContent,
		}))
	);

	const shipsToPlace = Object.entries(fleet).flatMap(([lengthStr, count]) =>
		Array(Number(count)).fill(Number(lengthStr))
	);

	// shuffleArray(shipsToPlace); // Randomize ship placement order
	//Place ship from biggest to smallest
	shipsToPlace.sort((a, b) => b - a);

	for (const shipLength of shipsToPlace) {
		const placed = tryPlaceShip(grid, shipLength);
		if (!placed)
			throw new Error(`Could not place ship of length ${shipLength}`);
	}

	const rowTally = grid.map(
		(row) => row.filter((c) => c.content === "ship").length
	);
	const colTally = Array.from(
		{ length: cols },
		(_, j) =>
			grid.map((row) => row[j]).filter((c) => c.content === "ship").length
	);

	return {
		grid,
		rowTally,
		colTally,
		fleet,
	};
}

function tryPlaceShip(grid: Grid, length: number): boolean {
	const directions: ["horizontal", "vertical"] = ["horizontal", "vertical"];
	const attempts = 100;

	for (let attempt = 0; attempt < attempts; attempt++) {
		const dir = directions[Math.floor(Math.random() * 2)];
		const rows = grid.length;
		const cols = grid[0].length;

		const i = Math.floor(Math.random() * rows);
		const j = Math.floor(Math.random() * cols);

		const coords = getShipCoordinates(i, j, length, dir);
		if (!coords) continue;

		// Check if all positions are valid (empty and no-adjacency)
		if (
			coords.every(([x, y]) => isCellAvailable(grid, x, y)) &&
			coords
				.flatMap(([x, y]) => getAllNeighbors(grid, x, y))
				.every((c) => c.content !== "ship")
		) {
			// Place the ship
			coords.forEach(([x, y], idx) => {
				grid[x][y].content = "ship";

				// Optional: decorate with hint type for clarity
				if (length === 1) {
					grid[x][y].hint = { type: "submarine" };
				} else if (idx === 0) {
					grid[x][y].hint = {
						type: "shipEnd",
						direction: dir === "horizontal" ? "right" : "down",
					};
				} else if (idx === length - 1) {
					grid[x][y].hint = {
						type: "shipEnd",
						direction: dir === "horizontal" ? "left" : "up",
					};
				} else {
					grid[x][y].hint = { type: "shipMiddle" };
				}
			});

			return true;
		}
	}

	return false;
}

function getShipCoordinates(
	i: number,
	j: number,
	length: number,
	dir: "horizontal" | "vertical"
): [number, number][] | null {
	const coords: [number, number][] = [];

	for (let k = 0; k < length; k++) {
		const x = dir === "horizontal" ? i : i + k;
		const y = dir === "horizontal" ? j + k : j;

		if (!isInBounds(x, y)) return null;
		coords.push([x, y]);
	}

	return coords;
}

function isInBounds(x: number, y: number): boolean {
	return x >= 0 && y >= 0 && x < 100 && y < 100; // adjust as needed
}

function isCellAvailable(grid: Grid, i: number, j: number): boolean {
	return grid[i]?.[j]?.content === "water";
}

function getAllNeighbors(grid: Grid, i: number, j: number): Cell[] {
	const directions = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		/*self*/ [0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	return directions
		.map(([di, dj]) => grid[i + di]?.[j + dj])
		.filter((c): c is Cell => !!c);
}

function shuffleArray<T>(arr: T[]): void {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
}

// -------------------------------------------------------------------------------------

export function generateBattleshipBoard(attempts?: number): Puzzle {
	// If solved board generation fails 5 times in a row, give up
	if (attempts && attempts > 5) return generateSolvedBoard();
	let puzzle;
	try {
		puzzle = generateSolvedBoard();
	} catch (error) {
		console.error(error);
		console.log("Generating puzzle failed, trying again");
		return generateBattleshipBoard(attempts ? attempts + 1 : 1);
	}
	return generateSolvedBoard();
	return generatePuzzleFromSolution(generateSolvedBoard(), 0);
}

function deepClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

function getNeighbors(grid: Grid, i: number, j: number): Cell[] {
	const directions = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1], // orthogonal
	];
	return directions
		.map(([di, dj]) => grid[i + di]?.[j + dj])
		.filter((c): c is Cell => !!c);
}

function getDiagonals(grid: Grid, i: number, j: number): Cell[] {
	const directions = [
		[-1, -1],
		[-1, 1],
		[1, -1],
		[1, 1], // diagonal
	];
	return directions
		.map(([di, dj]) => grid[i + di]?.[j + dj])
		.filter((c): c is Cell => !!c);
}

function countInRow(row: Cell[], type: "ship" | "water"): number {
	return row.filter((c) => c.content === type).length;
}

function countInCol(col: Cell[], type: "ship" | "water"): number {
	return col.filter((c) => c.content === type).length;
}

function isShipHint(hint?: HintType): boolean {
	return (
		hint?.type === "submarine" ||
		hint?.type === "shipUnknown" ||
		hint?.type === "shipEnd" ||
		hint?.type === "shipMiddle"
	);
}

export function generatePuzzleFromSolution(
	solution: Puzzle,
	difficultySteps: number
): Puzzle {
	const puzzle = deepClone(solution); // Make a copy to strip info from

	const removalSteps: (() => void)[] = [];

	// 1. Strip every cell that is not necessary using inverse rules
	applyInverseRules(puzzle, removalSteps);

	// 2. Keep only minimal hints + undo last `difficultySteps` removals
	undoLastSteps(removalSteps, difficultySteps);

	return puzzle;
}

function undoLastSteps(steps: (() => void)[], difficultySteps: number) {
	const toUndo = steps.slice(-difficultySteps);

	for (const undo of toUndo) {
		undo(); // Reapply removed hints
	}
}

function applyInverseRules(puzzle: Puzzle, steps: (() => void)[]) {
	const { grid } = puzzle;

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			const cell = grid[i][j];
			if (cell.hint) {
				// Try to remove it
				const canRemove = canRemoveHint(puzzle, i, j);

				if (canRemove) {
					const previousHint = cell.hint;
					delete cell.hint;

					// Push undo step to restore this hint
					steps.push(() => {
						cell.hint = previousHint;
					});
				}
			}
		}
	}
}

function canRemoveHint(puzzle: Puzzle, i: number, j: number): boolean {
	const grid = puzzle.grid;
	const row = grid[i];
	const cell = row[j];
	const col = grid.map((r) => r[j]);

	if (cell.hint?.type === "water") {
		// Rule 1: Row or column fully filled
		const rowShipCount = countInRow(row, "ship");
		const rowTally = puzzle.rowTally[i];
		const colShipCount = countInCol(col, "ship");
		const colTally = puzzle.colTally[j];

		if (rowShipCount === rowTally || colShipCount === colTally) {
			return true;
		}

		// Rule 3: Adjacency constraint (C3)
		const neighbors = getNeighbors(grid, i, j);
		const hasAdjacentShip = neighbors.some((c) => c.content === "ship");
		const hasDiagonalShip = getDiagonals(grid, i, j).some(
			(c) => c.content === "ship"
		);

		// If this water is only here due to adjacency, and there are no adjacent ships now
		if (hasAdjacentShip || hasDiagonalShip) {
			return true;
		}

		return false;
	}

	if (isShipHint(cell.hint)) {
		// Rule 2: Row or column completion logic
		const unknowns = row.filter((c) => !c.hint && !c.locked).length;
		const shipCount = countInRow(row, "ship");
		const rowTally = puzzle.rowTally[i];

		const colUnknowns = col.filter((c) => !c.hint && !c.locked).length;
		const colShipCount = countInCol(col, "ship");
		const colTally = puzzle.colTally[j];

		if (
			shipCount + unknowns === rowTally ||
			colShipCount + colUnknowns === colTally
		) {
			return true;
		}

		return false;
	}

	return false;
}

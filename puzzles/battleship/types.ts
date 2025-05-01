// Cell contents in the solved board
export type CellContent =
	| "water"
	| "ship"
	| "submarine"
	| "shipEnd"
	| "shipMiddle"
	| "unknown";

// Hint information a cell might display
export type HintType =
	| { type: "submarine" }
	| { type: "shipEnd"; direction: "up" | "down" | "left" | "right" }
	| { type: "shipMiddle" }
	| { type: "shipUnknown" } // square hint with no direction
	| { type: "water" };

// A cell of the grid
export interface Cell {
	content: CellContent; // from the solved board
	hint?: HintType; // user-facing hint, if any
	locked?: boolean; // true if hint must be shown
}

// Grid of cells
export type Grid = Cell[][];

// Fleet definition (number of ships per size)
export interface Fleet {
	[size: number]: number;
}

// Row/Col tallies
export type Tally = number[];

// Puzzle input/output structure
export interface Puzzle {
	grid: Grid;
	rowTally: Tally;
	colTally: Tally;
	fleet: Fleet;
}

const GRID_SIZE = 9;

export class Board {
	grid: number[][];

	constructor(grid?: number[][]) {
		if (grid) {
			if (grid.length !== GRID_SIZE) {
				throw new Error(`Expected grid to have ${GRID_SIZE} rows, but got ${grid.length}`);
			}
			if (grid.some((row) => row.length !== GRID_SIZE)) {
				throw new Error(`Expected grid to have ${GRID_SIZE} columns, but got ${grid[0].length}`);
			}
			this.grid = grid;
			return;
		}
		this.grid = this.generateBlankGrid();
	}

	generateBlankGrid() {
		return Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => 0));
	}

	toString() {
		return this.grid.map((row) => row.join(' ')).join('\n');
	}

	getRow(row: number) {
		return this.grid[row];
	}

	getColumn(col: number) {
		return this.grid.map((row) => row[col]);
	}

	setCell(row: number, col: number, value: number) {
		this.grid[row][col] = value;
	}

	getCell(row: number, col: number) {
		return this.grid[row][col];
	}
}

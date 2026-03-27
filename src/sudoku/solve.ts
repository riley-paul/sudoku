import { ALL_UNITS, PEERS, SQUARES, STARTING_GRID, UNITS } from "./const";
import type { Digit, DigitSet, Grid, Square } from "./types";

export function isSolution(solution: Grid | null, puzzle: Grid): boolean {
  if (!solution) return false;

  const solutionContainsPuzzle = SQUARES.every((s) =>
    solution[s].isSupersetOf(puzzle[s]),
  );
  const eachSquareHasOneDigit = SQUARES.every((s) => solution[s].size === 1);
  const eachUnitIsValid = ALL_UNITS.every((unit) => {
    const digitsInUnit: DigitSet = new Set(
      unit.map((s) => [...solution[s]][0]),
    );
    return digitsInUnit.size === 9;
  });

  return solutionContainsPuzzle && eachSquareHasOneDigit && eachUnitIsValid;
}

/**
 * Propogate constraints on a copy of grid to yield a new constrained grid
 */
export function constrain(grid: Grid): Grid {
  const result: Grid = { ...STARTING_GRID };
  SQUARES.forEach((s) => {
    const digits = grid[s];
    if (digits.size === 1) {
      const [d] = [...digits];
      fill(result, s, d);
    }
  });
  return result;
}

/**
 * Eleminate all the other values (except d) from grid[s]
 */
function fill(grid: Grid, s: Square, d: Digit): Grid | null {
  // Check if d is already filled in s
  const isAssigned = grid[s].size === 1 && grid[s].has(d);
  if (isAssigned) return grid;

  // Eliminate all other values (except d) from grid[s]
  grid[s].values().forEach((d2) => {
    if (d2 !== d) {
      eliminate(grid, s, d2);
    }
  });

  return null;
}

/**
 * Eliminate d from grid[s]; implement the two constraint properties
 */
function eliminate(grid: Grid, s: Square, d: Digit): Grid | null {
  if (!grid[s].has(d)) return grid;

  grid[s].delete(d);

  if (grid[s].size === 0) {
    // contradiction: removed last value from square
    return null;
  } else if (grid[s].size === 1) {
    // square has only one possible value, eliminate that value from its peers
    const d2 = grid[s].keys().next().value!;
    PEERS[s].forEach((s2) => {
      eliminate(grid, s2, d2);
    });
  }

  UNITS[s].forEach((unit) => {
    const dplaces = unit.filter((s) => grid[s].has(d));
    if (dplaces.length === 0) {
      throw new Error("Contradiction: no place for this value");
    } else if (dplaces.length === 1) {
      // d can only be in one place in unit; assign it there
      fill(grid, dplaces[0], d);
    }
  });

  return grid;
}

/**
 * Depth first search with constrain propagation to find a solution.
 */
export function search(grid: Grid | null): Grid | null {
  if (!grid) return null;

  const unsolvedSquares = SQUARES.filter((s) => grid[s].size > 1);
  if (unsolvedSquares.length === 0) return grid; // Solved!

  // choose the square with the fewest possibilities
  const s = unsolvedSquares.reduce((a, b) =>
    grid[a].size < grid[b].size ? a : b,
  );

  for (const d of grid[s]) {
    // initiate constraint propagation and recursively search on the new grid
    const newGrid = fill({ ...grid }, s, d);
    const result = search(newGrid);
    if (result) return result;
  }

  return null; // No solution found
}

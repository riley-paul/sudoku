import { PEERS, SQUARES, STARTING_GRID, UNITS } from "./const";
import type { Digit, DigitSet, Grid, Square } from "./types";

// function isSolution(solution: Grid, puzzle: Grid): boolean {
//   return SQUARES.every((s) => solution[s].isSubsetOf(puzzle[s]));
// }

/**
 * Propogate constraints on a copy of grid to yield a new constrained grid
 * @param grid
 * @returns
 */
function constrain(grid: Grid): Grid {
  const result: Grid = { ...STARTING_GRID };
  SQUARES.forEach((s) => {
    const digits = grid[s];
    if (digits.size === 1) {
      const d = digits.keys().next().value!;
      fill(result, s, d);
    }
  });
  return result;
}

/**
 * Eleminate all the other values (except d) from grid[s]
 * @param grid
 * @param s
 * @param d
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
 * @param grid
 * @param s
 * @param d
 * @returns
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

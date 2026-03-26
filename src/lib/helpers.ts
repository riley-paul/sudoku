import { initBoard } from "./init";
import type { Cell, Cells } from "./types";

const ROW_LABELS = "ABCDEFGHI";
const COL_LABELS = "123456789";
export const getId = (row: number, col: number) =>
  `${ROW_LABELS[row]}${COL_LABELS[col]}`;

export const getRow = (cells: Cells, row: number) =>
  Object.values(cells).filter((cell) => cell.row === row);

export const getCol = (cells: Cells, col: number) =>
  Object.values(cells).filter((cell) => cell.col === col);

export const getBox = (cells: Cells, box: number) =>
  Object.values(cells).filter((cell) => cell.box === box);

export const getRandomValue = () => Math.floor(Math.random() * 9) + 1;

export const GRID = Array.from({ length: 9 }, (_, row) =>
  Array.from({ length: 9 }, (_, col) => getId(row, col)),
);

export const blurActiveElement = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

export function hasConflict(cells: Cells, cell: Cell): boolean {
  if (!cell.value) return false;

  const peers = Object.values(cells).filter((c) => {
    if (c.id === cell.id) return false;
    return c.row === cell.row || c.col === cell.col || c.box === cell.box;
  });

  return peers.some((c) => c.value === cell.value);
}

function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function findEmptyCell(cells: Cells): Cell | null {
  const emptyCells = Object.values(cells).filter((cell) => cell.value === null);
  return emptyCells.length > 0 ? emptyCells[0] : null;
}

function isValid(cells: Cells, cell: Cell, value: number) {
  return !hasConflict(cells, { ...cell, value });
}

export function fillBoard(cells: Cells): boolean {
  const empty = findEmptyCell(cells);
  if (!empty) return true;

  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (const num of numbers) {
    if (isValid(cells, empty, num)) {
      empty.value = num;

      if (fillBoard(cells)) return true;

      empty.value = null;
    }
  }

  return false;
}

function countSolutions(cells: Cells, limit = 2) {
  let count = 0;

  function solve() {
    if (count >= limit) return;

    const empty = findEmptyCell(cells);
    if (!empty) {
      count++;
      return;
    }

    for (let num = 1; num <= 9; num++) {
      if (isValid(cells, empty, num)) {
        empty.value = num;
        solve();
        empty.value = null;
      }
    }
  }

  solve();
  return count;
}

function hasUniqueSolution(cells: Cells) {
  return countSolutions(cells) === 1;
}

export function removeNumbers(cells: Cells, attempts = 40) {
  const ids = shuffle(Object.keys(cells));

  for (const id of ids) {
    const backup = cells[id].value;
    cells[id].value = null;

    if (!hasUniqueSolution(cells)) {
      cells[id].value = backup; // revert
    }
  }
}

export function generateFullBoard(): Cells {
  const cells = initBoard();
  fillBoard(cells);
  return cells;
}

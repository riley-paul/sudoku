export const getId = (row: number, col: number) => `r${row}c${col}`;

export const getRandomValue = () => Math.floor(Math.random() * 9) + 1;

export const GRID = Array.from({ length: 9 }, (_, row) =>
  Array.from({ length: 9 }, (_, col) => getId(row, col)),
);

export const blurActiveElement = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

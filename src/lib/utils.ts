import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Digit, Row, Square } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSquare = (row: Row, col: Digit): Square => `${row}${col}`;

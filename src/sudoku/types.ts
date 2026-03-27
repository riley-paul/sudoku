export type Digit = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type Row = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I";

export type DigitSet = Set<Digit>;
export type Square = `${Row}${Digit}`;
export type Grid = Record<Square, DigitSet>;
export type Puzzle = Record<Square, Digit | null>;

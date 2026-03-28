import type { APIRoute } from "astro";
import puzzleData from "@/sudoku/test-puzzles/top95.txt?raw";

export const GET: APIRoute = async () => {
  const puzzles = puzzleData
    .split("\n")
    .filter((line) => line.trim().length > 0);
  const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

  return new Response(randomPuzzle, {
    headers: { "Content-Type": "text/plain" },
  });
};

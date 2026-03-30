import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const puzzleData = await import("@/sudoku/test-puzzles/top95.txt?raw");
  const puzzles = puzzleData.default
    .split("\n")
    .filter((line) => line.trim().length > 0);
  const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

  return new Response(randomPuzzle, {
    headers: { "Content-Type": "text/plain" },
  });
};

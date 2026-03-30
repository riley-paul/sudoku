import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const { default: puzzles } =
    await import("@/sudoku/test-puzzles/sudoku10k-solutions.json");
  const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

  return new Response(JSON.stringify(randomPuzzle));
};

import { parseGrid, printGrids, stringifyGrid } from "@/sudoku/parse";
import { constrain, search } from "@/sudoku/solve";
import { readFile, writeFile } from "fs/promises";

const solveAll = async (filename: string) => {
  const content = await readFile(filename, "utf-8");
  const results = content
    .split("\n")
    .filter((i) => i.trim().length > 0)
    .map((line) => {
      const grid = parseGrid(line);
      const solution = search(constrain(grid));

      const printed = printGrids([grid, solution]);
      console.log(printed);

      return {
        puzzle: stringifyGrid(grid),
        solution: solution ? stringifyGrid(solution) : null,
      };
    })
    .filter((result) => result.solution !== null);

  console.log(`Solved ${results.length} puzzles!`);

  const newFileName = filename.replace(".txt", "-solutions.json");

  await writeFile(newFileName, JSON.stringify(results, null, 2), "utf-8");
};

solveAll("./src/sudoku/test-puzzles/top95.txt");

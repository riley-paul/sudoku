
function cross<A, B, T>(
  a: Iterable<A>,
  b: Iterable<B>,
  combine: (x: A, y: B) => T = (x, y) => `${x}${y}` as unknown as T,
): Set<T> {
  const result: Set<T> = new Set();
  for (const s of a) {
    for (const t of b) {
      result.add(combine(s, t));
    }
  }
  return result;
}

function printGrid(grid: Grid) {
  const width = Math.max(...Object.values(grid).map((s) => s.size)) + 1;
  const line = "-".repeat(width * 3) + "+" + "-".repeat(width * 3) + "+" + "-".repeat(width * 3);
  for (const r of rows) {
    let row = "";
    for (const c of cols) {
      const s = grid[`${r}${c}` as Square];
      row += s.size === 1 ? [...s][0].padStart(width, " ") : ".".padStart(width, " ");
      if (c === "3" || c === "6") row += "|";
    }
    console.log(row);
    if (r === "C" || r === "F") console.log(line);
  }
}



const digits: DigitSet = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const rows: Row[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const cols: Digit[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

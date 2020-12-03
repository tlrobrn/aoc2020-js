import input from "./input";
import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day3() {
  return (
    <PuzzleInputProvider defaultInput={input}>
      <h1>Day 3</h1>
      <PuzzleInputForm />
      <div>
        <Solution />
      </div>
      <div>
        <Solution2 />
      </div>
    </PuzzleInputProvider>
  );
}

function Solution() {
  const { puzzleInput } = usePuzzleInput();
  const map = new TreeMap(puzzleInput);
  const location = { x: 0, y: 0 };
  let treeCount = 0;

  while (!map.atBottom(location)) {
    if (map.isTreeAt(location)) treeCount++;
    location.x += 3;
    location.y += 1;
  }

  return <div>Part 1: {treeCount}</div>;
}

function Solution2() {
  //const { puzzleInput } = usePuzzleInput();
  const result = "todo";

  return <div>Part 2: {result}</div>;
}

const TREE = "#";

class TreeMap {
  constructor(input) {
    this.parse(input);
  }

  isTreeAt({ x, y }) {
    return this.trees.has(`${x % this.width},${y}`);
  }

  atBottom({ y }) {
    return y >= this.height;
  }

  parse(input) {
    const lines = input.split(/\n/);
    const maxY = lines.length;
    const maxX = lines[0].length;
    this.trees = new Set();
    this.width = maxX;
    this.height = maxY;
    for (let y = 0; y < maxY; y++) {
      for (let x = 0; x < maxX; x++) {
        if (lines[y][x] === TREE) {
          this.trees.add(`${x},${y}`);
        }
      }
    }
  }
}

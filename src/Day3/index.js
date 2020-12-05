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
      <Solutions />
    </PuzzleInputProvider>
  );
}

function Solutions() {
  const map = useTreeMap();
  return (
    <>
      <div>
        <Solution map={map} />
      </div>
      <div>
        <Solution2 map={map} />
      </div>
    </>
  );
}

function Solution({ map }) {
  const [treeCount] = testPaths({ map, slopes: [{ dx: 3, dy: 1 }] });

  return <div>Part 1: {treeCount}</div>;
}

function Solution2({ map }) {
  const treeCounts = testPaths({
    map,
    slopes: [
      { dx: 1, dy: 1 },
      { dx: 3, dy: 1 },
      { dx: 5, dy: 1 },
      { dx: 7, dy: 1 },
      { dx: 1, dy: 2 },
    ],
  });
  const result = treeCounts.reduce((acc, n) => acc * n, 1);

  return <div>Part 2: {result}</div>;
}

function useTreeMap() {
  const { puzzleInput } = usePuzzleInput();
  return new TreeMap(puzzleInput);
}

function testPaths({ map, slopes }) {
  return slopes.map(({ dx, dy }) => {
    const location = { x: 0, y: 0 };
    let treeCount = 0;

    while (!map.atBottom(location)) {
      if (map.isTreeAt(location)) treeCount++;
      location.x += dx;
      location.y += dy;
    }

    return treeCount;
  });
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

import input from "./input";
import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day11() {
  return (
    <PuzzleInputProvider defaultInput={input}>
      <h1>Day 11</h1>
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
  const grid = useGrid();
  while (grid.advanceModel());
  const result = grid.occupiedSeatCount();

  return <div>Part 1: {result}</div>;
}

function Solution2() {
  const result = "todo";

  return <div>Part 2: {result}</div>;
}

function useGrid() {
  const { puzzleInput } = usePuzzleInput();
  return new Grid(puzzleInput);
}

class Grid {
  constructor(input) {
    this.cells = input.split(/\n/).map((line, y) =>
      line
        .trim()
        .split("")
        .map((c, x) => Cell.parse(c, { x, y }))
    );
    this.height = this.cells.length;
    this.width = this.cells[0].length;
    this.changed = false;
  }

  advanceModel() {
    this.changed = false;
    const newCells = this.cells.map((line) =>
      line.map((cell) => cell.advanceModel(this))
    );
    this.cells = newCells;
    return this.changed;
  }

  markChanged() {
    this.changed = true;
  }

  occupiedSeatCount() {
    return this.cells.reduce(
      (total, row) =>
        row.reduce(
          (count, cell) => (cell.isOccupied() ? count + 1 : count),
          total
        ),
      0
    );
  }
}

class Cell {
  static parse(char, coordinates) {
    switch (char) {
      case "L":
        return new EmptySeat(coordinates);
      case "#":
        return new OccupiedSeat(coordinates);
      default:
        return new Floor(coordinates);
    }
  }

  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  isOccupied() {
    return false;
  }

  advanceModel(grid) {
    const next = this.next(grid);
    if (next !== this) grid.markChanged();
    return next;
  }

  neighbors(grid) {
    const deltas = [-1, 0, 1];
    return deltas.flatMap((dy) => {
      const row = grid.cells[this.y + dy];
      if (!row) return [];
      return deltas.flatMap((dx) => {
        const cell = row[this.x + dx];
        return cell && cell !== this ? [cell] : [];
      });
    });
  }

  countOccupiedNeighbors(grid) {
    return this.neighbors(grid).reduce(
      (count, cell) => (cell.isOccupied() ? count + 1 : count),
      0
    );
  }

  next(_grid) {
    throw new Error("not implemented");
  }
}

class EmptySeat extends Cell {
  next(grid) {
    return this.countOccupiedNeighbors(grid) > 0
      ? this
      : new OccupiedSeat(this);
  }
}

class OccupiedSeat extends Cell {
  isOccupied() {
    return true;
  }

  next(grid) {
    return this.countOccupiedNeighbors(grid) < 4 ? this : new EmptySeat(this);
  }
}

class Floor extends Cell {
  next(_grid) {
    return this;
  }
}

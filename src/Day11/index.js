import { input } from "./input";
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
  const seats = useSeats(1);
  while (seats.step());
  const result = seats.countPeople();

  return <div>Part 1: {result}</div>;
}

function Solution2() {
  const seats = useSeats(2);
  while (seats.step());
  const result = seats.countPeople();

  return <div>Part 2: {result}</div>;
}

const DELTAS = [-1, 0, 1];

class Seats {
  constructor(input) {
    this.seats = input.split(/\n/).reduce(
      (allSeats, line, y) =>
        line
          .trim()
          .split("")
          .reduce((seats, c, x) => {
            if (c === "L") {
              seats.set(this.keyFor({ x, y }), { x, y, occupied: false });
            } else if (c === "#") {
              seats.set(this.keyFor({ x, y }), { x, y, occupied: true });
            }
            return seats;
          }, allSeats),
      new Map()
    );
  }

  toString() {
    let s = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const seat = this.get({ x, y });

        if (!seat) {
          s = s.concat(".");
        } else if (seat.occupied) {
          s = s.concat("#");
        } else {
          s = s.concat("L");
        }
      }

      s = s.concat("\n");
    }

    return s;
  }

  step() {
    let dirty = false;
    const newSeats = new Map();

    for (let seat of this.seats.values()) {
      const newSeat = this.stepSeat(seat);
      newSeats.set(this.keyFor(newSeat), newSeat);
      if (newSeat !== seat) dirty = true;
    }

    this.seats = newSeats;
    return dirty;
  }

  stepSeat(seat) {
    const occupiedNeighborsCount = this.occupiedNeighbors(seat).length;
    if (seat.occupied) {
      return occupiedNeighborsCount < this.tooManyNeighborsCount()
        ? seat
        : { ...seat, occupied: false };
    } else {
      return occupiedNeighborsCount > 0 ? seat : { ...seat, occupied: true };
    }
  }

  countPeople() {
    return Array.from(this.seats.values()).reduce(
      (count, { occupied }) => (occupied ? count + 1 : count),
      0
    );
  }

  tooManyNeighborsCount() {
    return 4;
  }

  occupiedNeighbors(targetSeat) {
    const { x, y } = targetSeat;
    return DELTAS.flatMap((dy) =>
      DELTAS.flatMap((dx) => {
        if (dx === 0 && dy === 0) return [];
        const seat = this.nearestNeighbor({ x, y, dx, dy });
        return seat && seat.occupied ? [seat] : [];
      })
    );
  }

  nearestNeighbor({ x, y, dx, dy }) {
    return this.get({ x: x + dx, y: y + dy });
  }

  keyFor({ x, y }) {
    return JSON.stringify({ x, y });
  }

  get(coords) {
    return this.seats.get(this.keyFor(coords));
  }

  get width() {
    if (this._width !== undefined) return this._width;
    return (this._width =
      Array.from(this.seats.values()).sort(({ x: a }, { x: b }) => b - a)[0].x +
      1);
  }

  get height() {
    if (this._height !== undefined) return this._height;
    return (this._height =
      Array.from(this.seats.values()).sort(({ y: a }, { y: b }) => b - a)[0].y +
      1);
  }
}

class UpdatedSeats extends Seats {
  tooManyNeighborsCount() {
    return 5;
  }

  nearestNeighbor({ x, y, dx, dy }) {
    for (
      let nx = x + dx, ny = y + dy;
      nx < this.width && nx >= 0 && ny < this.height && ny >= 0;
      nx += dx, ny += dy
    ) {
      const seat = this.get({ x: nx, y: ny });
      if (seat) return seat;
    }
  }
}

function useSeats(part) {
  const { puzzleInput } = usePuzzleInput();
  return part === 2 ? new UpdatedSeats(puzzleInput) : new Seats(puzzleInput);
}

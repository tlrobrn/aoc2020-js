import input from "./input";
import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day5() {
  return (
    <PuzzleInputProvider defaultInput={input}>
      <h1>Day 5</h1>
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
  const seats = useSeats();
  const result = seats[seats.length - 1];

  return <div>Part 1: {result.id}</div>;
}

function Solution2() {
  const seats = useSeats();
  let result = null;
  for (let i = 1; i < seats.length; ++i) {
    if (seats[i - 1].id === seats[i].id - 2) {
      result = seats[i].id - 1;
      break;
    }
  }

  return <div>Part 2: {result}</div>;
}

function useSeats() {
  const { puzzleInput } = usePuzzleInput();
  return puzzleInput.split(/\n/).map(decode).sort(compareSeatId);
}

function compareSeatId({ id: a }, { id: b }) {
  return a - b;
}

function decode(seat) {
  const row = decodeRow(seat.slice(0, 7));
  const column = decodeColumn(seat.slice(7));
  return { id: 8 * row + column, row, column };
}

function decodeRow(encodedRow) {
  const [row] = encodedRow.split("").reduce(
    ([low, high], c) => {
      const mid = Math.floor((high + low) / 2);
      if (c === "F") {
        return [low, mid];
      } else {
        return [mid + 1, high];
      }
    },
    [0, 127]
  );

  return row;
}

function decodeColumn(encodedColumn) {
  const [column] = encodedColumn.split("").reduce(
    ([low, high], c) => {
      const mid = Math.floor((high + low) / 2);
      if (c === "L") {
        return [low, mid];
      } else {
        return [mid + 1, high];
      }
    },
    [0, 7]
  );
  return column;
}

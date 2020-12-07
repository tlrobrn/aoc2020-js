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
      <Solutions />
    </PuzzleInputProvider>
  );
}

function Solutions() {
  const seats = useSeats();
  return (
    <>
      <div>
        <Solution seats={seats} />
      </div>
      <div>
        <Solution2 seats={seats} />
      </div>
    </>
  );
}

function Solution({ seats }) {
  const result = seats[seats.length - 1];

  return <div>Part 1: {result.id}</div>;
}

function Solution2({ seats }) {
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
  const row = decodeBinary({
    value: seat.slice(0, 7),
    range: [0, 127],
    lowForChar: "F",
  });
  const column = decodeBinary({
    value: seat.slice(7),
    range: [0, 7],
    lowForChar: "L",
  });
  return { id: 8 * row + column, row, column };
}

function decodeBinary({ value, range, lowForChar }) {
  const [n] = value.split("").reduce(([low, high], c) => {
    const mid = Math.floor((high + low) / 2);
    if (c === lowForChar) {
      return [low, mid];
    } else {
      return [mid + 1, high];
    }
  }, range);
  return n;
}

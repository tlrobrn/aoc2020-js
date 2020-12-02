import input from "./input";
import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day1() {
  return (
    <PuzzleInputProvider defaultInput={input}>
      <h1>Day 1</h1>
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
  const result = findNumber(puzzleInput) || "not yet found";

  return <div>Part 1: {result}</div>;
}

function Solution2() {
  const { puzzleInput } = usePuzzleInput();
  const result = findNumber2(puzzleInput) || "not yet found";

  return <div>Part 2: {result}</div>;
}

function findNumber(input) {
  const seen = new Set();
  return input.split(/\s+/).reduce((result, w) => {
    if (result) return result;

    const n = parseInt(w, 10);
    const m = 2020 - n;
    if (seen.has(m)) return n * m;
    seen.add(n);

    return null;
  }, null);
}

function findNumber2(input) {
  const sums = new Map();
  return input.split(/\s+/).reduce((result, w) => {
    if (result) return result;

    const n = parseInt(w, 10);
    sums.forEach((parts, total) => {
      if (parts.length === 3) return;

      sums.set(total + n, [...parts, n]);
    });
    sums.set(n, [n]);

    const candidate = sums.get(2020) || [];

    return candidate.length === 3 ? candidate.reduce((m, x) => m * x) : null;
  }, null);
}

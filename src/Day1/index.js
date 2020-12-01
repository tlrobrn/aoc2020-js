import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day1() {
  return (
    <PuzzleInputProvider>
      <h1>Day 1</h1>
      <PuzzleInputForm />
      <div>
        <Solution />
      </div>
    </PuzzleInputProvider>
  );
}

function Solution() {
  const { puzzleInput } = usePuzzleInput();
  const result = findNumber(puzzleInput) || "not yet found";

  return <div>{result}</div>;
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

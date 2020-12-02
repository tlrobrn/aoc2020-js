import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day2() {
  return (
    <PuzzleInputProvider>
      <h1>Day 2</h1>
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
  const result = puzzleInput.split(/\n/).reduce((count, line) => {
    const [policy, password] = line.trim().split(": ", 2);
    const [counts, letter] = policy.split(/\s+/);
    const [min, max] = counts.split("-");
    const re = new RegExp(
      `^[^${letter}]*(${letter}[^${letter}]*){${min},${max}}[^${letter}]*$`
    );
    return count + re.test(password);
  }, 0);

  return <div>Part 1: {result}</div>;
}

function Solution2() {
  return null;
}

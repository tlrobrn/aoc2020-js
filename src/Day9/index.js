import input from "./input";
import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day9() {
  return (
    <PuzzleInputProvider defaultInput={input}>
      <h1>Day 9</h1>
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
  const numbers = useNumbers();
  const result = findInvalid(numbers);

  return <div>Part 1: {result}</div>;
}

function Solution2() {
  const numbers = useNumbers();
  const target = findInvalid(numbers);
  const sequence = findSequence(numbers, target).sort();
  const result = sequence[0] + sequence[sequence.length - 1];

  return <div>Part 2: {result}</div>;
}

function useNumbers() {
  const { puzzleInput } = usePuzzleInput();
  return puzzleInput.split(/\n/).map((s) => parseInt(s, 10));
}

function findInvalid(numbers, { preambleLength = 25 } = {}) {
  for (let index = preambleLength; index < numbers.length; index++) {
    if (!findPair(numbers, { start: index - preambleLength, end: index })) {
      return numbers[index];
    }
  }
}

function findPair(numbers, { start, end }) {
  const seen = new Set();
  const target = numbers[end];
  for (let i = start; i < end; i++) {
    const n = numbers[i];
    const m = target - n;
    if (seen.has(m)) return true;
    seen.add(n);
  }
  return false;
}

function findSequence(numbers, target) {
  let start = 0;
  let end = 2;
  let sum = numbers[0] + numbers[1];
  while (sum !== target) {
    if (sum > target) {
      sum -= numbers[start];
      start++;
    } else {
      sum += numbers[end];
      end++;
    }
  }

  return numbers.slice(start, end);
}

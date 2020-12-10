import input from "./input";
import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day10() {
  return (
    <PuzzleInputProvider defaultInput={input}>
      <h1>Day 10</h1>
      <PuzzleInputForm />
      <Solutions />
    </PuzzleInputProvider>
  );
}

function Solutions() {
  const numbers = useSortedNumbers();
  return (
    <>
      <div>
        <Solution numbers={numbers} />
      </div>
      <div>
        <Solution2 numbers={numbers} />
      </div>
    </>
  );
}

function Solution({ numbers }) {
  const counts = countDifferences(numbers);
  const result = counts.get(1) * counts.get(3);

  return <div>Part 1: {result}</div>;
}

function Solution2({ numbers }) {
  const result = countPaths(numbers);

  return <div>Part 2: {result}</div>;
}

function useSortedNumbers() {
  const { puzzleInput } = usePuzzleInput();
  const numbers = puzzleInput.split(/\n/).map((s) => parseInt(s.trim(), 10));
  return numbers.sort((a, b) => a - b);
}

function countDifferences(numbers) {
  const edgeCounts =
    numbers[0] === 3
      ? [[3, 2]]
      : [
          [3, 1],
          [numbers[0], 1],
        ];
  const differenceCounts = new Map(edgeCounts);
  for (let i = 1; i < numbers.length; i++) {
    const difference = numbers[i] - numbers[i - 1];
    differenceCounts.set(
      difference,
      (differenceCounts.get(difference) || 0) + 1
    );
  }
  return differenceCounts;
}

function countPaths(numbers) {
  const graph = [0, ...numbers, numbers[numbers.length - 1] + 3];
  const counts = Array.from({ length: graph.length }).map(() => 0);
  const target = graph.length - 1;
  counts[target] = 1;
  const queue = indicesWithPathsTo(graph, target);
  while (queue.length > 0) {
    const next = queue.shift();
    if (counts[next] === 0) {
      counts[next] = indicesWithPathsFrom(graph, next).reduce(
        (total, i) => total + counts[i],
        0
      );
      queue.push(...indicesWithPathsTo(graph, next));
    }
  }

  return counts[0];
}

function indicesWithPathsFrom(graph, index) {
  const node = graph[index];
  return [index + 1, index + 2, index + 3].flatMap((i) => {
    const candidate = graph[i];
    return candidate !== undefined && candidate - node <= 3 ? [i] : [];
  });
}

function indicesWithPathsTo(graph, index) {
  const node = graph[index];
  return [index - 1, index - 2, index - 3].flatMap((i) => {
    const candidate = graph[i];
    return candidate !== undefined && node - candidate <= 3 ? [i] : [];
  });
}

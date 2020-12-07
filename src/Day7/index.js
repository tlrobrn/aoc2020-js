import input from "./input";
import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day7() {
  return (
    <PuzzleInputProvider defaultInput={input}>
      <h1>Day 7</h1>
      <PuzzleInputForm />
      <Solutions />
    </PuzzleInputProvider>
  );
}

function Solutions() {
  const graph = useGraph();
  return (
    <>
      <div>
        <Solution graph={graph} />
      </div>
      <div>
        <Solution2 graph={graph} />
      </div>
    </>
  );
}

function Solution({ graph }) {
  const result = bagsContaining({ graph, targets: ["shiny gold"] }).length;

  return <div>Part 1: {result}</div>;
}

function Solution2({ graph }) {
  const result = bagCount({ graph, bags: ["shiny gold"] });

  return <div>Part 2: {result}</div>;
}

function useGraph() {
  const { puzzleInput } = usePuzzleInput();
  return puzzleInput.split(/\s*\n\s*/).flatMap(buildEdge);
}

const TO_REGEX = /^\s*(?<count>\d+)\s+(?<to>.*)\s+bag/;

function buildEdge(line) {
  const [from, tos] = line.split(" bags contain ");
  if (tos === "no other bags." || tos === undefined) return [[from]];
  return tos.split(", ").map((toDesc) => {
    const match = TO_REGEX.exec(toDesc);
    if (!match) throw new Error("could not match: " + toDesc);
    return [from, match.groups.to, parseInt(match.groups.count, 10)];
  });
}

function bagsContaining({ graph, targets, currentBagsFound = [] }) {
  if (targets.length === 0) return currentBagsFound;

  const newBagsFound = Array.from(
    new Set(
      graph.flatMap(([from, to]) =>
        targets.includes(to) && !currentBagsFound.includes(from) ? [from] : []
      )
    )
  );

  return bagsContaining({
    graph,
    targets: newBagsFound,
    currentBagsFound: currentBagsFound.concat(newBagsFound),
  });
}

function bagCount({ graph, bags, count = 0 }) {
  if (bags.length === 0) return count;

  const newBags = bags.flatMap((bag) =>
    graph.flatMap(([from, to = null, count = 0]) => {
      if (from !== bag) return [];
      return Array(count).fill(to);
    })
  );
  return bagCount({ graph, bags: newBags, count: count + newBags.length });
}

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
  const result = graph.length;

  return <div>Part 2: {result}</div>;
}

function useGraph() {
  const { puzzleInput } = usePuzzleInput();
  return puzzleInput.split(/\s*\n\s*/).flatMap(buildEdge);
}

const TO_REGEX = /^\s*(?<count>\d+)\s+(?<to>.*)\s+bag/;

function buildEdge(line) {
  const [from, tos] = line.split(" bags contain ");
  if (tos === "no other bags.") return [[from]];
  return tos.split(", ").map((toDesc) => {
    const match = TO_REGEX.exec(toDesc);
    if (!match) throw new Error("could not match: " + toDesc);
    return [from, match.groups.to, match.groups.count];
  });
}

function bagsContaining({ graph, targets, currentBagsFound = [] }) {
  if (targets.length === 0) return currentBagsFound;

  const newBagsFound = graph.flatMap(([from, to]) =>
    targets.includes(to) ? [from] : []
  );

  return bagsContaining({
    graph,
    targets: newBagsFound.filter((bag) => !currentBagsFound.includes(bag)),
    currentBagsFound: Array.from(
      new Set(currentBagsFound.concat(newBagsFound))
    ),
  });
}

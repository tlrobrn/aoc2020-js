import input from "./input";
import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day6() {
  return (
    <PuzzleInputProvider defaultInput={input}>
      <h1>Day 6</h1>
      <PuzzleInputForm />
      <Solutions />
    </PuzzleInputProvider>
  );
}

function Solutions() {
  const groups = useGroups();
  return (
    <>
      <div>
        <Solution groups={groups} />
      </div>
      <div>
        <Solution2 groups={groups} />
      </div>
    </>
  );
}

function Solution({ groups }) {
  const result = groups.reduce((sum, group) => sum + group.anyCount(), 0);

  return <div>Part 1: {result}</div>;
}

function Solution2({ groups }) {
  const result = groups.reduce((sum, group) => sum + group.allCount(), 0);

  return <div>Part 2: {result}</div>;
}

function useGroups() {
  const { puzzleInput } = usePuzzleInput();
  return puzzleInput.split(/\n\s*\n/).map((input) => new Group(input));
}

class Group {
  constructor(input) {
    this.parse(input);
  }

  parse(input) {
    const people = input.split(/\n/);
    this.length = people.length;
    this.answerCounts = people.reduce((answers, person) => {
      const yesAnswers = person.split("");
      return yesAnswers.reduce((counts, answer) => {
        const currentCount = counts.get(answer) || 0;
        return counts.set(answer, currentCount + 1);
      }, answers);
    }, new Map());
  }

  anyCount() {
    return this.answerCounts.size;
  }

  allCount() {
    return Array.from(this.answerCounts.values()).reduce(
      (sum, count) => (count === this.length ? sum + 1 : sum),
      0
    );
  }
}

import input from "./input";
import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day2() {
  return (
    <PuzzleInputProvider defaultInput={input}>
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

const PARSER = /^(?<min>\d+)-(?<max>\d+) (?<letter>.): (?<password>.*)$/;

function Solution() {
  const { puzzleInput } = usePuzzleInput();
  const result = puzzleInput.split(/\n/).reduce((count, line) => {
    const match = PARSER.exec(line);
    if (!match || !match.groups) return count;

    const {
      groups: { min, max, letter, password },
    } = match;
    const re = new RegExp(
      `^[^${letter}]*(${letter}[^${letter}]*){${min},${max}}[^${letter}]*$`
    );
    return count + re.test(password);
  }, 0);

  return <div>Part 1: {result}</div>;
}

function Solution2() {
  const { puzzleInput } = usePuzzleInput();
  const result = puzzleInput.split(/\n/).reduce((count, line) => {
    const match = PARSER.exec(line);
    if (!match || !match.groups) return count;

    const {
      groups: { min, max, letter, password },
    } = match;

    return (
      count + ((password[min - 1] === letter) ^ (password[max - 1] === letter))
    );
  }, 0);

  return <div>Part 2: {result}</div>;
}

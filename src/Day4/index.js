import input from "./input";
import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day4() {
  return (
    <PuzzleInputProvider defaultInput={input}>
      <h1>Day 4</h1>
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
  const passports = puzzleInput
    .split(/\n\s*\n/)
    .map((input) => new Passport(input));

  const result = passports.filter((passport) => passport.isValid()).length;

  return <div>Part 1: {result}</div>;
}

function Solution2() {
  const { puzzleInput } = usePuzzleInput();

  return <div>Part 2: {puzzleInput.length}</div>;
}

class Passport {
  static requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  constructor(input) {
    this.parse(input);
  }

  parse(input) {
    this.fields = input.split(/\s+/).reduce((fields, entry) => {
      const [tag, value] = entry.split(":");
      fields.set(tag, value);
      return fields;
    }, new Map());
  }

  isValid() {
    return Passport.requiredFields.every((field) => this.fields.has(field));
  }
}

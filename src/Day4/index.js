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
      <Solutions />
    </PuzzleInputProvider>
  );
}

function Solutions() {
  const passports = usePassports();
  return (
    <>
      <div>
        <Solution passports={passports} />
      </div>
      <div>
        <Solution2 passports={passports} />
      </div>
    </>
  );
}

function Solution({ passports }) {
  const result = passports.filter((passport) => passport.isComplete()).length;

  return <div>Part 1: {result}</div>;
}

function Solution2({ passports }) {
  const result = passports.filter((passport) => passport.isValid()).length;

  return <div>Part 2: {result}</div>;
}

function usePassports() {
  const { puzzleInput } = usePuzzleInput();
  return puzzleInput.split(/\n\s*\n/).map((input) => new Passport(input));
}

class Passport {
  static requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  constructor(input) {
    this.parse(input);
  }

  parse(input) {
    this.fields = input.split(/\s+/).reduce((fields, entry) => {
      const [tag, value] = entry.split(":");
      fields.set(tag, Field.for({ tag, value }));
      return fields;
    }, new Map());
  }

  isComplete() {
    return Passport.requiredFields.every((field) => this.fields.has(field));
  }

  isValid() {
    return Passport.requiredFields.every(
      (field) => this.fields.has(field) && this.fields.get(field).isValid()
    );
  }
}

class Field {
  static for({ tag, value }) {
    switch (tag) {
      case "byr":
        return new ByrField(value);
      case "iyr":
        return new IyrField(value);
      case "eyr":
        return new EyrField(value);
      case "hgt":
        return new HgtField(value);
      case "hcl":
        return new HclField(value);
      case "ecl":
        return new EclField(value);
      case "pid":
        return new PidField(value);
      default:
        return new Field(value);
    }
  }

  constructor(value) {
    this.value = this.parseValue(value);
  }

  isValid() {
    return false;
  }

  parseValue = (v) => v;
}

class IntField extends Field {
  parseValue = (v) => parseInt(v, 10);
}

class ByrField extends IntField {
  isValid() {
    return this.value >= 1920 && this.value <= 2002;
  }
}

class IyrField extends IntField {
  isValid() {
    return this.value >= 2010 && this.value <= 2020;
  }
}

class EyrField extends IntField {
  isValid() {
    return this.value >= 2020 && this.value <= 2030;
  }
}

class HgtField extends Field {
  static PARSER = /^(?<inches>\d+)in|(?<centimeters>\d+)cm$/;

  isValid() {
    const match = HgtField.PARSER.exec(this.value);
    return match && this.validateMeasurement(match.groups);
  }

  validateMeasurement({ inches, centimeters }) {
    if (inches) {
      const n = parseInt(inches, 10);
      return n >= 59 && n <= 76;
    }
    if (centimeters) {
      const n = parseInt(centimeters, 10);
      return n >= 150 && n <= 193;
    }

    return false;
  }
}

class HclField extends Field {
  static PARSER = /^#[0-9a-fA-F]{6}$/;

  isValid() {
    return HclField.PARSER.test(this.value);
  }
}

class EclField extends Field {
  static PARSER = /^amb|blu|brn|gry|grn|hzl|oth$/;

  isValid() {
    return EclField.PARSER.test(this.value);
  }
}

class PidField extends Field {
  static PARSER = /^\d{9}$/;

  isValid() {
    return PidField.PARSER.test(this.value);
  }
}

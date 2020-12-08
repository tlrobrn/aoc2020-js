import input from "./input";
import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day8() {
  return (
    <PuzzleInputProvider defaultInput={input}>
      <h1>Day 8</h1>
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
  const computer = useComputer();
  const result = computer.run().accumulator;

  return <div>Part 1: {result}</div>;
}

function Solution2() {
  const computer = useComputer();
  const result = debugComputer(computer);

  return <div>Part 2: {result}</div>;
}

function useComputer() {
  const { puzzleInput } = usePuzzleInput();
  return new Computer(parse(puzzleInput));
}

class Computer {
  constructor(instructions) {
    this.instructions = instructions;
    this.instructionPtr = 0;
    this.accumulator = 0;
  }

  step() {
    const instruction = this.instructions[this.instructionPtr];
    const { accumulator, instructionPtr } = instruction.evaluate(this);
    this.accumulator = accumulator;
    this.instructionPtr = instructionPtr;
    return this;
  }

  run() {
    const seen = new Set();
    while (!this.completed() && !seen.has(this.instructionPtr)) {
      seen.add(this.instructionPtr);
      this.step();
    }
    return this;
  }

  completed = () => this.instructionPtr === this.instructions.length;
}

class Instruction {
  static PARSER = /^(?<operation>\w+)\s(?<argument>[+-]\d+)$/;
  static for(line) {
    const match = Instruction.PARSER.exec(line);
    if (!match) {
      console.error(`could not parse ${line}`);
      return new Instruction("0");
    }

    const {
      groups: { operation, argument },
    } = match;

    switch (operation) {
      case "acc":
        return new AccInstruction(argument);
      case "jmp":
        return new JmpInstruction(argument);
      case "nop":
      default:
        return new Instruction(argument);
    }
  }

  constructor(argument) {
    this.argument = parseInt(argument, 10);
  }

  evaluate({ accumulator, instructionPtr }) {
    return { accumulator, instructionPtr: instructionPtr + 1 };
  }

  swap() {
    return new JmpInstruction(this.argument);
  }
}

class AccInstruction extends Instruction {
  evaluate({ accumulator, instructionPtr }) {
    return {
      accumulator: accumulator + this.argument,
      instructionPtr: instructionPtr + 1,
    };
  }

  swap() {
    return this;
  }
}

class JmpInstruction extends Instruction {
  evaluate({ accumulator, instructionPtr }) {
    return {
      accumulator,
      instructionPtr: instructionPtr + this.argument,
    };
  }

  swap() {
    return new Instruction(this.argument);
  }
}

function parse(input) {
  return input.split(/\n/).map(Instruction.for);
}

function debugComputer({ instructions }) {
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    if (instruction instanceof AccInstruction) continue;

    instructions[i] = instruction.swap();
    const computer = new Computer(instructions);
    computer.run();
    instructions[i] = instruction;

    if (computer.completed()) return computer.accumulator;
  }
}

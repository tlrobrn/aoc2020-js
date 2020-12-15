import { input } from "./input";
import {
  PuzzleInputProvider,
  PuzzleInputForm,
  usePuzzleInput,
} from "../PuzzleInput";

export default function Day12() {
  return (
    <PuzzleInputProvider defaultInput={input}>
      <h1>Day 12</h1>
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
  const instructions = useInstructions();
  const ship = new Ship();
  ship.performManuever(instructions);
  const result = manhattenDistance(ship);

  return <div>Part 1: {result}</div>;
}

function Solution2() {
  const result = "todo";

  return <div>Part 2: {result}</div>;
}

function useInstructions() {
  const { puzzleInput } = usePuzzleInput();
  return puzzleInput.split(/\n/).map((line) => Instruction.parse(line));
}

function manhattenDistance({ position: { x, y } }) {
  return Math.abs(x) + Math.abs(y);
}

class Instruction {
  static parse(line) {
    const [action, value] = [line[0], parseInt(line.slice(1), 10)];
    switch (action) {
      case "N":
        return new North(value);
      case "S":
        return new South(value);
      case "E":
        return new East(value);
      case "W":
        return new West(value);
      case "L":
        return new Left(value);
      case "R":
        return new Right(value);
      case "F":
        return new Forward(value);
      default:
        throw new Error(`invalid action: ${action}`);
    }
  }

  constructor(value) {
    this.value = value;
  }

  apply() {
    throw new Error("not implemented");
  }
}

class North extends Instruction {
  apply(ship) {
    ship.position.y += this.value;
  }
}

class South extends Instruction {
  apply(ship) {
    ship.position.y -= this.value;
  }
}

class East extends Instruction {
  apply(ship) {
    ship.position.x += this.value;
  }
}

class West extends Instruction {
  apply(ship) {
    ship.position.x -= this.value;
  }
}

class Left extends Instruction {
  apply(ship) {
    ship.heading += this.value;
  }
}

class Right extends Instruction {
  apply(ship) {
    ship.heading -= this.value;
  }
}

class Forward extends Instruction {
  apply(ship) {
    ship.position.x += this.value * cos(ship.heading);
    ship.position.y += this.value * sin(ship.heading);
  }
}

function radians(degrees) {
  return (degrees * Math.PI) / 180;
}
function cos(degrees) {
  return Math.round(Math.cos(radians(degrees)));
}
function sin(degrees) {
  return Math.round(Math.sin(radians(degrees)));
}

class Ship {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.heading = 0;
  }

  performManuever(instructions) {
    instructions.forEach((instruction) => instruction.apply(this));
  }
}

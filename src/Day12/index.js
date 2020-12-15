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
  const ship = new Ship({ x: 1, y: 0 });
  ship.performManuever(instructions);
  const result = manhattenDistance(ship);

  return <div>Part 1: {result}</div>;
}

function Solution2() {
  const instructions = useInstructions();
  const ship = new WaypointShip({ x: 10, y: 1 });
  ship.performManuever(instructions);
  const result = manhattenDistance(ship);

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
    ship.applyTo.y += this.value;
  }
}

class South extends Instruction {
  apply(ship) {
    ship.applyTo.y -= this.value;
  }
}

class East extends Instruction {
  apply(ship) {
    ship.applyTo.x += this.value;
  }
}

class West extends Instruction {
  apply(ship) {
    ship.applyTo.x -= this.value;
  }
}

class Left extends Instruction {
  apply(ship) {
    const c = cos(this.value);
    const s = sin(this.value);
    const { x, y } = ship.waypoint;

    const newX = x * c - y * s;
    const newY = x * s + y * c;

    ship.waypoint = { x: newX, y: newY };
  }
}

class Right extends Instruction {
  apply(ship) {
    const c = cos(this.value);
    const s = sin(this.value);
    const { x, y } = ship.waypoint;

    const newX = x * c + y * s;
    const newY = -x * s + y * c;

    ship.waypoint = { x: newX, y: newY };
  }
}

class Forward extends Instruction {
  apply(ship) {
    ship.position.x += this.value * ship.waypoint.x;
    ship.position.y += this.value * ship.waypoint.y;
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
  constructor(waypoint) {
    this.position = { x: 0, y: 0 };
    this.waypoint = { ...waypoint };
  }

  performManuever(instructions) {
    instructions.forEach((instruction) => instruction.apply(this));
  }

  get applyTo() {
    return this.position;
  }
}

class WaypointShip extends Ship {
  get applyTo() {
    return this.waypoint;
  }
}

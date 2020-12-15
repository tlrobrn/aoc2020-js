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
  const instructions = useWaypointInstructions();
  const ship = new WaypointShip({ x: 10, y: 1 });
  ship.performManuever(instructions);
  const result = manhattenDistance(ship);

  return <div>Part 2: {result}</div>;
}

function useInstructions() {
  const { puzzleInput } = usePuzzleInput();
  return puzzleInput.split(/\n/).map((line) => Instruction.parse(line));
}

function useWaypointInstructions() {
  const { puzzleInput } = usePuzzleInput();
  return puzzleInput.split(/\n/).map((line) => WaypointInstruction.parse(line));
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

class WaypointInstruction {
  static parse(line) {
    const [action, value] = [line[0], parseInt(line.slice(1), 10)];
    switch (action) {
      case "N":
        return new WaypointNorth(value);
      case "S":
        return new WaypointSouth(value);
      case "E":
        return new WaypointEast(value);
      case "W":
        return new WaypointWest(value);
      case "L":
        return new WaypointLeft(value);
      case "R":
        return new WaypointRight(value);
      case "F":
        return new WaypointForward(value);
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

class WaypointNorth extends Instruction {
  apply(ship) {
    ship.waypoint.y += this.value;
  }
}

class WaypointSouth extends Instruction {
  apply(ship) {
    ship.waypoint.y -= this.value;
  }
}

class WaypointEast extends Instruction {
  apply(ship) {
    ship.waypoint.x += this.value;
  }
}

class WaypointWest extends Instruction {
  apply(ship) {
    ship.waypoint.x -= this.value;
  }
}

class WaypointLeft extends Instruction {
  apply(ship) {
    const c = cos(this.value);
    const s = sin(this.value);
    const { x, y } = ship.waypoint;

    const newX = x * c - y * s;
    const newY = x * s + y * c;

    ship.waypoint = { x: newX, y: newY };
  }
}

class WaypointRight extends Instruction {
  apply(ship) {
    const c = cos(this.value);
    const s = sin(this.value);
    const { x, y } = ship.waypoint;

    const newX = x * c + y * s;
    const newY = -x * s + y * c;

    ship.waypoint = { x: newX, y: newY };
  }
}

class WaypointForward extends Instruction {
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

class Manueverable {
  performManuever(instructions) {
    instructions.forEach((instruction) => instruction.apply(this));
  }
}

class Ship extends Manueverable {
  constructor() {
    super();
    this.position = { x: 0, y: 0 };
    this.heading = 0;
  }
}

class WaypointShip extends Manueverable {
  constructor(waypoint) {
    super();
    this.position = { x: 0, y: 0 };
    this.waypoint = { ...waypoint };
  }
}

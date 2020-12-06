import { createContext, useContext, useState } from "react";
import { node, string } from "prop-types";

const PuzzleInputContext = createContext();

PuzzleInputProvider.propTypes = {
  children: node,
  defaultInput: string,
};
export function PuzzleInputProvider({ children, defaultInput = "" }) {
  const [puzzleInput, setPuzzleInput] = useState(defaultInput);
  return (
    <PuzzleInputContext.Provider value={{ puzzleInput, setPuzzleInput }}>
      <div className="p-2 m-2 rounded shadow-md bg-gray-50">{children}</div>
    </PuzzleInputContext.Provider>
  );
}

export function usePuzzleInput() {
  return useContext(PuzzleInputContext);
}

export function PuzzleInputForm() {
  const { puzzleInput, setPuzzleInput } = usePuzzleInput();
  return (
    <div>
      <label htmlFor="puzzleInput">Puzzle Input:</label>
      <textarea
        id="puzzleInput"
        name="puzzleInput"
        value={puzzleInput}
        onChange={(e) => setPuzzleInput(e.target.value)}
      />
    </div>
  );
}

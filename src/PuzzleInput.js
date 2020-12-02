import { createContext, useContext, useState } from "react";
import { node } from "prop-types";

const PuzzleInputContext = createContext();

PuzzleInputProvider.propTypes = {
  children: node,
};
export function PuzzleInputProvider({ children }) {
  const [puzzleInput, setPuzzleInput] = useState("");
  return (
    <PuzzleInputContext.Provider value={{ puzzleInput, setPuzzleInput }}>
      {children}
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

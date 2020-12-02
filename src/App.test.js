import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Advent of Code 2020/i);
  expect(linkElement).toBeInTheDocument();
});

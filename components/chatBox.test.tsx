import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ChatBox from "./ChatBox";

test("renders ChatBox with AI response", () => {
  render(<ChatBox />);
  expect(screen.getByText("Hello AI")).toBeInTheDocument();
  expect(screen.getByText("Test response from AI")).toBeInTheDocument();
});
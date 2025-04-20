// __tests__/chatBox.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChatBox from "../components/ChatBox";

jest.mock("../lib/groq", () => ({
  askGroq: jest.fn(() => Promise.resolve("Test response from AI")),
}));

describe("ChatBox", () => {
  it("renders input and sends message", async () => {
    render(<ChatBox />);

    const input = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(input, { target: { value: "Hello AI" } });

    const button = screen.getByRole("button", { name: /send/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Hello AI")).toBeInTheDocument();
      expect(screen.getByText("Test response from AI")).toBeInTheDocument();
    });
  });
});

import Header from "../../src/components/header";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Test Header", () => {
  it("it should render correctly", async () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Camden Public Planning Index" }));
  });
});

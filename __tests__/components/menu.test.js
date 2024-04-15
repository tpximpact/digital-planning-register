import Menu from "../../src/components/menu";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Test Menu", () => {
  it("it should render correctly", async () => {
    render(<Menu />);
    expect(screen.getByRole("link", { Name: "Application Search" }));
  });
});

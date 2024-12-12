import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StartButton } from "@/components/StartButton";

describe("Button Component", () => {
  it("renders the start button element", () => {
    render(<StartButton type="submit"></StartButton>);
    const buttonElement = screen.getByText("Start now");
    expect(buttonElement).toContainHTML("svg");
    const svgElement = buttonElement.querySelector("svg");
    expect(svgElement).toHaveClass("govuk-button__start-icon");
  });
});

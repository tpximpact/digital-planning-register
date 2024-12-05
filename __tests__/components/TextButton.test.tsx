import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TextButton } from "@/components/TextButton";

describe("Button Component", () => {
  it("renders the default text button element", () => {
    render(<TextButton>Change</TextButton>);
    const buttonElement = screen.getByText("Change");
    expect(buttonElement).toHaveClass("dpr-text-button");
  });
  it("renders the text button element with the plain styling", () => {
    render(<TextButton variant="plain">Change</TextButton>);
    const buttonElement = screen.getByText("Change");
    expect(buttonElement).toHaveClass("dpr-text-button--plain");
  });
  it("renders the button as a link", () => {
    render(
      <TextButton element="link" href="/change">
        Change
      </TextButton>,
    );
    const buttonElement = screen.getByText("Change");
    expect(buttonElement).toHaveAttribute("href", "/change");
  });
});

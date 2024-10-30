import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "@/components/govuk/Button";
import { StartIcon } from "../../public/icons";

// Mock the StartIcon to simplify testing
jest.mock("../../public/icons", () => ({
  StartIcon: () => <svg data-testid="start-icon" />,
}));

describe("Button component", () => {
  it("renders correctly with default props", () => {
    render(<Button content="Click Me" className="govuk-button" />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("type", "button");
    expect(buttonElement).toHaveClass("govuk-button");
  });

  it("applies 'govuk-link button-link-change' class when variant is 'link'", () => {
    render(<Button content="Link Button" variant="link" />);
    const buttonElement = screen.getByRole("button", { name: /link button/i });
    expect(buttonElement).toHaveClass("govuk-link button-link-change");
  });

  it("applies 'govuk-button--start' class and renders StartIcon when variant is 'start'", () => {
    render(<Button content="Start" variant="start" />);
    const buttonElement = screen.getByRole("button", { name: /start/i });
    expect(buttonElement).toHaveClass("govuk-button govuk-button--start");
    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
  });

  it("accepts a custom class name", () => {
    render(<Button content="Custom Button" className="custom-class" />);
    const buttonElement = screen.getByRole("button", {
      name: /custom button/i,
    });
    expect(buttonElement).toHaveClass("custom-class");
  });

  it("calls onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button content="Clickable" onClick={onClickMock} />);
    const buttonElement = screen.getByRole("button", { name: /clickable/i });
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("renders with 'aria-label' when provided", () => {
    render(<Button content="Aria Button" ariaLabel="Custom Aria Label" />);
    const buttonElement = screen.getByRole("button", {
      name: /custom aria label/i,
    });
    expect(buttonElement).toHaveAttribute("aria-label", "Custom Aria Label");
  });

  it("renders with the correct button type", () => {
    render(<Button content="Submit Button" type="submit" />);
    const buttonElement = screen.getByRole("button", {
      name: /submit button/i,
    });
    expect(buttonElement).toHaveAttribute("type", "submit");
  });
});

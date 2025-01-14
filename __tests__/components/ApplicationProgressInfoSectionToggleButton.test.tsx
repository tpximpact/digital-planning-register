import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ApplicationProgressInfoToggleButton } from "@/components/ApplicationProgressInfo/ApplicationProgressInfoToggleButton";

describe("ApplicationProgressInfoToggleButton", () => {
  const defaultProps = {
    showText: "Show",
    hideText: "Hide",
    textContinued: "all sections",
    title: "Click to expand all sections",
    openAll: false,
  };

  it("renders correctly as a static div", () => {
    render(
      <ApplicationProgressInfoToggleButton {...defaultProps} isStatic={true} />,
    );

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveClass("dpr-progress-info__toggle-button");
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(toggleButton).toHaveTextContent("Hide all sections");
  });

  it("renders correctly as a button", () => {
    render(
      <ApplicationProgressInfoToggleButton
        {...defaultProps}
        isStatic={false}
      />,
    );

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveClass("dpr-progress-info__toggle-button");
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(toggleButton).toHaveTextContent("Hide all sections");
  });

  it("calls toggleAll when clicked", () => {
    const toggleAll = jest.fn();
    render(
      <ApplicationProgressInfoToggleButton
        {...defaultProps}
        toggleAll={toggleAll}
        isStatic={false}
      />,
    );

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);
    expect(toggleAll).toHaveBeenCalledTimes(1);
  });

  it("does not call toggleAll when isStatic is true", () => {
    const toggleAll = jest.fn();
    render(
      <ApplicationProgressInfoToggleButton
        {...defaultProps}
        toggleAll={toggleAll}
        isStatic={true}
      />,
    );

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);
    expect(toggleAll).not.toHaveBeenCalled();
  });

  it("displays the correct text based on openAll prop", () => {
    const { rerender } = render(
      <ApplicationProgressInfoToggleButton
        {...defaultProps}
        openAll={true}
        isStatic={false}
      />,
    );

    let toggleButton = screen.getByRole("button");
    expect(toggleButton).toHaveTextContent("Show all sections");

    rerender(
      <ApplicationProgressInfoToggleButton
        {...defaultProps}
        openAll={false}
        isStatic={false}
      />,
    );
    toggleButton = screen.getByRole("button");
    expect(toggleButton).toHaveTextContent("Hide all sections");
  });
});

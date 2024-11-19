import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tag } from "@/components/Tag";

describe("Render Tag", () => {
  it("should render the label", () => {
    render(<Tag label="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
  it("should render the positive class", () => {
    render(<Tag label="Test" sentiment="positive" />);
    expect(screen.getByText("Test")).toHaveClass("dpr-tag--positive");
  });
  it("should render the negative class", () => {
    render(<Tag label="Test" sentiment="negative" />);
    expect(screen.getByText("Test")).toHaveClass("dpr-tag--negative");
  });
  it("should render the neutral class", () => {
    render(<Tag label="Test" sentiment="neutral" />);
    expect(screen.getByText("Test")).toHaveClass("dpr-tag--neutral");
  });
  it("should render the none class", () => {
    render(<Tag label="Test" sentiment="bleh" />);
    expect(screen.getByText("Test")).toHaveClass("dpr-tag--none");
  });
  it("should render the none class", () => {
    render(<Tag label="Test" />);
    expect(screen.getByText("Test")).toHaveClass("dpr-tag--none");
  });
  it("should render the inline class", () => {
    render(<Tag label="Test" isInline={true} />);
    expect(screen.getByText("Test")).toHaveClass("dpr-tag--inline");
  });
});

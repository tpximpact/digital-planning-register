import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PreSubmission from "@/components/comment_pre_submission";
import "@testing-library/jest-dom";

describe("PreSubmission", () => {
  const defaultProps = {
    council: "public-council-1",
    reference: "REF-001",
    navigateToPage: jest.fn(),
    updateProgress: jest.fn(),
  };

  beforeEach(() => {
    sessionStorage.clear();
  });

  it("renders the component with the correct content", () => {
    render(<PreSubmission {...defaultProps} />);

    expect(
      screen.getByRole("heading", {
        name: "What you need to know before you comment",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "What isn't considered in planning approval",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Why your comments are important" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "What happens to your comments" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Start now" }),
    ).toBeInTheDocument();
  });

  it("navigates to the next page and updates progress when the form is submitted", () => {
    render(<PreSubmission {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Start now" }));

    expect(defaultProps.navigateToPage).toHaveBeenCalledWith(1);
    expect(defaultProps.updateProgress).toHaveBeenCalledWith(0);
    expect(sessionStorage.getItem("presubmission_REF-001")).toBe("completed");
  });
});

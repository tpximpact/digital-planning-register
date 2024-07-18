import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import config from "../../util/config.json";
import PreSubmission from "@/components/comment_pre_submission";
import "@testing-library/jest-dom";

jest.mock("../../util/config.json", () => ({
  exampleCouncil: {
    pageContent: {
      council_reference_submit_comment_pre_submission: {
        what_happens_to_your_comments_link: "https://example.com",
      },
    },
  },
}));

describe("PreSubmission", () => {
  const defaultProps = {
    council: "exampleCouncil",
    reference: "REF-001",
    navigateToPage: jest.fn(),
    updateProgress: jest.fn(),
  };

  beforeEach(() => {
    localStorage.clear();
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
    expect(localStorage.getItem("presubmission_REF-001")).toBe("completed");
  });

  it('renders the "material considerations" link when provided in the council config', () => {
    render(<PreSubmission {...defaultProps} />);
    expect(
      screen.getByRole("link", { name: "material considerations" }),
    ).toHaveAttribute("href", "https://example.com");
  });
});

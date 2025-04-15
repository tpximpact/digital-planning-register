/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CommentSentiment from "@/components/comment_sentiment";
import "@testing-library/jest-dom";
import { trackClient } from "@/lib/dprAnalytics";

jest.mock("@/lib/dprAnalytics", () => ({
  trackClient: jest.fn(),
}));

describe("CommentSentiment", () => {
  const defaultProps = {
    reference: "REF-001",
    navigateToPage: jest.fn(),
    updateProgress: jest.fn(),
  };

  beforeEach(() => {
    sessionStorage.clear();
    window.scrollTo = jest.fn();
    jest.clearAllMocks();
  });

  it("renders the component with the correct content", () => {
    render(<CommentSentiment {...defaultProps} />);

    expect(
      screen.getByRole("heading", {
        name: "How do you feel about this development?",
      }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Opposed")).toBeInTheDocument();
    expect(screen.getByLabelText("Neutral")).toBeInTheDocument();
    expect(screen.getByLabelText("Support")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" }),
    ).toBeInTheDocument();
  });

  it("displays an error message when no sentiment is selected and the form is submitted", () => {
    render(<CommentSentiment {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText("Please select an option")).toBeInTheDocument();
    expect(defaultProps.navigateToPage).not.toHaveBeenCalled();
    expect(defaultProps.updateProgress).not.toHaveBeenCalled();
    expect(trackClient).toHaveBeenCalledWith("comment_validation_error", {
      message: "error in sentiment",
    });
  });

  it("navigates to the next page and updates progress when a sentiment is selected and the form is submitted", () => {
    render(<CommentSentiment {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Support"));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(defaultProps.navigateToPage).toHaveBeenCalledWith(2);
    expect(defaultProps.updateProgress).toHaveBeenCalledWith(1);
    expect(sessionStorage.getItem("sentiment_REF-001")).toBe("supportive");
  });

  it("loads the stored sentiment from sessionStorage when available", () => {
    sessionStorage.setItem("sentiment_REF-001", "neutral");
    render(<CommentSentiment {...defaultProps} />);

    expect(screen.getByLabelText("Neutral")).toBeChecked();
  });

  it("navigates to page 5 when editing and a sentiment is selected and the form is submitted", () => {
    sessionStorage.setItem(
      "selectedTopics_REF-001",
      JSON.stringify(["topic1", "topic2"]),
    );
    render(<CommentSentiment {...defaultProps} />);
    fireEvent.click(screen.getByLabelText("Opposed"));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(defaultProps.navigateToPage).toHaveBeenCalledWith(5);
    expect(defaultProps.updateProgress).toHaveBeenCalledWith(1);
    expect(sessionStorage.getItem("sentiment_REF-001")).toBe("objection");
  });
});

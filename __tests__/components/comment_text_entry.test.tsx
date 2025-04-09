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
import CommentTextEntry from "@/components/comment_text_entry";
import "@testing-library/jest-dom";
import { trackClient } from "@/lib/dprAnalytics";

jest.mock("@/lib/dprAnalytics", () => ({
  trackClient: jest.fn(),
}));

describe("CommentTextEntry", () => {
  const defaultProps = {
    reference: "REF-001",
    currentTopic: "design",
    onContinue: jest.fn(),
    updateProgress: jest.fn(),
    currentTopicIndex: 0,
    totalTopics: 1,
  };

  beforeEach(() => {
    sessionStorage.clear();
    window.scrollTo = jest.fn();
    jest.clearAllMocks();
    document.title = "";
  });

  it("renders the component with the correct content", () => {
    render(<CommentTextEntry {...defaultProps} />);

    expect(
      screen.getByLabelText(
        "Comment on the design, size or height of new buildings or extensions",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" }),
    ).toBeInTheDocument();
  });

  it("displays an error message when the comment is empty and the form is submitted", () => {
    render(<CommentTextEntry {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText("Your comment is required")).toBeInTheDocument();
    expect(defaultProps.onContinue).not.toHaveBeenCalled();
    expect(defaultProps.updateProgress).not.toHaveBeenCalled();
    expect(trackClient).toHaveBeenCalledWith("comment_validation_error", {
      message: "error in comment text entry",
    });
  });

  it("calls onContinue and updateProgress when a valid comment is entered and the form is submitted", () => {
    render(<CommentTextEntry {...defaultProps} />);
    fireEvent.change(
      screen.getByLabelText(
        "Comment on the design, size or height of new buildings or extensions",
      ),
      {
        target: { value: "This is a valid comment." },
      },
    );
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(defaultProps.onContinue).toHaveBeenCalled();
    expect(defaultProps.updateProgress).toHaveBeenCalledWith(3);
    expect(sessionStorage.getItem("comment_design_REF-001")).toBe(
      "This is a valid comment.",
    );
  });

  it("loads the stored comment from sessionStorage when available", () => {
    sessionStorage.setItem("comment_design_REF-001", "Stored comment");
    render(<CommentTextEntry {...defaultProps} />);

    expect(
      screen.getByLabelText(
        "Comment on the design, size or height of new buildings or extensions",
      ),
    ).toHaveValue("Stored comment");
  });

  it("prevents adding more characters when the comment reaches the maximum length", () => {
    const longComment = "a".repeat(6000);
    render(<CommentTextEntry {...defaultProps} />);
    fireEvent.change(
      screen.getByLabelText(
        "Comment on the design, size or height of new buildings or extensions",
      ),
      {
        target: { value: longComment },
      },
    );

    expect(
      screen.getByLabelText(
        "Comment on the design, size or height of new buildings or extensions",
      ),
    ).toHaveValue(longComment);
    expect(
      screen.getByText(
        "You have reached the character limit of 6000 characters",
      ),
    ).toBeInTheDocument();

    fireEvent.change(
      screen.getByLabelText(
        "Comment on the design, size or height of new buildings or extensions",
      ),
      {
        target: { value: longComment + "extra characters" },
      },
    );

    expect(
      screen.getByLabelText(
        "Comment on the design, size or height of new buildings or extensions",
      ),
    ).toHaveValue(longComment);
  });
});

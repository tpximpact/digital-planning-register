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
import CommentTopicSelection from "@/components/comment_topic_selection";
import "@testing-library/jest-dom";
import { trackClient } from "@/lib/dprAnalytics";

jest.mock("@/lib/dprAnalytics", () => ({
  trackClient: jest.fn(),
}));

describe("CommentTopicSelection", () => {
  const defaultProps = {
    reference: "REF-001",
    onTopicSelection: jest.fn(),
    updateProgress: jest.fn(),
  };

  beforeEach(() => {
    sessionStorage.clear();

    window.scrollTo = jest.fn();

    jest.clearAllMocks();
  });

  it("renders the component with the correct content", () => {
    render(<CommentTopicSelection {...defaultProps} />);

    expect(
      screen.getByRole("heading", {
        name: "What topics do you want to comment on?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Help us understand what your comments on this development are about. Select all the topics that apply.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" }),
    ).toBeInTheDocument();
  });

  it("displays an error message when no topics are selected and the form is submitted", () => {
    render(<CommentTopicSelection {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(
      screen.getByText("Please select at least one topic"),
    ).toBeInTheDocument();
    expect(defaultProps.onTopicSelection).not.toHaveBeenCalled();
    expect(defaultProps.updateProgress).not.toHaveBeenCalled();
    expect(trackClient).toHaveBeenCalledWith("comment_validation_error", {
      message: "error in topic selection",
    });
  });

  it("calls onTopicSelection, updateProgress", () => {
    render(<CommentTopicSelection {...defaultProps} />);
    fireEvent.click(
      screen.getByLabelText(
        "Design, size or height of new buildings or extensions",
      ),
    );
    fireEvent.click(screen.getByLabelText("Traffic, parking or road safety"));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(defaultProps.onTopicSelection).toHaveBeenCalledWith([
      "design",
      "traffic",
    ]);
    expect(defaultProps.updateProgress).toHaveBeenCalledWith(2);
    expect(sessionStorage.getItem("selectedTopics_REF-001")).toBe(
      "design,traffic",
    );
  });

  it("loads the stored topics from sessionStorage when available", () => {
    sessionStorage.setItem("selectedTopics_REF-001", "light,privacy");
    render(<CommentTopicSelection {...defaultProps} />);

    expect(screen.getByLabelText("Impacts on natural light")).toBeChecked();
    expect(screen.getByLabelText("Privacy of neighbours")).toBeChecked();
  });

  it("removes the associated comment from sessionStorage when a topic is deselected", () => {
    sessionStorage.setItem("selectedTopics_REF-001", "noise,other");
    sessionStorage.setItem("comment_noise_REF-001", "Noise comment");
    sessionStorage.setItem("comment_other_REF-001", "Other comment");
    render(<CommentTopicSelection {...defaultProps} />);

    fireEvent.click(screen.getByLabelText("Noise from new uses"));

    expect(screen.getByLabelText("Noise from new uses")).not.toBeChecked();
    expect(sessionStorage.getItem("comment_noise_REF-001")).toBeNull();
    expect(sessionStorage.getItem("comment_other_REF-001")).toBe(
      "Other comment",
    );
  });
});

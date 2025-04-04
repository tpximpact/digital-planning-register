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
import { render, screen, act } from "@testing-library/react";
import { CommentCard } from "../../src/components/CommentCard";
import { splitCommentText } from "../../src/components/CommentCard/CommentCard.utils";
import "@testing-library/jest-dom";
import { DprComment } from "@/types";

describe("Render CommentCard", () => {
  it("should render a comment card", () => {
    const comment: DprComment = {
      comment: "insightful comment here",
      receivedDate: "2023-11-14T13:40:51.567Z",
      sentiment: "neutral",
    };
    const { container } = render(
      <CommentCard comment={comment} commentNumber={1} />,
    );

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Comment #1 published 14 Nov 2023",
      }),
    ).toBeInTheDocument();

    expect(container.querySelector("time")).toHaveAttribute(
      "datetime",
      "2023-11-14T13:40:51.567Z",
    );
    expect(container.querySelector("time")).toHaveTextContent("14 Nov 2023");

    expect(screen.getByText("Neutral")).toBeInTheDocument();
    expect(screen.getByText("insightful comment here")).toBeInTheDocument();
  });
});

describe("splitCommentText", () => {
  it("should return the full text if it is under the character limit", () => {
    const text = "This is a short comment.";
    expect(splitCommentText(text)).toEqual(["This is a short comment."]);
  });

  it("should split a long comment into multiple parts", () => {
    const text = "This is a sentence. ".repeat(40);

    const result = splitCommentText(text);

    expect(result.length).toBeGreaterThan(1);
    expect(result[0].length).toBeLessThanOrEqual(500);
    expect(result.join(" ")).toContain("This is a sentence.");
  });

  it("should handle text without punctuation correctly", () => {
    const text =
      "This is a very long comment without punctuation it should still be split properly otherwise it might exceed the limit and break".repeat(
        20,
      );

    const result = splitCommentText(text);
    expect(result.length).toBeGreaterThan(1);
  });

  it("should trim whitespace from split parts", () => {
    const text =
      "   This is a long comment with extra spaces.    It should be split properly.   ";
    const result = splitCommentText(text);

    expect(result[0].startsWith("This")).toBe(true);
    expect(result[0].endsWith(".")).toBe(true);
  });
});

import React from "react";
import { render, screen, act } from "@testing-library/react";
import { CommentCard } from "../../src/components/CommentCard";
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
        name: "Comment #1 published 14 Nov 2023 01:40 PM",
      }),
    ).toBeInTheDocument();

    expect(container.querySelector("time")).toHaveAttribute(
      "datetime",
      "2023-11-14T13:40:51.567Z",
    );
    expect(container.querySelector("time")).toHaveTextContent(
      "14 Nov 2023 01:40 PM",
    );

    expect(screen.getByText("Neutral")).toBeInTheDocument();
    expect(screen.getByText("insightful comment here")).toBeInTheDocument();
  });
});

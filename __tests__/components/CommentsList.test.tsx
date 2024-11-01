import React from "react";
import { queryAllByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CommentsList, CommentsListProps } from "@/components/CommentsList";
import { DprComment } from "@/types";
import { CommentCardProps } from "@/components/CommentCard";
import {
  generateComment,
  generateNResults,
  generatePagination,
} from "@mocks/dprApplicationFactory";

jest.mock("@/components/CommentCard", () => ({
  CommentCard: ({ comment, commentNumber }: CommentCardProps) => (
    <div data-testid="comment-card">
      <p>comment number: {commentNumber}</p>
      <p>comment sentiment: {comment.sentiment}</p>
      <p>comment: {comment.comment}</p>
    </div>
  ),
}));

describe("CommentsList", () => {
  it("shows correct results", () => {
    render(
      <CommentsList
        type={"public"}
        councilSlug={"public-council-1"}
        reference={"12345"}
        comments={generateNResults<DprComment>(20, generateComment)}
        pagination={generatePagination(2, 20)}
        showMoreButton={true}
      />,
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Public Comments");
    expect(screen.getAllByTestId("comment-card")).toHaveLength(10);
    expect(screen.getByText("comment number: 11")).toBeInTheDocument();
    expect(screen.getByText("comment number: 20")).toBeInTheDocument();
    expect(screen.getByText("Showing 10 of 20 comments")).toBeInTheDocument();
    expect(
      screen.getByText("Show all 20 neighbour comments"),
    ).toBeInTheDocument();
  });

  it("shows correct results", () => {
    render(
      <CommentsList
        type={"specialist"}
        councilSlug={"public-council-1"}
        reference={"12345"}
        comments={generateNResults<DprComment>(8, generateComment)}
        pagination={generatePagination(0, 8)}
        showMoreButton={true}
      />,
    );
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Specialist Comments",
    );
    expect(screen.getAllByTestId("comment-card")).toHaveLength(8);
    expect(screen.getByText("comment number: 1")).toBeInTheDocument();
    expect(screen.getByText("comment number: 8")).toBeInTheDocument();
    expect(screen.getByText("Showing 8 of 8 comments")).toBeInTheDocument();
    expect(
      screen.getByText("Show all 8 professional consultee comments"),
    ).toBeInTheDocument();
  });

  it("shows message when there are no public comments", () => {
    render(
      <CommentsList
        type={"public"}
        councilSlug={"public-council-1"}
        reference={"12345"}
        comments={[]}
        pagination={generatePagination(0, 0)}
      />,
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Public Comments");
    expect(
      screen.getByText(
        "No comments from the public have been published at this time.",
      ),
    ).toBeInTheDocument();
  });

  it("shows message when there are no specialist comments", () => {
    render(
      <CommentsList
        type={"specialist"}
        councilSlug={"public-council-1"}
        reference={"12345"}
        comments={[]}
        pagination={generatePagination(0, 0)}
      />,
    );
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Specialist Comments",
    );
    expect(
      screen.getByText(
        "No comments from specialists have been published at this time.",
      ),
    ).toBeInTheDocument();
  });
});

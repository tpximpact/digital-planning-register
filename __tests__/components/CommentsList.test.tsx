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
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CommentsList } from "@/components/CommentsList";
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
  it("shows correct public comments results", () => {
    render(
      <CommentsList
        type={"public"}
        councilSlug={"public-council-1"}
        reference={"12345"}
        comments={generateNResults<DprComment>(20, () => generateComment())}
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
        comments={generateNResults<DprComment>(10, () => generateComment(true))}
        pagination={generatePagination(0, 10)}
        showMoreButton={true}
      />,
    );
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Specialist Comments",
    );
    expect(screen.getAllByTestId("comment-card")).toHaveLength(10);
    expect(screen.getByText("comment number: 1")).toBeInTheDocument();
    expect(screen.getByText("comment number: 10")).toBeInTheDocument();
    expect(
      screen.getByText(/Showing\s*10\s*of\s*10\s*comments/),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Show all 10 professional consultee comments"),
    ).toBeInTheDocument();
  });

  it("shows message when there are no public comments", () => {
    const pagination = generatePagination(0, 0);
    render(
      <CommentsList
        type="public"
        councilSlug="public-council-1"
        reference="12345"
        comments={[]}
        pagination={pagination}
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
    const pagination = generatePagination(0, 0);
    render(
      <CommentsList
        type="specialist"
        councilSlug="public-council-1"
        reference="12345"
        comments={[]}
        pagination={pagination}
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

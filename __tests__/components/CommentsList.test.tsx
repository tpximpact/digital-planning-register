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
import { CommentCardProps } from "@/components/CommentCard";
import {
  generateComment,
  generateNResults,
} from "@mocks/dprApplicationFactory";

jest.mock("@/components/CommentCard", () => ({
  CommentCard: ({ comment, commentNumber }: CommentCardProps) => (
    <div data-testid="comment-card">
      <p>comment number: {commentNumber}</p>
      <p>comment sentiment: {comment?.sentiment}</p>
      <p>comment: {comment?.comment}</p>
    </div>
  ),
}));

describe("CommentsList", () => {
  it("shows correct public comments results", () => {
    const comments = generateNResults(10, () => generateComment());
    const firstCommentId = comments[0].id;
    const secondCommentId = comments[1].id;
    const summary = {
      totalComments: comments.length,
      totalConsulted: 6,
      sentiment: {
        supportive: 3,
        objection: 2,
        neutral: 1,
      },
    };
    render(
      <CommentsList
        type="public"
        councilSlug="public-council-1"
        reference="12345"
        comments={comments}
        summary={summary}
      />,
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Public Comments");
    expect(screen.getAllByTestId("comment-card")).toHaveLength(10);
    expect(
      screen.getByText(`comment number: ${firstCommentId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`comment number: ${secondCommentId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Showing\s*10\s*of\s*10\s*comments/),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Show all 10 neighbour comments"),
    ).toBeInTheDocument();
  });

  it("shows correct specialist comments results", () => {
    const comments = generateNResults(10, () => generateComment());
    const firstCommentId = comments[0].id;
    const secondCommentId = comments[1].id;
    const summary = {
      totalComments: comments.length,
      totalConsulted: 6,
      sentiment: {
        supportive: 3,
        objection: 2,
        neutral: 1,
      },
    };
    render(
      <CommentsList
        type="specialist"
        councilSlug="public-council-1"
        reference="12345"
        comments={comments}
        summary={summary}
      />,
    );
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Specialist Comments",
    );
    expect(screen.getAllByTestId("comment-card")).toHaveLength(10);
    expect(
      screen.getByText(`comment number: ${firstCommentId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`comment number: ${secondCommentId}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Showing\s*10\s*of\s*10\s*comments/),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Show all 10 professional consultee comments"),
    ).toBeInTheDocument();
  });

  it("shows message when there are no public comments", () => {
    render(
      <CommentsList
        type="public"
        councilSlug="public-council-1"
        reference="12345"
        comments={[]}
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
        type="specialist"
        councilSlug="public-council-1"
        reference="12345"
        comments={[]}
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

  it("Supports no summary being present", () => {
    const comments = generateNResults(10, () => generateComment());
    render(
      <CommentsList
        type="public"
        councilSlug="public-council-1"
        reference="12345"
        comments={comments}
      />,
    );
    expect(screen.getByText("Showing 10 comments")).toBeInTheDocument();
    expect(screen.getByText("Show all neighbour comments")).toBeInTheDocument();
  });
});

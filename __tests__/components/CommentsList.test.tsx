// CommentsList.test.tsx
// import { mockData } from "../../__mocks__/mockData";
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CommentsList } from "@/components/CommentsList";
import { DprComment } from "@/types";

// Mock the CommentCard component
jest.mock("@/components/comment_card", () => ({
  CommentCard: ({
    comment,
    commentNumber,
  }: {
    comment: DprComment;
    commentNumber: number;
  }) => (
    <div data-testid="comment-card" key={`${Number(commentNumber)}`}>
      <p>comment: {comment.comment}</p>
      <p>number: {commentNumber}</p>
    </div>
  ),
}));

describe("CommentsList", () => {
  const mockComments: DprComment[] = [
    {
      comment: "comment 1",
      received_at: "2024-05-03T00:00:00.000+01:00",
      sentiment: "neutral",
    },
    {
      comment: "comment 2",
      received_at: "2024-05-10T13:22:58.884+01:00",
      sentiment: "neutral",
    },
    {
      comment: "comment 3",
      received_at: "2024-05-10T13:22:17.969+01:00",
      sentiment: "neutral",
    },
    {
      comment: "comment 4",
      received_at: "2024-05-03T00:00:00.000+01:00",
      sentiment: "neutral",
    },
    {
      comment: "comment 5",
      received_at: "2024-05-10T13:22:58.884+01:00",
      sentiment: "neutral",
    },
    {
      comment: "comment 6",
      received_at: "2024-05-10T13:22:17.969+01:00",
      sentiment: "neutral",
    },
  ];

  it("renders the CommentsList component with public comments heading", () => {
    render(
      <CommentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        type="public"
        comments={mockComments}
        maxDisplayComments={3}
        from={0}
        showMoreButton={false}
        page={0}
      />,
    );
    expect(screen.getByText("Public Comments")).toBeInTheDocument();
  });

  it("renders the CommentsList component with specialist comments heading", () => {
    render(
      <CommentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        type="specialist"
        comments={mockComments}
        maxDisplayComments={3}
        from={0}
        showMoreButton={false}
        page={0}
      />,
    );

    expect(screen.getByText("Specialist Comments")).toBeInTheDocument();
  });

  it("displays the correct number of comments", () => {
    render(
      <CommentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        type="public"
        comments={mockComments}
        maxDisplayComments={3}
        from={0}
        showMoreButton={false}
        page={0}
      />,
    );
    const commentCards = screen.getAllByTestId("comment-card");
    expect(commentCards).toHaveLength(3);
  });

  it('displays the correct comments based on the "from" prop', () => {
    render(
      <CommentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        type="public"
        comments={mockComments}
        maxDisplayComments={3}
        from={3}
        showMoreButton={false}
        page={1}
      />,
    );
    const commentCards = screen.getAllByTestId("comment-card");
    expect(commentCards[0]).toHaveTextContent("comment: comment 4");
    expect(commentCards[1]).toHaveTextContent("comment: comment 5");
    expect(commentCards[2]).toHaveTextContent("comment: comment 6");
  });

  it("displays the correct comment numbers", () => {
    render(
      <CommentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        type="public"
        comments={mockComments}
        maxDisplayComments={3}
        from={0}
        showMoreButton={false}
        page={0}
      />,
    );
    const commentCards = screen.getAllByTestId("comment-card");
    expect(commentCards[0]).toHaveTextContent("comment: comment 1");
    expect(commentCards[0]).toHaveTextContent("number: 6");
    expect(commentCards[1]).toHaveTextContent("comment: comment 2");
    expect(commentCards[1]).toHaveTextContent("number: 5");
    expect(commentCards[2]).toHaveTextContent("comment: comment 3");
    expect(commentCards[2]).toHaveTextContent("number: 4");
  });

  it("does not display comments if there are no comments", () => {
    render(
      <CommentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        type="public"
        comments={[]}
        maxDisplayComments={3}
        from={0}
        showMoreButton={false}
        page={0}
      />,
    );
    expect(screen.queryByTestId("comment-card")).not.toBeInTheDocument();
  });

  it('displays the "Show More" button if showMoreButton is true', () => {
    render(
      <CommentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        type="public"
        comments={mockComments}
        maxDisplayComments={3}
        from={0}
        showMoreButton={true}
        page={0}
      />,
    );
    expect(
      screen.getByText("Show all 6 neighbour comments"),
    ).toBeInTheDocument();
  });

  it('does not display the "Show More" button if showMoreButton is false', () => {
    render(
      <CommentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        type="public"
        comments={mockComments}
        maxDisplayComments={3}
        from={0}
        showMoreButton={false}
        page={0}
      />,
    );
    expect(screen.queryByText("Show More")).not.toBeInTheDocument();
  });
});

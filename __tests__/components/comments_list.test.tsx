// CommentsList.test.tsx
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { mockData } from "../../__mocks__/mockData";
import "@testing-library/jest-dom";
import config from "../../util/config.json";
import CommentsList from "@/components/comments_list";

config["camden"].specialistComments = true;
export default config;

describe("CommentsList", () => {
  it("renders consultee comments correctly", () => {
    render(
      <CommentsList
        council="camden"
        reference={mockData.reference}
        type="consultee"
        maxDisplayComments={10}
        showMoreButton={true}
        comments={mockData.consultee_comments}
      />,
    );

    expect(screen.getByText("Specialist Comments")).toBeInTheDocument();
    expect(screen.getByText("This is the first comment.")).toBeInTheDocument();
    expect(
      screen.getByText("I have some concerns about the proposed plan."),
    ).toBeInTheDocument();
  });

  it("renders published comments correctly", () => {
    render(
      <CommentsList
        council="camden"
        reference={mockData.reference}
        type="published"
        maxDisplayComments={10}
        showMoreButton={true}
        comments={mockData.published_comments}
      />,
    );

    expect(screen.getByText("Public Comments")).toBeInTheDocument();
    expect(screen.getByText("This is the first comment.")).toBeInTheDocument();
    expect(
      screen.getByText("I have some concerns about the proposed plan."),
    ).toBeInTheDocument();
  });

  it("renders no comments message for consultee comments", () => {
    render(
      <CommentsList
        council="camden"
        reference={mockData.reference}
        type="consultee"
        comments={[]}
      />,
    );

    expect(
      screen.getByText(
        "No comments from specialists have been published at this time.",
      ),
    ).toBeInTheDocument();
  });

  it("renders no comments message for published comments", () => {
    render(
      <CommentsList
        council="camden"
        reference={mockData.reference}
        type="published"
        comments={[]}
      />,
    );

    expect(
      screen.getByText(
        "No comments from the public have been published at this time.",
      ),
    ).toBeInTheDocument();
  });
});

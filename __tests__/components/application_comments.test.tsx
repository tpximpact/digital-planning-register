// ApplicationComments.test.tsx
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ApplicationComments from "@/components/application_comments";
import { mockData } from "../../__mockData__/mockData";
import "@testing-library/jest-dom";
import config from "../../util/config.json";

config["camden"].specialistComments = true;
export default config;

describe("ApplicationComments", () => {
  it("renders consultee comments correctly", () => {
    render(
      <ApplicationComments
        council="camden"
        {...mockData}
        id={mockData.id}
        type="consultee"
        maxDisplayComments={10}
        showViewAllButton={true}
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
      <ApplicationComments
        {...mockData}
        council="camden"
        id={mockData.id}
        type="published"
        maxDisplayComments={10}
        showViewAllButton={true}
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
      <ApplicationComments
        {...mockData}
        council="camden"
        comments={[]}
        id={mockData.id}
        type="consultee"
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
      <ApplicationComments
        {...mockData}
        council="camden"
        comments={[]}
        id={mockData.id}
        type="published"
      />,
    );

    expect(
      screen.getByText(
        "No comments from the public have been published at this time.",
      ),
    ).toBeInTheDocument();
  });
});

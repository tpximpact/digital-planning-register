import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CouncilCards } from "@/components/CouncilCards";
import { generateAppConfig } from "@mocks/appConfigFactory";

// Mock the CouncilLogo component
jest.mock("@/components/CouncilLogo", () => ({
  CouncilLogo: ({
    councilName,
    logoFileName,
  }: {
    councilName: string;
    logoFileName: string;
  }) => (
    <div data-testid="council-logo">
      <p>{councilName}</p>
      <p>{logoFileName}</p>
    </div>
  ),
}));

describe("CouncilCards", () => {
  const appConfig = generateAppConfig();

  it("renders the CouncilCards component with only public councils", () => {
    render(<CouncilCards councils={appConfig.councils} />);
    expect(screen.getByText("Public Council 1")).toBeInTheDocument();
    expect(screen.getByText("Public Council 2")).toBeInTheDocument();
    expect(screen.queryByText("Unlisted Council 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Unlisted Council 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Private Council 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Private Council 2")).not.toBeInTheDocument();
  });

  it("renders the correct links for public councils", () => {
    render(<CouncilCards councils={appConfig.councils} />);
    const link1 = screen.getByTitle("Public Council 1 Council");
    const link2 = screen.getByTitle("Public Council 2 Council");
    expect(link1).toHaveAttribute("href", "/public-council-1");
    expect(link2).toHaveAttribute("href", "/public-council-2");
  });

  it("does not render anything if no public councils are available", () => {
    render(<CouncilCards councils={[]} />);
    expect(screen.queryByTestId("council-logo")).not.toBeInTheDocument();
  });
});

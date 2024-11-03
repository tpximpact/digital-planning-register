import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CouncilCards } from "@/components/CouncilCards";
import { createAppConfig } from "@mocks/appConfigFactory";

describe("CouncilCards", () => {
  const appConfig = createAppConfig();

  it("renders the CouncilCards component with only public councils", () => {
    render(<CouncilCards councils={appConfig.councils} />);

    expect(
      screen.getByRole("link", {
        name: "Public Council 1",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Public Council 2",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: "Unlisted Council 1",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: "Unlisted Council 2",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: "Private Council 1",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: "Private Council 2",
      }),
    ).not.toBeInTheDocument();
  });

  it("renders the correct links for public councils", () => {
    render(<CouncilCards councils={appConfig.councils} />);
    // Use getByRole to find the links by their accessible name
    const link1 = screen.getByRole("link", {
      name: /Public Council 1/i,
    });
    const link2 = screen.getByRole("link", {
      name: /Public Council 2/i,
    });

    expect(link1).toHaveAttribute("href", "/public-council-1");
    expect(link2).toHaveAttribute("href", "/public-council-2");
  });

  it("does not render anything if no public councils are available", () => {
    render(<CouncilCards councils={[]} />);
    expect(screen.queryByTestId("council-logo")).not.toBeInTheDocument();
  });
});

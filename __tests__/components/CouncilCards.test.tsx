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
        name: "View planning applications for Public Council 1 Council",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "View planning applications for Public Council 2 Council",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: "View planning applications for Unlisted Council 1 Council",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: "View planning applications for Unlisted Council 2 Council",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: "View planning applications for Private Council 1 Council",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: "View planning applications for Private Council 2 Council",
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

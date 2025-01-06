import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Menu } from "@/components/Menu";
import { AppConfig } from "@/config/types";
import { createAppConfig } from "@mocks/appConfigFactory";

describe("Menu", () => {
  const appConfig = createAppConfig("public-council-1");

  it("renders the Menu component", () => {
    render(
      <Menu
        navigation={appConfig.navigation}
        currentPath="/"
        councils={appConfig.councils}
        selectedCouncil={appConfig.council}
      />,
    );
    expect(screen.getByLabelText("Menu")).toBeInTheDocument();
  });

  it("displays the navigation links", () => {
    render(
      <Menu
        navigation={appConfig.navigation}
        currentPath="/"
        councils={appConfig.councils}
        selectedCouncil={appConfig.council}
      />,
    );
    expect(screen.getByText("Application search")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
    expect(screen.queryByText("Digital site notice")).toBeInTheDocument();
  });

  it("highlights the current navigation link", () => {
    render(
      <Menu
        navigation={appConfig.navigation}
        currentPath="/public-council-1"
        councils={appConfig.councils}
        selectedCouncil={appConfig.council}
      />,
    );
    const applicationSearchLink = screen
      .getByText("Application search")
      .closest("li");
    expect(applicationSearchLink).toHaveClass(
      "govuk-service-navigation__item--active",
    );
  });
});

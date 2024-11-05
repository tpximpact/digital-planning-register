import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Menu } from "@/components/Menu";
import { AppConfig } from "@/config/types";
import { createAppConfig } from "@mocks/appConfigFactory";

// Mock the CouncilSelector component
jest.mock("@/components/CouncilSelector", () => ({
  CouncilSelector: ({
    councils,
    selectedCouncil,
  }: {
    councils: AppConfig["councils"];
    selectedCouncil?: AppConfig["council"];
  }) => (
    <div data-testid="council-selector">
      {selectedCouncil ? selectedCouncil.name : "No council selected"}
    </div>
  ),
}));

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

  it("displays the CouncilSelector component", () => {
    render(
      <Menu
        navigation={appConfig.navigation}
        currentPath="/"
        councils={appConfig.councils}
        selectedCouncil={appConfig.council}
      />,
    );
    expect(screen.getByTestId("council-selector")).toBeInTheDocument();
    expect(screen.getByTestId("council-selector")).toHaveTextContent(
      "Council 1",
    );
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
    expect(screen.queryByText("Digital site notice")).toBeNull();
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

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

  it("displays the home link only when no selected council", () => {
    const { container } = render(
      <Menu
        navigation={appConfig.navigation}
        currentPath="/"
        councils={appConfig.councils}
      />,
    );
    const menu = container.querySelector(".dpr-menu");
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveClass("govuk-visually-hidden", { exact: false });
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.queryByText("Application search")).not.toBeInTheDocument();
    expect(screen.queryByText("Help")).not.toBeInTheDocument();
  });
});

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
      name: "Public Council 1",
    });
    const link2 = screen.getByRole("link", {
      name: "Public Council 2",
    });

    expect(link1).toHaveAttribute("href", "/public-council-1");
    expect(link2).toHaveAttribute("href", "/public-council-2");
  });

  it("does not render anything if no public councils are available", () => {
    render(<CouncilCards councils={[]} />);
    expect(screen.queryByTestId("council-logo")).not.toBeInTheDocument();
  });
});

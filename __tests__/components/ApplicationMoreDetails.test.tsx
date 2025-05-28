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

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ApplicationMoreDetails } from "@/components/ApplicationMoreDetails";

describe("ExampleComponent", () => {
  beforeEach(() => {
    render(<ApplicationMoreDetails />);
  });

  it("renders the main Application heading", () => {
    expect(
      screen.getByRole("heading", { name: "Application", level: 2 }),
    ).toBeInTheDocument();
  });

  it("renders project type", () => {
    expect(screen.getByText("Project type")).toBeInTheDocument();
    expect(screen.getByText("Alter a building")).toBeInTheDocument();
  });

  it("renders estimated start and completion dates", () => {
    expect(screen.getByText("Estimated start date")).toBeInTheDocument();
    expect(screen.getAllByText("01-04-2025")).toHaveLength(2);
    expect(screen.getByText("Estimated completion date")).toBeInTheDocument();
  });

  it("renders extension size", () => {
    expect(screen.getByText("Extention")).toBeInTheDocument();
    expect(screen.getByText("30 m2")).toBeInTheDocument();
  });

  it("renders vehicle parking info", () => {
    expect(screen.getByText("Vehicle parking")).toBeInTheDocument();
    expect(screen.getByText(/Bicycles: 1 off street/i)).toBeInTheDocument();
    expect(screen.getByText(/Car: 1 on street/i)).toBeInTheDocument();
  });

  it("renders related applications section and links", () => {
    expect(
      screen.getByRole("heading", { name: "Related Applications", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Pre-application - 2024\/0452\/C/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Conditions of construction - 2024\/0685\/A/),
    ).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/");
  });
});

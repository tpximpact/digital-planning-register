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
import { StartButton } from "@/components/StartButton";

describe("Button Component", () => {
  it("renders the start button element", () => {
    render(<StartButton type="submit"></StartButton>);
    const buttonElement = screen.getByText("Start now");
    expect(buttonElement).toContainHTML("svg");
    const svgElement = buttonElement.querySelector("svg");
    expect(svgElement).toHaveClass("govuk-button__start-icon");
  });
});

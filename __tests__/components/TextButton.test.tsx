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
import { TextButton } from "@/components/TextButton";

describe("Button Component", () => {
  it("renders the default text button element", () => {
    render(<TextButton>Change</TextButton>);
    const buttonElement = screen.getByText("Change");
    expect(buttonElement).toHaveClass("dpr-text-button");
  });
  it("renders the text button element with the plain styling", () => {
    render(<TextButton variant="plain">Change</TextButton>);
    const buttonElement = screen.getByText("Change");
    expect(buttonElement).toHaveClass("dpr-text-button--plain");
  });
  it("renders the button as a link", () => {
    render(
      <TextButton element="link" href="/change">
        Change
      </TextButton>,
    );
    const buttonElement = screen.getByText("Change");
    expect(buttonElement).toHaveAttribute("href", "/change");
  });
});

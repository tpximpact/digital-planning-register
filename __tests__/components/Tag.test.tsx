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
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tag } from "@/components/Tag";

describe("Render Tag", () => {
  it("should render the label", () => {
    render(<Tag label="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
  it("should render the positive class", () => {
    render(<Tag label="Test" sentiment="positive" />);
    expect(screen.getByText("Test")).toHaveClass("dpr-tag--positive");
  });
  it("should render the negative class", () => {
    render(<Tag label="Test" sentiment="negative" />);
    expect(screen.getByText("Test")).toHaveClass("dpr-tag--negative");
  });
  it("should render the neutral class", () => {
    render(<Tag label="Test" sentiment="neutral" />);
    expect(screen.getByText("Test")).toHaveClass("dpr-tag--neutral");
  });
  it("should render the none class", () => {
    render(<Tag label="Test" sentiment="bleh" />);
    expect(screen.getByText("Test")).toHaveClass("dpr-tag--none");
  });
  it("should render the none class", () => {
    render(<Tag label="Test" />);
    expect(screen.getByText("Test")).toHaveClass("dpr-tag--none");
  });
  it("should render the inline class", () => {
    render(<Tag label="Test" isInline={true} />);
    expect(screen.getByText("Test")).toHaveClass("dpr-tag--inline");
  });
});

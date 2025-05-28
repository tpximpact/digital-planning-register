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
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DetailsCheckboxAccordion } from "@/components/DetailsCheckboxAccordion";

// Helper for a simple string option type
const OPTIONS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

describe("DetailsCheckboxAccordion", () => {
  it("renders the title and correct number of checkboxes", () => {
    render(
      <DetailsCheckboxAccordion
        title="My Title"
        name="test"
        options={OPTIONS}
        checkedOptions={["A", "C"]}
      />,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: /My Title/i }),
    ).toBeInTheDocument();
    // Should render all options as checkboxes
    expect(screen.getAllByRole("checkbox")).toHaveLength(OPTIONS.length);
  });

  it("shows the correct number of selected checkboxes", () => {
    render(
      <DetailsCheckboxAccordion
        title="My Title"
        name="test"
        options={OPTIONS}
        checkedOptions={["A", "C"]}
      />,
    );
    expect(screen.getByText("2 selected")).toBeInTheDocument();
  });

  it("splits options into two columns if more than 10", () => {
    const { container } = render(
      <DetailsCheckboxAccordion
        title="My Title"
        name="test"
        options={OPTIONS}
        checkedOptions={[]}
      />,
    );
    // Should have two columns
    const columns = container.querySelectorAll(".govuk-grid-column-one-half");
    expect(columns.length).toBe(2);
    // Each column should have roughly half the checkboxes
    const col1Checkboxes = columns[0].querySelectorAll("input[type=checkbox]");
    const col2Checkboxes = columns[1].querySelectorAll("input[type=checkbox]");
    expect(col1Checkboxes.length + col2Checkboxes.length).toBe(OPTIONS.length);
  });

  it("checks the correct checkboxes based on checkedOptions", () => {
    render(
      <DetailsCheckboxAccordion
        title="My Title"
        name="test"
        options={OPTIONS}
        checkedOptions={["B", "D"]}
      />,
    );
    expect(screen.getByLabelText("B")).toBeChecked();
    expect(screen.getByLabelText("D")).toBeChecked();
    expect(screen.getByLabelText("A")).not.toBeChecked();
  });

  it("updates checked state when a checkbox is clicked", () => {
    render(
      <DetailsCheckboxAccordion
        title="My Title"
        name="test"
        options={OPTIONS}
        checkedOptions={["A"]}
      />,
    );
    const checkboxB = screen.getByLabelText("B");
    expect(checkboxB).not.toBeChecked();
    fireEvent.click(checkboxB);
    expect(checkboxB).toBeChecked();
    // Clicking again should uncheck
    fireEvent.click(checkboxB);
    expect(checkboxB).not.toBeChecked();
  });

  it("returns null if options is empty", () => {
    const { container } = render(
      <DetailsCheckboxAccordion
        title="Empty"
        name="empty"
        options={[]}
        checkedOptions={[]}
      />,
    );
    expect(container.firstChild).toBeNull();
  });
});

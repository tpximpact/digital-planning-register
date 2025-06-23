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

import { AccordionSection } from "@/components/Accordion";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("AccordionSection", () => {
  it("renders the title", () => {
    render(
      <AccordionSection title="Section Title" name="section1">
        Content
      </AccordionSection>,
    );
    expect(screen.getByText("Section Title")).toBeInTheDocument();
  });

  it("renders the summary if provided", () => {
    render(
      <AccordionSection
        title="Section Title"
        name="section1"
        summary="Summary text"
      >
        Content
      </AccordionSection>,
    );
    expect(screen.getByText("Summary text")).toBeInTheDocument();
  });

  it("does not render the summary if not provided", () => {
    render(
      <AccordionSection title="Section Title" name="section1">
        Content
      </AccordionSection>,
    );
    expect(screen.queryByText("Summary text")).not.toBeInTheDocument();
  });

  it("renders children inside the content div", () => {
    render(
      <AccordionSection title="Section Title" name="section1">
        <span>Accordion Content</span>
      </AccordionSection>,
    );
    expect(screen.getByText("Accordion Content")).toBeInTheDocument();
  });

  it("sets the open attribute when open prop is true", () => {
    render(
      <AccordionSection title="Section Title" name="section1" open>
        Content
      </AccordionSection>,
    );
    const details =
      screen.getByRole("group", { hidden: true }) ||
      screen.getByText("Section Title").closest("details");
    expect(details).toHaveAttribute("open");
  });

  it("does not set the open attribute when open prop is false", () => {
    render(
      <AccordionSection title="Section Title" name="section1">
        Content
      </AccordionSection>,
    );
    const details =
      screen.getByRole("group", { hidden: true }) ||
      screen.getByText("Section Title").closest("details");
    expect(details).not.toHaveAttribute("open");
  });
});

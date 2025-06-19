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
import { render, screen, fireEvent } from "@testing-library/react";
import { Accordion, AccordionSection } from "@/components/Accordion";
import React from "react";
import { describe } from "node:test";

// Helper to render with sections
function renderAccordion(
  props?: Partial<React.ComponentProps<typeof Accordion>>,
) {
  return render(
    <Accordion name="test-accordion" {...props}>
      <AccordionSection title="Section 1" name="section1">
        Content 1
      </AccordionSection>
      <AccordionSection title="Section 2" name="section2">
        Content 2
      </AccordionSection>
    </Accordion>,
  );
}

describe("Accordion", () => {
  it("renders the accordion and its sections", () => {
    renderAccordion();
    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
  });

  it("shows the toggle button when JS is enabled", () => {
    renderAccordion();
    expect(
      screen.getByRole("button", { name: /show all sections/i }),
    ).toBeInTheDocument();
  });

  it("toggles all sections open and closed when button is clicked", () => {
    renderAccordion();
    const button = screen.getByRole("button", { name: /show all sections/i });
    // Initially, sections should not have open attribute
    const details =
      (screen.getAllByRole("group", {
        hidden: true,
      }) as HTMLDetailsElement[]) ||
      screen.getAllByText(/Section \d/).map((el) => el.closest("details"));
    details.forEach((d) => expect(d).not.toHaveAttribute("open"));

    // Click to open all
    fireEvent.click(button);
    details.forEach((d) => expect(d).toHaveAttribute("open"));

    // Button text should change
    expect(button).toHaveTextContent(/hide all sections/i);

    // Click to close all
    fireEvent.click(button);
    details.forEach((d) => expect(d).not.toHaveAttribute("open"));
    expect(button).toHaveTextContent(/show all sections/i);
  });

  it("respects open={true} on a child section initially", () => {
    render(
      <Accordion name="test-accordion">
        <AccordionSection title="Section 1" name="section1" open>
          Content 1
        </AccordionSection>
        <AccordionSection title="Section 2" name="section2">
          Content 2
        </AccordionSection>
      </Accordion>,
    );
    const details = screen
      .getAllByText(/Section \d/)
      .map((el) => el.closest("details"));
    expect(details[0]).toHaveAttribute("open");
    expect(details[1]).not.toHaveAttribute("open");
  });

  it("updates the aria-expanded attribute on the toggle button", () => {
    renderAccordion();
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});

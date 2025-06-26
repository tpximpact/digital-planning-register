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
"use client";
import React, { useRef, useCallback, useState, useEffect } from "react";
import "./Accordion.scss";

export interface AccordionProps {
  name: string;
  children: React.ReactNode;
}

export function Accordion({ name, children }: AccordionProps) {
  // we're using ref here as this is client side only component and we're using the <details> element for accessibility and non-JS users
  const containerRef = useRef<HTMLDivElement>(null);
  const [allOpen, setAllOpen] = useState(false);

  // check if any sections are open and update the state accordingly
  // This effect runs only on the client side after the component mounts
  useEffect(() => {
    if (!containerRef.current) return;
    const sections = containerRef.current.querySelectorAll<HTMLDetailsElement>(
      ".dpr-accordion-section",
    );
    // Handler to check if any <details> are open
    const checkAnyOpen = () => {
      const anyAreOpen = Array.from(sections).some((d) => d.open);
      setAllOpen(anyAreOpen);
    };
    // Add event listeners to all <details>
    sections.forEach((details) => {
      details.addEventListener("toggle", checkAnyOpen);
    });
    // Initial check
    checkAnyOpen();
    // Cleanup
    return () => {
      sections.forEach((details) => {
        details.removeEventListener("toggle", checkAnyOpen);
      });
    };
  }, []);

  // hide the toggle button if there are < 2 sections
  useEffect(() => {
    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll<HTMLDetailsElement>(
      ".dpr-accordion-section",
    );
    const accordion = containerRef.current;

    if (accordion) {
      if (sections.length < 2) {
        accordion.classList.add("dpr-accordion--no-controls");
      } else {
        accordion.classList.remove("dpr-accordion--no-controls");
      }
    }
  }, []);

  /**
   * Handles the toggle of all sections in the accordion
   * When the button is clicked, it toggles the open state of all sections.
   * It also updates the `aria-expanded` attribute of the button
   * and sets the `open` attribute on each section accordingly.
   * @param {React.MouseEvent<HTMLButtonElement>} event - The click event from the button.
   * @returns {void}
   * @example
   * <button onClick={handleShowAll}>Toggle All Sections</button>
   */
  const handleShowAll = useCallback(() => {
    setAllOpen((prev) => {
      const nextOpen = !prev;
      if (containerRef.current) {
        const sections =
          containerRef.current.querySelectorAll<HTMLDetailsElement>(
            ".dpr-accordion-section",
          );
        sections.forEach((section) => {
          if (nextOpen) {
            section.setAttribute("open", "");
          } else {
            section.removeAttribute("open");
          }
        });
      }
      return nextOpen;
    });
  }, []);

  return (
    <div className={`dpr-accordion`} id={name} ref={containerRef}>
      <div className="dpr-accordion__controls">
        <button
          type="button"
          className="dpr-accordion__toggle-button"
          aria-expanded={allOpen}
          onClick={handleShowAll}
        >
          <span
            className={`dpr-accordion__chevron  ${allOpen ? "" : "dpr-accordion__chevron--down"}`}
          ></span>
          <span className="dpr-accordion__toggle-button-text">
            {allOpen ? "Hide all sections" : "Show all sections"}
          </span>
        </button>
      </div>
      {children}
    </div>
  );
}

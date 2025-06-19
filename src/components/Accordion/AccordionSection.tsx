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
import "./AccordionSection.scss";

export interface AccordionSectionProps {
  title: string;
  name: string;
  summary?: string;
  open?: boolean;
  children: React.ReactNode;
}

export function AccordionSection({
  title,
  name,
  summary,
  open,
  children,
}: AccordionSectionProps) {
  return (
    <details
      className="dpr-accordion-section"
      name={name}
      {...(open ? { open: true } : {})}
    >
      <summary>
        <p className="govuk-heading-m" role="heading" aria-level={2}>
          <span>
            <span className="govuk-visually-hidden">Open section: </span>
            {title}
          </span>
        </p>
        {summary && (
          <p className="govuk-body">
            <span>{summary}</span>
          </p>
        )}
        <div className="dpr-accordion-section__chevron" aria-hidden={true}>
          <span></span>
        </div>
      </summary>
      <div className="dpr-accordion-section__content">{children}</div>
    </details>
  );
}

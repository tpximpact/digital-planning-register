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
import { SentimentIcon } from "@/components/SentimentIcon";

describe("SentimentIcon", () => {
  it("renders NeutralIcon for 'neutral'", () => {
    const { container } = render(<SentimentIcon sentiment="neutral" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("neutral-face");
  });

  it("renders SupportIcon for 'supportive'", () => {
    const { container } = render(<SentimentIcon sentiment="supportive" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("support-face");
  });

  it("renders OpposedIcon for 'objection'", () => {
    const { container } = render(<SentimentIcon sentiment="objection" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("opposed-face");
  });

  it("renders ApprovedIcon for 'approved'", () => {
    const { container } = render(<SentimentIcon sentiment="approved" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("approved");
  });

  it("renders AmendmentsNeededIcon for 'amendmentsNeeded'", () => {
    const { container } = render(
      <SentimentIcon sentiment="amendmentsNeeded" />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("amendmentsNeeded");
  });

  it("renders ObjectedIcon for 'objected'", () => {
    const { container } = render(<SentimentIcon sentiment="objected" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("objected");
  });

  it("renders nothing for unknown sentiment", () => {
    const { container } = render(<SentimentIcon sentiment="unknown" />);
    expect(container).toBeEmptyDOMElement();
  });
});

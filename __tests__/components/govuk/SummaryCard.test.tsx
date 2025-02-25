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

import { SummaryCard, SummaryCardProps } from "@/components/govuk/SummaryCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const defaultProps: SummaryCardProps = {
  title: { text: "Card Title" },
  children: null,
};

describe("SummaryCard", () => {
  it("renders the title", () => {
    render(<SummaryCard {...defaultProps} />);
    const titleElement = screen.getByRole("heading", { level: 2 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent("Card Title");
  });

  it("renders the title with defined heading", () => {
    const newProps: SummaryCardProps = {
      ...defaultProps,
      title: {
        ...defaultProps.title,
        headingLevel: "3",
      },
    };
    render(<SummaryCard {...newProps} />);
    const titleElement = screen.getByRole("heading", { level: 3 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent("Card Title");
  });
  it("renders a single action", () => {
    const actions = {
      items: [
        {
          href: "#",
          text: "Action 1",
          visuallyHiddenText: "Action 1 hidden text",
        },
      ],
    };
    render(
      <SummaryCard title={defaultProps.title} actions={actions}>
        {null}
      </SummaryCard>,
    );
    const actionLink = screen.getByText("Action 1");
    expect(actionLink).toBeInTheDocument();
    expect(actionLink).toHaveAttribute("href", "#");
  });
  it("renders multiple actions", () => {
    const actions = {
      items: [
        {
          href: "#",
          text: "Action 1",
          visuallyHiddenText: "Action 1 hidden text",
        },
        {
          href: "#",
          text: "Action 2",
          visuallyHiddenText: "Action 2 hidden text",
        },
      ],
    };
    render(
      <SummaryCard title={defaultProps.title} actions={actions}>
        {null}
      </SummaryCard>,
    );
    const actionLinks = screen.getAllByRole("link");
    expect(actionLinks).toHaveLength(2);
    expect(actionLinks[0]).toHaveTextContent("Action 1");
    expect(actionLinks[1]).toHaveTextContent("Action 2");
  });
  it("renders children", () => {
    render(
      <SummaryCard title={defaultProps.title} actions={defaultProps.actions}>
        <div>Child Content</div>
      </SummaryCard>,
    );
    const childContent = screen.getByText("Child Content");
    expect(childContent).toBeInTheDocument();
  });
});

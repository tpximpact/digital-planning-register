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
import {
  SummaryList,
  SummaryListProps,
} from "@/components/govuk/SummaryList/SummaryList";

describe("SummaryList Component", () => {
  const defaultProps: SummaryListProps = {
    rows: [
      {
        key: { text: "Key 1" },
        value: { text: "Value 1" },
        actions: {
          items: [
            {
              href: "#",
              text: "Action 1",
              visuallyHiddenText: "Action 1 hidden text",
            },
          ],
        },
      },
      {
        key: { text: "Key 2" },
        value: { text: "Value 2" },
      },
    ],
    cardTitle: { text: "Card Title" },
  };

  it("renders without crashing", () => {
    render(<SummaryList {...defaultProps} />);
    expect(screen.getByText("Key 1")).toBeInTheDocument();
    expect(screen.getByText("Value 1")).toBeInTheDocument();
    expect(screen.getByText("Action 1")).toBeInTheDocument();
    expect(screen.getByText("Key 2")).toBeInTheDocument();
    expect(screen.getByText("Value 2")).toBeInTheDocument();
  });

  it("renders actions correctly", () => {
    render(<SummaryList {...defaultProps} />);
    const actionLink = screen.getByText("Action 1");
    expect(actionLink).toBeInTheDocument();
    expect(actionLink).toHaveAttribute("href", "#");
    const hiddenText = screen.getByText("Action 1 hidden text Card Title");
    expect(hiddenText).toBeInTheDocument();
  });

  it("renders without actions", () => {
    const propsWithoutActions: SummaryListProps = {
      rows: [
        {
          key: { text: "Key 1" },
          value: { text: "Value 1" },
        },
      ],
    };
    render(<SummaryList {...propsWithoutActions} />);
    expect(screen.getByText("Key 1")).toBeInTheDocument();
    expect(screen.getByText("Value 1")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders multiple actions correctly", () => {
    const propsWithMultipleActions: SummaryListProps = {
      rows: [
        {
          key: { text: "Key 1" },
          value: { text: "Value 1" },
          actions: {
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
          },
        },
      ],
    };
    render(<SummaryList {...propsWithMultipleActions} />);
    expect(screen.getByText("Action 1")).toBeInTheDocument();
    expect(screen.getByText("Action 2")).toBeInTheDocument();
  });

  it("applies no-border class when noBorder is true", () => {
    const propsWithNoBorder: SummaryListProps = {
      ...defaultProps,
      noBorder: true,
    };
    const { container } = render(<SummaryList {...propsWithNoBorder} />);
    // dl doesn't have a role attribute
    const summaryList = container.firstChild;
    expect(summaryList).toHaveClass("govuk-summary-list--no-border");
  });

  it("renders JSX elements in key and value", () => {
    const propsWithJSX: SummaryListProps = {
      rows: [
        {
          key: { text: <strong>Key 1</strong> },
          value: { text: <em>Value 1</em> },
        },
      ],
    };
    render(<SummaryList {...propsWithJSX} />);
    expect(screen.getByText("Key 1")).toBeInTheDocument();
    expect(screen.getByText("Value 1")).toBeInTheDocument();
  });

  it("renders correctly with empty rows", () => {
    const propsWithEmptyRows: SummaryListProps = {
      rows: [],
    };
    render(<SummaryList {...propsWithEmptyRows} />);
    expect(screen.queryByText("Key 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Value 1")).not.toBeInTheDocument();
  });
});

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
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ApplicationConstraints } from "@/components/ApplicationConstraints/ApplicationConstraints";
import { fetchConstraintData } from "@/components/ApplicationConstraints/ApplicationConstraints.data";
import type {
  PlanningConstraint,
  PlanningDesignation,
} from "digital-planning-data-schemas/types/shared/Constraints.ts";

jest.mock(
  "@/components/ApplicationConstraints/ApplicationConstraints.data",
  () => ({
    fetchConstraintData: jest.fn(),
  }),
);
jest.mock(
  "@/components/ApplicationConstraints/ApplicationConstraintsConstraint",
  () => ({
    ApplicationConstraintsConstraint: jest.fn(({ constraint }) => (
      <div data-testid={`constraint-${constraint.name}`}>
        {constraint.description}
      </div>
    )),
  }),
);

const mockConstraintsGroup: (PlanningDesignation | PlanningConstraint)[] = [
  {
    value: "articleFour",
    description: "Article 4 direction area",
    intersects: true,
    entities: [
      {
        name: "Whole District excluding the Town of Chesham - Poultry production.",
        description:
          "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
        source: {
          text: "Planning Data",
          url: "https://www.planning.data.gov.uk/entity/7010002192",
        },
      },
      {
        name: "Stock Lane - Classified Unnumbered",
        source: {
          text: "Ordnance Survey MasterMap Highways",
        },
      },
    ],
  },
  {
    value: "articleFour.caz",
    description: "Central Activities Zone (CAZ)",
    intersects: false,
  },
  {
    value: "tpo",
    description: "Tree Preservation Order (TPO) or zone",
    intersects: false,
  },
  {
    value: "non intersecting constraint group value",
    description: "non intersecting constraint group description",
    intersects: false,
  },
  {
    value: "non intersecting constraint group value",
    description: "non intersecting constraint group description",
    intersects: true,
    entities: [
      {
        name: "Whole District excluding the Town of Chesham - Poultry production.",
        description:
          "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
        source: {
          text: "Planning Data",
          url: "https://www.planning.data.gov.uk/entity/7010002192",
        },
      },
      {
        name: "Stock Lane - Classified Unnumbered",
        source: {
          text: "Ordnance Survey MasterMap Highways",
        },
      },
    ],
  },
];

describe("ApplicationConstraints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing if constraints is empty", () => {
    const { container } = render(<ApplicationConstraints constraints={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders heading and hint", () => {
    render(<ApplicationConstraints constraints={mockConstraintsGroup} />);
    expect(screen.getByText("Constraints")).toBeInTheDocument();
    expect(
      screen.getByText(/These policies apply to this application/i),
    ).toBeInTheDocument();
  });

  it("renders only intersecting constraints in Accordion", () => {
    render(<ApplicationConstraints constraints={mockConstraintsGroup} />);

    const constraintNodes = screen.queryAllByTestId(
      (testId) =>
        typeof testId === "string" && testId.startsWith("constraint-"),
    );

    const renderedConstraintNames = constraintNodes.map((node) =>
      node.getAttribute("data-testid")?.replace("constraint-", ""),
    );

    const expectedConstraintNames = [
      "Whole District excluding the Town of Chesham - Poultry production.",
      "Stock Lane - Classified Unnumbered",
      "Whole District excluding the Town of Chesham - Poultry production.",
      "Stock Lane - Classified Unnumbered",
    ];

    expect(renderedConstraintNames.sort()).toEqual(
      expectedConstraintNames.sort(),
    );

    expect(renderedConstraintNames.length).toBe(4);
  });

  it("shows loading when section is opened and fetch is pending", async () => {
    (fetchConstraintData as jest.Mock).mockImplementation(
      () => new Promise(() => {}),
    );
    render(<ApplicationConstraints constraints={mockConstraintsGroup} />);
    const summary = screen
      .getByRole("heading", {
        name: "Open section: Article 4 direction area: Whole District excluding the Town of Chesham - Poultry production.",
      })
      .closest("summary");
    fireEvent.click(summary!);
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });

  it("loads and displays fetched constraint data when section is opened", async () => {
    (fetchConstraintData as jest.Mock).mockResolvedValue({
      value: "a",
      description: "Fetched Constraint A",
      intersects: true,
    });
    render(<ApplicationConstraints constraints={mockConstraintsGroup} />);
    const summary = screen
      .getByRole("heading", {
        name: "Open section: Article 4 direction area: Whole District excluding the Town of Chesham - Poultry production.",
      })
      .closest("summary");
    fireEvent.click(summary!);
    await waitFor(() =>
      expect(screen.getByText("Fetched Constraint A")).toBeInTheDocument(),
    );
  });
});

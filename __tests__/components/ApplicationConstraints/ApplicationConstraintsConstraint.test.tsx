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
import { render, screen } from "@testing-library/react";
import { ApplicationConstraintsConstraint } from "@/components/ApplicationConstraints/ApplicationConstraintsConstraint";
import type {
  PlanningConstraint,
  PlanningDesignation,
} from "digital-planning-data-schemas/types/shared/Constraints.ts";
import { DprDesignationConstraint } from "@/components/ApplicationConstraints";

// Mock ApplicationMapLoader
jest.mock("@/components/ApplicationMap", () => ({
  ApplicationMapLoader: jest.fn(() => <div data-testid="mock-map" />),
}));

// NonIntersectingPlanningDesignation
const testNonIntersectingPlanningDesignation: PlanningDesignation = {
  value: "nature.SAC",
  description: "Special Area of Conservation (SAC)",
  intersects: false,
};

// IntersectingPlanningDesignation
const testIntersectingPlanningDesignation: PlanningDesignation = {
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
};

// NonIntersectingPlanningConstraint
const testNonIntersectingPlanningConstraint: PlanningConstraint = {
  value: "any value non intersecting",
  description: "any description",
  intersects: false,
};

// IntersectingPlanningConstraint
const testIntersectingPlanningConstraint: PlanningConstraint = {
  value: "any value intersecting",
  description: "any description",
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
};

describe.only("ApplicationConstraintsConstraint", () => {
  describe("When no data has been loaded for the constraint", () => {
    it("Should render the default values for a NonIntersectingPlanningDesignation", () => {
      render(
        <ApplicationConstraintsConstraint
          constraint={testNonIntersectingPlanningDesignation}
        />,
      );

      expect(
        screen.getByText("Special Area of Conservation (SAC)"),
      ).toBeInTheDocument();
    });
    it("Should render the default values for a IntersectingPlanningDesignation", () => {
      render(
        <ApplicationConstraintsConstraint
          constraint={testIntersectingPlanningDesignation}
        />,
      );

      expect(screen.getByText("Article 4 direction area")).toBeInTheDocument();

      //first entity
      expect(
        screen.getByText(
          "Whole District excluding the Town of Chesham - Poultry production.",
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
        ),
      ).toBeInTheDocument();
      const firstEntityLink = screen.getByRole("link", {
        name: "https://www.planning.data.gov.uk/entity/7010002192",
      });
      expect(firstEntityLink).toBeInTheDocument();
      expect(firstEntityLink).toHaveAttribute(
        "href",
        "https://www.planning.data.gov.uk/entity/7010002192",
      );

      // second entity
      expect(
        screen.getByText("Stock Lane - Classified Unnumbered"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Ordnance Survey MasterMap Highways"),
      ).toBeInTheDocument();
    });
    it("Should render the default values for a NonIntersectingPlanningConstraint", () => {
      render(
        <ApplicationConstraintsConstraint
          constraint={testNonIntersectingPlanningConstraint}
        />,
      );
      expect(screen.getByText("any description")).toBeInTheDocument();
    });
    it("Should render the default values for a IntersectingPlanningConstraint", () => {
      render(
        <ApplicationConstraintsConstraint
          constraint={testIntersectingPlanningConstraint}
        />,
      );

      expect(screen.getByText("any description")).toBeInTheDocument();

      //first entity
      expect(
        screen.getByText(
          "Whole District excluding the Town of Chesham - Poultry production.",
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
        ),
      ).toBeInTheDocument();
      const firstEntityLink = screen.getByRole("link", {
        name: "https://www.planning.data.gov.uk/entity/7010002192",
      });
      expect(firstEntityLink).toBeInTheDocument();
      expect(firstEntityLink).toHaveAttribute(
        "href",
        "https://www.planning.data.gov.uk/entity/7010002192",
      );

      // second entity
      expect(
        screen.getByText("Stock Lane - Classified Unnumbered"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Ordnance Survey MasterMap Highways"),
      ).toBeInTheDocument();
    });
  });

  const baseConstraint: DprDesignationConstraint = {
    description: "Test constraint description",
    value: "test",
    intersects: true,
  };

  it("renders the constraint description", () => {
    render(<ApplicationConstraintsConstraint constraint={baseConstraint} />);
    expect(screen.getByText("Test constraint description")).toBeInTheDocument();
  });

  it("renders entity name and description when no data is loaded", () => {
    const constraint: DprDesignationConstraint = {
      ...baseConstraint,
      entities: [
        {
          name: "Entity 1",
          description: "Entity 1 description",
          source: { text: "Planning Data", url: "https://example.com" },
        },
      ],
    };
    render(<ApplicationConstraintsConstraint constraint={constraint} />);
    expect(screen.getByText("Entity 1")).toBeInTheDocument();
    expect(screen.getByText("Entity 1 description")).toBeInTheDocument();

    const entityLink = screen.getByRole("link", {
      name: "https://example.com",
    });
    expect(entityLink).toBeInTheDocument();
    expect(entityLink).toHaveAttribute("href", "https://example.com");
  });

  it("renders loaded entity data fields", () => {
    const constraint: DprDesignationConstraint = {
      ...baseConstraint,
      entities: [
        {
          name: "Entity 2",
          source: { text: "Planning Data", url: "https://example.com" },
          data: {
            name: "Loaded Name",
            description: "Loaded description",
            reference: "REF123",
            entryDate: "2024-01-01",
            startDate: "2024-01-02",
            endDate: "2024-01-03",
            designationDate: "2024-01-04",
            geometry: {
              type: "Feature",
              geometry: {
                type: "MultiPolygon",
                coordinates: [
                  [
                    [
                      [-0.750518, 51.687475],
                      [-0.749934, 51.687746],
                      [-0.749934, 51.687746],
                      [-0.750518, 51.687475],
                    ],
                  ],
                ],
              },
              properties: {},
            },
            documentUrl: "https://doc.example.com",
            documentationUrl: "https://docu.example.com",
            dataset: "test-dataset",
            entity: 42,
          },
        },
      ],
    };
    render(<ApplicationConstraintsConstraint constraint={constraint} />);
    expect(screen.getByText("Loaded Name")).toBeInTheDocument();
    expect(screen.getByText("Loaded description")).toBeInTheDocument();
    expect(screen.getByText("REF123")).toBeInTheDocument();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("2024-01-02")).toBeInTheDocument();
    expect(screen.getByText("2024-01-03")).toBeInTheDocument();
    expect(screen.getByText("2024-01-04")).toBeInTheDocument();
    expect(screen.getByTestId("mock-map")).toBeInTheDocument();
    expect(screen.getByText("https://doc.example.com")).toBeInTheDocument();
    expect(screen.getByText("https://docu.example.com")).toBeInTheDocument();
  });

  it("renders multiple entities", () => {
    const constraint: DprDesignationConstraint = {
      ...baseConstraint,
      entities: [
        {
          name: "Entity 1",
          source: { text: "Ordnance Survey MasterMap Highways" },
        },
        {
          name: "Entity 2",
          source: { text: "Ordnance Survey MasterMap Highways" },
        },
      ],
    };
    render(<ApplicationConstraintsConstraint constraint={constraint} />);
    expect(screen.getByText("Entity 1")).toBeInTheDocument();
    expect(screen.getByText("Entity 2")).toBeInTheDocument();
    expect(
      screen.getAllByText("Ordnance Survey MasterMap Highways").length,
    ).toBe(2);
  });

  it("renders only the source text if url is not present", () => {
    const constraint: DprDesignationConstraint = {
      ...baseConstraint,
      entities: [
        {
          name: "Entity 3",
          source: { text: "Ordnance Survey MasterMap Highways" },
        },
      ],
    };
    render(<ApplicationConstraintsConstraint constraint={constraint} />);
    expect(
      screen.getByText("Ordnance Survey MasterMap Highways"),
    ).toBeInTheDocument();
  });

  it("renders nothing for empty entities array", () => {
    const constraint = {
      ...baseConstraint,
      entities: [],
    };
    const { container } = render(
      <ApplicationConstraintsConstraint constraint={constraint} />,
    );
    // Only the description should be present
    expect(container).toHaveTextContent("Test constraint description");
  });
});

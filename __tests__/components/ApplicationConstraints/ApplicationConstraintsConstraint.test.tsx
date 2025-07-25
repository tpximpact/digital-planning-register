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
import { DprPlanningDataEntity } from "@/components/ApplicationConstraints";

// Mock ApplicationMapLoader
jest.mock("@/components/ApplicationMap", () => ({
  ApplicationMapLoader: jest.fn(() => <div data-testid="mock-map" />),
}));

describe("ApplicationConstraintsConstraint", () => {
  describe("When no data has been loaded for the constraint", () => {
    it("Should render the default values for a constraint", () => {
      const constraint: DprPlanningDataEntity = {
        name: "Entity 2",
        source: { text: "Planning Data", url: "https://example.com" },
      };
      const { container } = render(
        <ApplicationConstraintsConstraint constraint={constraint} />,
      );

      // Check only one <p> is rendered
      const paragraphs = container.querySelectorAll("p");
      expect(paragraphs).toHaveLength(1);

      // Check that the <p> contains "Source:"
      expect(paragraphs[0]).toHaveTextContent("Source:");
    });
  });

  describe("When data has been loaded for the constraint", () => {
    it("Should render the loaded values for a constraint", () => {
      const constraint: DprPlanningDataEntity = {
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
      };
      render(<ApplicationConstraintsConstraint constraint={constraint} />);
      // no name as thats in the accordion title
      expect(screen.queryByText("Loaded Name")).not.toBeInTheDocument();
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

    it("renders only the source text if url is not present", () => {
      const constraint: DprPlanningDataEntity = {
        name: "Entity 3",
        source: { text: "Ordnance Survey MasterMap Highways" },
      };
      render(<ApplicationConstraintsConstraint constraint={constraint} />);
      expect(
        screen.getByText("Ordnance Survey MasterMap Highways"),
      ).toBeInTheDocument();
    });
  });
});

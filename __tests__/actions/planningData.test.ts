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

import { fetchEntityFromPlanningData } from "@/actions/planningData";
import { getAppConfig } from "@/config";
import wkt from "wkt";

// Mock dependencies
jest.mock("@/config", () => ({
  getAppConfig: jest.fn(),
}));
jest.mock("wkt", () => ({
  parse: jest.fn(),
}));

const mockAppConfig = {
  defaults: { revalidate: 123 },
};

describe("fetchEntityFromPlanningData", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    (getAppConfig as jest.Mock).mockReturnValue(mockAppConfig);
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  const mockGeoJson = {
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
  };
  (wkt.parse as jest.Mock).mockReturnValue(mockGeoJson);

  const genericGeometry =
    "MULTIPOLYGON (((-0.750518 51.687475, -0.749934 51.687746, -0.749934 51.687746, -0.750518 51.687475)))";

  const datasetCases = [
    {
      name: "article-4-direction-area",
      entity: 7010002192,
      responseData: {
        "entry-date": "2025-01-08",
        "start-date": "2059-01-15",
        "end-date": "",
        entity: 7010002192,
        name: "Whole District excluding the Town of Chesham - Poultry production.",
        dataset: "article-4-direction-area",
        typology: "geography",
        reference: "112",
        prefix: "article-4-direction-area",
        "organisation-entity": "67",
        geometry: genericGeometry,
        point: "POINT (-0.629691 51.678294)",
        description:
          "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
      },
      expectedProperties: {
        name: "Whole District excluding the Town of Chesham - Poultry production.",
        dataset: "article-4-direction-area",
        entity: 7010002192,
        reference: "112",
        description:
          "Bucks County Council Town and Country Planning Act 1947 Town and Country Planning General Development Order 1950. Re Whole District excluding the Town of Chesham. In relation to poultry production.",
        geometry: {
          type: "Feature",
          geometry: mockGeoJson,
          properties: {
            name: "Whole District excluding the Town of Chesham - Poultry production.",
            dataset: "article-4-direction-area",
            entity: 7010002192,
          },
        },
        documentUrl: undefined,
        documentationUrl: undefined,
        entryDate: "2025-01-08",
        startDate: "2059-01-15",
        endDate: undefined,
        designationDate: undefined,
      },
    },
    {
      name: "flood-risk-zone",
      entity: 65104983,
      responseData: {
        "entry-date": "2023-08-24",
        "start-date": "",
        "end-date": "",
        entity: 65104983,
        name: "",
        dataset: "flood-risk-zone",
        typology: "geography",
        reference: "104984/2",
        prefix: "flood-risk-zone",
        "organisation-entity": "600009",
        geometry: genericGeometry,
        point: "POINT (-2.861575 51.287561)",
        "flood-risk-type": "Fluvial Models",
        "flood-risk-level": "2",
      },
      expectedProperties: {
        name: undefined,
        dataset: "flood-risk-zone",
        entity: 65104983,
        reference: "104984/2",
        description: undefined,
        geometry: {
          type: "Feature",
          geometry: mockGeoJson,
          properties: {
            name: undefined,
            dataset: "flood-risk-zone",
            entity: 65104983,
          },
        },
        documentUrl: undefined,
        documentationUrl: undefined,
        entryDate: "2023-08-24",
        startDate: undefined,
        endDate: undefined,
        designationDate: undefined,
      },
    },
  ];

  it.each(datasetCases)(
    "returns parsed data and status for a successful response with geometry for $name",
    async ({ entity, responseData, expectedProperties }) => {
      (wkt.parse as jest.Mock).mockReturnValueOnce(mockGeoJson);

      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: "OK",
        json: jest.fn().mockResolvedValue(responseData),
      });

      const result = await fetchEntityFromPlanningData(entity);

      expect(getAppConfig).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        `https://www.planning.data.gov.uk/entity/${entity}.json`,
        expect.objectContaining({
          method: "GET",
          next: { revalidate: 123 },
        }),
      );
      expect(wkt.parse).toHaveBeenCalledWith(responseData.geometry);
      expect(result.data).toEqual(expectedProperties);
      expect(result.status).toEqual({ code: 200, message: "OK" });
    },
  );

  it("returns parsed data and status for a successful response without geometry", async () => {
    const mockResponseData = {
      name: "Test Name",
      dataset: "test-dataset",
      entity: 123,
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      json: jest.fn().mockResolvedValue(mockResponseData),
    });

    const result = await fetchEntityFromPlanningData(123);

    expect(result.data?.geometry).toBeUndefined();
    expect(result.status).toEqual({ code: 200, message: "OK" });
  });

  it("returns error status and detail for non-2xx response", async () => {
    const errorData = { error: "Not found" };
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: jest.fn().mockResolvedValue(errorData),
    });

    const result = await fetchEntityFromPlanningData(999);

    expect(result.data).toBeNull();
    expect(result.status).toEqual({
      code: 404,
      message: "Not Found",
      detail: errorData,
    });
  });

  it("returns error status and message for thrown error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    const result = await fetchEntityFromPlanningData(123);

    expect(result.data).toBeNull();
    expect(result.status.code).toBe(500);
    expect(result.status.message).toBe("Internal server error");
    expect(result.status.detail).toBe("Network error");
  });
});

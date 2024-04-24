import ApplicationInformation from "@/components/application_information";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../../src/components/map", () => {
  return jest.fn(() => <div data-testid="mockMap"></div>);
});

describe("Render ApplicationInformation", () => {
  const mockData = {
    reference_in_full: "AAA_BBB_CCC_DDD",
    application_type: "planning_application",
    site: {
      address_1: "40, TEST ROAD",
      postcode: "AB1 CD2",
    },
    received_date: "2024-03-18T00:00:00.000+00:00",
    result_flag: null,
    determination_date: "2024-03-19",
    status: "not_started",
    consultation: { end_date: "2024-04-08" },
    description: "Simple description",
    boundary_geojson: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [0, 0],
            [1, 1],
            [1, 0],
            [0, 0],
          ],
        ],
      },
    },
  };

  it("should render correctly with Polygon geometry", () => {
    render(<ApplicationInformation {...mockData} />);
    expect(
      screen.getByRole("application-reference", {
        Name: mockData.reference_in_full,
      }),
    );
    expect(
      screen.getByRole("application-type", { Name: mockData.application_type }),
    );
    expect(screen.getByRole("application-status", { Name: "not started" }));
    const mapComponent = screen.getByTestId("mockMap");
    expect(mapComponent).toBeInTheDocument();

    expect(
      screen.getByRole("application-description", {
        Name: mockData.description,
      }),
    );
  });

  it("should render correctly with MultiPolygon geometry", () => {
    const mockDataWithMultiPolygon = {
      ...mockData,
      boundary_geojson: {
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [0, 0],
                [1, 1],
                [1, 0],
                [0, 0],
              ],
            ],
            [
              [
                [2, 2],
                [3, 3],
                [3, 2],
                [2, 2],
              ],
            ],
          ],
        },
      },
    };

    render(<ApplicationInformation {...mockDataWithMultiPolygon} />);
    expect(
      screen.getByRole("application-reference", {
        Name: mockDataWithMultiPolygon.reference_in_full,
      }),
    );
    expect(
      screen.getByRole("application-type", {
        Name: mockDataWithMultiPolygon.application_type,
      }),
    );
    expect(screen.getByRole("application-status", { Name: "not started" }));
    const mapComponent = screen.getByTestId("mockMap");
    expect(mapComponent).toBeInTheDocument();
  });

  it("should render correctly with FeatureCollection", () => {
    const mockDataWithFeatureCollection = {
      ...mockData,
      boundary_geojson: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [0, 0],
                  [1, 1],
                  [1, 0],
                  [0, 0],
                ],
              ],
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [2, 2],
                  [3, 3],
                  [3, 2],
                  [2, 2],
                ],
              ],
            },
          },
        ],
      },
    };

    render(<ApplicationInformation {...mockDataWithFeatureCollection} />);
    expect(
      screen.getByRole("application-reference", {
        Name: mockDataWithFeatureCollection.reference_in_full,
      }),
    );
    expect(
      screen.getByRole("application-type", {
        Name: mockDataWithFeatureCollection.application_type,
      }),
    );
    expect(screen.getByRole("application-status", { Name: "not started" }));
    const mapComponent = screen.getByTestId("mockMap");
    expect(mapComponent).toBeInTheDocument();
  });
});

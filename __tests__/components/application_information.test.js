import ApplicationInformation from "@/components/application_information";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../../src/components/map", () => {
  return jest.fn(() => <div data-testid="mockMap"></div>);
});

// Mock the dynamic import
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => {
    const DynamicComponent = (props) => <div data-testid="mockMap"></div>;
    DynamicComponent.displayName = "LoadableComponent";
    return DynamicComponent;
  },
}));

describe("Render ApplicationInformation", () => {
  const mockData = {
    reference: "AAA_BBB_CCC_DDD",
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
    council: "test_council",
    id: 123,
    decision: null,
    in_assessment_at: null,
  };

  it("should render correctly with Polygon geometry", () => {
    render(<ApplicationInformation {...mockData} />);
    const mapComponent = screen.getByTestId("mockMap");
    expect(mapComponent).toBeInTheDocument();
  });

  it("should not show determined_at date if decision is null", () => {
    render(<ApplicationInformation {...mockData} />);
    expect(screen.queryByText("Decision")).toBeNull();
  });
});

describe("Render ApplicationInformation", () => {
  const mockData = {
    reference: "AAA_BBB_CCC_DDD",
    application_type: "planning_application",
    site: {
      address_1: "40, TEST ROAD",
      postcode: "AB1 CD2",
    },
    received_date: "2024-03-18T00:00:00.000+00:00",
    result_flag: null,
    determination_date: "2024-03-19",
    determined_at: "2024-07-18T00:00:00.000+00:00",
    decision: "granted",
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

  it("should show determined_at date if decision is not null", () => {
    render(<ApplicationInformation {...mockData} />);
    expect(screen.getByText("Decision Date")).toBeInTheDocument();
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
    const mapComponent = screen.getByTestId("mockMap");
    expect(mapComponent).toBeInTheDocument();
  });
});

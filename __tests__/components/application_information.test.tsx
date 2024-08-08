import ApplicationInformation from "@/components/application_information";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DprPublicApplicationDetails } from "@/types";

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
  const mockData: DprPublicApplicationDetails = {
    application: {
      reference: "AAA_BBB_CCC_DDD",
      type: {
        description: "planning_application",
      },
      status: "not_started",
      consultation: {
        endDate: "2024-04-08",
        publishedComments: null,
        consulteeComments: null,
      },
      receivedAt: "2024-03-18T00:00:00.000+00:00",
      validAt: null,
      id: 0,
      applicant_first_name: "",
      applicant_last_name: "",
      agent_first_name: "",
      agent_last_name: "",
      documents: null,
    },
    property: {
      address: {
        singleLine: "40, TEST ROAD, AB1 CD2",
      },
      boundary: {
        site: {
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
      },
    },
    proposal: {
      description: "Simple description",
    },

    // application_type: "planning_application",
    // site: {
    //   address_1: "40, TEST ROAD",
    //   postcode: "AB1 CD2",
    // },
    // received_date: "2024-03-18T00:00:00.000+00:00",
    // result_flag: null,
    // determination_date: "2024-03-19",
    // determined_at: "2024-03-19",
    // decision: null,
    // status: "not_started",
    // consultation: { end_date: "2024-04-08" },
    // description: "Simple description",
    // boundary_geojson: {
    //   type: "Feature",
    //   geometry: {
    //     type: "Polygon",
    //     coordinates: [
    //       [
    //         [0, 0],
    //         [1, 1],
    //         [1, 0],
    //         [0, 0],
    //       ],
    //     ],
    //   },
    // },
    // council: "test_council",
    // id: 123,
    // decision: null,
    // in_assessment_at: null,
  };

  it("should not show determined_at date if decision is null", () => {
    render(<ApplicationInformation council="test_coucil" {...mockData} />);
    expect(screen.queryByText("Decision")).toBeNull();
  });

  it("should render correctly with Polygon geometry", () => {
    render(<ApplicationInformation council="test_coucil" {...mockData} />);
    const mapComponent = screen.getByTestId("mockMap");
    expect(mapComponent).toBeInTheDocument();
  });
});

describe("Render ApplicationInformation", () => {
  const mockData: DprPublicApplicationDetails = {
    application: {
      reference: "AAA_BBB_CCC_DDD",
      type: {
        description: "planning_application",
      },
      status: "not_started",
      consultation: {
        endDate: "2024-04-08",
        publishedComments: null,
        consulteeComments: null,
      },
      receivedAt: "2024-03-18T00:00:00.000+00:00",
      validAt: null,
      id: 0,
      applicant_first_name: "",
      applicant_last_name: "",
      agent_first_name: "",
      agent_last_name: "",
      documents: null,
      decision: "approved",
      determinedAt: "2024-03-19",
    },
    property: {
      address: {
        singleLine: "40, TEST ROAD, AB1 CD2",
      },
      boundary: {
        site: {
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
      },
    },
    proposal: {
      description: "Simple description",
    },

    // reference: "AAA_BBB_CCC_DDD",
    // application_type: "planning_application",
    // site: {
    //   address_1: "40, TEST ROAD",
    //   postcode: "AB1 CD2",
    // },
    // received_date: "2024-03-18T00:00:00.000+00:00",
    // result_flag: null,
    // determination_date: "2024-03-19",
    // determined_at: "2024-03-19",
    // decision: "approved",
    // status: "not_started",
    // consultation: { end_date: "2024-04-08" },
    // description: "Simple description",
    // boundary_geojson: {
    //   type: "Feature",
    //   geometry: {
    //     type: "Polygon",
    //     coordinates: [
    //       [
    //         [0, 0],
    //         [1, 1],
    //         [1, 0],
    //         [0, 0],
    //       ],
    //     ],
    //   },
    // },
  };

  it("should show determined_at date if decision is not null", () => {
    render(<ApplicationInformation council="test_council" {...mockData} />);
    expect(screen.getByText("Decision Date")).toBeInTheDocument();
  });

  it("should render correctly with MultiPolygon geometry", () => {
    const mockDataWithMultiPolygon: DprPublicApplicationDetails = {
      ...mockData,
      property: {
        ...mockData.property,
        boundary: {
          site: {
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
        },
      },
    };

    render(
      <ApplicationInformation
        council="test_council"
        {...mockDataWithMultiPolygon}
      />,
    );
    const mapComponent = screen.getByTestId("mockMap");
    expect(mapComponent).toBeInTheDocument();
  });

  it("should render correctly with FeatureCollection", () => {
    const mockDataWithFeatureCollection: DprPublicApplicationDetails = {
      ...mockData,
      property: {
        ...mockData.property,
        boundary: {
          site: {
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
        },
      },
    };

    render(
      <ApplicationInformation
        council="test_council"
        {...mockDataWithFeatureCollection}
      />,
    );
    const mapComponent = screen.getByTestId("mockMap");
    expect(mapComponent).toBeInTheDocument();
  });
});

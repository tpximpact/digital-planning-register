import React from "react";
import { render, screen } from "@testing-library/react";
import CommentHeader from "../../src/components/comment-header";
import "@testing-library/jest-dom";

import { BoundaryGeojson } from "../../util/type";

jest.mock("next/dynamic", () => () => {
  const DynamicComponent = (props: any) => (
    <div data-testid="mocked-map">
      Mocked Map
      {props.geojsonData && <div data-testid="mocked-map-data"></div>}
    </div>
  );
  return DynamicComponent;
});

describe("CommentHeader", () => {
  const defaultProps = {
    boundary_geojson: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [0, 0],
            [1, 1],
            [2, 2],
            [0, 0],
          ],
        ],
      },
    } as BoundaryGeojson,
    site: {
      address_1: "123 Main St",
      postcode: "ABC 123",
    },
    reference: "REF-001",
    council: "Example Council",
  };

  it("renders the component with the correct content", () => {
    render(<CommentHeader {...defaultProps} />);

    expect(
      screen.getByRole("heading", { name: "Tell us what you think" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "123 Main St, ABC 123" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Application Reference" }),
    ).toBeInTheDocument();
    expect(screen.getByText("REF-001")).toBeInTheDocument();
    expect(
      screen.getByText(/Your feedback helps us improve developments/i),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mocked-map")).toBeInTheDocument();
  });

  it("renders the map component when boundary_geojson is provided", () => {
    render(<CommentHeader {...defaultProps} />);
    expect(screen.getByTestId("mocked-map")).toBeInTheDocument();
  });

  it("does not render the map component when boundary_geojson is not provided", () => {
    render(<CommentHeader {...defaultProps} boundary_geojson={undefined} />);
    expect(screen.queryByTestId("mocked-map")).not.toBeInTheDocument();
  });

  it("capitalizes the council name", () => {
    render(<CommentHeader {...defaultProps} council="example council" />);
    expect(screen.getByText(/Example Council/)).toBeInTheDocument();
  });
});

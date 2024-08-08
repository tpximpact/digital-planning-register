import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CommentConfirmation from "@/components/comment_confirmation";
import "@testing-library/jest-dom";
import { DprBoundaryGeojson } from "@/types";

jest.mock("../../src/components/map", () => {
  return jest.fn(() => <div data-testid="mocked-map">Mocked Map</div>);
});

describe("CommentConfirmation", () => {
  const defaultProps = {
    reference: "REF-001",
    council: "exampleCouncil",
    address: "123 Main St, ABC 123",
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
    } as DprBoundaryGeojson,
    navigateToPage: jest.fn(),
  };

  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it("renders the component with the correct content", () => {
    render(<CommentConfirmation {...defaultProps} />);

    expect(
      screen.getByRole("heading", { name: "Comment submitted" }),
    ).toBeInTheDocument();
    expect(screen.getByText("123 Main St, ABC 123")).toBeInTheDocument();
    expect(screen.getByText("REF-001")).toBeInTheDocument();
    expect(
      screen.getByText(/Your feedback helps us improve developments/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Discover other planning applications in your area",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Back to application search" }),
    ).toBeInTheDocument();
  });

  it("does not navigate to page 0 if the comment has been submitted", () => {
    sessionStorage.setItem("submitted_REF-001", "true");
    render(<CommentConfirmation {...defaultProps} />);

    expect(defaultProps.navigateToPage).not.toHaveBeenCalled();
  });

  it("renders the map component when boundary_geojson is provided", () => {
    render(<CommentConfirmation {...defaultProps} />);

    expect(screen.getByTestId("mocked-map")).toBeInTheDocument();
  });

  it("does not render the map component when boundary_geojson is not provided", () => {
    render(
      <CommentConfirmation {...defaultProps} boundary_geojson={undefined} />,
    );

    expect(screen.queryByTestId("mocked-map")).not.toBeInTheDocument();
  });

  it('navigates to the council page when the "Back to application search" button is clicked', () => {
    render(<CommentConfirmation {...defaultProps} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Back to application search" }),
    );

    expect(
      screen.getByRole("button", { name: "Back to application search" }),
    ).toHaveAttribute("type", "submit");
    expect(
      screen
        .getByRole("button", { name: "Back to application search" })
        .closest("form"),
    ).toHaveAttribute("action", "/exampleCouncil");
    expect(
      screen
        .getByRole("button", { name: "Back to application search" })
        .closest("form"),
    ).toHaveAttribute("method", "GET");
  });
});

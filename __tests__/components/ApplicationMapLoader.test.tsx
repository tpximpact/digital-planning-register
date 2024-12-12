import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  ApplicationMapLoader,
  ApplicationMapLoading,
  ApplicationMapProps,
  ApplicationMapUnavailable,
} from "@/components/ApplicationMap";
import { ApplicationMap } from "@/components/ApplicationMap/ApplicationMap";

jest.mock("@opensystemslab/map", () => {
  return jest.fn(() => <></>);
});

// Mock the ApplicationMap component for the ApplicationMapLoader file
// then we mock what we need it to return depending on the test further down
jest.mock("@/components/ApplicationMap/ApplicationMap", () => ({
  ApplicationMap: jest.fn(),
}));

const MockApplicationMap = (props: ApplicationMapProps) => (
  <div data-testid="mock-application-map">Mock ApplicationMap</div>
);

const defaultProps: ApplicationMapProps = {
  reference: "12345",
  mapData: { type: "FeatureCollection", features: [] },
  description: "Test Map",
};

describe("ApplicationMapLoader", () => {
  it("renders the ApplicationMap component", async () => {
    (ApplicationMap as jest.Mock).mockImplementation(MockApplicationMap);

    await act(async () => {
      render(<ApplicationMapLoader {...defaultProps} />);
    });
    const mapElement = await screen.findByTestId("mock-application-map");
    expect(mapElement).toBeInTheDocument();
  });

  it("renders the ApplicationMapLoader with Suspense fallback", async () => {
    (ApplicationMap as jest.Mock).mockImplementation(() => {
      throw new Promise(() => {}); // Simulate a pending promise
    });

    await act(async () => {
      render(<ApplicationMapLoader {...defaultProps} />);
    });
    const loadingElement = screen.getByText("Loading map view");
    expect(loadingElement).toBeInTheDocument();
  });

  it("renders the ApplicationMapLoading component", () => {
    render(<ApplicationMapLoading {...defaultProps} />);
    const loadingElement = screen.getByText("Loading map view");
    expect(loadingElement).toBeInTheDocument();
  });

  it("renders the ApplicationMapUnavailable component", () => {
    render(<ApplicationMapUnavailable {...defaultProps} />);
    const loadingElement = screen.getByText("Map view unavailable");
    expect(loadingElement).toBeInTheDocument();
  });
});

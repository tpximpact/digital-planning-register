import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import ApplicationMap from "@/components/application_map";

import ApplicationMapMap, {
  ApplicationMapMapProps,
} from "@/components/application_map/map";
import { sendGTMEvent } from "@next/third-parties/google";

// Mock the sendGTMEvent function
jest.mock("@next/third-parties/google", () => ({
  sendGTMEvent: jest.fn(),
}));

jest.mock("../../src/components/application_map", () => {
  return jest.fn(() => <div data-testid="mockMap"></div>);
});

jest.mock("@opensystemslab/map", () => {
  return jest.fn(() => <></>);
});

const defaultApplicationMapProps: ApplicationMapMapProps = {
  mapData: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-0.07716178894042969, 51.50094238217541],
          [-0.07645905017852783, 51.50053497847238],
          [-0.07615327835083008, 51.50115276135022],
          [-0.07716178894042969, 51.50094238217541],
        ],
      ],
    },
  },
};

describe("Map Loader", () => {
  it("dynamically loads in the map component", () => {
    render(<ApplicationMap {...defaultApplicationMapProps} />);
    const mapComponent = screen.getByTestId("mockMap");
    expect(mapComponent).toBeInTheDocument();
  });
});

describe("Map Component", () => {
  it("renders correctly with default props", () => {
    const { container } = render(
      <ApplicationMapMap {...defaultApplicationMapProps} />,
    );
    const mapElement = container.querySelector("my-map");
    console.log(mapElement);
    expect(mapElement).toBeInTheDocument();
    expect(mapElement).not.toHaveAttribute("staticMap");
    expect(mapElement).toHaveAttribute("zoom", "14");
  });
  it("renders correctly when static", () => {
    const { container } = render(
      <ApplicationMapMap {...defaultApplicationMapProps} staticMap={true} />,
    );
    const mapElement = container.querySelector("my-map");
    expect(mapElement).toBeInTheDocument();
    expect(mapElement).toHaveAttribute("staticmode", "true");
  });
  it("renders correctly with default props", () => {
    const { container } = render(
      <ApplicationMapMap {...defaultApplicationMapProps} zoom={10} />,
    );
    const mapElement = container.querySelector("my-map");
    expect(mapElement).toBeInTheDocument();
    expect(mapElement).toHaveAttribute("zoom", "10");
  });
  it("does not render when mapData is incorrect", () => {
    const { container } = render(<ApplicationMapMap mapData={{}} />);
    const mapElement = container.querySelector("my-map");
    expect(mapElement).not.toBeInTheDocument();
  });
  test("should render the map and handle scroll event", async () => {
    // const mockMapData = {
    //   type: "Feature",
    //   geometry: {
    //     type: "Polygon",
    //     coordinates: [[[-0.124237, 51.531031], [-0.124254, 51.531035]]],
    //   },
    // };

    // Render the component with mock data
    render(<ApplicationMapMap {...defaultApplicationMapProps} />);

    // Find the map element in the DOM
    const mapElement = await screen.findByRole("application", {
      name: /An interactive map/i,
    });

    // Check if the map rendered correctly
    expect(mapElement).toBeInTheDocument();

    // Simulate the wheel scroll event
    mapElement.dispatchEvent(new WheelEvent("wheel"));

    // Assert that sendGTMEvent was called when scrolling inside the map
    expect(sendGTMEvent).toHaveBeenCalledWith({
      event: "map-scroll",
    });
  });
});

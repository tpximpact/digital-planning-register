import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Map from "@/components/map";

describe("Map Component", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<Map />);
    const mapElement = container.querySelector("my-map");
    expect(mapElement).toBeInTheDocument();
    expect(mapElement).toHaveAttribute("geojsoncolor", "#ff0000");
  });

  it("applies custom styles via useEffect", () => {
    const { container } = render(<Map />);
    const mapElement = container.querySelector("my-map");
    expect(mapElement).toHaveStyle(
      "width: 450px; height: 350px; display: table-cell; padding: 0, 15px, 15px, 0"
    );
  });

  it("handles areaChange event", () => {
    const mockAreaChangeHandler = jest.fn();
    const { container } = render(<Map />);
    const mapElement = container.querySelector("my-map");
    if (mapElement) {
      mapElement.addEventListener("areaChange", mockAreaChangeHandler);
      fireEvent(
        mapElement,
        new CustomEvent("areaChange", {
          detail: { someAreaValue: "testValue" }
        })
      );
    } else {
      fail("Expected <my-map> element to be present in the document.");
    }
    expect(mockAreaChangeHandler).toHaveBeenCalled();
    expect(mockAreaChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({ detail: { someAreaValue: "testValue" } })
    );
  });

  it("handles geojsonChange event", () => {
    const mockGeojsonChangeHandler = jest.fn();
    const { container } = render(<Map />);
    const mapElement = container.querySelector("my-map");
    if (mapElement) {
      mapElement.addEventListener("geojsonChange", mockGeojsonChangeHandler);
      fireEvent(
        mapElement,
        new CustomEvent("geojsonChange", {
          detail: { someGeojsonValue: "testValue" }
        })
      );
    } else {
      fail("Expected <my-map> element to be present in the document.");
    }
    expect(mockGeojsonChangeHandler).toHaveBeenCalled();
    expect(mockGeojsonChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({ detail: { someGeojsonValue: "testValue" } })
    );
  });
});

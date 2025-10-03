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
import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  ApplicationMap,
  handleScroll,
} from "@/components/ApplicationMap/ApplicationMap";
import { DprBoundaryGeojson } from "@/types";
import type { GeoJSON } from "geojson";

jest.mock("@opensystemslab/map", () => ({}), { virtual: true });

// Mock trackClient
jest.mock("@/lib/dprAnalytics", () => ({
  trackClient: jest.fn(),
}));

// Mock determineMapTypeProps
jest.mock("@/components/ApplicationMap/ApplicationMap.utils", () => ({
  determineMapTypeProps: jest.fn(() => ({
    staticMode: false,
    classModifier: "default",
    mapTypeProps: { foo: "bar" },
  })),
}));

describe("ApplicationMap", () => {
  const reference = "ref-123";

  const description = "Test map description";
  const emptyMapData: DprBoundaryGeojson = {
    type: "FeatureCollection",
    features: [],
  };
  const validMapData: DprBoundaryGeojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [0, 0] },
        properties: {},
      },
    ],
  };

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("Doesn't show a map if useState check fails (budget js-disabled check)", async () => {
    // Simulate client-side rendering failing by mocking useState/useEffect
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [false, jest.fn()]);

    render(
      <ApplicationMap
        reference={reference}
        mapData={emptyMapData} // Empty geojson
        description={description}
      />,
    );

    const region = screen.queryByRole("region", {
      name: `Map showing application ${reference}`,
    });
    expect(region).not.toBeInTheDocument();

    useStateSpy.mockRestore();
  });

  it("renders map on initial render (jsdom always client)", async () => {
    // Simulate client-side rendering by mocking useState/useEffect
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [true, jest.fn()]);

    render(
      <ApplicationMap
        reference={reference}
        mapData={validMapData}
        description={description}
      />,
    );

    const region = screen.getByRole("region", {
      name: `Map showing application ${reference}`,
    });
    expect(region).toBeInTheDocument();
    expect(region).toHaveClass(
      "dpr-application-map",
      "dpr-application-map--default",
    );
    // my-map element should be present
    expect(region.querySelector("my-map")).toBeInTheDocument();

    useStateSpy.mockRestore();
  });

  it("Doesn't show a map if geojson data is empty", async () => {
    // Simulate client-side rendering by mocking useState/useEffect
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [true, jest.fn()]);

    render(
      <ApplicationMap
        reference={reference}
        mapData={{} as GeoJSON} // Empty geojson
        description={description}
      />,
    );

    const region = screen.queryByRole("region", {
      name: `Map showing application ${reference}`,
    });
    expect(region).not.toBeInTheDocument();

    useStateSpy.mockRestore();
  });

  it("passes geojsondata and description to my-map", () => {
    // Simulate client-side rendering by mocking useState/useEffect
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [true, jest.fn()]);

    render(
      <ApplicationMap
        reference={reference}
        mapData={validMapData}
        description={description}
      />,
    );

    const myMap = screen.getByRole("application");
    expect(myMap).toHaveAttribute("geojsondata", JSON.stringify(validMapData));
    expect(myMap).toHaveAttribute("aria-label", description);

    useStateSpy.mockRestore();
  });

  it("adds osProxyEndpoint to my-map when osMapProxyUrl is provided", () => {
    // Simulate client-side rendering by mocking useState/useEffect
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [true, jest.fn()]);

    render(
      <ApplicationMap
        reference={reference}
        mapData={validMapData}
        description={description}
        osMapProxyUrl="https://proxy.example.com"
      />,
    );

    const myMap = screen.getByRole("application");
    expect(myMap).toHaveAttribute(
      "osProxyEndpoint",
      "https://proxy.example.com",
    );

    useStateSpy.mockRestore();
  });

  it("calls trackClient on handleScroll", async () => {
    const { trackClient } = await import("@/lib/dprAnalytics");
    handleScroll();
    expect(trackClient).toHaveBeenCalledWith("map-scroll");
  });

  it("passes staticMode and hideResetControl=true when isStatic is true", () => {
    // Simulate client-side rendering by mocking useState/useEffect
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [true, jest.fn()]);

    render(
      <ApplicationMap
        reference={reference}
        mapData={validMapData}
        description={description}
        isStatic={true}
      />,
    );
    const myMap = screen.getByRole("application");
    expect(myMap).toHaveAttribute("staticmode", "true");
    expect(myMap).toHaveAttribute("hideresetcontrol", "true");
    expect(myMap).toHaveAttribute("foo", "bar");

    useStateSpy.mockRestore();
  });

  it("passes hideResetControl=false when isStatic is false", () => {
    // Simulate client-side rendering by mocking useState/useEffect
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [true, jest.fn()]);

    render(
      <ApplicationMap
        reference={reference}
        mapData={validMapData}
        description={description}
        isStatic={false}
      />,
    );
    const myMap = screen.getByRole("application");
    expect(myMap).toHaveAttribute("hideresetcontrol", "false");
    expect(myMap).toHaveAttribute("foo", "bar");
    expect(myMap).not.toHaveAttribute("staticmode");

    useStateSpy.mockRestore();
  });

  it("passes osProxyEndpoint and not staticMode/hideResetControl when osMapProxyUrl is provided", () => {
    // Simulate client-side rendering by mocking useState/useEffect
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [true, jest.fn()]);

    render(
      <ApplicationMap
        reference={reference}
        mapData={validMapData}
        description={description}
        osMapProxyUrl="https://proxy.example.com"
        isStatic={true} // Should be ignored in favor of osMapProxyUrl
      />,
    );
    const myMap = screen.getByRole("application");
    expect(myMap).toHaveAttribute(
      "osproxyendpoint",
      "https://proxy.example.com",
    );
    expect(myMap).toHaveAttribute("foo", "bar");
    expect(myMap).not.toHaveAttribute("staticmode");
    expect(myMap).not.toHaveAttribute("hideresetcontrol");

    useStateSpy.mockRestore();
  });

  it("adds and removes wheel event listener on my-map element", async () => {
    // Create a fake my-map element with spies
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    const fakeMyMap = document.createElement("my-map");
    fakeMyMap.addEventListener = addEventListener;
    fakeMyMap.removeEventListener = removeEventListener;

    // Mock document.querySelector to return our fake element
    const querySelectorSpy = jest
      .spyOn(document, "querySelector")
      .mockImplementation((selector) => {
        if (selector === "my-map") return fakeMyMap;
        return null;
      });

    // Simulate client-side rendering by mocking useState/useEffect
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementationOnce(() => [true, jest.fn()]);

    // Render and unmount the component
    let unmount: () => void;
    await act(async () => {
      ({ unmount } = render(
        <ApplicationMap
          reference={reference}
          mapData={validMapData}
          description={description}
        />,
      ));
    });

    // The wheel event should be added
    expect(addEventListener).toHaveBeenCalledWith(
      "wheel",
      expect.any(Function),
    );

    // Unmount and check cleanup
    await act(async () => {
      unmount();
    });
    expect(removeEventListener).toHaveBeenCalledWith(
      "wheel",
      expect.any(Function),
    );

    querySelectorSpy.mockRestore();
    useStateSpy.mockRestore();
  });
});

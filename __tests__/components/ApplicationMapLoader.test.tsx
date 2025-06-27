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

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  ApplicationMapLoader,
  ApplicationMapLoading,
  ApplicationMapProps,
  ApplicationMapUnavailable,
} from "@/components/ApplicationMap";
import { ApplicationMap } from "@/components/ApplicationMap/ApplicationMap";
import { act } from "react";

jest.mock("@opensystemslab/map", () => {
  return jest.fn(() => <></>);
});

// Mock the ApplicationMap component for the ApplicationMapLoader file
// then we mock what we need it to return depending on the test further down
jest.mock("@/components/ApplicationMap/ApplicationMap", () => ({
  ApplicationMap: jest.fn(),
}));

const MockApplicationMap = () => (
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

  describe("ApplicationMapLoader with OS_MAP_PROXY_URL", () => {
    const ORIGINAL_ENV = process.env;

    beforeEach(() => {
      jest.resetModules(); // Clears the cache so env changes take effect
      process.env = {
        ...ORIGINAL_ENV,
        OS_MAP_PROXY_URL: "https://proxy.example.com",
      };
    });

    afterEach(() => {
      process.env = ORIGINAL_ENV; // Restore original env
    });

    it("passes osMapProxyUrl prop when env var is set", async () => {
      (ApplicationMap as jest.Mock).mockImplementation(MockApplicationMap);

      await act(async () => {
        render(<ApplicationMapLoader {...defaultProps} />);
      });

      const mapElement = await screen.findByTestId("mock-application-map");
      expect(mapElement).toBeInTheDocument();

      // Check if the osMapProxyUrl prop is passed correctly
      expect(ApplicationMap).toHaveBeenCalledWith(
        expect.objectContaining({
          osMapProxyUrl: "https://proxy.example.com",
        }),
        expect.anything(),
      );
    });
  });

  describe("ApplicationMapLoader without OS_MAP_PROXY_URL", () => {
    const ORIGINAL_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...ORIGINAL_ENV };
      delete process.env.OS_MAP_PROXY_URL;
    });

    afterEach(() => {
      process.env = ORIGINAL_ENV;
    });

    it("does not pass osMapProxyUrl prop when env var is not set", async () => {
      (ApplicationMap as jest.Mock).mockImplementation(MockApplicationMap);

      await act(async () => {
        render(<ApplicationMapLoader {...defaultProps} />);
      });

      const mapElement = await screen.findByTestId("mock-application-map");
      expect(mapElement).toBeInTheDocument();

      // Check if the osMapProxyUrl prop is not passed
      expect(ApplicationMap).toHaveBeenCalledWith(
        expect.not.objectContaining({
          osMapProxyUrl: expect.any(String),
        }),
        expect.anything(),
      );
    });
  });
});

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
import {
  determineMapTypeProps,
  normaliseGeojsonData,
} from "@/components/ApplicationMap/ApplicationMap.utils";

describe("determineMapTypeProps", () => {
  it("returns correct props for context-setter map type", () => {
    const { staticMode, classModifier, mapTypeProps } =
      determineMapTypeProps("context-setter");
    expect(staticMode).toBe(true);
    expect(classModifier).toEqual("context-setter");
    expect(mapTypeProps).toEqual({
      showScale: false,
      zoom: 24,
      geojsonbuffer: 12,
    });
  });

  it("returns correct props for constraint-accordion map type", () => {
    const { staticMode, classModifier, mapTypeProps } = determineMapTypeProps(
      "constraint-accordion",
    );
    expect(staticMode).toBe(false);
    expect(classModifier).toEqual("constraint-accordion");
    expect(mapTypeProps).toEqual({
      showScale: true,
      zoom: 24,
      geojsonbuffer: 12,
    });
  });

  it("returns correct props for application-search map type", () => {
    const { staticMode, classModifier, mapTypeProps } =
      determineMapTypeProps("application-search");
    expect(staticMode).toBe(true);
    expect(classModifier).toEqual("application-search");
    expect(mapTypeProps).toEqual({
      showScale: true,
      zoom: 24,
      geojsonbuffer: 12,
    });
  });

  it("returns correct props for application-show map type", () => {
    const { staticMode, classModifier, mapTypeProps } =
      determineMapTypeProps("application-show");
    expect(staticMode).toBe(false);
    expect(classModifier).toEqual("application-show");
    expect(mapTypeProps).toEqual({
      showScale: true,
      zoom: 24,
      geojsonbuffer: 12,
    });
  });

  it("returns undefined for unknown map type", () => {
    const { staticMode, classModifier, mapTypeProps } =
      determineMapTypeProps("unknown-type");
    expect(staticMode).toBe(false);
    expect(classModifier).toEqual("default");
    expect(mapTypeProps).toEqual({
      showScale: true,
      zoom: 14,
      geojsonbuffer: 82,
    });
  });

  it("returns undefined when map type is not provided", () => {
    const { staticMode, classModifier, mapTypeProps } =
      determineMapTypeProps("unknown-type");
    expect(staticMode).toBe(false);
    expect(classModifier).toEqual("default");
    expect(mapTypeProps).toEqual({
      showScale: true,
      zoom: 14,
      geojsonbuffer: 82,
    });
  });
});
describe("normaliseGeojsonData", () => {
  it("should correctly handle a standard GeoJSON Feature", () => {
    const singleFeature = {
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [0, 0] },
      properties: {},
    };

    expect(normaliseGeojsonData(singleFeature)).toEqual(singleFeature);
  });

  it("should find and return GeoJSON from a nested object", () => {
    const featureCollection = {
      type: "FeatureCollection" as const,
      features: [],
    };
    const nestedData = {
      "EPSG:27700": featureCollection,
    };

    expect(normaliseGeojsonData(nestedData)).toEqual(featureCollection);
  });

  it("should return null for invalid or empty data", () => {
    const invalidData = { name: "ABCD", location: "1234" };

    expect(normaliseGeojsonData(null)).toBeNull();
    expect(normaliseGeojsonData(undefined)).toBeNull();
    expect(normaliseGeojsonData(invalidData)).toBeNull();
  });
});

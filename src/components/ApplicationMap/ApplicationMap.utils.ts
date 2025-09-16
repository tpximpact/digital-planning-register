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

import { DprBoundaryGeojson } from "@/types/definitions";
import { FeatureCollection, Feature } from "geojson";

export interface mapTypeProps {
  showScale: boolean;
  zoom: number;
  geojsonbuffer: number;
  staticMode?: boolean;
  hideResetControl?: boolean;
  osProxyEndpoint?: string;
}

/**
 * Work out the settings for each map type
 * @param mapType
 * @returns
 */
export const determineMapTypeProps = (mapType?: string) => {
  let mapTypeProps: mapTypeProps;
  let classModifier;
  let staticMode;
  switch (mapType) {
    case "context-setter":
      classModifier = "context-setter";
      staticMode = true;
      mapTypeProps = {
        showScale: false,
        zoom: 24,
        geojsonbuffer: 12,
      };
      break;
    case "application-search":
      classModifier = "application-search";
      staticMode = true;
      mapTypeProps = {
        showScale: true,
        zoom: 24,
        geojsonbuffer: 12,
      };
      break;
    case "application-show":
      classModifier = "application-show";
      staticMode = false;
      mapTypeProps = {
        showScale: true,
        zoom: 24,
        geojsonbuffer: 12,
      };
      break;
    case "constraint-accordion":
      classModifier = "constraint-accordion";
      staticMode = false;
      mapTypeProps = {
        showScale: true,
        zoom: 24,
        geojsonbuffer: 12,
      };
      break;
    default:
      classModifier = "default";
      staticMode = false;
      mapTypeProps = {
        showScale: true,
        zoom: 14,
        geojsonbuffer: 82,
      };
      break;
  }
  return { staticMode, classModifier, mapTypeProps };
};

export const normaliseGeojsonData = (
  data: DprBoundaryGeojson | null,
): Feature | FeatureCollection | null => {
  if (!data) {
    return null;
  }

  let geojson: Feature | FeatureCollection | undefined;

  if (
    "type" in data &&
    (data.type === "Feature" || data.type === "FeatureCollection")
  ) {
    geojson = data;
  } else if (typeof data === "object") {
    const espgData = data["EPSG:3857"] || data["EPSG:4326"];

    if (espgData) {
      geojson = espgData;
    } else {
      geojson = Object.values(data).find(
        (value): value is Feature | FeatureCollection =>
          !!value && typeof value === "object" && "type" in value,
      );
    }
  }

  if (!geojson) {
    return null;
  }

  return geojson;
};

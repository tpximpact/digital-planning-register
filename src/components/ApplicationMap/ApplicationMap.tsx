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

"use client";
import { DprBoundaryGeojson } from "@/types";
import { useState, useEffect } from "react";
import { determineMapTypeProps } from "./ApplicationMap.utils";
import { trackClient } from "@/lib/dprAnalytics";

export interface ApplicationMapProps {
  reference: string;
  mapData: DprBoundaryGeojson;
  description: string;
  mapType?: string;
  isStatic?: boolean;
  osMapProxyUrl?: string;
}

/**
 * Map is shown in two forms:
 * Interactive
 * Static
 *
 *
 * Listings page - static
 * Details page - interactive
 * Comment header - static
 * Comment submitted - interactive
 *
 *
 * There are two types of map geojson - "Feature" and "FeatureCollection"
 *
 * https://github.com/theopensystemslab/map/blob/main/src/components/my-map/index.ts
 *
 * Currently displayed using https://github.com/theopensystemslab/map
 * This is a custom element that uses the web component standard
 * Underneath its using OpenLayers https://www.npmjs.com/package/ol
 * If the OS_MAP_PROXY_URL env var is present it will use the proxy
 * which will enable the OS Vector Tile API https://osdatahub.os.uk/docs/vts/overview
 * Otherwise it will use the default OS Maps API https://osdatahub.os.uk/docs/wmts/overview
 * which doesn't didsplay boundaries
 *
 * @param param0
 * @returns
 */

export const handleScroll = () => {
  // console.log("scrolling");
  trackClient("map-scroll");
};

export const ApplicationMap = ({
  reference,
  mapData,
  description,
  mapType = "default",
  isStatic,
  osMapProxyUrl,
}: ApplicationMapProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      await import("@opensystemslab/map");
      if (didCancel) return;
      setIsClient(true);
      const myMapElement = document.querySelector("my-map");
      if (myMapElement) {
        myMapElement.addEventListener("wheel", handleScroll);
      }
    }

    fetchData();

    return () => {
      didCancel = true;
      const myMapElement = document.querySelector("my-map");
      if (myMapElement) {
        myMapElement.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  const { staticMode, classModifier, mapTypeProps } =
    determineMapTypeProps(mapType);

  isStatic = isStatic ?? staticMode;

  let mapProps = {};
  // static override
  if (isStatic) {
    mapProps = {
      ...mapTypeProps,
      staticMode: true,
      hideResetControl: true,
    };
  } else {
    mapProps = {
      ...mapTypeProps,
      hideResetControl: false,
    };
  }

  // Add os proxy to use OS maps vector tile maps which show boundaries, otherwise use plain OS maps
  if (osMapProxyUrl) {
    mapProps = {
      ...mapTypeProps,
      osProxyEndpoint: osMapProxyUrl,
    };
  }

  const geojsonData = JSON.stringify(mapData);
  if (!geojsonData || geojsonData === "{}") {
    return null;
  }

  if (!isClient) return null;

  return (
    <div
      role="region"
      aria-label={`Map showing application ${reference}`}
      id={`${reference}-map-test`}
      className={`dpr-application-map dpr-application-map--${classModifier}`}
    >
      <my-map
        role="application"
        geojsonData={geojsonData}
        geojsonColor={"#ff0000"}
        geojsonFill={"#ff0000"}
        aria-label={description ?? "An interactive map"}
        osCopyright={
          "© Crown copyright and database rights 2024 OS (0)100024857"
        }
        {...mapProps}
      />
    </div>
  );
};

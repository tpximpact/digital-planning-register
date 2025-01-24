"use client";
import { DprBoundaryGeojson } from "@/types";
import { useState, useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { determineMapTypeProps } from "./utils";

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
  sendGTMEvent({
    event: "map-scroll",
  });
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
    setIsClient(true);
    import("@opensystemslab/map").then(() => {
      const myMapElement = document.querySelector("my-map");
      if (myMapElement) {
        myMapElement.addEventListener("wheel", handleScroll);

        // myMapElement.addEventListener("ready", (event) => {
        //   console.log("ready");
        // });
        return () => {
          myMapElement.removeEventListener("wheel", handleScroll);
        };
      }
    });
  }, []);

  let { staticMode, classModifier, mapTypeProps } =
    determineMapTypeProps(mapType);

  isStatic = isStatic ?? staticMode;

  // static override
  if (isStatic) {
    mapTypeProps = {
      ...mapTypeProps,
      staticMode: true,
      hideResetControl: true,
    };
  } else {
    mapTypeProps = {
      ...mapTypeProps,
      hideResetControl: false,
    };
  }

  // Add os proxy to use OS maps vector tile maps which show boundaries, otherwise use plain OS maps
  if (osMapProxyUrl) {
    mapTypeProps = {
      ...mapTypeProps,
      osProxyEndpoint: osMapProxyUrl,
    };
  }

  const geojsonData =
    !mapData?.type ||
    (mapData?.type !== "Feature" && mapData?.type !== "FeatureCollection")
      ? false
      : JSON.stringify(mapData);

  if (isClient && geojsonData) {
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
          aria-label={description ?? "An interactive map"}
          osCopyright={
            "© Crown copyright and database rights 2024 OS (0)100024857"
          }
          {...mapTypeProps}
        />
      </div>
    );
  }
};

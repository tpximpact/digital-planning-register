"use client";
import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "my-map": any;
    }
  }
}

interface MapProps {
  geojsonColor?: string;
  geojsonBuffer?: string;
  hideResetControl?: boolean;
  osVectorTilesApiKey?: string;
  geojsonData?: string;
  showScale?: boolean;
}

const Map: React.FC<MapProps> = ({
  geojsonColor = "#ff0000",
  geojsonBuffer = "85",
  hideResetControl = true,
  osVectorTilesApiKey = "",
  geojsonData = "",
  showScale = true,
}) => {
  useEffect(() => {
    const map = document.querySelector("my-map") as HTMLElement;
    if (map) {
      map.style.width = "450px";
      map.style.height = "350px";
      map.style.display = "table-cell";
      map.style.padding = "0, 15px, 15px 0";

      map.addEventListener("areaChange", (event: Event) => {
        console.debug({ area: (event as CustomEvent).detail });
      });

      map.addEventListener("geojsonChange", (event: Event) => {
        console.debug({ geojson: (event as CustomEvent).detail });
      });
    }
  }, []);

  return (
    <div>
      <my-map
        zoom="14"
        geojsonColor={geojsonColor}
        geojsonBuffer={geojsonBuffer}
        hideResetControl={hideResetControl}
        osVectorTilesApiKey={osVectorTilesApiKey}
        geojsonData={geojsonData}
        showScale={showScale}
      />
      <style jsx>{`
        my-map {
          width: 250px;
          height: 250px;
        }
      `}</style>
    </div>
  );
};

export default Map;

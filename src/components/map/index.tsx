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
  // staticMode?: boolean;
  osVectorTilesApiKey?: string;
  geojsonData?: string;
}

const Map: React.FC<MapProps> = ({
  geojsonColor = "#ff0000",
  geojsonBuffer = "25",
  hideResetControl = true,
  // staticMode = true,
  osVectorTilesApiKey = "",
  geojsonData = ""
}) => {
  useEffect(() => {
    const map = document.querySelector("my-map") as HTMLElement;
    if (map) {
      map.style.width = "450px";
      map.style.height = "350px";
      map.style.display = "table-cell";
      map.style.padding = "15px";
      map.addEventListener("ready", (event) => {
        console.log("map ready");
      });

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
        // staticMode={staticMode}
        osVectorTilesApiKey={osVectorTilesApiKey}
        geojsonData={geojsonData}
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

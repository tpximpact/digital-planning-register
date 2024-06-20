"use client";
import { useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";

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
  page?: string;
  staticMode?: boolean;
}

const Map: React.FC<MapProps> = ({
  geojsonColor = "#ff0000",
  geojsonBuffer = "85",
  hideResetControl = true,
  osVectorTilesApiKey = "",
  geojsonData = "",
  showScale = true,
  page = "",
  staticMode = false,
}) => {
  const onlyWidth = useWindowWidth();
  useEffect(() => {
    const map = document.querySelectorAll("my-map") as NodeListOf<HTMLElement>;

    if (map) {
      map.forEach((canvas) => {
        (canvas.style.width = "28rem"),
          (canvas.style.height =
            page == "landing"
              ? onlyWidth > 640 && onlyWidth < 1090
                ? "14rem"
                : "20rem"
              : onlyWidth <= 1090
                ? "20rem"
                : "14rem");

        canvas.style.display = "table-cell";
        canvas.style.padding = "0, 15px, 15px 0";

        canvas.addEventListener("areaChange", (event: Event) => {
          console.debug({ area: (event as CustomEvent).detail });
        });

        canvas.addEventListener("geojsonChange", (event: Event) => {
          console.debug({ geojson: (event as CustomEvent).detail });
        });
      });
    }
  }, [onlyWidth, page]);

  return (
    <div>
      <my-map
        zoom="14"
        {...(staticMode ? { staticMode } : {})}
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

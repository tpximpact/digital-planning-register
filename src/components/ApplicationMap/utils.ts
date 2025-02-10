import { DprBoundaryGeojson } from "@/types";

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

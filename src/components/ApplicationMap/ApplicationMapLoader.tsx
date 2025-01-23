import { Suspense, lazy } from "react";
import { ApplicationMapProps } from "./ApplicationMap";
import "./ApplicationMap.scss";
import { determineMapTypeProps } from "./utils";

const ApplicationMap = lazy(async () => ({
  default: (await import("@/components/ApplicationMap/ApplicationMap"))
    .ApplicationMap,
}));

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
 * There are two types of maps - "Feature" and "FeatureCollection"
 *
 * @param param0
 * @returns
 */
export const ApplicationMapLoader = (props: ApplicationMapProps) => {
  const osMapProxyUrl = process.env.OS_MAP_PROXY_URL;
  return (
    <>
      <Suspense fallback={<ApplicationMapLoading {...props} />}>
        <ApplicationMap osMapProxyUrl={osMapProxyUrl} {...props} />
      </Suspense>
    </>
  );
};

/**
 * Renders the loading state of the map
 * @param props
 * @returns
 */
export const ApplicationMapLoading = (props: ApplicationMapProps) => {
  let { staticMode, classModifier, mapTypeProps } = determineMapTypeProps(
    props.mapType,
  );
  return (
    <div
      className={`dpr-application-map dpr-application-map--loading dpr-application-map--${classModifier}`}
    >
      <span className="govuk-visually-hidden">Loading map view</span>
    </div>
  );
};

/**
 * Renders the unavailable state of the map
 * @param props
 * @returns
 */
export const ApplicationMapUnavailable = (props: ApplicationMapProps) => {
  let { staticMode, classModifier, mapTypeProps } = determineMapTypeProps(
    props.mapType,
  );
  return (
    <div
      className={`dpr-application-map dpr-application-map--unavailable dpr-application-map--${classModifier}`}
    >
      <p className="govuk-body">Map view unavailable</p>
    </div>
  );
};

/**
 * Below this point the code is for the demo delay in storybook and development purposes
 * This is a demo delay for the ApplicationMapLoaderDelay component to help with development
 */

const ApplicationMapDelay = lazy(async () => {
  await delayForDemo(2000); // Delay for 2 seconds
  return {
    default: (await import("@/components/ApplicationMap/ApplicationMap"))
      .ApplicationMap,
  };
});

const delayForDemo = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const ApplicationMapLoaderDelay = (props: ApplicationMapProps) => {
  return (
    <Suspense fallback={<ApplicationMapLoading {...props} />}>
      <ApplicationMapDelay {...props} />
    </Suspense>
  );
};

import { Suspense, lazy } from "react";
const MapTest = lazy(() => import("@/components/application_map/map"));
import { ApplicationMapMapProps } from "./map";

/**
 * const MapTest = lazy(() =>
 *   delayForDemo(import("@/components/application_map/map")),
 * );
 * @param promise
 * @returns
 */
function delayForDemo<T>(promise: Promise<T>): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
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
 * There are two types of maps - "Feature" and "FeatureCollection"
 *
 * @param param0
 * @returns
 */
const ApplicationMap = (props: ApplicationMapMapProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <MapTest {...props} />
    </Suspense>
  );
};

function Loading() {
  return (
    <p className="shadow-map">
      <i>Loading...</i>
    </p>
  );
}

export default ApplicationMap;

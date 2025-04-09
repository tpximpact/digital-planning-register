import { checkCookieConsent } from "@/actions";
import { GoogleTagManager } from "@next/third-parties/google";

/**
 * Loads the google tag manager if the user has accepted cookies.
 * Google analytics is included in the google tag manager.
 * @returns
 */
export async function DprAnalytics() {
  const acceptAnalytics = await checkCookieConsent();
  return (
    <>
      {acceptAnalytics && process.env.GTM && (
        <GoogleTagManager gtmId={process.env.GTM} />
      )}
    </>
  );
}

export default DprAnalytics;

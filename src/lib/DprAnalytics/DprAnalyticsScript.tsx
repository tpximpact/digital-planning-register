"use client";
import { useEffect } from "react";
import { inject } from "./handlers/inject";
import { pageview } from "./handlers/pageView";
import { DprAnalyticsProps } from "./DprAnalytics";
import Script from "next/script";

function DprAnalyticsScript(
  props: DprAnalyticsProps & {
    path?: string | null;
  },
): any {
  // Set the type of analytics based on the council
  const type = "gtm";

  useEffect(() => {
    inject({
      ...props,
      type: type,
    });
  }, []);

  useEffect(() => {
    if (props.route && props.path) {
      pageview({
        route: props.route,
        path: props.path,
        type: type,
      });
    }
  }, [props.route, props.path]);

  return (
    <>
      {/* <Script id="google-analytics" strategy="afterInteractive">
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', 'G-4W3F40M91N', {
                    page_path: window.location.pathname,
                });
                `}
      </Script> */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-4W3F40M91N"
      ></Script>
      <Script id="google-analytics">
        {`  window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-4W3F40M91N');
  `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtm.js?id=G-4W3F40M91N`}
        id="google-tag-manager"
        strategy="afterInteractive"
      />
    </>
  );
}

export default DprAnalyticsScript;

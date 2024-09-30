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
        src="https://www.googletagmanager.com/gtag/js?id=G-PVJ2XDYDRH"
      ></Script>
      <Script id="google-analytics">
        {`    window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-PVJ2XDYDRH');
  `}
      </Script>

      {/* <Script id="google-manage-tag">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5MB3T9HB');`}
      </Script> */}
    </>
  );
}

export default DprAnalyticsScript;

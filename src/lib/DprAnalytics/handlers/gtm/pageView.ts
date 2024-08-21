export function pageviewGtm({
  route,
  path,
}: {
  route?: string;
  path?: string;
}): void {
  console.info("gtm pageview", route, path);
  // window.gtag?.("pageview", {
  //   route,
  //   path,s
  // });
}

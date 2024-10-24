import { NextRequest, NextResponse } from "next/server";
import { getAppConfig } from "@/config";
import path from "path";
import { notFound } from "next/navigation";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 3. /assets (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|assets|images|icons|[\\w-]+\\.\\w+).*)",
  ],
};

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { searchParams } = new URL(request.url);
  const council = searchParams.get("council");
  const appConfig = getAppConfig();

  // console.log(request);

  // && appConfig.councils.includes(council)

  // without js the select dropdown will send a GET request with the council query param to /?council=selected-council
  // redirect to council page if that happens
  if (pathname === "/" && council) {
    return NextResponse.redirect(new URL(`/${council}`, request.url));
  }

  // this redirects people away from invalid council pages before it even hits the page
  // the same logic is in [council]/layout but having it here should increase performance
  // this doesn't look at visibility
  const isNestedPath = pathname.split("/").length > 2;
  if (isNestedPath) {
    const isValidPath = appConfig.councils.some((council) => {
      return pathname.includes(`/${council.slug}/`);
    });
    if (!isValidPath) {
      console.error("Not a valid council - no access");
      return NextResponse.rewrite(new URL("/404", request.url));
    }
  }
}

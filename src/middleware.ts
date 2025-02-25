/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAppConfig } from "@/config";

const OS_DOMAIN_URL = "https://api.os.uk";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /docs routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /assets (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!docs/|_next/|_static/|_vercel|assets|images|icons|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { searchParams } = new URL(request.url);
  const council = searchParams.get("council");
  const appConfig = getAppConfig();

  /******************
   *
   *  Match /proxy/ordnance-survey/*
   *
   *********************/

  if (/^\/proxy\/ordnance-survey/.test(pathname)) {
    const proxyUrl = process.env.OS_MAP_PROXY_URL;
    if (!proxyUrl) {
      return NextResponse.json(
        { error: "Proxy URL not found" },
        { status: 404 },
      );
    }

    const token = process.env.OS_MAP_API_KEY;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized no API token" },
        { status: 401 },
      );
    }

    if (process.env.NODE_ENV !== "development") {
      const OS_MAP_ALLOWED_ORIGIN = process.env.OS_MAP_ALLOWED_ORIGIN;
      if (!OS_MAP_ALLOWED_ORIGIN) {
        return NextResponse.json(
          { error: "Allowed origin not found" },
          { status: 404 },
        );
      }

      // Check the Referer or Origin header
      const referer = request.headers.get("referer");
      const origin = request.headers.get("origin");

      if (!referer && !origin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const allowedOrigin = new URL(OS_MAP_ALLOWED_ORIGIN).origin;

      if (
        referer &&
        !referer.startsWith(allowedOrigin) &&
        origin &&
        !origin.startsWith(allowedOrigin)
      ) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    // create the target URL dpr/proxy/ordnance-survey/* > https://api.os.uk/*?key=token
    const targetUrl = new URL(
      request.nextUrl.pathname.replace("/proxy/ordnance-survey", ""),
      OS_DOMAIN_URL,
    );
    targetUrl.search = request.nextUrl.search;
    targetUrl.searchParams.append("key", token || "");

    // set the headers
    // basing this off request.headers causes it to fail so we're starting from scratch!
    const requestHeaders = new Headers();
    requestHeaders.set("Cross-Origin-Resource-Policy", "cross-origin");
    requestHeaders.set("Accept-Encoding", "gzip, deflate, br");

    // get the goods
    const response = await fetch(targetUrl.toString(), {
      method: request.method,
      headers: requestHeaders,
      body: request.body,
    });

    // send the response back as if we were never here 👻
    const nextResponse = new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });

    return nextResponse;
  }

  /******************
   *
   *  Match /?council=selected-council
   *
   *********************/

  // without js the select dropdown will send a GET request with the council query param to /?council=selected-council
  // redirect to council page if that happens
  if (pathname === "/" && council) {
    return NextResponse.redirect(new URL(`/${council}`, request.url));
  }

  /******************
   *
   *  Match /validcouncilname and /validcouncilname/*
   *
   *********************/

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

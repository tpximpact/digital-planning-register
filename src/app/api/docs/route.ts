/**
 * This document acts as a go between between the /api page and the server actions.
 * Allowing us to return the data from the server actions in a more readable (and sharable) format.
 */

import localApiDocs from "api/handlers/local/documentation";
import bopsApiDocs from "api/handlers/bops/documentation";
import apiDocs from "@/actions/api/documentation";
import { NextResponse, NextRequest } from "next/server";

/**
 * @swagger
 * /api/docs:
 *   get:
 *     description: Shows the data returned from the server actions for development only!!
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function GET(request: NextRequest, params: Record<string, any>) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 403 },
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const makeUrl = new URL(request.url);
  const url = `${makeUrl.protocol}//${makeUrl.host}`;

  const apis: Record<string, any> = {
    ...localApiDocs(url),
    ...bopsApiDocs(url),
    ...apiDocs(url),
  };

  const handler = searchParams.get("handler");
  const method = searchParams.get("method");

  let response;

  if (handler && method) {
    console.log(`\n\n\n`);
    console.log(`✨ Showing ${handler}.${method} ✨`);
    console.log(apis[handler][method]);
    console.log(`\n\n`);
    const handlerMethod = apis[handler][method];
    const args = handlerMethod.arguments?.map((arg: string) => {
      return searchParams.get(arg);
    });
    response = await handlerMethod.run(args);
  } else {
    response = apis;
  }

  return NextResponse.json(response);
}

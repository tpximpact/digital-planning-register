/**
 * This document acts as a go between between the /api page and the server actions.
 * Allowing us to return the data from the server actions in a more readable (and sharable) format.
 */

import { NextResponse, NextRequest } from "next/server";
import { LocalV1Documentation } from "@/handlers/local";
import { BopsP05Documentation, BopsV2Documentation } from "@/handlers/bops";
import { ApiV1Documentation } from "@/actions/api/v1";
import { ApiP05Documentation } from "@/actions/api/P05AdvancedSearch";

const apis: Record<string, any> = {
  ApiV1: {
    ...ApiV1Documentation,
  },
  ApiP05: {
    ...ApiP05Documentation,
  },
  LocalV1: {
    ...LocalV1Documentation,
  },
  BopsV2: {
    ...BopsV2Documentation,
  },
  BopsP05: {
    ...BopsP05Documentation,
  },
};

const getResponse = async (searchParams: URLSearchParams, body?: any) => {
  const handler = searchParams.get("handler");
  const method = searchParams.get("method");
  let response;
  if (handler && method) {
    console.log(`\n\n\n`);
    console.log(`✨ Showing ${handler}.${method} ✨`);
    console.log(apis[handler][method]);
    console.log(`\n\n`);
    const handlerMethod = apis[handler][method];
    if (!handlerMethod) {
      response = {
        error: "Invalid handler or method",
      };
      return;
    }
    let args = handlerMethod.arguments?.map((arg: string) => {
      return searchParams.get(arg);
    });
    if (body) {
      args = [...args, body];
    }
    response = await handlerMethod.run(args);
  } else {
    response = apis;
  }
  return response;
};

/**
 * Shows the data returned from the server actions for development only!!
 */
export async function GET(request: NextRequest, params: Record<string, any>) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 403 },
    );
  }
  const searchParams = request.nextUrl.searchParams;
  let response = await getResponse(searchParams);
  return NextResponse.json(response);
}

/**
 * Shows the data returned from the server actions for development only!!
 */
export async function POST(request: NextRequest, params: Record<string, any>) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 403 },
    );
  }
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  let response = await getResponse(searchParams, body);
  return NextResponse.json(response);
}

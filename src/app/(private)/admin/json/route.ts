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

/**
 * This document acts as a go between between the /api page and the server actions.
 * Allowing us to return the data from the server actions in a more readable (and sharable) format.
 */

import { NextResponse, NextRequest } from "next/server";
import { LocalV1Documentation } from "@/handlers/local";
import { BopsV2Documentation } from "@/handlers/bops";
import { ApiV1Documentation } from "@/actions/api/v1";
import { Documentation } from "@/types";

const apis: Record<string, Record<string, Documentation>> = {
  ApiV1: {
    ...ApiV1Documentation,
  },
  LocalV1: {
    ...LocalV1Documentation,
  },
  BopsV2: {
    ...BopsV2Documentation,
  },
};

const getResponse = async (searchParams: URLSearchParams, body?: string) => {
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

      return Promise.resolve(response);
    }
    let args = handlerMethod.arguments?.map((arg: string) => {
      return searchParams.get(arg);
    });
    if (body && args) {
      args = [...args, body];
    }
    response = await handlerMethod.run(args);
  } else {
    response = await Promise.resolve(apis);
  }
  return response;
};

/**
 * Shows the data returned from the server actions for development only!!
 */
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 403 },
    );
  }
  const searchParams = request.nextUrl.searchParams;
  const response = await getResponse(searchParams);
  return NextResponse.json(response);
}

/**
 * Shows the data returned from the server actions for development only!!
 */
export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 403 },
    );
  }
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const response = await getResponse(searchParams, body);
  return NextResponse.json(response);
}

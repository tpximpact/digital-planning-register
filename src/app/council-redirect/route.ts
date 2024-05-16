import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const council = searchParams.get("council");

  if (council && council !== "select") {
    return NextResponse.redirect(new URL(`/${council}`, request.url));
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

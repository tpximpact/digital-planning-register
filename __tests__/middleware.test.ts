/**
 * @jest-environment node
 */

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
import middleware from "./../src/middleware";
import { getAppConfig } from "./../src/config";
import { createAppConfig } from "@mocks/appConfigFactory";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("./../src/config", () => ({
  getAppConfig: jest.fn(),
}));

describe("Middleware", () => {
  let request: Partial<NextRequest>;
  let nextResponseRedirectSpy: jest.SpyInstance;
  let nextResponseRewriteSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    request = {
      nextUrl: { pathname: "/" } as any,
      url: "http://localhost/",
    };
    nextResponseRedirectSpy = jest.spyOn(NextResponse, "redirect");
    nextResponseRewriteSpy = jest.spyOn(NextResponse, "rewrite");
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should redirect to council page if council query param is present", () => {
    request = {
      ...request,
      url: "http://localhost/?council=camden",
    };
    (getAppConfig as jest.Mock).mockReturnValue({
      councils: [{ slug: "camden" }],
    });
    middleware(request as NextRequest);
    expect(nextResponseRedirectSpy).toHaveBeenCalledWith(
      new URL("/camden", request.url),
    );
  });

  it("should rewrite to 404 if the path is invalid", () => {
    if (request.nextUrl) {
      request.nextUrl.pathname = "/invalid/path";
    }
    (getAppConfig as jest.Mock).mockReturnValue({
      councils: [{ slug: "camden" }],
    });
    middleware(request as NextRequest);
    expect(nextResponseRewriteSpy).toHaveBeenCalledWith(
      new URL("/404", request.url),
    );
  });

  it("should not rewrite if the path is valid", () => {
    if (request.nextUrl) {
      request.nextUrl.pathname = "/camden/valid/path";
    }
    (getAppConfig as jest.Mock).mockReturnValue({
      councils: [{ slug: "camden" }],
    });
    middleware(request as NextRequest);
    expect(nextResponseRewriteSpy).not.toHaveBeenCalled();
  });
});

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

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { GET, POST } from "@/app/(private)/admin/json/route";
import { NextRequest } from "next/server";

// Mock process.env
const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV, NODE_ENV: "development" };
});
afterAll(() => {
  process.env = OLD_ENV;
});

// Mock handlers and docs
jest.mock("@/handlers/local", () => ({
  LocalV1Documentation: {
    testMethod: {
      arguments: ["foo"],
      run: jest.fn().mockResolvedValue({ result: "local" }),
    },
  },
}));
jest.mock("@/handlers/bops", () => ({
  BopsV2Documentation: {
    testMethod: {
      arguments: ["bar"],
      run: jest.fn().mockResolvedValue({ result: "bops" }),
    },
  },
}));
jest.mock("@/actions/api/v1", () => ({
  ApiV1Documentation: {
    testMethod: {
      arguments: ["baz"],
      run: jest.fn().mockResolvedValue({ result: "api" }),
    },
  },
}));

function createRequest(
  url: string,
  method: "GET" | "POST" = "GET",
  body?: any,
) {
  const searchParams = new URL(url, "http://localhost").searchParams;
  return {
    nextUrl: { searchParams },
    json: async () => body,
  } as unknown as NextRequest;
}

describe("json/route GET", () => {
  it("returns all APIs if no handler/method", async () => {
    const req = createRequest("/api/json");
    const res = await GET(req);
    const json = await res.json();
    expect(json.ApiV1).toBeDefined();
    expect(json.LocalV1).toBeDefined();
    expect(json.BopsV2).toBeDefined();
  });

  it("returns method result if handler and method are provided", async () => {
    const req = createRequest("/api/json?handler=ApiV1&method=testMethod");
    const res = await GET(req);
    const json = await res.json();
    expect(json).toEqual({ result: "api" });
  });

  it("returns error for invalid handler/method", async () => {
    const req = createRequest("/api/json?handler=ApiV1&method=doesNotExist");
    const res = await GET(req);
    const json = await res.json();
    expect(json).toEqual({ error: "Invalid handler or method" });
  });

  it("returns 403 if not in development", async () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      configurable: true,
    });

    const req = createRequest("/api/json");
    const res = await GET(req);
    expect(res.status).toBe(403);
    const json = await res.json();
    expect(json).toEqual({ error: "Internal Server Error" });

    // Restore original value
    Object.defineProperty(process.env, "NODE_ENV", {
      value: originalEnv,
      configurable: true,
    });
  });
});

describe("json/route POST", () => {
  it("calls run with body as last arg", async () => {
    const req = createRequest(
      "/api/json?handler=LocalV1&method=testMethod",
      "POST",
      "BODYDATA",
    );
    const res = await POST(req);
    const json = await res.json();
    expect(json).toEqual({ result: "local" });
  });

  it("returns 403 if not in development", async () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      configurable: true,
    });
    const req = createRequest("/api/json", "POST", {});
    const res = await POST(req);
    expect(res.status).toBe(403);
    const json = await res.json();
    expect(json).toEqual({ error: "Internal Server Error" });

    // Restore original value
    Object.defineProperty(process.env, "NODE_ENV", {
      value: originalEnv,
      configurable: true,
    });
  });
});

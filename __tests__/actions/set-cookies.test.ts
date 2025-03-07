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
import {
  setConsentCookie,
  clearAnalyticsCookies,
} from "./../../src/actions/set-cookies";
import { cookies } from "next/headers";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("setConsentCookie", () => {
  let cookieStore: { set: jest.Mock };

  beforeEach(() => {
    cookieStore = {
      set: jest.fn(),
    };
    (cookies as jest.Mock).mockReturnValue(cookieStore);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set the consent cookie to true", async () => {
    await setConsentCookie(true);

    expect(cookieStore.set).toHaveBeenCalledWith("consentCookie", "true", {
      path: "/",
      maxAge: 31536000, // 1 year
      sameSite: "strict",
    });
  });

  it("should set the consent cookie to false", async () => {
    await setConsentCookie(false);

    expect(cookieStore.set).toHaveBeenCalledWith("consentCookie", "false", {
      path: "/",
      maxAge: 31536000, // 1 year
      sameSite: "strict",
    });
  });
});

describe("clearAnalyticsCookies", () => {
  let cookieStore: { getAll: jest.Mock; delete: jest.Mock };

  beforeEach(() => {
    cookieStore = {
      getAll: jest.fn(),
      delete: jest.fn(),
    };
    (cookies as jest.Mock).mockReturnValue(cookieStore);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete the _ga cookie", async () => {
    cookieStore.getAll.mockReturnValue([
      { name: "_ga" },
      { name: "sessionCookie" },
    ]);

    await clearAnalyticsCookies();

    expect(cookieStore.delete).toHaveBeenCalledWith("_ga");
    expect(cookieStore.delete).not.toHaveBeenCalledWith("sessionCookie");
  });

  it("should delete cookies starting with _ga_", async () => {
    cookieStore.getAll.mockReturnValue([
      { name: "_ga_12345" },
      { name: "_ga_67890" },
      { name: "otherCookie" },
    ]);

    await clearAnalyticsCookies();

    expect(cookieStore.delete).toHaveBeenCalledWith("_ga_12345");
    expect(cookieStore.delete).toHaveBeenCalledWith("_ga_67890");
    expect(cookieStore.delete).not.toHaveBeenCalledWith("otherCookie");
  });

  it("should not delete any cookies if no matching analytics cookies are found", async () => {
    cookieStore.getAll.mockReturnValue([
      { name: "cookie1" },
      { name: "cookie2" },
    ]);

    await clearAnalyticsCookies();

    expect(cookieStore.delete).not.toHaveBeenCalled();
  });
});

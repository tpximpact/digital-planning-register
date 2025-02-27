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

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { setConsentCookie } from "./../../src/actions/set-cookies";
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

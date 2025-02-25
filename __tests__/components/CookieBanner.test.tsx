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

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CookieBanner } from "@/components/CookieBanner";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      refresh: jest.fn(),
    };
  },
}));

jest.mock("../../src/actions", () => ({
  setConsentCookie: jest.fn(),
}));

describe("CookieBanner", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    document.cookie = "";
  });

  it("renders the initial banner when no consent cookie is set", () => {
    render(<CookieBanner />);
    expect(
      screen.getByText("Cookies on Digital Planning Register"),
    ).toBeInTheDocument();
    expect(screen.getByText("Accept analytics cookies")).toBeInTheDocument();
    expect(screen.getByText("Reject analytics cookies")).toBeInTheDocument();
  });

  it("does not render the banner when consent cookie is set", () => {
    document.cookie = "consentCookie=true";
    render(<CookieBanner />);
    expect(screen.queryByText("Cookies on Register")).not.toBeInTheDocument();
  });
});

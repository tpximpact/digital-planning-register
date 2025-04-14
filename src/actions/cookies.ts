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

"use server";
import { cookies } from "next/headers";

/**
 * Checks for cookie consent from user
 * @returns true if the user has accepted cookies, false otherwise
 */
export async function checkCookieConsent(): Promise<boolean> {
  const cookieStore = cookies();
  const consentCookie = cookieStore.get("consentCookie");
  const acceptAnalytics = consentCookie?.value === "true";
  return acceptAnalytics;
}

/**
 * Sets the consent cookie
 */
export async function setConsentCookie(value: boolean) {
  const cookieStore = cookies();
  cookieStore.set("consentCookie", value.toString(), {
    path: "/",
    maxAge: 31536000, // 1 year
    sameSite: "strict",
  });
}

/**
 * Clears the analytics cookies
 */
export async function clearAnalyticsCookies() {
  const cookieStore = cookies();
  cookieStore.getAll().forEach((cookie) => {
    if (
      cookie.name === "_ga" ||
      cookie.name.startsWith("_ga_") ||
      cookie.name === "_gid" ||
      cookie.name === "_gat"
    ) {
      cookieStore.delete(cookie.name);
    }
  });
}

/**
 * Gets the ClientId from the _ga cookie, used for Server side Google Analytics
 * @returns the client ID from the _ga cookie
 */
export async function getClientIdFromCookies() {
  const cookieStore = cookies();
  const gaCookie = cookieStore.get("_ga")?.value;
  if (!gaCookie) {
    throw new Error("Google Analytics (_ga) cookie is missing.");
  }

  const match = gaCookie.match(/^GA\d+\.\d+\.(\d+\.\d+)$/);

  if (!match) {
    throw new Error("Invalid _ga cookie format.");
  }

  return match[1];
}

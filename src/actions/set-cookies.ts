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

export async function setConsentCookie(value: boolean) {
  const cookieStore = cookies();
  cookieStore.set("consentCookie", value.toString(), {
    path: "/",
    maxAge: 31536000, // 1 year
    sameSite: "strict",
  });
}

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

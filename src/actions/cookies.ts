"use server";
import { cookies } from "next/headers";
// Cookie functions for comment submission flow
export async function setCookie(
  name: string,
  value: string,
  reference: string,
) {
  // Calculate the expiration date (1 week from now)
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  cookies().set(`${reference}_${name}`, value, {
    expires: expirationDate,
    httpOnly: true,
    sameSite: "strict",
  });
}

export async function getCookie(name: string, reference: string) {
  return cookies().get(`${reference}_${name}`)?.value;
}

export async function deleteCookie(name: string, reference: string) {
  cookies().delete(`${reference}_${name}`);
}

export async function clearAllCookies(reference: string) {
  const cookiesToClear = [
    "sentiment",
    "selectedTopics",
    "commentData",
    "personalDetails",
    "validationError",
    "applicationId",
  ];
  cookiesToClear.forEach((cookie) => deleteCookie(cookie, reference));
}

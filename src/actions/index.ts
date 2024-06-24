"use server";

import { cookies } from "next/headers";

export async function getApplicationsByCouncil(
  page: number,
  resultsPerPage: number,
  council: string,
) {
  try {
    const apiKey = council.toUpperCase() + "_API_KEY";
    const councilApi = "NEXT_PUBLIC_BOPS_API_" + council.toUpperCase();
    if (process.env[councilApi] == undefined) {
      return { status: 404, message: "Council not registered", data: null };
    } else {
      const response = await fetch(
        `${process.env[councilApi]}planning_applications?page=${page}&maxresults=${resultsPerPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env[apiKey]}`,
          },
        },
      );
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return { status: 500, message: "Internal server error", data: null };
  }
}

// This function get by reference
export async function getApplicationByReference(
  reference: string,
  council: string,
) {
  try {
    const apiKey = council.toUpperCase() + "_API_KEY";
    const councilApi = "NEXT_PUBLIC_BOPS_API_" + council.toUpperCase();

    if (process.env[councilApi] == undefined) {
      return { status: 404, message: "Council not registered", data: null };
    } else {
      const response = await fetch(
        `${process.env[councilApi]}planning_applications/${reference}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env[apiKey]}`,
          },
        },
      );
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return { status: 500, message: "Internal server error", data: null };
  }
}

export async function searchApplication(
  search: string,
  council: string,
  page: number,
  resultsPerPage: number,
) {
  try {
    const apiKey = council.toUpperCase() + "_API_KEY";
    const councilApi = "NEXT_PUBLIC_BOPS_API_" + council.toUpperCase();
    if (process.env[councilApi] == undefined) {
      return { status: 404, message: "Council not registered", data: null };
    } else {
      const response = await fetch(
        `${process.env[councilApi]}public/planning_applications/search?page=${page}&maxresults=${resultsPerPage}&q=${search}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env[apiKey]}`,
          },
        },
      );

      const data = await response.json();
      return data;
    }
  } catch (error) {
    return { status: 500, message: "Internal server error", data: null };
  }
}

// This might change to take in a reference instead of an id. also note the version number is different - separate env variable for v1.
export async function submitComment(
  id: number,
  council: string,
  apiData: object,
) {
  try {
    const apiKey = council.toUpperCase() + "_API_KEY";
    const councilApi = "NEXT_PUBLIC_BOPS_API_" + council.toUpperCase() + "_V1";
    if (process.env[councilApi] == undefined) {
      return { status: 404, message: "Council not registered" };
    } else {
      const response = await fetch(
        `${process.env[councilApi]}planning_applications/${id}/neighbour_responses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env[apiKey]}`,
          },
          body: JSON.stringify(apiData),
        },
      );

      if (response.ok) {
        return { status: 200, message: "Comment submitted successfully" };
      } else {
        const result = await response.json();
        return { status: response.status, message: result.message };
      }
    }
  } catch (error) {
    console.error("Error submitting comment", error);
    return { status: 500, message: "Internal server error" };
  }
}

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

export async function setTopicIndex(reference: string, index: number) {
  setCookie("currentTopicIndex", index.toString(), reference);
}

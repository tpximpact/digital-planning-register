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

export async function getCookies(value: string) {
  return cookies().get(value);
}

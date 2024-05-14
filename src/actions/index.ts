"use server";

export async function getApplicationsByCouncil(
  page: number,
  resultsPerPage: number,
  council: string,
) {
  try {
    const apiKey = council + "_api_key";
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

// This function search by int ID, in the future it should search by reference number
export async function getApplicationById(id: number, council: string) {
  try {
    const apiKey = council + "_api_key";
    const councilApi = "NEXT_PUBLIC_BOPS_API_" + council.toUpperCase();
    if (process.env[councilApi] == undefined) {
      return { status: 404, message: "Council not registered", data: null };
    } else {
      const response = await fetch(
        `${process.env[councilApi]}planning_applications/${id}`,
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

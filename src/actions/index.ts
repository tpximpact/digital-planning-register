"use server";

export async function getApplicationsByCouncil(
  page: number,
  resultsPerPage: number,
  council: string,
) {
  const apiKey = council + "_api_key";
  const councilApi = "NEXT_PUBLIC_BOPS_API_" + council.toUpperCase();
  if (process.env[councilApi] == undefined) {
    return { status: 404, message: "Council not registered" };
  } else {
    const data = await fetch(
      `${process.env[councilApi]}planning_applications?page=${page}&maxresults=${resultsPerPage}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env[apiKey]}`,
        },
      },
    );
    return data.json();
  }
}

// This function search by int ID, in the future it should search by reference number
export async function getApplicationById(id: number, council: string) {
  const apiKey = council + "_api_key";
  const councilApi = "NEXT_PUBLIC_BOPS_API_" + council.toUpperCase();

  const data = await fetch(
    `${process.env[councilApi]}planning_applications/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env[apiKey]}`,
      },
    },
  );
  return data.json();
}

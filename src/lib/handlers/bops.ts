export async function handleBopsGetRequest<T>(
  council: string,
  url: string,
  v1?: boolean,
): Promise<T> {
  v1 = v1 ?? false;
  const apiKey = council.toUpperCase() + "_API_KEY";
  const councilApi =
    "NEXT_PUBLIC_BOPS_API_" + council.toUpperCase() + (v1 ? "_V1" : "");

  console.log("handleBopsGetRequest called with:", { council, url, v1 });

  if (!process.env[councilApi]) {
    return {
      data: null,
      status: {
        code: 404,
        message: "Couldn't find requested endpoint",
        detail: "Council not registered",
      },
    } as T;
  } else {
    try {
      const fullUrl = `${process.env[councilApi]}${url}`;
      console.log("Fetching from full URL:", fullUrl);

      const response = await fetch(`${process.env[councilApi]}${url}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env[apiKey]}`,
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        // Handle non-2xx HTTP responses
        const errorData = await response.json();

        return {
          data: null,
          status: {
            code: response.status,
            message: response.statusText,
            detail: errorData,
          },
        } as T;
      }

      const data = await response.json();
      return {
        data,
        status: {
          code: response.status,
          message: response.statusText,
        },
      } as T;
    } catch (error) {
      const err = error as Error;
      return {
        data: null,
        status: {
          code: 500,
          message: "Internal server error",
          detail: err.message,
        },
      } as T;
    }
  }
}
export async function handleBopsPostRequest<T>(
  council: string,
  url: string,
  apiData: object,
  v1?: boolean,
): Promise<T> {
  v1 = v1 ?? false;
  const apiKey = council.toUpperCase() + "_API_KEY";
  const councilApi =
    "NEXT_PUBLIC_BOPS_API_" + council.toUpperCase() + (v1 ? "_V1" : "");

  if (!process.env[councilApi]) {
    return {
      data: null,
      status: {
        code: 404,
        message: "Couldn't find requested endpoint",
        detail: "Council not registered",
      },
    } as T;
  } else {
    try {
      const response = await fetch(`${process.env[councilApi]}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env[apiKey]}`,
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        // Handle non-2xx HTTP responses
        const errorData = await response.json();

        return {
          data: null,
          status: {
            code: response.status,
            message: response.statusText,
            detail: errorData,
          },
        } as T;
      }

      const data = await response.json();
      return {
        data,
        status: {
          code: response.status,
          message: response.statusText,
        },
      } as T;
    } catch (error) {
      const err = error as Error;
      return {
        data: null,
        status: {
          code: 500,
          message: "Internal server error",
          detail: err.message,
        },
      } as T;
    }
  }
}

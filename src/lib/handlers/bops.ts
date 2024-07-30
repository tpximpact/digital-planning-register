export async function handleBopsGetRequest<T>(
  council: string,
  url: string,
): Promise<T> {
  // console.info("\n\n\nhandleBopsGetRequest");

  const apiKey = council.toUpperCase() + "_API_KEY";
  const councilApi = "NEXT_PUBLIC_BOPS_API_" + council.toUpperCase();

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
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env[apiKey]}`,
        },
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

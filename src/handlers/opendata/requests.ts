import { getAppConfig } from "@/config";

export async function handleOpenDataGetRequest<T>(
  council: string,
  url: string,
): Promise<T> {
  console.log(
    "handleOpenDataGetRequest",
    `https://opendata.camden.gov.uk/resource/2eiu-s2cw.json${url}`,
  );
  try {
    const config = getAppConfig(council);
    const revalidateConfig = config.defaults.revalidate;
    const response = await fetch(
      `https://opendata.camden.gov.uk/resource/2eiu-s2cw.json${url}`,
      {
        method: "GET",
        next: {
          revalidate: revalidateConfig,
        },
      },
    );

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

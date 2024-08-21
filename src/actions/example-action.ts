"use server";

import { trackServer } from "@/lib/DprAnalytics";
import { ApiResponse } from "@/types";

/**
 * Example only - should live in types in real world
 */
export interface ExampleSchemaProps {
  data: Record<string, string>;
}

export async function exampleServerAction(): Promise<
  ApiResponse<ExampleSchemaProps | null>
> {
  await trackServer("getPublicApplicationDetails", {
    message: "getPublicApplicationDetails",
  });

  const request = await fakeFetch();
  return request;
}

/**
 * Fake fetch function to mimic API call
 * @returns
 */
async function fakeFetch(): Promise<ApiResponse<ExampleSchemaProps | null>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          data: {
            exampleKey: "exampleValue",
          },
        },
      });
    }, 1000); // Simulate network delay
  });
}

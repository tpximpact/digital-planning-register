"use server";
import { ApiResponse, SearchParamsApplication } from "@/types";
import { ContainerClient } from "@azure/storage-blob";
import { createInterface } from "node:readline";
import { Readable } from "node:stream";

async function fetchData(): Promise<string[]> {
  const sasUrl = process.env.TEST_URL;
  if (!sasUrl) {
    throw new Error("TEST_URL environment variable is not set");
  }

  const folderPath = process.env.TEST_FOLDER_PATH || "test-folder";
  if (!folderPath) {
    throw new Error("TEST_FOLDER_PATH environment variable is not set");
  }

  const fileName = process.env.TEST_FILENAME || "planningdata.json";
  if (!folderPath) {
    throw new Error("TEST_FILENAME environment variable is not set");
  }

  const containerClient = new ContainerClient(sasUrl);
  const blobs = containerClient.listBlobsFlat({ prefix: folderPath });

  for await (const blob of blobs) {
    if (blob.name.endsWith(fileName)) {
      console.log(`Found blob: ${blob.name}`);

      const blobClient = containerClient.getBlobClient(blob.name);

      console.log("Downloading blob:", blob.name);
      const downloadResponse = await blobClient.download();
      console.log("Download response received for blob:", blob.name);

      if (!downloadResponse.readableStreamBody) {
        console.warn(
          "No readableStreamBody found in downloadResponse for blob:",
          blob.name,
        );
      }

      const downloaded = await streamToString(
        downloadResponse.readableStreamBody ?? null,
      );

      console.log(
        "Downloaded string for blob",
        blob.name,
        ":",
        downloaded.slice(0, 500),
        downloaded.length > 500 ? "...(truncated)" : "",
      );

      // Try to detect CSV vs JSON
      if (fileName.endsWith(".csv")) {
        // Simple CSV to JSON (assumes no quoted commas or newlines in fields)
        const lines = downloaded.split(/\r?\n/).filter(Boolean);
        const headers = lines[0].split(",").map((h) => h.trim());
        const records = lines.slice(1).map((line) => {
          const values = line.split(",").map((v) => v.trim());
          const obj: Record<string, string> = {};
          headers.forEach((header, idx) => {
            obj[header] = values[idx] ?? "";
          });
          return obj;
        });
        return records;
      } else {
        const trimmed = downloaded.trim();
        // Parse as JSON
        const data = JSON.parse(trimmed);

        const transformedData = transformData(data);
        // console.log(transformedData);
        return transformedData;
      }
    }
  }

  throw new Error(`${fileName} not found`);
}

// Helper to read a stream into a string
async function streamToString(
  readableStream: NodeJS.ReadableStream | null,
): Promise<string> {
  if (!readableStream) return "";

  const chunks: Uint8Array[] = [];
  for await (const chunk of readableStream) {
    if (typeof chunk === "string") {
      chunks.push(Buffer.from(chunk, "utf-8"));
    } else {
      chunks.push(Buffer.from(chunk));
    }
  }
  return Buffer.concat(chunks).toString("utf-8");
}

// changes 'DCAPPL[REFVAL]' to 'REFVAL' in the data so it matches the csv format
function transformData(data: any[]) {
  return data.map((item) => {
    const newItem: Record<string, any> = {};
    for (const key in item) {
      const match = key.match(/^DCAPPL\[(.+)\]$/);
      if (match) {
        newItem[match[1]] = item[key];
      } else {
        newItem[key] = item[key];
      }
    }
    return newItem;
  });
}

export async function getData(validSearchParams): Promise<string[]> {
  try {
    const data = await fetchData();
    console.log("getData: Fetched data:", data.length, "items");

    const paginatedData = fakePagination(data, data.length, validSearchParams);

    return paginatedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const fakePagination = (
  data: any,
  totalResults: number,
  searchParams: SearchParamsApplication,
): ApiResponse<any> => {
  const finalTotalResults = totalResults + data.length;

  const resultsPerPage = searchParams.resultsPerPage;
  const currentPage = searchParams.page;
  const totalPages = Math.ceil(finalTotalResults / resultsPerPage);

  // Calculate shown documents
  const startIdx = ((currentPage ?? 1) - 1) * (resultsPerPage ?? 10);
  const endIdx = startIdx + (resultsPerPage ?? 10);

  const currentPageData = data.slice(startIdx, endIdx);
  // Sort by DCAPPL[DATEAPRECV] descending (newest first)
  // .sort((a, b) => {
  //   const dateA = new Date(a.DATEAPRECV ?? 0).getTime();
  //   const dateB = new Date(b.DATEAPRECV ?? 0).getTime();
  //   return dateB - dateA;
  // })
  // .slice(startIdx, endIdx);

  const pagination = {
    resultsPerPage,
    currentPage,
    totalPages,
    totalResults: finalTotalResults,
    totalAvailableItems: finalTotalResults,
  };

  return {
    data: currentPageData.length > 0 ? currentPageData : null,
    pagination,
    status: {
      code: 200,
      message: "OK",
    },
  };
};

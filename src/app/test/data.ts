"use server";
import { defaultPagination } from "@/handlers/lib";
import { ApiResponse, DprPagination, SearchParamsApplication } from "@/types";
import { ContainerClient } from "@azure/storage-blob";
import { parse, parseStream } from "fast-csv";
import { createInterface } from "readline";
import { Readable } from "stream";

const fakePagination = (
  data: any,
  totalResults: number,
  searchParams: SearchParamsApplication,
): ApiResponse<any | null> => {
  const resultsPerPage = searchParams.resultsPerPage;
  const currentPage = searchParams.page;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

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
    totalResults: totalResults,
    totalAvailableItems: totalResults,
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

async function countCsvRows(stream: Readable): Promise<number> {
  let count = 0;
  const rl = createInterface({ input: stream });
  for await (const _ of rl) {
    count++;
  }
  // Subtract 1 for the header row
  return Math.max(0, count - 1);
}

async function fetchData(
  validSearchParams: SearchParamsApplication,
): Promise<{ data: any[] | null; pagination: DprPagination }> {
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
      const t0 = Date.now();
      const downloadResponse = await blobClient.download();
      const t1 = Date.now();
      console.log(`Download took ${t1 - t0} ms`);
      console.log("Download response received for blob:", blob.name);

      if (!downloadResponse.readableStreamBody) {
        throw new Error(
          `No readableStreamBody found in downloadResponse for blob: ${blob.name}`,
        );
      }
      // CSV streaming
      if (fileName.endsWith(".csv")) {
        console.log("Processing as CSV file:", fileName);

        const data = await fetchCsvPage(
          downloadResponse.readableStreamBody!,
          validSearchParams.page,
          validSearchParams.resultsPerPage,
        );
        const t2 = Date.now();
        console.log(`Processing took ${t2 - t1} ms`);

        return { data, pagination: defaultPagination };
      } else {
        console.log("Processing as JSON file:", fileName);
        // JSON: still have to buffer the whole file
        const downloaded = await streamToString(
          downloadResponse.readableStreamBody ?? null,
        );
        const dataTrimmed = JSON.parse(downloaded.trim());
        const dataTransformed = transformData(dataTrimmed);
        const { data, pagination } = fakePagination(
          dataTransformed,
          dataTransformed.length,
          validSearchParams,
        );

        return {
          data,
          pagination: pagination ? pagination : defaultPagination,
        };
      }
    }
  }

  throw new Error(`${fileName} not found`);
}

async function fetchCsvPage(
  stream: NodeJS.ReadableStream,
  page: number,
  resultsPerPage: number,
): Promise<any[] | null> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    let rowIndex = 0;
    const startIdx = (page - 1) * resultsPerPage;
    const endIdx = startIdx + resultsPerPage;

    console.log(startIdx, endIdx);

    const csvStream = parse({
      headers: true,
      trim: true,
      maxRows: 50,
    })
      .on("error", (error) => {
        console.error(error);
        reject;
      })
      .on("data", (row) => {
        console.log(rowIndex);
        if (rowIndex >= startIdx && rowIndex < endIdx) {
          console.log("Adding row");
          results.push(row);
        }
        rowIndex++;
        // Stop parsing if we've collected enough rows for the page
        if (rowIndex >= endIdx) {
          console.log("Reached end of page, stopping stream");
          csvStream.destroy(); // Stop the stream early for efficiency
          resolve(results);
        }
      })
      .on("end", (rowCount: number) => {
        console.log(`Parsed ${rowCount} rows`);
        console.log(`Total rows processed: ${rowIndex}`);
        resolve(results);
      });

    stream.pipe(csvStream);
  });
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

export async function getData(
  validSearchParams: SearchParamsApplication,
): Promise<ApiResponse<any>> {
  try {
    const response = await fetchData(validSearchParams);

    return {
      data: response.data,
      pagination: response.pagination,
      status: {
        code: 200,
        message: "OK",
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

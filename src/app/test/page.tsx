/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

import React from "react";
import { UnknownSearchParams } from "@/types";
import { getAppConfig } from "@/config";
import { ContentError } from "@/components/ContentError";
import { PageMain } from "@/components/PageMain";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/PageTemplate";
import { getValueFromUnknownSearchParams } from "@/lib/search";
import { ContainerClient } from "@azure/storage-blob";

interface HomeProps {
  searchParams?: UnknownSearchParams;
}

async function fetchData(): Promise<string[]> {
  const sasUrl = process.env.TEST_URL;
  if (!sasUrl) {
    throw new Error("TEST_URL environment variable is not set");
  }

  const folderPath = process.env.TEST_FOLDER_PATH || "test-folder";
  if (!folderPath) {
    throw new Error("TEST_FOLDER_PATH environment variable is not set");
  }

  const containerClient = new ContainerClient(sasUrl);
  const blobs = containerClient.listBlobsFlat({ prefix: folderPath });

  for await (const blob of blobs) {
    if (blob.name.endsWith("planningdata.json")) {
      const blobClient = containerClient.getBlobClient(blob.name);
      const downloadResponse = await blobClient.download();
      const downloaded = await streamToString(
        downloadResponse.readableStreamBody ?? null,
      );
      return JSON.parse(downloaded);
    }
  }

  throw new Error("planningdata.json not found");
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

export async function generateMetadata() {
  return {
    title: "Test page",
    description: "Test page for azure blob storage",
  };
}

export default async function PlanningApplicationSearch({
  searchParams,
}: HomeProps) {
  const appConfig = getAppConfig();

  const accessToken =
    searchParams && searchParams.accessToken
      ? getValueFromUnknownSearchParams(searchParams, "accessToken")
      : undefined;

  if (!accessToken || accessToken !== process.env.TEST_KEY) {
    return notFound();
  }

  try {
    const response = await fetchData();

    return (
      <PageTemplate appConfig={appConfig}>
        <PageMain>
          <h1 className="govuk-heading-xl">Azure Blob storage test</h1>
          <div className="govuk-body">
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        </PageMain>
      </PageTemplate>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <PageTemplate appConfig={appConfig}>
        <PageMain>
          <ContentError />
        </PageMain>
      </PageTemplate>
    );
  }
}

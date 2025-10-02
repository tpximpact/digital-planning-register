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

import { documents } from "@/handlers/bops/v2/documents";
import { handleBopsGetRequest } from "@/handlers/bops/requests";
import { convertBopsDocumentEndpointToDprDocumentEndpoint } from "@/handlers/bops/converters/documents";
import { SearchParamsDocuments } from "@/types";

jest.mock("@/handlers/bops/requests");
jest.mock("@/handlers/bops/converters/documents");

const mockHandleBopsGetRequest = handleBopsGetRequest as jest.Mock;
const mockConvertBopsDocumentEndpointToDprDocumentEndpoint =
  convertBopsDocumentEndpointToDprDocumentEndpoint as jest.Mock;

const baseSearchParams: SearchParamsDocuments = {
  page: 1,
  resultsPerPage: 5,
};

describe.skip("documents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConvertBopsDocumentEndpointToDprDocumentEndpoint.mockReturnValue({
      data: [],
      pagination: {},
      status: { code: 200, message: "" },
    });
  });

  it("builds the correct URL with searchParams", async () => {
    mockHandleBopsGetRequest.mockResolvedValue({
      status: { code: 200, message: "" },
      data: { files: [], metadata: { totalResults: 0 } },
    });

    const searchParams: SearchParamsDocuments = {
      page: 2,
      resultsPerPage: 5,
      name: "foo",
      sortBy: "publishedAt",
      orderBy: "desc",
      type: "usePlan.existing",
      publishedAtFrom: "2024-01-01",
      publishedAtTo: "2024-01-31",
    };

    await documents("public-coundil-1", "APP-123", searchParams);

    const urlArg = mockHandleBopsGetRequest.mock.calls[0][1];
    expect(urlArg).toContain("page=2");
    expect(urlArg).toContain("resultsPerPage=5");
    expect(urlArg).toContain("name=foo");
    expect(urlArg).toContain("sortBy=publishedAt");
    expect(urlArg).toContain("orderBy=desc");
    expect(urlArg).toContain("type=usePlan.existing");
    expect(urlArg).toContain("publishedAtFrom=2024-01-01");
    expect(urlArg).toContain("publishedAtTo=2024-01-31");
  });

  it("returns the result from the converter", async () => {
    mockHandleBopsGetRequest.mockResolvedValue({
      status: { code: 200, message: "" },
      data: { files: [], metadata: { totalResults: 0 } },
    });
    mockConvertBopsDocumentEndpointToDprDocumentEndpoint.mockReturnValue({
      data: [{ title: "foo" }],
      pagination: { totalResults: 1 },
      status: { code: 200, message: "" },
    });

    const result = await documents("camden", "APP-123", baseSearchParams);
    expect(result.data![0].title).toBe("foo");
    expect(result.pagination?.totalResults).toBe(1);
  });
});

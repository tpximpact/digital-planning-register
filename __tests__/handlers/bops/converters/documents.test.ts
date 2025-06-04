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
import {
  convertDocumentBopsFile,
  convertBopsDocumentEndpointToDprDocumentEndpoint,
} from "@/handlers/bops/converters/documents";
import { BopsFile } from "@/handlers/bops/types";
import { SearchParamsDocuments } from "@/types";

jest.mock("@/util", () => ({
  convertDateTimeToUtc: (date: string) => `UTC:${date}`,
}));

describe("convertDocumentBopsFile", () => {
  it("converts a BopsFile to DprDocument", () => {
    const bopsFile: BopsFile = {
      name: "Test Document",
      url: "http://example.com/doc.pdf",
      type: [
        {
          value: "heritageStatement",
          description: "Heritage Statement",
        },
      ],
      applicantDescription: null,
      createdAt: "2024-01-01T12:00:00Z",
      metadata: {
        byteSize: 12345,
        contentType: "application/pdf",
      },
    };
    const result = convertDocumentBopsFile(bopsFile);
    expect(result).toEqual({
      url: "http://example.com/doc.pdf",
      title: "Test Document",
      createdDate: "UTC:2024-01-01T12:00:00Z",
      metadata: {
        byteSize: 12345,
        contentType: "application/pdf",
      },
    });
  });

  it("uses fallback values if fields are missing", () => {
    const bopsFile: BopsFile = {
      name: undefined,
      url: "http://example.com/doc.pdf",
      type: [
        {
          value: "heritageStatement",
          description: "Heritage Statement",
        },
      ],
      applicantDescription: null,
      createdAt: undefined,
      metadata: undefined,
    } as unknown as BopsFile;
    const result = convertDocumentBopsFile(bopsFile);
    expect(result).toEqual({
      url: "http://example.com/doc.pdf",
      title: "Unnamed document",
      createdDate: undefined,
      metadata: {
        byteSize: undefined,
        contentType: undefined,
      },
    });
  });
});

describe("convertBopsDocumentEndpointToDprDocumentEndpoint", () => {
  const makeBopsFile = (n: number): BopsFile => ({
    name: `Doc ${n}`,
    url: `http://example.com/doc${n}.pdf`,
    type: [
      {
        value: "heritageStatement",
        description: "Heritage Statement",
      },
    ],
    applicantDescription: null,
    createdAt: `2024-01-0${n}T12:00:00Z`,
    metadata: { byteSize: n * 1000, contentType: "application/pdf" },
  });

  it("returns paginated documents and correct pagination info", () => {
    const docs = [1, 2, 3, 4, 5].map(makeBopsFile);
    const searchParams: SearchParamsDocuments = { resultsPerPage: 2, page: 2 };
    const totalResults = 5;
    const status = { code: 200, message: "" };

    const result = convertBopsDocumentEndpointToDprDocumentEndpoint(
      docs,
      totalResults,
      searchParams,
      status,
    );

    expect(result.data).toHaveLength(2);
    expect(result.data).not.toBeNull();
    expect(result.data![0].title).toBe("Doc 3");
    expect(result.data![1].title).toBe("Doc 4");
    expect(result.pagination).toEqual({
      resultsPerPage: 2,
      currentPage: 2,
      totalPages: 3,
      totalResults: 5,
      totalAvailableItems: 5,
    });
    expect(result.status).toEqual(status);
  });

  it("returns null documents and correct pagination info", () => {
    const docs = [] as BopsFile[];
    const searchParams: SearchParamsDocuments = { resultsPerPage: 2, page: 1 };
    const totalResults = 0;
    const status = { code: 200, message: "" };

    const result = convertBopsDocumentEndpointToDprDocumentEndpoint(
      docs,
      totalResults,
      searchParams,
      status,
    );

    expect(result.data).toBeNull();
    expect(result.pagination).toEqual({
      resultsPerPage: 2,
      currentPage: 1,
      totalPages: 0,
      totalResults: 0,
      totalAvailableItems: 0,
    });
    expect(result.status).toEqual(status);
  });

  it("returns null documents if out-of-range page", () => {
    const docs = [1, 2, 3].map(makeBopsFile);
    const searchParams: SearchParamsDocuments = { resultsPerPage: 2, page: 5 };
    const totalResults = 3;
    const status = { code: 200, message: "" };

    const result = convertBopsDocumentEndpointToDprDocumentEndpoint(
      docs,
      totalResults,
      searchParams,
      status,
    );

    expect(result.data).toBeNull();
  });

  it("returns paginated extra documents and correct pagination info", () => {
    const docs = [1, 2, 3, 4, 5].map(makeBopsFile);
    const searchParams: SearchParamsDocuments = { resultsPerPage: 2, page: 2 };
    const totalResults = 5;
    const status = { code: 200, message: "" };
    const extraDocuments = [
      {
        url: "http://example.com/extra.pdf",
        title: "Extra document",
        metadata: {
          contentType: "text/pdf",
        },
      },
    ];

    const result = convertBopsDocumentEndpointToDprDocumentEndpoint(
      docs,
      totalResults,
      searchParams,
      status,
      extraDocuments,
    );

    expect(result.data).toHaveLength(2);
    expect(result.data).not.toBeNull();
    expect(result.data![0].title).toBe("Doc 2");
    expect(result.data![1].title).toBe("Doc 3");
    expect(result.pagination).toEqual({
      resultsPerPage: 2,
      currentPage: 2,
      totalPages: 3,
      totalResults: 6,
      totalAvailableItems: 6,
    });
    expect(result.status).toEqual(status);
  });
});

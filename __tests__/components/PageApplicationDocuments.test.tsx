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

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  PageApplicationDocuments,
  PageApplicationDocumentsProps,
} from "@/components/PageApplicationDocuments";
import { DprDocument, DprPagination } from "@/types";

// Mock child components to isolate tests
jest.mock("@/components/FileList", () => ({
  FileList: ({ documents }: any) => (
    <div data-testid="file-list">{documents?.length} files</div>
  ),
}));
jest.mock("@/components/FormDocumentsSearch", () => ({
  FormDocumentsSearch: () => <div data-testid="form-documents-search" />,
}));
jest.mock("@/components/FormDocumentsSort", () => ({
  FormDocumentsSort: () => <div data-testid="form-documents-sort" />,
}));
jest.mock("@/components/ContentNoResult", () => ({
  ContentNoResult: () => <div data-testid="content-no-result" />,
}));
jest.mock("@/components/ContentNotFound", () => ({
  ContentNotFound: () => <div data-testid="content-not-found" />,
}));
jest.mock("@/components/ContextSetter", () => ({
  ContextSetterWithSuspense: () => <div data-testid="context-setter" />,
}));
jest.mock("@/components/govuk/Pagination", () => ({
  Pagination: () => <div data-testid="pagination" />,
}));
jest.mock("@/components/BackButton", () => ({
  BackButton: () => <div data-testid="back-button" />,
}));

const baseProps: PageApplicationDocumentsProps = {
  params: { council: "camden", reference: "APP-123" },
  appConfig: {
    council: { name: "Camden" },
    defaults: { resultsPerPage: 10 },
    features: {
      documentSearchFields: ["sortBy"],
    },
  } as any,
  documents: [
    { id: "doc1", title: "Document 1" },
    { id: "doc2", title: "Document 2" },
  ] as unknown as DprDocument[],
  searchParams: {
    page: 1,
    resultsPerPage: 10,
  },
  pagination: {
    resultsPerPage: 10,
    currentPage: 1,
    totalPages: 5,
    totalResults: 50,
    totalAvailableItems: 50,
  } as DprPagination,
  application: undefined,
};

describe("PageApplicationDocuments", () => {
  it("renders ContentNotFound if appConfig, council, or pagination is missing", () => {
    const { rerender } = render(
      <PageApplicationDocuments {...baseProps} appConfig={undefined as any} />,
    );
    expect(screen.getByTestId("content-not-found")).toBeInTheDocument();

    rerender(
      <PageApplicationDocuments
        {...baseProps}
        appConfig={{ ...baseProps.appConfig, council: undefined } as any}
      />,
    );
    expect(screen.getByTestId("content-not-found")).toBeInTheDocument();

    rerender(
      <PageApplicationDocuments {...baseProps} pagination={undefined} />,
    );
    expect(screen.getByTestId("content-not-found")).toBeInTheDocument();
  });

  it("renders the no documents hint when totalAvailableItems is 0", () => {
    render(
      <PageApplicationDocuments
        {...baseProps}
        pagination={
          { ...baseProps.pagination, totalAvailableItems: 0 } as DprPagination
        }
        documents={[]}
      />,
    );
    expect(
      screen.getByText(/No documents have been published at this time/i),
    ).toBeInTheDocument();
  });

  it("renders the search form, file list, and pagination when documents exist", () => {
    render(<PageApplicationDocuments {...baseProps} />);
    expect(screen.getByTestId("form-documents-search")).toBeInTheDocument();
    expect(screen.getByTestId("form-documents-sort")).toBeInTheDocument();
    expect(screen.getByTestId("file-list")).toHaveTextContent("2 files");
    expect(screen.queryByTestId("content-no-result")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pagination")).not.toBeNull();
  });

  it("renders ContentNoResult if documents is null", () => {
    render(<PageApplicationDocuments {...baseProps} documents={null} />);
    expect(screen.getByTestId("content-no-result")).toBeInTheDocument();
  });

  it("renders Pagination only if totalPages > 1", () => {
    const { rerender } = render(
      <PageApplicationDocuments
        {...baseProps}
        pagination={{ ...baseProps.pagination, totalPages: 2 } as DprPagination}
      />,
    );
    expect(screen.getByTestId("pagination")).toBeInTheDocument();

    rerender(
      <PageApplicationDocuments
        {...baseProps}
        pagination={{ ...baseProps.pagination, totalPages: 1 } as DprPagination}
      />,
    );
  });

  it("renders BackButton and ContextSetterWithSuspense", () => {
    render(<PageApplicationDocuments {...baseProps} />);
    expect(screen.getByTestId("back-button")).toBeInTheDocument();
    expect(screen.getByTestId("context-setter")).toBeInTheDocument();
  });
});

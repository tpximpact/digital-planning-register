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
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DocumentsList, DocumentsListProps } from "@/components/DocumentsList";

// Mock FileList and Button to isolate the component
jest.mock("@/components/FileList", () => ({
  FileList: ({ documents }: any) => (
    <div data-testid="file-list">{documents?.length} files</div>
  ),
}));
jest.mock("@/components/button", () => ({
  Button: ({ children, ...props }: any) => (
    <a data-testid="show-all-btn" {...props}>
      {children}
    </a>
  ),
}));

const baseProps: DocumentsListProps = {
  councilSlug: "public-council-1",
  reference: "APP-123",
  documents: [
    { url: "/doc1", title: "Doc 1", metadata: {} },
    { url: "/doc2", title: "Doc 2", metadata: {} },
    { url: "/doc3", title: "Doc 3", metadata: {} },
  ],
  totalDocuments: 3,
  documentsToShow: 2,
};

describe("DocumentsList", () => {
  it("renders the heading", () => {
    render(<DocumentsList {...baseProps} />);
    expect(
      screen.getByRole("heading", { name: /Documents/i }),
    ).toBeInTheDocument();
  });

  it("renders the FileList with the correct number of documents", () => {
    render(<DocumentsList {...baseProps} />);
    expect(screen.getByTestId("file-list")).toHaveTextContent("2 files");
  });

  it("shows the 'Show all' button and hint if not all documents are shown", () => {
    render(<DocumentsList {...baseProps} />);
    expect(screen.getByTestId("show-all-btn")).toHaveAttribute(
      "href",
      "/public-council-1/APP-123/documents",
    );
    expect(screen.getByText(/Showing 2 of 3 documents/)).toBeInTheDocument();
    expect(screen.getByText(/Show all 3 documents/)).toBeInTheDocument();
  });

  it("does not show the 'Show all' button if all documents are displayed", () => {
    render(<DocumentsList {...baseProps} documentsToShow={3} />);
    expect(screen.queryByTestId("show-all-btn")).not.toBeInTheDocument();
    expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
  });

  it("renders the no documents message if documents is null", () => {
    render(<DocumentsList {...baseProps} documents={null} />);
    expect(
      screen.getByText(/No documents have been published at this time/i),
    ).toBeInTheDocument();
  });

  it("renders the no documents message if documents is an empty array", () => {
    render(<DocumentsList {...baseProps} documents={[]} />);
    expect(
      screen.getByText(/No documents have been published at this time/i),
    ).toBeInTheDocument();
  });
});

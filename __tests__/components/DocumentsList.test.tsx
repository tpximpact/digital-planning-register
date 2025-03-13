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

// CommentsList.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DocumentsList } from "@/components/DocumentsList";
import { DprDocument } from "@/types";
import { FileList } from "@/components/FileList";
import {
  generateDocument,
  generateNResults,
} from "@mocks/dprApplicationFactory";

jest.mock("@/components/FileList", () => ({
  FileList: jest.fn(),
}));

describe("DocumentsList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows the correct documents", () => {
    const documents = generateNResults<DprDocument>(9, generateDocument);
    render(
      <DocumentsList
        councilSlug="public-council-1"
        reference="12345"
        documents={documents}
        totalDocuments={100}
        showMoreButton={true}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Documents" }),
    ).toBeInTheDocument();
    expect(FileList).toHaveBeenCalledTimes(1);
    expect(FileList).toHaveBeenCalledWith(
      expect.objectContaining({
        documents: expect.arrayContaining(documents),
      }),
      expect.anything(),
    );
    expect(screen.getByText("Showing 9 of 100 documents")).toBeInTheDocument();
    expect(screen.getByText("Show all 100 documents")).toBeInTheDocument();
  });

  it("shows message when no documents", () => {
    render(
      <DocumentsList
        councilSlug="public-council-1"
        reference="12345"
        documents={[]}
        totalDocuments={0}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Documents" }),
    ).toBeInTheDocument();
    expect(FileList).not.toHaveBeenCalled();
    expect(
      screen.getByText("No documents have been published at this time."),
    ).toBeInTheDocument();
  });
});

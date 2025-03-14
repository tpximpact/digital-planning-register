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
import { FileList } from "@/components/FileList";
import { DprDocument } from "@/types";
import { DocumentCardProps } from "@/components/DocumentCard";
import {
  generateDocument,
  generateNResults,
} from "@mocks/dprApplicationFactory";

jest.mock("@/components/DocumentCard", () => ({
  DocumentCard: ({ document }: DocumentCardProps) => (
    <div data-testid="document-card">
      <p>document title: {document.title}</p>
    </div>
  ),
}));

describe("FileList", () => {
  it("shows documents", () => {
    render(
      <FileList
        documents={generateNResults<DprDocument>(9, generateDocument)}
      />,
    );
    expect(screen.getAllByTestId("document-card")).toHaveLength(9);
  });
});

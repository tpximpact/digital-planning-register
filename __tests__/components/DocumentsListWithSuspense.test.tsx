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
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  DocumentsListWithSuspense,
  DocumentsListWithSuspenseProps,
} from "@/components/DocumentsListWithSuspense";

jest.mock("@/components/DocumentsList", () => ({
  DocumentsList: (props: any) => (
    <div data-testid="documents-list">
      {props.documents ? `${props.documents.length} docs` : "no docs"}
    </div>
  ),
  DocumentsListSkeleton: () => <div data-testid="documents-list-skeleton" />,
}));

describe("DocumentsListWithSuspense", () => {
  const baseProps: DocumentsListWithSuspenseProps = {
    councilSlug: "public-council-1",
    reference: "APP-123",
    documentsToShow: 2,
  };

  it("renders DocumentsList directly if documents and totalDocuments are provided", () => {
    render(
      <DocumentsListWithSuspense
        {...baseProps}
        documents={[
          { url: "/doc1", title: "Doc 1", metadata: {} },
          { url: "/doc2", title: "Doc 2", metadata: {} },
        ]}
        totalDocuments={2}
      />,
    );
    expect(screen.getByTestId("documents-list")).toHaveTextContent("2 docs");
  });
});

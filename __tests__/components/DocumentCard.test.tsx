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

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DprDocument } from "@/types";
import { DocumentCard } from "@/components/DocumentCard";

describe("Render DocumentCard", () => {
  it("should render basic Attachment fields from DprDocument", () => {
    const document: DprDocument = {
      url: "#",
      title: "Document title",
      createdDate: "2023-11-14T13:40:51.567Z",
      metadata: {
        byteSize: 1024,
        contentType: "text/html",
      },
    };

    render(<DocumentCard document={document} />);

    expect(
      screen.getByRole("link", { name: /document title/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("TEXT/HTML, 1.00 KB, uploaded 14 Nov 2023"),
    ).toBeInTheDocument();
  });

  it("should not error if metadata is missing", () => {
    const document: DprDocument = {
      url: "#",
      title: "Another doc",
      createdDate: "2023-11-14T13:40:51.567Z",
    };

    render(<DocumentCard document={document} />);

    expect(
      screen.getByRole("link", { name: /another doc/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText("KB")).not.toBeInTheDocument();
  });

  it("should show fallback text if there's no title", () => {
    const document: DprDocument = {
      url: "#",
      title: "",
      createdDate: "2023-11-14T13:40:51.567Z",
      metadata: {
        byteSize: 25600,
        contentType: "application/pdf",
      },
    };

    render(<DocumentCard document={document} />);

    expect(
      screen.getByRole("link", { name: /untitled document/i }),
    ).toBeInTheDocument();
  });
  it.todo(
    "should show the default file thumbnail when no matching file type is found",
  );
  it.todo(
    "should show the default file thumbnail when no file type is provided",
  );
  it.todo("should show the html file thumbnail for html files etc");
  it.todo("should show a thumbnail for the document if one is provided");
});

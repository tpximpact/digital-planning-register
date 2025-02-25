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
import { render, screen, act } from "@testing-library/react";
import { DocumentCard } from "../../src/components/DocumentCard";
import "@testing-library/jest-dom";
import { DprDocument } from "@/types";

describe("Render DocumentCard", () => {
  it("should render a document card", () => {
    const document: DprDocument = {
      url: "#",
      title: "Document title",
      createdDate: "2023-11-14T13:40:51.567Z",
      metadata: {
        byteSize: 1024,
        contentType: "text/html",
      },
    };
    const { container } = render(<DocumentCard document={document} />);

    expect(
      screen.getByRole("link", {
        name: "Document title",
      }),
    ).toBeInTheDocument();

    expect(container.querySelector("time")).toHaveAttribute(
      "datetime",
      "2023-11-14T13:40:51.567Z",
    );
    expect(container.querySelector("time")).toHaveTextContent("14-11-2023");

    expect(screen.getByText("TEXT/HTML")).toBeInTheDocument();
    expect(screen.getByText("1.00 KB")).toBeInTheDocument();
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

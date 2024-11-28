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

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
import Attachment from "@/components/govukDpr/Attachment/Attachment";

describe("Attachment Component", () => {
  it("displays the correct title and URL link", () => {
    render(<Attachment title="My Document" url="https://example.com/doc" />);

    const link = screen.getByRole("link", { name: "My Document" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com/doc");
  });

  it("displays fileName if different from title", () => {
    render(<Attachment title="Fancy Title" fileName="original_document.pdf" />);
    expect(screen.queryByText("Fancy Title")).toBeInTheDocument();
  });

  it("shows metadata if contentType, fileSize, and numberOfPages are provided", () => {
    render(
      <Attachment contentType="pdf" fileSize={12345678} numberOfPages={7} />,
    );
    expect(screen.getByText("PDF, 11.77 MB, 7 pages")).toBeInTheDocument();
  });

  it("does not show metadata if none of them are provided", () => {
    render(<Attachment />);
    const metadata = screen.queryByText(/pages|KB|pdf/i);
    expect(metadata).not.toBeInTheDocument();
  });

  it("shows a custom thumbnail if thumbnailUrl is provided", () => {
    const { container } = render(
      <Attachment
        thumbnailUrl="/images/custom-thumb.png"
        title="Custom Thumbnail Doc"
      />,
    );

    const thumbImg = container.querySelector(".dpr-attachment__thumbnail img");
    expect(thumbImg?.getAttribute("src")).toMatch(/custom-thumb\.png/);
    expect(thumbImg).toHaveAttribute("alt", "Custom Thumbnail Doc thumbnail");
  });

  it("shows the correct inline icon if recognized contentType is 'application/pdf'", () => {
    const { container } = render(<Attachment contentType="application/pdf" />);
    const pdfIcon = container.querySelector(
      ".dpr-attachment__thumbnail-image--pdf",
    );
    expect(pdfIcon).toBeInTheDocument();
  });

  it("shows the default/generic icon if contentType is unrecognized", () => {
    const { container } = render(
      <Attachment contentType="some/unknown-type" />,
    );
    const genericIcon = container.querySelector(
      ".dpr-attachment__thumbnail-image--generic",
    );
    expect(genericIcon).toBeInTheDocument();
  });

  it("displays an accessible format note if alternativeFormatContactEmail is set", () => {
    render(
      <Attachment
        alternativeFormatContactEmail="helpdesk@example.org"
        title="Accessible Title"
      />,
    );
    expect(
      screen.getByText(/Request an accessible format/i),
    ).toBeInTheDocument();
  });

  it("does not display an accessible format note if alternativeFormatContactEmail is missing", () => {
    render(<Attachment />);
    expect(
      screen.queryByText(/Request an accessible format/i),
    ).not.toBeInTheDocument();
  });
});

describe("MIME-type icon rendering", () => {
  it('renders the PDF icon for shorthand "pdf"', () => {
    const { container } = render(<Attachment contentType="pdf" />);
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--pdf",
    );
    expect(icon).toBeInTheDocument();
  });

  it('renders the PDF icon for "application/pdf"', () => {
    const { container } = render(<Attachment contentType="application/pdf" />);
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--pdf",
    );
    expect(icon).toBeInTheDocument();
  });

  it('renders the Document icon for shorthand "doc"', () => {
    const { container } = render(<Attachment contentType="doc" />);
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--document",
    );
    expect(icon).toBeInTheDocument();
  });

  it('renders the Document icon for "application/msword"', () => {
    const { container } = render(
      <Attachment contentType="application/msword" />,
    );
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--document",
    );
    expect(icon).toBeInTheDocument();
  });

  it('renders the Document icon for shorthand "docx"', () => {
    const { container } = render(<Attachment contentType="docx" />);
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--document",
    );
    expect(icon).toBeInTheDocument();
  });

  it("renders the Document icon for the full DOCX MIME type", () => {
    const { container } = render(
      <Attachment contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document" />,
    );
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--document",
    );
    expect(icon).toBeInTheDocument();
  });

  it('renders the Spreadsheet icon for shorthand "xls"', () => {
    const { container } = render(<Attachment contentType="xls" />);
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--spreadsheet",
    );
    expect(icon).toBeInTheDocument();
  });

  it('renders the Spreadsheet icon for "application/vnd.ms-excel"', () => {
    const { container } = render(
      <Attachment contentType="application/vnd.ms-excel" />,
    );
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--spreadsheet",
    );
    expect(icon).toBeInTheDocument();
  });

  it('renders the Spreadsheet icon for shorthand "xlsx"', () => {
    const { container } = render(<Attachment contentType="xlsx" />);
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--spreadsheet",
    );
    expect(icon).toBeInTheDocument();
  });

  it("renders the Spreadsheet icon for the full XLSX MIME type", () => {
    const { container } = render(
      <Attachment contentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />,
    );
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--spreadsheet",
    );
    expect(icon).toBeInTheDocument();
  });

  it('renders the Spreadsheet icon for shorthand "spreadsheet"', () => {
    const { container } = render(<Attachment contentType="spreadsheet" />);
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--spreadsheet",
    );
    expect(icon).toBeInTheDocument();
  });

  it('renders the HTML icon for shorthand "html"', () => {
    const { container } = render(<Attachment contentType="html" />);
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--html",
    );
    expect(icon).toBeInTheDocument();
  });

  it('renders the HTML icon for "text/html"', () => {
    const { container } = render(<Attachment contentType="text/html" />);
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--html",
    );
    expect(icon).toBeInTheDocument();
  });

  it('renders the HTML icon for "application/xhtml+xml"', () => {
    const { container } = render(
      <Attachment contentType="application/xhtml+xml" />,
    );
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--html",
    );
    expect(icon).toBeInTheDocument();
  });

  it('renders the External icon for "external"', () => {
    const { container } = render(<Attachment contentType="external" />);
    const icon = container.querySelector(
      ".dpr-attachment__thumbnail-image--external",
    );
    expect(icon).toBeInTheDocument();
  });
});

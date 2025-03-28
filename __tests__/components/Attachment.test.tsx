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
    console.log(container);
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

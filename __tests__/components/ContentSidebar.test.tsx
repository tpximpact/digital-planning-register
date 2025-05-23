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
import {
  ContentSidebar,
  ContentSidebarProps,
} from "@/components/ContentSidebar";

const mockContent: ContentSidebarProps["content"] = [
  {
    key: "key-information",
    title: "Key information",
    content: <p>Key information content</p>,
  },
  {
    key: "description",
    title: "Description",
    content: <p>Description content</p>,
    children: [
      {
        key: "sub-description",
        title: "Sub Description",
        content: <p>Sub Description content</p>,
      },
    ],
  },
  {
    key: "documents",
    title: "Documents",
    content: <p>Documents content</p>,
  },
];

describe("ContentSidebar", () => {
  it("renders the ContentSidebar component with headings", () => {
    render(<ContentSidebar content={mockContent} withHeadings={true} />);

    expect(
      screen.getByRole("navigation", { name: "Table of contents" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Contents")).toBeInTheDocument();
    expect(screen.getByText("Key information")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
  });

  it("renders the ContentSidebar component without headings", () => {
    render(<ContentSidebar content={mockContent} withHeadings={false} />);

    expect(
      screen.getByRole("navigation", { name: "Table of contents" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Contents")).toBeInTheDocument();
    expect(screen.getByText("Key information")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
  });

  it("renders nested content", () => {
    render(<ContentSidebar content={mockContent} withHeadings={true} />);

    expect(screen.getByText("Sub Description")).toBeInTheDocument();
  });

  it("returns null if content is not provided", () => {
    const { container } = render(
      <ContentSidebar content={[]} withHeadings={true} />,
    );
    expect(container.firstChild).toBeNull();
  });
});

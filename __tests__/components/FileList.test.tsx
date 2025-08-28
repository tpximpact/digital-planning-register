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
import {
  generateDocument,
  generateNResults,
} from "@mocks/dprApplicationFactory";
import type { PrototypeFileType as FileType } from "digital-planning-data-schemas/types/schemas/prototypeApplication/enums/FileType.ts";

jest.mock("@/util", () => ({
  capitalizeFirstLetter: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  pascalToSentenceCase: jest.fn((str: string) => {
    return str.replace(/([A-Z])/g, " $1").trim();
  }),
}));

jest.mock("@/components/govukDpr/Attachment", () => ({
  Attachment: ({ title, tags }: { title?: string; tags?: string[] }) => (
    <div data-testid="dpr-attachment__thumbnail">
      <p>document title: {title}</p>
      <p>document tags: {tags?.join(", ")}</p>
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
    expect(screen.getAllByTestId("dpr-attachment__thumbnail")).toHaveLength(9);
  });

  it("passes DprDocument to <Attachment /> correctly", () => {
    const document = generateDocument();
    document.type = ["one", "twoThree"] as unknown as FileType[];
    render(<FileList documents={[document]} />);
    expect(
      screen.getByText("document tags: One, Two Three"),
    ).toBeInTheDocument();
  });
});

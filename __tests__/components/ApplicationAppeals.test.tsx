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
  AppealsListProps,
  ApplicationAppeals,
} from "@/components/ApplicationAppeals";
import { DprDocument } from "@/types";
import { FileList } from "@/components/FileList";
import {
  generateDocument,
  generateNResults,
} from "@mocks/dprApplicationFactory";

jest.mock("@/components/FileList", () => ({
  FileList: jest.fn(),
}));

describe("ApplicationAppeals", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const reason = "Cras justo odio, dapibus ac facilisis in, egestas eget quam.";
  it("Shows reason and documents", () => {
    const appealsData: AppealsListProps = {
      appealReason: reason,
      appealDocuments: generateNResults<DprDocument>(9, generateDocument),
    };

    render(<ApplicationAppeals {...appealsData} />);

    expect(screen.getByRole("heading", { name: "Appeal" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Appeal reason" }),
    ).toBeInTheDocument();
    expect(screen.getByText(reason)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Appeal documents" }),
    ).toBeInTheDocument();

    expect(FileList).toHaveBeenCalled();
  });

  it("Shows reason ", () => {
    const appealsData: AppealsListProps = {
      appealReason: reason,
    };

    render(<ApplicationAppeals {...appealsData} />);

    expect(screen.getByRole("heading", { name: "Appeal" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Appeal reason" }),
    ).toBeInTheDocument();
    expect(screen.getByText(reason)).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: "Appeal documents" }),
    ).not.toBeInTheDocument();

    expect(FileList).not.toHaveBeenCalled();
  });

  it("Shows documents", () => {
    const appealsData: AppealsListProps = {
      appealDocuments: generateNResults<DprDocument>(9, generateDocument),
    };

    render(<ApplicationAppeals {...appealsData} />);

    expect(screen.getByRole("heading", { name: "Appeal" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Appeal reason" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(reason)).not.toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Appeal documents" }),
    ).toBeInTheDocument();

    expect(FileList).toHaveBeenCalled();
  });

  it("Shows nothing when no reason or documents", () => {
    const { container } = render(<ApplicationAppeals />);

    expect(container).toBeEmptyDOMElement();
  });
});

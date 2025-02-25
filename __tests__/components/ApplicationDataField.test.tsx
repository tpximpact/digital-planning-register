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
import { ApplicationDataField } from "../../src/components/ApplicationDataField";
import "@testing-library/jest-dom";
import { InfoIcon } from "@/components/InfoIcon";

jest.mock("@/components/InfoIcon", () => ({
  InfoIcon: () => <div data-testid="info-icon">Info Icon</div>,
}));

describe("Render ApplicationDataField", () => {
  it("should show title and value", () => {
    render(<ApplicationDataField title="title text" value="value text" />);
    expect(screen.queryByText("title text")).toBeInTheDocument();
    expect(screen.queryByText("value text")).toBeInTheDocument();
  });

  it("should show title and value as react component", () => {
    render(<ApplicationDataField title="title text" value={<>value text</>} />);
    expect(screen.queryByText("title text")).toBeInTheDocument();
    expect(screen.queryByText("value text")).toBeInTheDocument();
  });

  it("should not show if value is undefined", () => {
    render(<ApplicationDataField title="title text" value={undefined} />);
    expect(screen.queryByText("title text")).not.toBeInTheDocument();
    expect(screen.queryByText("value text")).not.toBeInTheDocument();
  });

  it("should show infoIcon if passed", () => {
    render(
      <ApplicationDataField
        title="title text"
        value="value text"
        infoIcon={<InfoIcon href="#" title="title" ariaLabel="label" />}
      />,
    );
    expect(screen.queryByText("title text")).toBeInTheDocument();
    expect(screen.queryByText("value text")).toBeInTheDocument();
    expect(screen.queryByText("Info Icon")).toBeInTheDocument();
  });

  it("should add new class if set to full width", () => {
    const { container } = render(
      <ApplicationDataField
        title="title text"
        value="value text"
        isFull={true}
      />,
    );
    expect(container.firstChild).toHaveClass(
      "dpr-application-data-field--full",
    );
  });
});

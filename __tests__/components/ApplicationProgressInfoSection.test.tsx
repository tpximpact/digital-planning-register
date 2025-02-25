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
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ApplicationProgressInfoSection } from "@/components/ApplicationProgressInfo/ApplicationProgressInfoSection";
import { ApplicationProgressInfoToggleButton } from "@/components/ApplicationProgressInfo/ApplicationProgressInfoToggleButton";

jest.mock(
  "@/components/ApplicationProgressInfo/ApplicationProgressInfoToggleButton",
  () => ({
    ApplicationProgressInfoToggleButton: jest.fn(() => (
      <div>Mocked ApplicationProgressInfoToggleButton</div>
    )),
  }),
);

describe("ApplicationProgressInfoSection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders closed section", () => {
    const defaultProps = {
      title: "Donec sed odio dui",
      date: "1 Jan 2021",
      content: (
        <div>
          Maecenas sed diam eget risus varius blandit sit amet non magna.
        </div>
      ),
      onToggle: jest.fn(),
      isExpanded: false,
      accordionSectionId: 0,
    };

    const { container } = render(
      <ApplicationProgressInfoSection {...defaultProps} />,
    );

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    // heading
    expect(
      screen.getByRole("heading", { name: "Donec sed odio dui" }),
    ).toBeInTheDocument();

    // date
    expect(container).toHaveTextContent("1 Jan 2021");

    // show/hide 'button'
    expect(ApplicationProgressInfoToggleButton).toHaveBeenCalledTimes(1);
    expect(ApplicationProgressInfoToggleButton).toHaveBeenCalledWith(
      expect.objectContaining({
        openAll: true,
        title: "Open section showing more information about Donec sed odio dui",
      }),
      expect.anything(),
    );

    // content
    const contentDiv = container.querySelector(
      ".dpr-progress-info__section-content",
    );
    expect(contentDiv).toBeInTheDocument();
    expect(contentDiv).toHaveAttribute("hidden");
    expect(contentDiv).toHaveTextContent(
      "Maecenas sed diam eget risus varius blandit sit amet non magna.",
    );
  });

  it("renders open section", () => {
    const defaultProps = {
      title: "Donec sed odio dui",
      date: "1 Jan 2021",
      content: (
        <div>
          Maecenas sed diam eget risus varius blandit sit amet non magna.
        </div>
      ),
      onToggle: jest.fn(),
      isExpanded: true,
      accordionSectionId: 0,
    };

    const { container } = render(
      <ApplicationProgressInfoSection {...defaultProps} />,
    );

    expect(container.firstChild).toHaveClass(
      "dpr-progress-info__section--expanded",
    );
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    // heading
    expect(
      screen.getByRole("heading", { name: "Donec sed odio dui" }),
    ).toBeInTheDocument();

    // date
    expect(container).toHaveTextContent("1 Jan 2021");

    // show/hide 'button'
    expect(ApplicationProgressInfoToggleButton).toHaveBeenCalledTimes(1);
    expect(ApplicationProgressInfoToggleButton).toHaveBeenCalledWith(
      expect.objectContaining({
        openAll: false,
        title: "Open section showing more information about Donec sed odio dui",
      }),
      expect.anything(),
    );

    // content
    const contentDiv = container.querySelector(
      ".dpr-progress-info__section-content",
    );
    expect(contentDiv).toBeInTheDocument();
    expect(contentDiv).not.toHaveAttribute("hidden");
    expect(contentDiv).toHaveTextContent(
      "Maecenas sed diam eget risus varius blandit sit amet non magna.",
    );
  });

  it("calls onToggle when clicked closed section", () => {
    const onToggle = jest.fn();
    const defaultProps = {
      title: "Donec sed odio dui",
      date: "1 Jan 2021",
      content: (
        <div>
          Maecenas sed diam eget risus varius blandit sit amet non magna.
        </div>
      ),
      onToggle,
      isExpanded: true,
      accordionSectionId: 0,
    };

    render(<ApplicationProgressInfoSection {...defaultProps} />);

    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(0, false);
  });
});

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
import { ApplicationProgressInfo } from "@/components/ApplicationProgressInfo/ApplicationProgressInfo";
import { ApplicationProgressInfoSection } from "@/components/ApplicationProgressInfo/ApplicationProgressInfoSection";
import { ApplicationProgressInfoToggleButton } from "@/components/ApplicationProgressInfo/ApplicationProgressInfoToggleButton";

jest.mock(
  "@/components/ApplicationProgressInfo/ApplicationProgressInfoSection",
  () => ({
    ApplicationProgressInfoSection: jest.fn(() => {
      return <div>Mocked ApplicationProgressInfoSection</div>;
    }),
  }),
);

jest.mock(
  "@/components/ApplicationProgressInfo/ApplicationProgressInfoToggleButton",
  () => ({
    ApplicationProgressInfoToggleButton: jest.fn(() => (
      <div>Mocked ApplicationProgressInfoToggleButton</div>
    )),
  }),
);

describe("ApplicationProgressInfo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders closed section", async () => {
    const defaultProps = {
      councilSlug: "public-council-1",
      reference: "ABC123",
      sections: [
        {
          title: "Section 1",
          date: "2 Jan 2021",
          content: <p>Content 1</p>,
        },
        {
          title: "Section 2",
          date: "3 Jan 2021",
          content: <p>Content 2</p>,
        },
      ],
    };

    await render(<ApplicationProgressInfo {...defaultProps} />);

    // controls
    expect(ApplicationProgressInfoToggleButton).toHaveBeenCalledTimes(1);
    expect(ApplicationProgressInfoToggleButton).toHaveBeenCalledWith(
      expect.objectContaining({
        openAll: true,
        textContinued: "all sections",
      }),
      expect.anything(),
    );

    expect(ApplicationProgressInfoSection).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        title: "Section 1",
        content: <p>Content 1</p>,
        date: "2 Jan 2021",
        isExpanded: false,
        accordionSectionId: 0,
      }),
      expect.anything(),
    );

    expect(ApplicationProgressInfoSection).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        title: "Section 2",
        content: <p>Content 2</p>,
        date: "3 Jan 2021",
        isExpanded: false,
        accordionSectionId: 1,
      }),
      expect.anything(),
    );
  });
});

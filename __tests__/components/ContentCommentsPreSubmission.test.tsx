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
import { ContentCommentsPreSubmission } from "@/components/ContentCommentsPreSubmission";
import { getAppConfig } from "@/config";
import { createAppConfig } from "@mocks/appConfigFactory";

// Mock the getAppConfig function
jest.mock("@/config", () => ({
  getAppConfig: jest.fn(),
}));

describe("ContentCommentsPreSubmission", () => {
  const appConfig = createAppConfig("public-council-1");
  appConfig.councils.map((council) => {
    if (council.slug === "public-council-1") {
      council.pageContent.council_reference_submit_comment_pre_submission = {
        what_happens_to_your_comments_link: "https://example.com/what-happens",
      };
    }
  });

  beforeEach(() => {
    (getAppConfig as jest.Mock).mockReturnValue(appConfig);
  });

  it("renders the component with correct headings and paragraphs", () => {
    render(<ContentCommentsPreSubmission councilConfig={appConfig.council} />);
    expect(
      screen.getByText("What you need to know before you comment"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("What isn't considered in planning approval"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "There are issues that may be of concern to you, and are very important, but which generally cannot be considered as a material planning consideration when assessing a planning application. These include:",
      ),
    ).toBeInTheDocument();
  });

  it("renders the list items correctly", () => {
    render(<ContentCommentsPreSubmission councilConfig={appConfig.council} />);
    expect(
      screen.getByText(
        "disputes about civil matters, such as building freeholds or the 'right to light'",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("loss of property value")).toBeInTheDocument();
  });

  it("renders the link if available in the config", () => {
    render(<ContentCommentsPreSubmission councilConfig={appConfig.council} />);
    const link = screen.getByRole("link", {
      name: /material considerations/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com/what-happens");
  });

  it("does not render the link if not available in the config", () => {
    const appConfig = createAppConfig("public-council-1");
    appConfig.councils.map((council) => {
      if (council.slug === "public-council-1") {
        council.pageContent.council_reference_submit_comment_pre_submission =
          undefined;
      }
    });

    (getAppConfig as jest.Mock).mockReturnValueOnce(appConfig);
    render(<ContentCommentsPreSubmission councilConfig={appConfig.council} />);
    expect(
      screen.queryByRole("link", { name: /material considerations/i }),
    ).not.toBeInTheDocument();
  });
});

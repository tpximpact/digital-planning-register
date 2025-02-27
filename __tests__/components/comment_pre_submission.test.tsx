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
import PreSubmission from "@/components/comment_pre_submission";
import "@testing-library/jest-dom";
import { createAppConfig } from "@mocks/appConfigFactory";

describe("PreSubmission", () => {
  const appConfig = createAppConfig("public-council-1");
  const defaultProps = {
    councilConfig: appConfig.council,
    reference: "REF-001",
    navigateToPage: jest.fn(),
    updateProgress: jest.fn(),
  };

  beforeEach(() => {
    sessionStorage.clear();
  });

  it("renders the component with the correct content", () => {
    render(<PreSubmission {...defaultProps} />);

    expect(
      screen.getByRole("heading", {
        name: "What you need to know before you comment",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "What isn't considered in planning approval",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Why your comments are important" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "What happens to your comments" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Start now" }),
    ).toBeInTheDocument();
  });

  it("navigates to the next page and updates progress when the form is submitted", () => {
    render(<PreSubmission {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Start now" }));

    expect(defaultProps.navigateToPage).toHaveBeenCalledWith(1);
    expect(defaultProps.updateProgress).toHaveBeenCalledWith(0);
    expect(sessionStorage.getItem("presubmission_REF-001")).toBe("completed");
  });
});

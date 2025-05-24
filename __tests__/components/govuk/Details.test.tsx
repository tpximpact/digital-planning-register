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
import { Details } from "@/components/govukDpr/Details";

describe("Details", () => {
  it("renders summary and text", () => {
    render(<Details summaryText="Summary" text="Details content" />);
    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByText("Details content")).toBeInTheDocument();
  });

  it("applies inverted class when isInverted is true", () => {
    render(<Details summaryText="Summary" text="Details content" isInverted />);
    const details =
      screen.getByRole("group", { hidden: true }) ||
      screen.getByText("Summary").closest("details");
    expect(details).toHaveClass("govuk-details--inverted");
  });

  it("sets open attribute when open is true", () => {
    render(<Details summaryText="Summary" text="Details content" open />);
    const details = screen.getByText("Summary").closest("details");
    expect(details).toHaveAttribute("open");
  });

  it("does not set open attribute when open is false", () => {
    render(<Details summaryText="Summary" text="Details content" />);
    const details = screen.getByText("Summary").closest("details");
    expect(details).not.toHaveAttribute("open");
  });

  it("sets name attribute when name is provided", () => {
    render(
      <Details
        summaryText="Summary"
        text="Details content"
        name="my-details"
      />,
    );
    const details = screen.getByText("Summary").closest("details");
    expect(details).toHaveAttribute("name", "my-details");
  });

  it("renders JSX elements for summaryText and text", () => {
    render(
      <Details
        summaryText={<span data-testid="custom-summary">Custom Summary</span>}
        text={<div data-testid="custom-text">Custom Text</div>}
      />,
    );
    expect(screen.getByTestId("custom-summary")).toBeInTheDocument();
    expect(screen.getByTestId("custom-text")).toBeInTheDocument();
  });
});

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
import { PageMain } from "@/components/PageMain";

describe("PageMain", () => {
  it("renders children inside a <main> element", () => {
    render(
      <PageMain>
        <div data-testid="child">Hello</div>
      </PageMain>,
    );
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(main).toContainElement(screen.getByTestId("child"));
  });

  it("applies the default govuk-main-wrapper class", () => {
    render(<PageMain>Content</PageMain>);
    const main = screen.getByRole("main");
    expect(main).toHaveClass("govuk-main-wrapper");
  });

  it("appends custom className if provided", () => {
    render(<PageMain className="custom-class">Content</PageMain>);
    const main = screen.getByRole("main");
    expect(main).toHaveClass("govuk-main-wrapper");
    expect(main).toHaveClass("custom-class");
  });

  it("sets id to 'main'", () => {
    render(<PageMain>Content</PageMain>);
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main");
  });
});

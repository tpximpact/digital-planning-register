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
import { createCouncilConfig } from "@mocks/appConfigFactory";
import { ContentNotOnDprYet } from "@/components/ContentNotOnDprYet";

const council = createCouncilConfig({
  councilName: "Public Council 1",
  currentLiveRegister: "https://example.com",
});

describe("ContentNotOnDprYet", () => {
  beforeEach(() => {
    render(<ContentNotOnDprYet council={council} />);
  });

  it("renders the ContentNotOnDprYet component", () => {
    expect(
      screen.getByText(
        /Not all planning applications are available on this register/i,
      ),
    ).toBeInTheDocument();
  });

  it("displays the pilot scheme information", () => {
    expect(
      screen.getByText(/Find out more about this pilot scheme/i),
    ).toBeInTheDocument();
  });

  it("mentions the primary planning register in the text", () => {
    expect(
      screen.getByText(/visit the primary planning register/i),
    ).toBeInTheDocument();
  });

  it("renders the current live register link", () => {
    expect(
      screen.getByRole("link", {
        name: /visit the primary planning register for\s+Public Council 1\s*\./i,
      }),
    ).toHaveAttribute("href", council?.currentLiveRegister || "");
  });
});

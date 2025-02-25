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
import { PhaseBanner } from "@/components/govuk/PhaseBanner";

describe("PhaseBanner", () => {
  it("renders the banner with correct text", () => {
    render(<PhaseBanner />);
    const link = screen.getByRole("link", { name: /give your feedback/i });

    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText(/This is a new service/i)).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://docs.google.com/forms/d/e/1FAIpQLSfERu46lRoEk6hBQj6diQNwe8QM8HZorNotNRPj-yJ3FkJaxQ/viewform",
    );
  });
});

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

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/(private)/admin/council/page";

// Mock dependencies
jest.mock("@/config", () => ({
  getAppConfig: (slug?: string) =>
    slug === "camden"
      ? {
          council: {
            name: "Camden",
            slug: "camden",
            visibility: "public",
            dataSource: "source1",
            publicComments: true,
            specialistComments: false,
            contact: "mailto:info@camden.gov.uk",
            features: {},
            pageContent: {},
          },
        }
      : { council: undefined },
}));

jest.mock("@/lib/search", () => ({
  getValueFromUnknownSearchParams: (params: any, key: string) => params?.[key],
}));

jest.mock("@/app/(private)/admin/components/CouncilDetail", () => ({
  CouncilDetail: ({ council }: any) => (
    <div data-testid="council-detail">{council.name}</div>
  ),
}));

jest.mock("@/app/(private)/admin/components/AdminTemplate", () => ({
  AdminTemplate: ({ title, description, mainSection }: any) => (
    <div>
      <h1>{title}</h1>
      {description}
      {mainSection}
    </div>
  ),
}));

describe("Admin Council Page", () => {
  it("renders council details if a valid council is specified", () => {
    render(<Page searchParams={{ council: "camden" }} />);
    expect(screen.getByText("Camden details")).toBeInTheDocument();
    expect(
      screen.getByText(/provides detailed information about the council/i),
    ).toBeInTheDocument();
    expect(screen.getByTestId("council-detail")).toHaveTextContent("Camden");
  });

  it("renders an error if no valid council is specified", () => {
    render(<Page searchParams={{ council: "not-a-council" }} />);
    expect(
      screen.getByText("Error: Valid council not specified"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please specify a valid council/i),
    ).toBeInTheDocument();
  });

  it("renders an error if searchParams is missing", () => {
    render(<Page />);
    expect(
      screen.getByText("Error: Valid council not specified"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please specify a valid council/i),
    ).toBeInTheDocument();
  });
});

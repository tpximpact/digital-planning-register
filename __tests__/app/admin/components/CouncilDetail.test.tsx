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
import {
  CouncilDetail,
  CouncilPageContentList,
} from "@/app/(private)/admin/components/CouncilDetail";
import { Council, CouncilDataSource } from "@/config/types";

// Mock SummaryCard and SummaryList to isolate CouncilDetail
jest.mock("@/components/govuk/SummaryCard", () => ({
  SummaryCard: ({ children, title, id }: any) => (
    <div data-testid="summary-card" id={id}>
      <h2>{title.text}</h2>
      {children}
    </div>
  ),
}));
jest.mock("@/components/govuk/SummaryList", () => ({
  SummaryList: ({ rows }: any) => (
    <dl data-testid="summary-list">
      {rows.map((row: any, idx: number) => (
        <div key={idx}>
          <dt>{row.key.text}</dt>
          <dd>
            {typeof row.value.text === "string" ||
            typeof row.value.text === "number" ? (
              row.value.text
            ) : (
              <span data-testid={`row-${row.key.text}`}>{row.value.text}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  ),
}));
jest.mock("@/components/CouncilLogos", () => ({
  councilLogos: {
    camden: <img alt="Camden Logo" data-testid="council-logo" />,
  },
}));

const mockCouncil: Council = {
  name: "Camden",
  slug: "camden",
  visibility: "public",
  dataSource: "test-source" as CouncilDataSource,
  publicComments: true,
  specialistComments: false,
  contact: "mailto:info@camden.gov.uk",
  features: { logoInHeader: true },
  pageContent: {
    privacy_policy: {
      privacy_policy_link: "https://example.com/privacy",
    },
    help: {
      planning_process: {
        council_local_plan_link: "https://example.com/plan",
      },
    },
  },
};

describe("CouncilDetail", () => {
  it("renders the council name and logo", () => {
    render(<CouncilDetail council={mockCouncil} />);
    expect(screen.getByText("Camden")).toBeInTheDocument();
    expect(screen.getByTestId("council-logo")).toBeInTheDocument();
  });

  it("renders the council slug, visibility, and data source", () => {
    render(<CouncilDetail council={mockCouncil} />);
    expect(screen.getByText("camden")).toBeInTheDocument();
    expect(screen.getByText("public")).toBeInTheDocument();
    expect(screen.getByText("test-source")).toBeInTheDocument();
  });

  it("renders the contact as a link", () => {
    render(<CouncilDetail council={mockCouncil} />);
    const contactLink = screen.getByRole("link", {
      name: /info@camden.gov.uk/i,
    });
    expect(contactLink).toHaveAttribute("href", "mailto:info@camden.gov.uk");
  });

  it("renders features", () => {
    render(<CouncilDetail council={mockCouncil} />);
    expect(screen.getByText(/Logo in header:/)).toBeInTheDocument();
  });

  it("renders page content links", () => {
    render(<CouncilDetail council={mockCouncil} />);
    expect(screen.getByText("https://example.com/privacy")).toBeInTheDocument();
    expect(screen.getByText("https://example.com/plan")).toBeInTheDocument();
  });
});

describe("CouncilPageContentList", () => {
  it("renders nested lists and links for page content", () => {
    const content = {
      privacy_policy: {
        privacy_policy_link: "https://example.com/privacy",
      },
      help: {
        planning_process: {
          council_local_plan_link: "https://example.com/plan",
        },
      },
    };
    render(<CouncilPageContentList content={content} />);
    expect(screen.getByText("https://example.com/privacy")).toBeInTheDocument();
    expect(screen.getByText("https://example.com/plan")).toBeInTheDocument();
  });

  it("renders arrays as nested lists", () => {
    const content = {
      links: ["https://a.com", "https://b.com"],
    } as unknown as Council["pageContent"];
    render(<CouncilPageContentList content={content} />);
    expect(screen.getByText("https://a.com")).toBeInTheDocument();
    expect(screen.getByText("https://b.com")).toBeInTheDocument();
  });

  it("renders plain values as strings", () => {
    const content = {
      foo: 123,
      bar: false,
    } as unknown as Council["pageContent"];
    render(<CouncilPageContentList content={content} />);
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("false")).toBeInTheDocument();
  });
});

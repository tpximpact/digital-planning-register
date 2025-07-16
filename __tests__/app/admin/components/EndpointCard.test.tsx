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
import { EndpointCard } from "@/app/(private)/admin/components/EndpointCard";
import { Documentation } from "@/types";

// Mock next/link to render a regular <a>
jest.mock("next/link", () => {
  return ({ href, children, className, ...props }: any) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
});

const baseDocs: Documentation = {
  url: "/api/data",
  file: "endpoint.js",
  run: async (args: [string, string]) => {
    return await jest.fn(() => {
      return { data: "mocked data" };
    });
  },
  description: "This is an endpoint.",
  source: [
    "https://github.com/example/source1",
    "https://github.com/example/source2",
  ],
  examples: [
    {
      url: "/api/example",
      description: "Example API call",
      source: ["https://github.com/example/example-source"],
    },
  ],
};

describe("EndpointCard", () => {
  it("renders endpoint, file, parameters, handler, and description", () => {
    render(
      <EndpointCard
        endpoint="/api/test"
        handler="testHandler"
        docs={baseDocs}
        params={["id", "type"]}
      />,
    );
    expect(screen.getByText("/api/test")).toBeInTheDocument();
    expect(screen.getByText(/File:/)).toBeInTheDocument();
    expect(screen.getByText(/endpoint.js/)).toBeInTheDocument();
    expect(screen.getByText(/Parameters:/)).toBeInTheDocument();
    expect(screen.getByText("id, type")).toBeInTheDocument();
    expect(screen.getByText(/Handler:/)).toBeInTheDocument();
    expect(screen.getByText("testHandler")).toBeInTheDocument();
    expect(screen.getByText("This is an endpoint.")).toBeInTheDocument();
  });

  it("renders sources as links", () => {
    render(
      <EndpointCard
        endpoint="/api/test"
        handler="testHandler"
        docs={baseDocs}
        params={[]}
      />,
    );
    expect(screen.getByText("Source(s):")).toBeInTheDocument();
    baseDocs?.source?.forEach((src) => {
      const link = screen.getByText(src);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", src);
    });
  });

  it("renders examples with description and source links", () => {
    render(
      <EndpointCard
        endpoint="/api/test"
        handler="testHandler"
        docs={baseDocs}
        params={[]}
      />,
    );
    expect(screen.getByText("Examples:")).toBeInTheDocument();
    expect(screen.getByText("Example API call")).toBeInTheDocument();
    expect(screen.getByText("Example API call").closest("a")).toHaveAttribute(
      "href",
      "/api/example",
    );
    expect(screen.getByText("(source)").closest("a")).toHaveAttribute(
      "href",
      "https://github.com/example/example-source",
    );
  });

  it("renders the 'View data' button with correct link", () => {
    render(
      <EndpointCard
        endpoint="/api/test"
        handler="testHandler"
        docs={baseDocs}
        params={[]}
      />,
    );
    const button = screen.getByRole("button", { name: /view data/i });
    expect(button).toHaveAttribute("href", "/api/data");
    expect(button.className).toMatch(/govuk-button--start/);
  });

  it("does not render file, parameters, handler, sources, or examples if not provided", () => {
    const docs = { description: "desc", url: "/api/data" };
    render(
      <EndpointCard
        endpoint="/api/test"
        handler=""
        docs={docs as any}
        params={[]}
      />,
    );
    expect(screen.queryByText(/File:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Parameters:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Handler:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Source/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Examples/)).not.toBeInTheDocument();
    expect(screen.getByText("desc")).toBeInTheDocument();
  });
});

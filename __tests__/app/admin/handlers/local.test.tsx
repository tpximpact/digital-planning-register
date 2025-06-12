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
import Main from "@/app/(private)/admin/handlers/local/page";

// Mock dependencies
jest.mock("@/handlers/local", () => ({
  LocalV1: {
    endpointA: jest.fn(),
    endpointB: jest.fn(),
  },
  LocalV1Documentation: {
    endpointA: { file: "fileA.js", description: "descA" },
    endpointB: { file: "fileB.js", description: "descB" },
  },
}));

jest.mock("@/app/(private)/admin/components/EndpointCard", () => ({
  EndpointCard: ({ endpoint, handler, docs, params }: any) => (
    <div data-testid="endpoint-card">
      <span>{endpoint}</span>
      <span>{handler}</span>
      <span>{docs.file}</span>
      <span>{docs.description}</span>
      <span>{params.join(",")}</span>
    </div>
  ),
}));

jest.mock("@/app/(private)/admin/utils", () => ({
  $args: jest.fn(() => ["param1", "param2"]),
}));

jest.mock("@/app/(private)/admin/components/AdminTemplate", () => ({
  AdminTemplate: ({ title, active, description, mainSection }: any) => (
    <div>
      <h1>{title}</h1>
      <div data-testid="active">{active}</div>
      <div data-testid="description">{description}</div>
      <div data-testid="mainSection">{mainSection}</div>
    </div>
  ),
}));

describe("Local Handler Main Page", () => {
  it("renders the title, description, and security warning", () => {
    render(<Main />);
    expect(
      screen.getByRole("heading", { name: "Local handler" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This page documents the Local handler/i),
    ).toBeInTheDocument();
  });

  it("renders an EndpointCard for each LocalV1 endpoint", () => {
    render(<Main />);
    const cards = screen.getAllByTestId("endpoint-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("endpointA");
    expect(cards[1]).toHaveTextContent("endpointB");
    expect(cards[0]).toHaveTextContent("fileA.js");
    expect(cards[1]).toHaveTextContent("fileB.js");
    expect(cards[0]).toHaveTextContent("descA");
    expect(cards[1]).toHaveTextContent("descB");
    expect(cards[0]).toHaveTextContent("param1,param2");
    expect(cards[1]).toHaveTextContent("param1,param2");
  });

  it("renders a section break after each EndpointCard", () => {
    render(<Main />);
    // There should be two <hr> elements (one after each EndpointCard)
    expect(screen.getAllByRole("separator", { hidden: true }).length).toBe(3);
  });
});

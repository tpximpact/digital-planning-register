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
  Section,
  Row,
  RenderString,
  RecursiveObjectRenderer,
} from "@/components/ApplicationForm";

// Mock utility functions
jest.mock("@/util", () => ({
  capitalizeFirstLetter: (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1),
  pascalToSentenceCase: (str: string) => str.replace(/([A-Z])/g, " $1").trim(),
}));

// Mock ApplicationForm.utils functions
jest.mock("@/components/ApplicationForm/ApplicationForm.utils", () => ({
  isPrimitive: (val: unknown) =>
    typeof val === "string" ||
    typeof val === "number" ||
    typeof val === "boolean",
  isFlatArrayOfPrimitives: (arr: unknown) =>
    Array.isArray(arr) &&
    arr.every(
      (v) =>
        typeof v === "string" ||
        typeof v === "number" ||
        typeof v === "boolean",
    ),
  isObjectOfPrimitives: (obj: unknown) =>
    typeof obj === "object" &&
    obj !== null &&
    !Array.isArray(obj) &&
    Object.values(obj).every(
      (v) =>
        typeof v === "string" ||
        typeof v === "number" ||
        typeof v === "boolean",
    ),
}));

describe("Section", () => {
  it("renders h3 for level 0", () => {
    render(
      <Section title="TestTitle" content={<div>Content</div>} level={-1} />,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Test Title",
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders h4 for level 1", () => {
    render(
      <Section title="AnotherTitle" content={<div>Content</div>} level={0} />,
    );
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Another Title",
    );
  });

  it("renders p with role heading for level > 3", () => {
    render(
      <Section title="DeepTitle" content={<div>Content</div>} level={4} />,
    );
    const heading = screen.getByText("Deep Title");
    expect(heading.tagName).toBe("P");
    expect(heading).toHaveAttribute("role", "heading");
    expect(heading).toHaveAttribute("aria-level", "8");
  });
});

describe("Row", () => {
  it("renders a summary list row with title and value", () => {
    render(<Row title="MyKey" content="MyValue" level={0} />);
    expect(screen.getByText("MyKey")).toBeInTheDocument();
    expect(screen.getByText("MyValue")).toBeInTheDocument();
  });

  it("renders a link if content is a URL", () => {
    render(<Row title="Link" content="http://example.com" level={0} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "http://example.com",
    );
  });

  it("renders boolean as code", () => {
    render(<Row title="Bool" content={true} level={0} />);
    expect(screen.getByText("true")).toBeInTheDocument();
    expect(screen.getByText("true").tagName).toBe("CODE");
  });
});

describe("RenderString", () => {
  it("renders a link for http string", () => {
    render(<RenderString data="http://example.com" />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "http://example.com",
    );
  });

  it("renders boolean as code", () => {
    render(<RenderString data={true} />);
    expect(screen.getByText("true")).toBeInTheDocument();
    expect(screen.getByText("true").tagName).toBe("CODE");
  });

  it("renders empty string as 'empty-string'", () => {
    render(<RenderString data="" />);
    expect(screen.getByText("empty-string")).toBeInTheDocument();
  });

  it("renders other primitives as string", () => {
    render(<RenderString data={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});

describe("RecursiveObjectRenderer", () => {
  it("renders primitives as strings", () => {
    render(<RecursiveObjectRenderer data="hello" />);
    expect(screen.getByText("hello")).toBeInTheDocument();
    render(<RecursiveObjectRenderer data={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
    render(<RecursiveObjectRenderer data={true} />);
    expect(screen.getByText("true")).toBeInTheDocument();
  });

  it("renders single arrays as lists", () => {
    render(<RecursiveObjectRenderer data={["a", "b", "c"]} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
    expect(screen.getByText("c")).toBeInTheDocument();
  });

  it("renders object of primitives as summary list", () => {
    render(<RecursiveObjectRenderer data={{ foo: "bar", baz: 123 }} />);
    expect(screen.getByText("Foo")).toBeInTheDocument();
    expect(screen.getByText("bar")).toBeInTheDocument();
    expect(screen.getByText("Baz")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });

  it("renders nested objects as sections", () => {
    const nested = {
      section: {
        title: "My Title",
        details: {
          name: "Alice",
          age: 30,
        },
      },
    };
    render(<RecursiveObjectRenderer data={nested} />);
    expect(screen.getByText("Section")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("My Title")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });
});

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

// button.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("renders as a button element by default", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: "Click Me" });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe("BUTTON");
  });

  it("renders as a link when element='link'", () => {
    render(
      <Button element="link" href="/test-link">
        Link Button
      </Button>,
    );
    const linkElement = screen.getByRole("button", { name: "Link Button" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe("A");
    expect(linkElement).toHaveAttribute("href", "/test-link");
  });

  it("renders as a span when element='span'", () => {
    render(
      <Button element="span" onClick={() => {}}>
        Span Button
      </Button>,
    );
    const spanElement = screen.getByRole("button", { name: "Span Button" });
    expect(spanElement).toBeInTheDocument();
    expect(spanElement.tagName).toBe("SPAN");
  });

  it("renders with the correct variant classes", () => {
    render(
      <Button variant="primary" className="additional-class">
        Primary Button
      </Button>,
    );
    const buttonElement = screen.getByRole("button", {
      name: "Primary Button",
    });
    expect(buttonElement).toHaveClass(
      "govuk-button",
      "govuk-button--primary",
      "additional-class",
    );
  });

  it("renders as text-only when variant='text-only'", () => {
    render(<Button variant="text-only">Text Only</Button>);
    const linkElement = screen.getByText("Text Only");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass("govuk-link");
    expect(linkElement).not.toHaveClass("govuk-button");
  });

  it("passes the onClick handler", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("sets aria-label when provided", () => {
    render(<Button ariaLabel="Custom Aria Label">Button</Button>);
    const buttonElement = screen.getByRole("button", {
      name: "Custom Aria Label",
    });
    expect(buttonElement).toHaveAttribute("aria-label", "Custom Aria Label");
  });
});

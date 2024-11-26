import React from "react";
import { render, screen } from "@testing-library/react";
import { ApplicationDataField } from "../../src/components/ApplicationDataField";
import "@testing-library/jest-dom";
import { InfoIcon } from "@/components/InfoIcon";

jest.mock("@/components/InfoIcon", () => ({
  InfoIcon: () => <div data-testid="info-icon">Info Icon</div>,
}));

describe("Render ApplicationDataField", () => {
  it("should show title and value", () => {
    render(<ApplicationDataField title="title text" value="value text" />);
    expect(screen.queryByText("title text")).toBeInTheDocument();
    expect(screen.queryByText("value text")).toBeInTheDocument();
  });

  it("should show title and value as react component", () => {
    render(<ApplicationDataField title="title text" value={<>value text</>} />);
    expect(screen.queryByText("title text")).toBeInTheDocument();
    expect(screen.queryByText("value text")).toBeInTheDocument();
  });

  it("should not show if value is undefined", () => {
    render(<ApplicationDataField title="title text" value={undefined} />);
    expect(screen.queryByText("title text")).not.toBeInTheDocument();
    expect(screen.queryByText("value text")).not.toBeInTheDocument();
  });

  it("should show infoIcon if passed", () => {
    render(
      <ApplicationDataField
        title="title text"
        value="value text"
        infoIcon={<InfoIcon href="#" title="title" ariaLabel="label" />}
      />,
    );
    expect(screen.queryByText("title text")).toBeInTheDocument();
    expect(screen.queryByText("value text")).toBeInTheDocument();
    expect(screen.queryByText("Info Icon")).toBeInTheDocument();
  });
});

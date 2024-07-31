import Menu from "../../src/components/menu";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockLocation1 = {
  href: "",
  pathname: "/camden",
};

const mockLocation2 = {
  href: "",
  pathname: "/",
};

describe("Test Menu", () => {
  it("it should render with application search present", async () => {
    render(<Menu currentPath={mockLocation1.pathname} council="camden" />);
    expect(screen.getByText("Application search"));
  });

  it("it should render without application search present", async () => {
    render(<Menu currentPath={mockLocation2.pathname} />);
    expect(
      screen.queryByRole("link", { Name: "Application search" }),
    ).toBeNull();
  });
});

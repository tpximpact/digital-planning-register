import Header from "../../src/components/header";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@react-hook/window-size", () => ({
  useWindowWidth: jest.fn(),
}));

const mockLocation = {
  href: "",
  pathname: "/",
};

describe("Header", () => {
  it("it should render correctly", async () => {
    render(<Header currentPath={mockLocation.pathname} />);
    expect(screen.getByRole("link", { name: "Digital Planning Register" }));
  });
});

import Header from "../../src/components/header";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { usePathname, useParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useParams: jest.fn(),
}));

const mockConfig = {
  camden: { name: "Camden", logowhite: "camden-logo.png", isShowDSN: true },
  barnet: { name: "Barnet", logowhite: "barnet-logo.png", isShowDSN: false },
};

describe("Header", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/");
    useParams.mockReturnValue({ council: "camden" });
  });
  it("it should render correctly", () => {
    render(<Header councilConfig={mockConfig} />);
    expect(
      screen.getByRole("link", { name: "Digital Planning Register" }),
    ).toBeInTheDocument();
  });
});

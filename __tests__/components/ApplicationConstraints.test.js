import { ApplicationConstraints } from "@/components/ApplicationConstraints";
import { screen, render } from "@testing-library/react";
describe("Render ApplicationConstraints", () => {
  it("should render correct", () => {
    render(<ApplicationConstraints />);

    expect(screen.getByRole("heading", { name: "Constraints" }));
  });
});

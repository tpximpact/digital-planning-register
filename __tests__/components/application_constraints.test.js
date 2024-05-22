import ApplicationConstraints from "@/components/application_constraints";
import { screen, render } from "@testing-library/react";
describe("Render ApplicationPeople", () => {
  it("should render correct", () => {
    render(<ApplicationConstraints />);

    expect(screen.getByRole("constraints-title", { Name: "Constraints" }));
  });
});

import NoResult from "@/components/no-results";
import { screen, render } from "@testing-library/react";
describe("Render ApplicationPeople", () => {
  it("should render correct", () => {
    render(<NoResult />);

    expect(
      screen.getByRole("title", { Name: "No applications match your search" }),
    );
  });
});

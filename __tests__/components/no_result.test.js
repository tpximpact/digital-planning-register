import NoResult from "@/components/no_results";
import { screen, render } from "@testing-library/react";
describe("Render ApplicationPeople", () => {
  it("should render correct", async () => {
    const value = { council: "camden" };
    render(await NoResult(value));

    expect(
      screen.getByRole("title", { Name: "No applications match your search" }),
    );
  });
});

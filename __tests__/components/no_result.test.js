import { ContentNoResult } from "@/components/ContentNoResult";
import { screen, render } from "@testing-library/react";
describe("Render ApplicationPeople", () => {
  it("should render correct", async () => {
    const value = { council: "camden" };
    render(await ContentNoResult(value));

    expect(
      screen.getByRole("title", { Name: "No applications match your search" }),
    );
  });
});

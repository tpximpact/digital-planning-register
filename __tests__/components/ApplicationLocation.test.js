import { ApplicationLocation } from "@/components/ApplicationLocation";
import { screen, render } from "@testing-library/react";

describe("Render ApplicationLocation", () => {
  it("should render correct", () => {
    render(<ApplicationLocation />);

    expect(screen.getByRole("heading", { name: "Location" }));
  });
});

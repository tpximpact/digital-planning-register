import ApplicationLocation from "@/components/application_location";
import { screen, render } from "@testing-library/react";

describe("Render ApplicationLocation", () => {
  it("should render correct", () => {
    render(<ApplicationLocation />);

    expect(screen.getByRole("location-title", { Name: "Location" }));
  });
});

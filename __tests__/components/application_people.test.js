import "@testing-library/jest-dom";

import ApplicationPeople from "@/components/application_people";
import { screen, render } from "@testing-library/react";

describe("Render ApplicationPeople", () => {
  const mockData = {
    name: {
      first: "John",
      last: "Schmitt",
    },
  };

  it("should render correct", async () => {
    render(<ApplicationPeople name={mockData.name} />);
    expect(screen.getByText("John Schmitt")).toBeInTheDocument();
  });
});

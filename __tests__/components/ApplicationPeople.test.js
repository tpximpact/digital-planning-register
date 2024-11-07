import "@testing-library/jest-dom";

import { ApplicationPeople } from "@/components/ApplicationPeople";
import { screen, render } from "@testing-library/react";
describe("Render ApplicationPeople", () => {
  const mockData = {
    agent_first_name: "John",
    agent_last_name: "Schmitt",
    applicant_first_name: "Rachel",
    applicant_last_name: "Green",
  };

  it("should render correct", async () => {
    render(<ApplicationPeople {...mockData} />);
    expect(screen.getByText("John Schmitt")).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";

import ApplicationPeople from "@/components/application_people";
import { screen, render } from "@testing-library/react";

describe("Render ApplicationPeople", () => {
  const mockData = {
    agent_first_name: "John",
    agent_last_name: "Schmitt",
    applicant_first_name: "Rachel",
    applicant_last_name: "Green",
    applicant_type: "Individual",
    applicant_address: "London, LN12 5TG",
    agent_address: "",
  };

  it("should render correct", async () => {
    render(<ApplicationPeople {...mockData} />);
    expect(screen.getByText("John Schmitt")).toBeInTheDocument();
  });
});

import ApplicationFile from "@/components/application_files";
import { render } from "@testing-library/react";
describe("Render ApplicationPeople", () => {
  it("should render correct", () => {
    const mockData = {
      documents: [],
    };
    const { container } = render(<ApplicationFile {...mockData} />);
    const documents = container.querySelectorAll(".documents-containers");

    expect(documents.length).toBe(0);
  });
});

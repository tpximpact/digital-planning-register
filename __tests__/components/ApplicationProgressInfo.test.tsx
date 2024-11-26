import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ApplicationProgressInfo } from "@/components/ApplicationProgressInfo/ApplicationProgressInfo";
import { ApplicationProgressInfoSection } from "@/components/ApplicationProgressInfo/ApplicationProgressInfoSection";
import { ApplicationProgressInfoToggleButton } from "@/components/ApplicationProgressInfo/ApplicationProgressInfoToggleButton";

jest.mock(
  "@/components/ApplicationProgressInfo/ApplicationProgressInfoSection",
  () => ({
    ApplicationProgressInfoSection: jest.fn(() => {
      console.log("ApplicationProgressInfoSection");
      return <div>Mocked ApplicationProgressInfoSection</div>;
    }),
  }),
);

jest.mock(
  "@/components/ApplicationProgressInfo/ApplicationProgressInfoToggleButton",
  () => ({
    ApplicationProgressInfoToggleButton: jest.fn(() => (
      <div>Mocked ApplicationProgressInfoToggleButton</div>
    )),
  }),
);

describe("ApplicationProgressInfo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders closed section", async () => {
    const defaultProps = {
      sections: [
        {
          title: "Section 1",
          date: "2025-01-02",
          content: <p>Content 1</p>,
        },
        {
          title: "Section 2",
          date: "2025-01-03",
          content: <p>Content 2</p>,
        },
      ],
    };

    await render(<ApplicationProgressInfo {...defaultProps} />);

    // controls
    expect(ApplicationProgressInfoToggleButton).toHaveBeenCalledTimes(1);
    expect(ApplicationProgressInfoToggleButton).toHaveBeenCalledWith(
      expect.objectContaining({
        openAll: true,
        textContinued: "all sections",
      }),
      expect.anything(),
    );

    expect(ApplicationProgressInfoSection).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        title: "Section 1",
        content: <p>Content 1</p>,
        date: "2025-01-02",
        isExpanded: false,
        accordionSectionId: 0,
      }),
      expect.anything(),
    );

    expect(ApplicationProgressInfoSection).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        title: "Section 2",
        content: <p>Content 2</p>,
        date: "2025-01-03",
        isExpanded: false,
        accordionSectionId: 1,
      }),
      expect.anything(),
    );
  });
});

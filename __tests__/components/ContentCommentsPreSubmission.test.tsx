import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ContentCommentsPreSubmission } from "@/components/ContentCommentsPreSubmission";
import { getAppConfig } from "@/config";
import { generateAppConfig } from "@mocks/appConfigFactory";

// Mock the getAppConfig function
jest.mock("@/config", () => ({
  getAppConfig: jest.fn(),
}));

describe("ContentCommentsPreSubmission", () => {
  const appConfig = generateAppConfig("public-council-1");
  appConfig.councils.map((council) => {
    if (council.slug === "public-council-1") {
      council.pageContent.council_reference_submit_comment_pre_submission = {
        what_happens_to_your_comments_link: "https://example.com/what-happens",
      };
    }
  });

  beforeEach(() => {
    (getAppConfig as jest.Mock).mockReturnValue(appConfig);
  });

  it("renders the component with correct headings and paragraphs", () => {
    render(<ContentCommentsPreSubmission councilConfig={appConfig.council} />);
    expect(
      screen.getByText("What you need to know before you comment"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("What isn't considered in planning approval"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "There are issues that may be of concern to you, and are very important, but which generally cannot be considered as a material planning consideration when assessing a planning application. These include:",
      ),
    ).toBeInTheDocument();
  });

  it("renders the list items correctly", () => {
    render(<ContentCommentsPreSubmission councilConfig={appConfig.council} />);
    expect(
      screen.getByText(
        "disputes about civil matters, such as building freeholds or the 'right to light'",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("loss of property value")).toBeInTheDocument();
  });

  it("renders the link if available in the config", () => {
    render(<ContentCommentsPreSubmission councilConfig={appConfig.council} />);
    const link = screen.getByRole("link", {
      name: /material considerations/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com/what-happens");
  });

  it("does not render the link if not available in the config", () => {
    const appConfig = generateAppConfig("public-council-1");
    appConfig.councils.map((council) => {
      if (council.slug === "public-council-1") {
        council.pageContent.council_reference_submit_comment_pre_submission =
          undefined;
      }
    });

    (getAppConfig as jest.Mock).mockReturnValueOnce(appConfig);
    render(<ContentCommentsPreSubmission councilConfig={appConfig.council} />);
    expect(
      screen.queryByRole("link", { name: /material considerations/i }),
    ).not.toBeInTheDocument();
  });
});

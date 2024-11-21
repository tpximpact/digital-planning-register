import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ApplicationProgressInfo } from "@/components/ApplicationProgressInfo";

describe("ApplicationProgressInfo Component", () => {
  const mockApplicationHistory = [
    {
      info: "Received on",
      date: "11 Sept 2023",
      details: "Details of submission",
    },
    {
      info: "Valid from",
      date: "12 Sept 2023",
      details: "Details of review",
    },
    {
      info: "Published on",
      date: "13 Sept 2023",
      details: "Details of submission",
    },
  ];
  const mockHref = "/";

  it("renders the component with the correct heading", () => {
    render(
      <ApplicationProgressInfo
        applicationHistory={mockApplicationHistory}
        href={mockHref}
      />,
    );
    expect(screen.getByText("Progress")).toBeInTheDocument();
  });

  it("renders all application history items", () => {
    render(
      <ApplicationProgressInfo
        applicationHistory={mockApplicationHistory}
        href={mockHref}
      />,
    );
    mockApplicationHistory.forEach((history) => {
      expect(screen.getByText(history.info)).toBeInTheDocument();
      expect(screen.getByText(history.date)).toBeInTheDocument();
    });
  });

  it("toggles details when a button is clicked", () => {
    render(
      <ApplicationProgressInfo
        applicationHistory={mockApplicationHistory}
        href={mockHref}
      />,
    );
    const toggleButton = screen.getByText("Received on").closest("button");

    // Initial state: Details should not be visible
    expect(screen.queryByText("Details of submission")).not.toBeInTheDocument();

    // Simulate click to show details
    fireEvent.click(toggleButton);
    expect(screen.getByText("Details of submission")).toBeInTheDocument();

    // Simulate click again to hide details
    fireEvent.click(toggleButton);
    expect(screen.queryByText("Details of submission")).not.toBeInTheDocument();
  });

  it("only displays details for the clicked item", () => {
    render(
      <ApplicationProgressInfo
        applicationHistory={mockApplicationHistory}
        href={mockHref}
      />,
    );

    const firstButton = screen.getByText("Received on").closest("button");
    const secondButton = screen.getByText("Valid from").closest("button");

    // Show details for the first item
    fireEvent.click(firstButton);
    expect(screen.getByText("Details of submission")).toBeInTheDocument();
    expect(screen.queryByText("Details of review")).not.toBeInTheDocument();

    // Show details for the second item
    fireEvent.click(secondButton);
    expect(screen.getByText("Details of review")).toBeInTheDocument();
    expect(screen.queryByText("Details of submission")).not.toBeInTheDocument();
  });

  it("renders the secondary button with the correct href", () => {
    render(
      <ApplicationProgressInfo
        applicationHistory={mockApplicationHistory}
        href={mockHref}
      />,
    );
    const secondaryButton = screen.getByText("View application history");
    expect(secondaryButton.closest("a")).toHaveAttribute("href", mockHref);
  });

  it("renders with the last timeline item as 'timeline-end'", () => {
    render(
      <ApplicationProgressInfo
        applicationHistory={mockApplicationHistory}
        href={mockHref}
      />,
    );
    const lastItem = screen
      .getByText("Published on")
      .closest(".accordion__section");
    expect(lastItem).toHaveClass("timeline-end");
  });
});

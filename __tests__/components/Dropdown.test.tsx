import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown } from "@/components/Dropdown";
import "@testing-library/jest-dom";

describe("Dropdown", () => {
  const options = [
    { title: "Most recent to oldest", value: "desc" },
    { title: "Oldest to most recent", value: "asc" },
  ];

  it("renders label and options", () => {
    render(
      <Dropdown
        label="Sort by"
        id="sortOrder"
        options={options}
        setSelectedOption={jest.fn()}
      />,
    );

    expect(screen.getByLabelText("Sort by")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("calls setSelectedOption when an option is selected", () => {
    const mockSetSelectedOption = jest.fn();

    render(
      <Dropdown
        label="Sort by"
        id="sortOrder"
        options={options}
        setSelectedOption={mockSetSelectedOption}
      />,
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "asc" } });

    expect(mockSetSelectedOption).toHaveBeenCalledWith("asc");
  });
});

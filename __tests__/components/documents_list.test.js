import { render, screen } from "@testing-library/react";
import { mockData } from "../../__mocks__/mockData";
import "@testing-library/jest-dom";
import DocumentsList from "@/components/documents_list";

const mockDocuments = [
  {
    numbers: "1",
    url: "https://example.com/document1",
    tags: ["tag.example"],
    created_at: "2023-06-08T10:00:00Z",
  },
  {
    numbers: "2",
    url: "https://example.com/document2",
    tags: ["tag.test"],
    created_at: "2023-06-08T11:00:00Z",
  },
  {
    numbers: "3",
    url: "https://example.com/document3",
    tags: ["tag.test"],
    created_at: "2023-06-08T11:00:00Z",
  },
  {
    numbers: "4",
    url: "https://example.com/document4",
    tags: ["tag.test"],
    created_at: "2023-06-08T11:00:00Z",
  },
  {
    numbers: "5",
    url: "https://example.com/document5",
    tags: ["tag.test"],
    created_at: "2023-06-08T11:00:00Z",
  },
  {
    numbers: "6",
    url: "https://example.com/document6",
    tags: ["tag.test"],
    created_at: "2023-06-08T11:00:00Z",
  },
  {
    numbers: "7",
    url: "https://example.com/document7",
    tags: ["tag.invalid"],
    created_at: "2023-06-08T11:00:00Z",
  },
];

describe("ApplicationFile", () => {
  test("renders the component with documents", () => {
    render(
      <DocumentsList
        council="camden"
        reference={mockData.reference}
        maxDisplayDocuments={6}
        showMoreButton={true}
        documents={mockDocuments}
      />,
    );

    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(
      screen.getByText(
        "To find out more detailed information, please read the following document(s) provided by the applicant.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Showing 6 of 7 documents")).toBeInTheDocument();
    expect(screen.getByText("Show all 7 documents")).toBeInTheDocument();
    expect(screen.queryByText("Invalid")).not.toBeInTheDocument();
  });

  test("renders the component without documents", () => {
    render(
      <DocumentsList
        council="camden"
        reference={mockData.reference}
        documents={[]}
      />,
    );

    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(
      screen.getByText(
        "To find out more detailed information, please read the following document(s) provided by the applicant.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("No documents have been published at this time."),
    ).toBeInTheDocument();
  });
});

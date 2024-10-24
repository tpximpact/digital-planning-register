// CommentsList.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DocumentsList } from "@/components/DocumentsList";
import { DprDocument } from "@/types";

// Mock the CommentCard component
jest.mock("@/components/document_card", () => ({
  DocumentCard: ({ document }: { document: DprDocument }) => (
    <div data-testid="document-card">
      <p>title: {document.title}</p>
    </div>
  ),
}));

describe("DocumentsList", () => {
  const mockDocuments: DprDocument[] = [
    {
      url: "https://example.com/documents/1",
      title: "Document 1",
      created_at: "2023-01-01T12:00:00Z",
      metadata: {
        byteSize: 1024,
        contentType: "application/pdf",
      },
    },
    {
      url: "https://example.com/documents/2",
      title: "Document 2",
      created_at: "2023-02-01T12:00:00Z",
      metadata: {
        byteSize: 2048,
        contentType: "application/pdf",
      },
    },
    {
      url: "https://example.com/documents/3",
      title: "Document 3",
      created_at: "2023-03-01T12:00:00Z",
      metadata: {
        byteSize: 3072,
        contentType: "application/pdf",
      },
    },
    {
      url: "https://example.com/documents/4",
      title: "Document 4",
      created_at: "2023-04-01T12:00:00Z",
      metadata: {
        byteSize: 4096,
        contentType: "application/pdf",
      },
    },
    {
      url: "https://example.com/documents/5",
      title: "Document 5",
      created_at: "2023-05-01T12:00:00Z",
      metadata: {
        byteSize: 5120,
        contentType: "application/pdf",
      },
    },
    {
      url: "https://example.com/documents/6",
      title: "Document 6",
      created_at: "2023-06-01T12:00:00Z",
      metadata: {
        byteSize: 6144,
        contentType: "application/pdf",
      },
    },
  ];

  it("renders the DocumentList component", () => {
    render(
      <DocumentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        documents={mockDocuments}
        maxDisplayDocuments={3}
        from={0}
        showMoreButton={false}
        page={0}
      />,
    );
    const documentCards = screen.getAllByTestId("document-card");
    expect(documentCards).toHaveLength(3);
  });

  it("displays the correct number of documents", () => {
    render(
      <DocumentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        documents={mockDocuments}
        maxDisplayDocuments={3}
        from={0}
        showMoreButton={false}
        page={0}
      />,
    );
    const documentCards = screen.getAllByTestId("document-card");
    expect(documentCards).toHaveLength(3);
  });

  it('displays the correct documents based on the "from" prop', () => {
    render(
      <DocumentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        documents={mockDocuments}
        maxDisplayDocuments={3}
        from={3}
        showMoreButton={false}
        page={1}
      />,
    );
    const documentCards = screen.getAllByTestId("document-card");
    expect(documentCards[0]).toHaveTextContent("title: Document 4");
    expect(documentCards[1]).toHaveTextContent("title: Document 5");
    expect(documentCards[2]).toHaveTextContent("title: Document 6");
    expect(documentCards).toHaveLength(3);
  });

  it("does not display documents if there are no documents", () => {
    render(
      <DocumentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        documents={[]}
        maxDisplayDocuments={3}
        from={3}
        showMoreButton={false}
        page={1}
      />,
    );
    expect(screen.queryByTestId("document-card")).not.toBeInTheDocument();
  });

  it('displays the "Show More" button if showMoreButton is true', () => {
    render(
      <DocumentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        documents={mockDocuments}
        maxDisplayDocuments={3}
        from={3}
        showMoreButton={true}
        page={1}
      />,
    );
    expect(screen.getByText("Show all 6 documents")).toBeInTheDocument();
  });

  it('does not display the "Show More" button if showMoreButton is false', () => {
    render(
      <DocumentsList
        councilSlug={"public-council-1"}
        reference={"test-reference"}
        documents={mockDocuments}
        maxDisplayDocuments={3}
        from={3}
        showMoreButton={false}
        page={1}
      />,
    );
    expect(screen.queryByText("Show More")).not.toBeInTheDocument();
  });
});

import { getApplicationByReference } from "@/actions";
import ApplicationFile from "@/components/application_files";
import { BackLink } from "@/components/button";
import ApplicationHeader from "@/components/application_header";
import Pagination from "@/components/pagination";
import { notFound } from "next/navigation";
import { SearchParams } from "@/types";
import { ApplicationFormObject } from "@/components/application_form";

interface PageParams {
  council: string;
  reference: string;
}

interface DocumentsProps {
  params: PageParams;
  searchParams?: SearchParams | undefined;
}

export default async function Documents({
  params: { reference, council },
  searchParams,
}: DocumentsProps) {
  const maxDisplayDocuments = 12;
  const response = await getApplicationByReference(reference, council);
  if (!response.data) {
    notFound();
  }

  const currentPage = parseInt(searchParams?.page || "1", 10) - 1;
  const indexOfLastDocument = (currentPage + 1) * maxDisplayDocuments;
  const indexOfFirstDocument = indexOfLastDocument - maxDisplayDocuments;

  // add fake application form document
  const applicationFormDocument = ApplicationFormObject(council, reference);
  const documents = applicationFormDocument
    ? [applicationFormDocument, ...response.data.documents]
    : response.data.documents ?? [];

  const currentDocuments = documents.slice(
    indexOfFirstDocument,
    indexOfLastDocument,
  );

  const totalPages = Math.ceil(documents.length / maxDisplayDocuments);

  return (
    <div>
      <BackLink />
      <ApplicationHeader
        reference={response?.data.reference}
        site={response?.data.site}
      />
      <ApplicationFile
        {...response?.data}
        council={council}
        reference={reference}
        showViewAllButton={false}
        documents={currentDocuments}
        maxDisplayDocuments={maxDisplayDocuments}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={documents.length}
        itemsPerPage={maxDisplayDocuments}
        baseUrl={`/${council}/${reference}/documents`}
        queryParams={searchParams}
        totalPages={totalPages}
      />
    </div>
  );
}

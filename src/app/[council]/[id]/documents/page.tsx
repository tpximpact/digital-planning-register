import { getApplicationById } from "@/actions";
import ApplicationFile from "@/components/application_files";
import { BackLink } from "@/components/button";
import ApplicationHeader from "@/components/application_header";
import Pagination from "@/components/pagination";
import { notFound } from "next/navigation";

export default async function Documents({
  params: { id, council },
  searchParams,
}: {
  params: { id: string; council: string };
  searchParams?: { page?: string };
}) {
  const maxDisplayDocuments = 10;
  const applicationData = await getApplicationById(
    parseFloat(id as string),
    council,
  );

  if (applicationData.data === null || applicationData.error) {
    notFound();
  }

  const currentPage = parseInt(searchParams?.page || "1", 10) - 1;
  const indexOfLastDocument = (currentPage + 1) * maxDisplayDocuments;
  const indexOfFirstDocument = indexOfLastDocument - maxDisplayDocuments;
  const currentDocuments = applicationData?.documents?.slice(
    indexOfFirstDocument,
    indexOfLastDocument,
  );

  return (
    <div>
      <BackLink />
      <ApplicationHeader
        reference={applicationData.reference}
        address={applicationData.site}
      />
      <ApplicationFile
        {...applicationData}
        id={id}
        showViewAllButton={false}
        documents={currentDocuments}
        maxDisplayDocuments={maxDisplayDocuments}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={applicationData?.documents?.length}
        itemsPerPage={maxDisplayDocuments}
        baseUrl={`/${council}/${id}/documents`}
        queryParams={searchParams || {}}
      />
    </div>
  );
}

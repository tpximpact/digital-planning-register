import { getApplicationByReference } from "@/actions";
import ApplicationFile from "@/components/application_files";
import { BackLink } from "@/components/button";
import ApplicationHeader from "@/components/application_header";
import Pagination from "@/components/pagination";
import { notFound } from "next/navigation";

export default async function Documents({
  params: { reference, council },
  searchParams,
}: {
  params: { reference: string; council: string };
  searchParams?: { page?: string };
}) {
  const maxDisplayDocuments = 10;
  const applicationData = await getApplicationByReference(reference, council);

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
      <BackLink href={`/${council}/${reference}`} />
      <ApplicationHeader
        reference={applicationData.reference}
        address={applicationData.site}
      />
      <ApplicationFile
        {...applicationData}
        reference={reference}
        showViewAllButton={false}
        documents={currentDocuments}
        maxDisplayDocuments={maxDisplayDocuments}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={applicationData?.documents?.length}
        itemsPerPage={maxDisplayDocuments}
        baseUrl={`/${council}/${reference}/documents`}
        queryParams={searchParams || {}}
      />
    </div>
  );
}

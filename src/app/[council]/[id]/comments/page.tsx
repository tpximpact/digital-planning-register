import { getApplicationById } from "../../../../actions";
import { BackLink } from "../../../../components/button";
import ApplicationComments from "../../../../components/application_comments";
import ApplicationHeader from "../../../../components/application_header";
import Pagination from "@/components/pagination";
import { notFound } from "next/navigation";

export default async function Comments({
  params: { id, council },
  searchParams,
}: {
  params: { id: string; council: string };
  searchParams?: { type?: string; page?: string };
}) {
  const maxDisplayComments = 10;
  const applicationData = await getApplicationById(
    parseFloat(id as string),
    council,
  );
  if (applicationData.data === null || applicationData.error) {
    notFound();
  }

  const type = searchParams?.type ?? "published";
  const commentsType = type === "consultee" ? "consultee" : "published";
  const comments =
    commentsType === "consultee"
      ? applicationData?.consultee_comments
      : applicationData?.published_comments;
  const sortedComments = comments?.sort((a: any, b: any) => {
    const dateA = a.received_at ? new Date(a.received_at).getTime() : 0;
    const dateB = b.received_at ? new Date(b.received_at).getTime() : 0;
    return dateB - dateA;
  });

  const totalComments = sortedComments?.length ?? 0;
  const currentPage = parseInt(searchParams?.page || "1", 10) - 1;
  const indexOfLastComment = (currentPage + 1) * maxDisplayComments;
  const indexOfFirstComment = indexOfLastComment - maxDisplayComments;
  const currentComments = sortedComments?.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );

  return (
    <div>
      <BackLink />
      <div className="govuk-main-wrapper">
        <ApplicationHeader
          reference={applicationData.reference}
          address={applicationData.site}
        />
        <ApplicationComments
          {...applicationData}
          id={id}
          maxDisplayComments={10}
          showViewAllButton={false}
          type={type}
          comments={currentComments}
          totalComments={totalComments}
          currentPage={currentPage}
          council={council}
        />
        <Pagination
          currentPage={currentPage}
          totalItems={totalComments}
          itemsPerPage={maxDisplayComments}
          baseUrl={`/${council}/${id}/comments`}
          queryParams={searchParams || {}}
        />
      </div>
    </div>
  );
}

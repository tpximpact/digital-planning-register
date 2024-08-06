import { getApplicationByReference } from "../../../../actions";
import { BackLink } from "../../../../components/button";
import ApplicationComments from "../../../../components/application_comments";
import ApplicationHeader from "../../../../components/application_header";
import Pagination from "@/components/pagination";
import { notFound } from "next/navigation";
import { CommentSearchParams } from "@/types";

interface PageParams {
  council: string;
  reference: string;
}

interface CommentsProps {
  params: PageParams;
  searchParams?: CommentSearchParams | undefined;
}

export default async function Comments({
  params: { reference, council },
  searchParams,
}: CommentsProps) {
  const maxDisplayComments = 10;
  const response = await getApplicationByReference(reference, council);
  if (!response.data) {
    notFound();
  }

  const type = searchParams?.type ?? "published";
  const commentsType = type === "consultee" ? "consultee" : "published";
  const comments =
    commentsType === "consultee"
      ? response?.data?.consultee_comments
      : response?.data?.published_comments;

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

  const totalPages = Math.ceil(totalComments / maxDisplayComments);
  return (
    <div>
      <BackLink />
      <div className="govuk-main-wrapper">
        <ApplicationHeader
          reference={response?.data?.reference}
          site={response?.data?.site}
        />
        <ApplicationComments
          {...response?.data}
          reference={reference}
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
          baseUrl={`/${council}/${reference}/comments`}
          queryParams={searchParams}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

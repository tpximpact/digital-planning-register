import { Metadata } from "next";
import {
  ApiResponse,
  Council,
  DprComment,
  DprCommentTypes,
  DprPagination,
  DprShow,
} from "@/types";
import NotFound from "@/app/not-found";
import { getCouncilConfig, getCouncilDataSource } from "@/lib/config";
import { capitaliseWord } from "@/util";
import { BackLink } from "@/components/button";
import ApplicationHeader from "@/components/application_header";
import CommentsList from "@/components/comments_list";
import Pagination from "@/components/pagination";
import { createItemPagination } from "@/lib/pagination";
import { ApiV1 } from "@/actions/api";

interface CommentSearchParams {
  page?: string;
  type?: DprCommentTypes;
}

interface PlanningApplicationDetailsCommentsProps {
  params: {
    council: string;
    reference: string;
  };
  searchParams?: CommentSearchParams | undefined;
}

async function fetchData({
  params,
}: PlanningApplicationDetailsCommentsProps): Promise<
  ApiResponse<DprShow | null>
> {
  const { reference, council } = params;
  const response = await ApiV1.show(
    getCouncilDataSource(council),
    council,
    reference,
  );
  return response;
}

export async function generateMetadata({
  params,
}: PlanningApplicationDetailsCommentsProps): Promise<Metadata> {
  const response = await fetchData({ params });

  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }

  return {
    title: `Application ${response.data.application.reference}`,
    description: `${capitaliseWord(params.council)} planning application`,
  };
}

/**
 * type must be either published or consultee if its enabled in the config
 * @param searchParams
 * @param councilConfig
 * @returns
 */
const setCommentType = (
  searchParams: CommentSearchParams | undefined,
  councilConfig: Council | undefined,
): DprCommentTypes => {
  let type: DprCommentTypes = "published";

  const searchType: DprCommentTypes | undefined = ![
    "published",
    "consultee",
  ].includes(searchParams?.type ?? "published")
    ? undefined
    : (searchParams?.type as DprCommentTypes);

  if (councilConfig?.specialistComments && councilConfig?.publicComments) {
    type = searchType ?? "published";
  }

  if (councilConfig?.specialistComments && !councilConfig?.publicComments) {
    type = "consultee";
  }

  if (!councilConfig?.specialistComments && councilConfig?.publicComments) {
    type = "published";
  }

  return type;
};

export default async function PlanningApplicationDetailsComments({
  params,
  searchParams,
}: PlanningApplicationDetailsCommentsProps) {
  const response = await fetchData({ params });
  const { reference, council } = params;

  const councilConfig = getCouncilConfig(council);
  const type = setCommentType(searchParams, councilConfig);

  let comments = null;
  if (type === "consultee") {
    comments = response?.data?.application.consultation.consulteeComments;
  } else {
    comments = response?.data?.application.consultation.publishedComments;
  }

  /**
   * If the application is not found, return a 404 page
   * Also, if none of the comment types from config are allowed also show not found
   */
  if (!response.data) {
    return <NotFound params={params} />;
  }

  const totalComments = comments ? comments.length : 0;
  const currentPage = Number(searchParams?.page ?? 1);
  const maxDisplayComments = 10;

  const commentData: { pagination: DprPagination; data: DprComment[] } = {
    pagination: {
      ...createItemPagination(totalComments, currentPage, maxDisplayComments),
    },
    data: comments ? [...comments] : [],
  };

  const application = response?.data;

  return (
    <div>
      <BackLink />
      <div className="govuk-main-wrapper">
        <ApplicationHeader
          reference={reference}
          address={application.property.address.singleLine}
        />
        <CommentsList
          council={council}
          reference={reference}
          type={type}
          comments={commentData.data}
          from={commentData.pagination.from - 1}
          maxDisplayComments={maxDisplayComments}
          page={commentData.pagination.page - 1}
        />
        <Pagination
          currentPage={commentData.pagination.page - 1}
          totalItems={commentData.pagination.total_results}
          itemsPerPage={maxDisplayComments}
          baseUrl={`/${council}/${reference}/comments`}
          queryParams={searchParams}
          totalPages={commentData.pagination.total_pages}
        />
      </div>
    </div>
  );
}

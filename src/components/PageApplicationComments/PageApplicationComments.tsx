import {
  DprComment,
  DprCommentTypes,
  DprPagination,
  DprPlanningApplication,
  SearchParams,
} from "@/types";
import { BackLink } from "../button";
import ApplicationHeader from "../application_header";
import { Pagination } from "@/components/govuk/Pagination";
import { createPathFromParams } from "@/lib/navigation";
import { AppConfig } from "@/config/types";
import { CommentsList } from "@/components/CommentsList";
import { PageTemplate } from "../PageTemplate";
import { ContentNotFound } from "../ContentNotFound";
import { PageWrapper } from "../PageWrapper";

export interface PageApplicationCommentsProps {
  reference: string;
  application: DprPlanningApplication;
  comments: DprComment[] | null;
  pagination: DprPagination;
  appConfig: AppConfig;
  type: DprCommentTypes;
  params?: {
    council: string;
    reference?: string;
  };
  searchParams?: SearchParams;
}

export const PageApplicationComments = ({
  reference,
  application,
  comments,
  pagination,
  appConfig,
  type,
  params,
  searchParams,
}: PageApplicationCommentsProps) => {
  if (!appConfig || !appConfig.council) {
    return (
      <PageWrapper>
        <ContentNotFound />
      </PageWrapper>
    );
  }
  return (
    <>
      <BackLink />
      <div className="govuk-main-wrapper">
        <ApplicationHeader
          reference={reference}
          address={application?.property.address.singleLine}
        />
        <CommentsList
          councilSlug={appConfig.council.slug}
          reference={reference}
          type={type}
          comments={comments}
          from={pagination.from - 1}
          maxDisplayComments={appConfig.defaults.resultsPerPage}
          page={pagination.page - 1}
        />
        {pagination && pagination.total_pages > 1 && (
          <>
            <Pagination
              baseUrl={createPathFromParams(params, "comments")}
              searchParams={searchParams}
              pagination={pagination}
            />
          </>
        )}
      </div>
    </>
  );
};

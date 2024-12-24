import {
  DprComment,
  DprCommentTypes,
  DprPagination,
  DprPlanningApplication,
  SearchParams,
} from "@/types";
import { BackButton } from "@/components/BackButton";
import ApplicationHeader from "../application_header";
import { Pagination } from "@/components/govuk/Pagination";
import { AppConfig } from "@/config/types";
import { CommentsList } from "@/components/CommentsList";
import { ContentNotFound } from "../ContentNotFound";
import { PageMain } from "../PageMain";
import { createPathFromParams } from "@/lib/navigation";

export interface PageApplicationCommentsProps {
  reference: string;
  application: DprPlanningApplication;
  comments: DprComment[] | null;
  appConfig: AppConfig;
  params?: {
    council: string;
    reference?: string;
  };
  type: DprCommentTypes;
  pagination?: DprPagination;
  searchParams?: SearchParams;
}

export const PageApplicationComments = ({
  reference,
  application,
  comments,
  appConfig,
  params,
  type,
  pagination,
  searchParams,
}: PageApplicationCommentsProps) => {
  if (!appConfig || !appConfig.council) {
    return (
      <PageMain>
        <ContentNotFound />
      </PageMain>
    );
  }
  const councilSlug = appConfig.council.slug;
  return (
    <>
      <BackButton baseUrl={`/${councilSlug}/${reference}`} />
      <PageMain>
        <ApplicationHeader
          reference={reference}
          address={application?.property.address.singleLine}
        />
        <CommentsList
          councilSlug={appConfig.council.slug}
          reference={reference}
          type={type}
          comments={comments}
          pagination={
            pagination ?? {
              results: appConfig.defaults.resultsPerPage,
              page: 1,
            }
          }
        />
        {pagination && pagination.total_pages > 1 && (
          <Pagination
            baseUrl={createPathFromParams(params, "comments")}
            searchParams={searchParams}
            pagination={pagination}
          />
        )}
      </PageMain>
    </>
  );
};

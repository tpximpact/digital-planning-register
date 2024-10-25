import {
  DprComment,
  DprCommentTypes,
  DprPagination,
  DprPlanningApplication,
  SearchParams,
} from "@/types";
import { BackLink } from "../button";
import ApplicationHeader from "../application_header";
import Pagination from "../govuk/Pagination";
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
  searchParams?: SearchParams;
}

export const PageApplicationComments = ({
  reference,
  application,
  comments,
  pagination,
  appConfig,
  type,
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
              currentPage={pagination.page - 1}
              totalItems={
                pagination.total_pages * appConfig.defaults.resultsPerPage
              }
              itemsPerPage={appConfig.defaults.resultsPerPage}
              baseUrl={
                appConfig?.council?.slug
                  ? `/${appConfig.council.slug}/${reference}/comments`
                  : ""
              }
              queryParams={searchParams}
              totalPages={pagination.total_pages}
            />
          </>
        )}
      </div>
    </>
  );
};

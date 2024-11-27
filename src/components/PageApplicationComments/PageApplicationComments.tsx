import {
  DprComment,
  DprCommentTypes,
  DprPagination,
  DprPlanningApplication,
  SearchParams,
} from "@/types";
import { BackButton } from "@/components/BackButton";
import ApplicationHeader from "../application_header";
import { Pagination } from "../Pagination";
import { AppConfig } from "@/config/types";
import { CommentsList } from "@/components/CommentsList";
import { ContentNotFound } from "../ContentNotFound";
import { PageWrapper } from "../PageWrapper";

export interface PageApplicationCommentsProps {
  reference: string;
  application: DprPlanningApplication;
  comments: DprComment[] | null;
  appConfig: AppConfig;
  type: DprCommentTypes;
  pagination?: DprPagination;
  searchParams?: SearchParams;
}

export const PageApplicationComments = ({
  reference,
  application,
  comments,
  appConfig,
  type,
  pagination,
  searchParams,
}: PageApplicationCommentsProps) => {
  if (!appConfig || !appConfig.council) {
    return (
      <PageWrapper>
        <ContentNotFound />
      </PageWrapper>
    );
  }
  const councilSlug = appConfig.council.slug;
  return (
    <>
      <BackButton baseUrl={`/${councilSlug}/${reference}`} />
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
          pagination={
            pagination ?? {
              results: appConfig.defaults.resultsPerPage,
              page: 1,
            }
          }
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

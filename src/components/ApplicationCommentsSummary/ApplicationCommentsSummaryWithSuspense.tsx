import { Suspense } from "react";
import { ApplicationCommentsSummaryProps } from "./ApplicationCommentsSummary";
import { ApplicationCommentsSummarySkeleton } from "./ApplicationCommentsSummarySkeleton";
import { ApplicationCommentsSummary } from "./ApplicationCommentsSummary";
import { ApiV1 } from "@/actions/api";
import { getAppConfig } from "@/config";

export const ApplicationCommentsSummaryWithSuspense = ({
  councilSlug,
  reference,
  type = "public",
  summary,
}: ApplicationCommentsSummaryProps) => {
  if (summary) {
    return (
      <ApplicationCommentsSummary
        reference={reference}
        councilSlug={councilSlug}
        type={type}
        summary={summary}
      />
    );
  }
  if (!councilSlug || !reference) {
    return <ApplicationCommentsSummarySkeleton type={type} />;
  }
  return (
    <Suspense fallback={<ApplicationCommentsSummarySkeleton type={type} />}>
      <ApplicationCommentsSummaryLoader
        councilSlug={councilSlug}
        reference={reference}
        type={type}
      />
    </Suspense>
  );
};

const ApplicationCommentsSummaryLoader = async ({
  councilSlug,
  reference,
  type,
}: {
  councilSlug: string;
  reference: string;
  type: "public" | "specialist";
}) => {
  const commentsApi =
    type === "specialist" ? ApiV1.specialistComments : ApiV1.publicComments;
  const appConfig = getAppConfig(councilSlug);
  const response = await commentsApi(
    appConfig.council?.dataSource ?? "none",
    councilSlug,
    reference,
  );

  return (
    <ApplicationCommentsSummary
      reference={reference}
      councilSlug={councilSlug}
      type={type}
      summary={response?.data?.summary}
    />
  );
};

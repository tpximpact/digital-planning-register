import Link from "next/link";
import { ContentCommentsPreSubmission } from "../ContentCommentsPreSubmission";
import { Button } from "../govuk/Button";
import { BackLink } from "../govuk/BackLink";
import { SearchParams } from "@/types";
import CommentHeader from "../comment-header";
import { getAppConfig } from "@/config";
import { ApiV1 } from "@/actions/api";
import { resolve } from "path";
import CommentSentiment from "../comment_sentiment";
import CommentTextEntry from "../comment_text_entry";
import { topics_selection } from "../comment_topic_selection";
import CommentPersonalDetails from "../comment_personal_details";
import { NotificationBanner } from "../govuk/NotificationBanner";
import { StartIcon } from "public/icons";
// import { resolveQuery } from "@/actions/resolveQuery";

export interface PageSubmitCommentProps {
  council: string;
  reference: string;
  searchParams?: SearchParams;
}

export const PageSubmitComment = ({
  council,
  reference,
  searchParams,
}: PageSubmitCommentProps) => {
  const page = Number(searchParams?.page ?? 0);
  const appConfig = getAppConfig(council);

  return (
    <>
      {page > 0 ||
        (page <= 2 && (
          <BackLink
            href={page === 0 ? `/${council}/${reference}` : `?page=${page - 1}`}
          />
        ))}
      <div className="govuk-main-wrapper dpr-page-submit-comment">
        {page === 0 && (
          <>
            <ContentCommentsPreSubmission councilConfig={appConfig.council} />
            <Link href={`?page=1`}>
              {" "}
              <Button variant="start" content="Start now" type="submit" />
            </Link>
          </>
        )}
        {page === 1 && (
          <>
            <form>
              <CommentHeader
                // boundary_geojson,
                // address,
                reference={reference}
                council={council}
              />
              <CommentSentiment
                hideContinue={true}
                reference={reference}
                navigateToPage={() => {}}
                updateProgress={() => {}}
              />
              {topics_selection.map((topic, i) => (
                <CommentTextEntry
                  key={i}
                  reference={reference}
                  currentTopic={topic.value}
                  onContinue={() => {}}
                  updateProgress={() => {}}
                  currentTopicIndex={i}
                  totalTopics={topics_selection.length}
                  hideContinue={true}
                />
              ))}
              <CommentPersonalDetails
                councilConfig={appConfig.council}
                reference={reference}
                navigateToPage={() => {}}
                isEditing={false}
                updateProgress={() => {}}
                hideContinue={true}
              />
              <Button
                content="Submit"
                type="submit"
                className="govuk-button"
                variant="default"
              />
            </form>
          </>
        )}
        {page === 2 && (
          <NotificationBanner
            type={"success"}
            content={<>Comment successfully submitted</>}
          />
        )}
      </div>
    </>
  );
};

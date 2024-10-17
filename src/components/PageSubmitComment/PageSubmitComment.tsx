import Link from "next/link";
import { ContentCommentsPreSubmission } from "../ContentComments";
import { BackButton, Button, StartButton } from "../button";
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
// import { resolveQuery } from "@/actions/resolveQuery";

export interface PageSubmitCommentProps {
  council: string;
  reference: string;
  searchParams: SearchParams;
}

export const PageSubmitComment = ({
  council,
  reference,
  searchParams,
}: PageSubmitCommentProps) => {
  const page = Number(searchParams.page ?? 0);

  return (
    <>
      {page > 0 ||
        (page <= 2 && (
          <BackButton
            href={page === 0 ? `/${council}/${reference}` : `?page=${page - 1}`}
          />
        ))}
      <div className="govuk-main-wrapper dpr-page-submit-comment">
        {page === 0 && (
          <>
            <ContentCommentsPreSubmission council={council} />
            <Link href={`?page=1`}>
              {" "}
              <StartButton />
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
                council={council}
                reference={reference}
                navigateToPage={() => {}}
                isEditing={false}
                updateProgress={() => {}}
                hideContinue={true}
              />
              <Button content="Submit" type="submit" />
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

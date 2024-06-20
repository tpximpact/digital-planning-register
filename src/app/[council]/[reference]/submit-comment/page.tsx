"use server";
import PreSubmission from "@/components/comment_pre_submission";
import CommentSentiment from "@/components/comment_sentiment";
import CommentTopicSelection from "@/components/comment_topic_selection";
import CommentHeader from "@/components/comment-header";
import CommentTextEntry from "@/components/comment_text_entry";
import CommentPersonalDetails from "@/components/comment_personal_details";
import CommentCheckAnswer from "@/components/comment_check_answer";
import CommentConfirmation from "@/components/comment_confirmation";
import { BackLink } from "@/components/button";
import { getApplicationByReference } from "@/actions";
import { notFound } from "next/navigation";
import { capitaliseWord } from "../../../../../util/capitaliseWord";

type Props = { reference: string; council: string };

async function fetchData(params: Props) {
  const { reference, council } = params;
  const data = await getApplicationByReference(reference, council);

  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { reference: string; council: string };
}) {
  const { reference, council } = params;
  const data = await fetchData({ reference, council });

  if (data.error) {
    return {
      title: "Error",
      description: data.errorMessage || "An error occurred",
    };
  }

  return {
    title: `Application ${data.reference}`,
    description: `${capitaliseWord(params.council)} planning application`,
  };
}

const Comment = async ({
  params,
  searchParams,
}: {
  params: { reference: string; council: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { reference, council } = params;
  const data = await fetchData({ reference, council });
  const page = parseInt(searchParams?.page as string) || 0;

  const feedbackPage = () => {
    switch (page) {
      case 0:
        return <PreSubmission council={council} reference={reference} />;
      case 1:
        return <CommentSentiment council={council} reference={reference} />;
      case 2:
        return (
          <CommentTopicSelection council={council} reference={reference} />
        );
      case 3:
        return <CommentTextEntry council={council} reference={reference} />;
      case 4:
        return (
          <CommentPersonalDetails council={council} reference={reference} />
        );
      case 5:
        return (
          <CommentCheckAnswer
            council={council}
            // once the submit comment endpoint takes in the reference, we will be able to remove the id
            applicationId={data.id}
            reference={reference}
          />
        );
      case 6:
        return (
          <CommentConfirmation
            reference={reference}
            site={data?.site}
            council={council}
            boundary_geojson={data?.boundary_geojson}
          />
        );
    }
  };

  const getBackLinkHref = () => {
    if (page === 0) {
      return "/";
    } else if (page === 6) {
      return `/${council}/${reference}/submit-comment?page=5`;
    } else {
      return `/${council}/${reference}/submit-comment?page=${page - 1}`;
    }
  };

  return (
    <>
      <BackLink href={getBackLinkHref()} />
      <div className="govuk-main-wrapper">
        {page > 0 && page < 6 && (
          <CommentHeader
            reference={reference}
            boundary_geojson={data?.boundary_geojson}
            site={data?.site}
          />
        )}
        {feedbackPage()}
      </div>
    </>
  );
};

export default Comment;

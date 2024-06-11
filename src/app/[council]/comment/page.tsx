import PreSubmission from "@/components/comment_pre_submission";
import CommentSentimet from "@/components/comment_sentiment";
import CommentTopicSelection from "@/components/comment_topic_selection";
import CommentHeader from "@/components/comment-header";
import CommentTextEntry from "@/components/comment_text_entry";
import CommentPersonalDetails from "@/components/comment_personal_details";
import CommentCheckAnswer from "@/components/comment_check_answer";
import CommentConfirmation from "@/components/comment_confirmation";
import { BackLink } from "@/components/button";
import { Suspense, useEffect, useState } from "react";
import { getApplicationByReference, getCookies } from "@/actions";
import { Data } from "../../../../util/type";
import { notFound } from "next/navigation";
import { capitaliseWord } from "../../../../util/capitaliseWord";

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
  const councilCookies = await getCookies("council");
  const referenceCookies = await getCookies("reference");
  const council = councilCookies?.value as string;
  const reference = referenceCookies?.value as string;

  const data = await fetchData({ reference: reference, council });

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

const Comment = async () => {
  const councilCookies = await getCookies("council");
  const referenceCookies = await getCookies("reference");
  const council = councilCookies?.value as string;
  const reference = referenceCookies?.value as string;
  const data = await fetchData({
    reference,
    council,
  });
  // const [feedbackNumber, setFeedbackNumber] = useState<number>(0);
  const getFeedbackNumber = await getCookies("feedbackNumber");
  const feedbackNumber = parseInt(getFeedbackNumber?.value as string) || 0;

  const feedbackPage = () => {
    console.log(feedbackNumber);
    switch (feedbackNumber) {
      case 0:
        return <PreSubmission council={council} />;
      case 1:
        return <CommentSentimet />;
      case 2:
        return <CommentTopicSelection />;
      case 3:
        return <CommentTextEntry />;
      case 4:
        return <CommentPersonalDetails council={council} />;
      case 5:
        return <CommentCheckAnswer council={council} />;
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

  return (
    <>
      <BackLink href="/" />
      <div className="govuk-main-wrapper">
        {feedbackNumber > 0 && feedbackNumber < 6 && (
          <CommentHeader
            reference={reference as string}
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

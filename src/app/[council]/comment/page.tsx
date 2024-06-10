"use client";
import PreSubmission from "@/components/comment_pre_submission";
import CommentSentimet from "@/components/comment_sentiment";
import CommentTopicSelection from "@/components/comment_topic_selection";
import CommentHeader from "@/components/comment-header";
import CommentTextEntry from "@/components/comment_text_entry";
import CommentPersonalDetails from "@/components/comment_personal_details";
import CommentCheckAnswer from "@/components/comment_check_answer";
import CommentConfirmation from "@/components/comment_confirmation";
import { BackLink } from "@/components/button";
import { useEffect, useState } from "react";
import { getApplicationByReference } from "@/actions";
import { Data } from "../../../../util/type";

const Comment = () => {
  const [feedbackNumber, setFeedbackNumber] = useState<number>(0);
  const [council, setCouncil] = useState<string>("");
  const [reference, setReference] = useState<string>("");
  const [application, setApplication] = useState<Data>();

  useEffect(() => {
    const localStorageCouncil = localStorage.getItem("council") as string;
    const councilParse = JSON.parse(localStorageCouncil);
    setCouncil(localStorageCouncil);
    const localStorageReference = localStorage.getItem("reference") as string;
    setReference(localStorageReference);
    const fetchData = async () => {
      const data = await getApplicationByReference(
        localStorageReference,
        councilParse,
      );
      setApplication(data);
    };
    fetchData();
  }, [council, reference]);

  const feedbackPage = () => {
    switch (feedbackNumber) {
      case 0:
        return (
          <PreSubmission
            council={council}
            setFeedbackNumber={setFeedbackNumber}
          />
        );
      case 1:
        return <CommentSentimet setFeedbackNumber={setFeedbackNumber} />;
      case 2:
        return <CommentTopicSelection setFeedbackNumber={setFeedbackNumber} />;
      case 3:
        return <CommentTextEntry setFeedbackNumber={setFeedbackNumber} />;
      case 4:
        return (
          <CommentPersonalDetails
            council={council}
            setFeedbackNumber={setFeedbackNumber}
          />
        );
      case 5:
        return (
          <CommentCheckAnswer
            council={council}
            setFeedbackNumber={setFeedbackNumber}
          />
        );
      case 6:
        return <CommentConfirmation />;
    }
  };

  return (
    <>
      <BackLink href="/" />
      <div className="govuk-main-wrapper">
        {feedbackNumber > 0 && feedbackNumber < 6 && (
          <CommentHeader
            boundary_geojson={application?.boundary_geojson}
            reference={application?.reference as string}
            site={application?.site}
          />
        )}
        {feedbackPage()}
      </div>
    </>
  );
};

export default Comment;

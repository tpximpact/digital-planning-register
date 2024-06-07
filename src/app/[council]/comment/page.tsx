import PreSubmission from "@/components/comment_pre_submission";
import CommentSentimet from "@/components/comment_sentiment";
import CommentTopicSelection from "@/components/comment_topic_selection";
import CommentHeader from "@/components/comment-header";
import CommentTextEntry from "@/components/comment_text_entry";
import CommentPersonalDetails from "@/components/comment_personal_details";
import CommentCheckAnswer from "@/components/comment_check_answer";
import CommentConfirmation from "@/components/comment_confirmation";
import { BackLink } from "@/components/button";
// import { useParams } from "next/navigation";
const Comment = () => {
  // const params = useParams();
  // const council = params?.council as string;
  return (
    <>
      <BackLink href="/" />
      <div className="govuk-main-wrapper">
        {/* <PreSubmission council={council} /> */}
        {/* <CommentHeader />
        <CommentSentimet /> */}
        {/* <CommentTopicSelection /> */}
        {/* <CommentTextEntry /> */}
        {/* <CommentPersonalDetails council={council} /> */}
        {/* <CommentCheckAnswer council={council} /> */}
        {/* <CommentConfirmation /> */}
      </div>
    </>
  );
};

export default Comment;

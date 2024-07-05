import { setTopicIndex } from "@/actions";
import { getCookie } from "@/actions/cookies";

const CommentTextEntry = async ({
  council,
  reference,
  applicationId,
  searchParams,
}: {
  council: string;
  reference: string;
  applicationId: number;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const topicIndexFromURL = searchParams.topicIndex;
  const isEditing = searchParams.edit === "true";

  const selectedTopicsCookie = await getCookie("selectedTopics", reference);
  const selectedTopics = selectedTopicsCookie?.split(",") || [];

  let currentTopicIndex: number;

  if (topicIndexFromURL !== undefined) {
    currentTopicIndex = Array.isArray(topicIndexFromURL)
      ? parseInt(topicIndexFromURL[0], 10)
      : parseInt(topicIndexFromURL, 10);

    if (isNaN(currentTopicIndex)) {
      currentTopicIndex = 0;
    }

    await setTopicIndex(reference, currentTopicIndex);
  } else {
    const currentTopicIndexCookie = await getCookie(
      "currentTopicIndex",
      reference,
    );
    currentTopicIndex = parseInt(currentTopicIndexCookie || "0", 10);

    if (isNaN(currentTopicIndex)) {
      currentTopicIndex = 0;
    }
  }

  const currentTopic = selectedTopics[currentTopicIndex] || "";

  const validationErrorCookie = await getCookie("validationError", reference);
  const validationError = validationErrorCookie === "true";

  // Fetch existing comment data
  const commentDataCookie = await getCookie("commentData", reference);
  const commentData = commentDataCookie ? JSON.parse(commentDataCookie) : {};
  const existingComment = commentData[currentTopic] || "";

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <form
          action={`/${council}/${reference}/submit-comment-redirect?page=3&topicIndex=${currentTopicIndex}${isEditing ? "&edit=true" : ""}`}
          method="POST"
        >
          <input type="hidden" name="council" value={council} />
          <input type="hidden" name="reference" value={reference} />
          <input type="hidden" name="applicationId" value={applicationId} />
          <input
            type="hidden"
            name="isEditing"
            value={isEditing ? "true" : "false"}
          />
          <input type="hidden" name="topicIndex" value={currentTopicIndex} />
          <div
            className={`govuk-form-group ${
              validationError ? "govuk-form-group--error" : ""
            }`}
          >
            {validationError && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error: </span> Your
                comment is required
              </p>
            )}
            <h1 className="govuk-label-wrapper">
              <label className="govuk-label govuk-label--l" htmlFor="comment">
                Comment on {currentTopic}
              </label>
            </h1>
            <div id="comment-hint" className="govuk-hint">
              {currentTopicIndex + 1} of {selectedTopics.length}
            </div>

            <textarea
              className={`govuk-textarea ${
                validationError ? "govuk-input--error" : ""
              }`}
              id="comment"
              name="comment"
              rows={5}
              aria-describedby="comment-hint"
              defaultValue={existingComment}
            ></textarea>
          </div>
          <button
            type="submit"
            className="govuk-button"
            data-module="govuk-button"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentTextEntry;

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCookie, setCookie } from "@/actions/cookies";

const CommentTextEntry = ({
  council,
  reference,
  applicationId,
}: {
  council: string;
  reference: string;
  applicationId: number;
}) => {
  const searchParams = useSearchParams();
  const topicIndexFromURL = searchParams.get("topicIndex");
  const isEditing = searchParams.get("edit") === "true";

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [validationError, setValidationError] = useState(false);
  const [existingComment, setExistingComment] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const selectedTopicsCookie = await getCookie("selectedTopics", reference);
      const topics = selectedTopicsCookie?.split(",") || [];
      setSelectedTopics(topics);

      let index: number;
      if (topicIndexFromURL !== null) {
        index = parseInt(topicIndexFromURL, 10);
        if (isNaN(index)) index = 0;
        await setCookie("currentTopicIndex", index.toString(), reference);
      } else {
        const currentTopicIndexCookie = await getCookie(
          "currentTopicIndex",
          reference,
        );
        index = parseInt(currentTopicIndexCookie || "0", 10);
        if (isNaN(index)) index = 0;
      }
      setCurrentTopicIndex(index);

      const validationErrorCookie = await getCookie(
        "validationError",
        reference,
      );
      setValidationError(validationErrorCookie === "true");

      // Fetch existing comment data
      const commentDataCookie = await getCookie("commentData", reference);
      const commentData = commentDataCookie
        ? JSON.parse(commentDataCookie)
        : {};
      setExistingComment(commentData[topics[index]] || "");
    };

    loadData();
  }, [reference, topicIndexFromURL]);

  const currentTopic = selectedTopics[currentTopicIndex] || "";

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
            className={`govuk-form-group ${validationError ? "govuk-form-group--error" : ""}`}
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
              className={`govuk-textarea ${validationError ? "govuk-input--error" : ""}`}
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

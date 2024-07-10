"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCookie, setCookie } from "@/actions/cookies";

const MAX_COMMENT_LENGTH = 1200;

// Function to normalise and count characters consistently
const normaliseAndCountChars = (text: string) => {
  // Replace all whitespace (including newlines) with a single space
  const normalised = text.replace(/\s+/g, " ").trim();
  return normalised.length;
};

const topicLabels = {
  design:
    "Comment on the design, size or height of new buildings or extensions",
  use: "Comment on the use and function of the proposed development",
  light: "Comment on any impacts on natural light",
  privacy: "Comment on impacts to the privacy of neighbours",
  access: "Comment on impacts on disabled persons' access",
  noise: "Comment on any noise from new uses",
  traffic: "Comment on impacts to traffic, parking or road safety",
  other: "Comment on other things",
};

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

  const [isLoading, setIsLoading] = useState(true);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [validationError, setValidationError] = useState(false);
  const [comment, setComment] = useState("");
  const [isOverLimit, setIsOverLimit] = useState(false);

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

      // Fetch existing comment data for the current topic
      const currentTopic = topics[index];
      const savedComment =
        (await getCookie(`comment_${currentTopic}`, reference)) || "";
      setComment(savedComment);
      const charCount = normaliseAndCountChars(savedComment);
      setIsOverLimit(charCount > MAX_COMMENT_LENGTH);

      setIsLoading(false);
    };

    loadData();
  }, [reference, topicIndexFromURL]);

  const handleCommentChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newComment = e.target.value;
    setComment(newComment);
    const charCount = normaliseAndCountChars(newComment);
    const newIsOverLimit = charCount > MAX_COMMENT_LENGTH;
    setIsOverLimit(newIsOverLimit);

    // Save comment to cookie as user types
    const currentTopic = selectedTopics[currentTopicIndex];
    try {
      await setCookie(`comment_${currentTopic}`, newComment, reference);
      // Clear validation error if it was set and comment is now valid
      if (validationError && newComment.trim() !== "" && !newIsOverLimit) {
        await setCookie("validationError", "false", reference);
        setValidationError(false);
      }
    } catch (error) {
      console.error("Failed to save comment:", error);
    }
  };

  if (isLoading) {
    return null;
  }

  const currentTopic = selectedTopics[currentTopicIndex] || "";
  const currentTopicLabel =
    topicLabels[currentTopic as keyof typeof topicLabels];

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
          <input type="hidden" name="currentTopic" value={currentTopic} />
          <div
            className={`govuk-form-group ${
              validationError || isOverLimit ? "govuk-form-group--error" : ""
            }`}
          >
            {validationError && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error: </span> Your
                comment is required
              </p>
            )}
            {isOverLimit && (
              <p id="length-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error: </span> Your
                comment exceeds the maximum length of {MAX_COMMENT_LENGTH}{" "}
                characters
              </p>
            )}
            <h1 className="govuk-label-wrapper">
              <label className="govuk-label govuk-label--l" htmlFor="comment">
                {currentTopicLabel}
              </label>
            </h1>
            <div id="comment-hint" className="govuk-hint">
              {currentTopicIndex + 1} of {selectedTopics.length}
            </div>
            <textarea
              className={`govuk-textarea ${
                validationError || isOverLimit ? "govuk-textarea--error" : ""
              }`}
              id="comment"
              name="comment"
              rows={5}
              aria-describedby="comment-hint"
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="govuk-button"
            data-module="govuk-button"
            disabled={isOverLimit}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentTextEntry;

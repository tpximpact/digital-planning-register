"use client";
import React, { useEffect, useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { Button } from "../button";

const MAX_COMMENT_LENGTH = 6000;

const normaliseAndCountChars = (text: string) => {
  return text.replace(/\s+/g, " ").trim().length;
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
  reference,
  currentTopic,
  onContinue,
  updateProgress,
  currentTopicIndex,
  totalTopics,
  hideContinue,
}: {
  reference: string;
  currentTopic: string;
  onContinue: () => void;
  updateProgress: (completedPage: number) => void;
  currentTopicIndex: number;
  totalTopics: number;
  hideContinue?: boolean;
}) => {
  const [comment, setComment] = useState("");
  const [normalisedCharCount, setNormalisedCharCount] = useState(0);
  const [validationError, setValidationError] = useState(false);
  const [isMaxLength, setIsMaxLength] = useState(false);

  useEffect(() => {
    const storedComment = sessionStorage.getItem(
      `comment_${currentTopic}_${reference}`,
    );
    if (storedComment) {
      setComment(storedComment);
      const count = normaliseAndCountChars(storedComment);
      setNormalisedCharCount(count);
      setIsMaxLength(count >= MAX_COMMENT_LENGTH);
    } else {
      setComment("");
      setNormalisedCharCount(0);
      setIsMaxLength(false);
    }
    setValidationError(false);
  }, [currentTopic, reference]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    const newCount = normaliseAndCountChars(newComment);

    if (newCount <= MAX_COMMENT_LENGTH) {
      setComment(newComment);
      setNormalisedCharCount(newCount);
      setIsMaxLength(newCount === MAX_COMMENT_LENGTH);
      setValidationError(false);
    } else {
      setIsMaxLength(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment && normalisedCharCount <= MAX_COMMENT_LENGTH) {
      sessionStorage.setItem(`comment_${currentTopic}_${reference}`, comment);
      updateProgress(3);
      onContinue();
    } else {
      setValidationError(true);
      sendGTMEvent({
        event: "comment_validation_error",
        message: "error in comment text entry",
      });
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <form onSubmit={handleSubmit}>
          <div
            className={`govuk-form-group ${validationError || isMaxLength ? "govuk-form-group--error" : ""}`}
          >
            {validationError && !comment && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error: </span> Your
                comment is required
              </p>
            )}
            {isMaxLength && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error: </span> You have
                reached the character limit of {MAX_COMMENT_LENGTH} characters
              </p>
            )}

            <h1 className="govuk-label-wrapper">
              <label className="govuk-label govuk-label--m" htmlFor="comment">
                {topicLabels[currentTopic as keyof typeof topicLabels]}
              </label>
            </h1>

            <p className="govuk-hint">
              {currentTopicIndex + 1} of {totalTopics}
            </p>

            <textarea
              className={`govuk-textarea ${validationError || isMaxLength ? "govuk-textarea--error" : ""}`}
              id="comment"
              name="comment"
              rows={5}
              aria-describedby="comment-hint"
              value={comment}
              onChange={handleCommentChange}
              maxLength={MAX_COMMENT_LENGTH}
            ></textarea>
          </div>
          {!hideContinue && (
            <div className="govuk-button-group">
              <Button content="Continue" type="submit" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CommentTextEntry;

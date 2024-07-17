"use client";
import React, { useEffect, useState } from "react";

const MAX_COMMENT_LENGTH = 2500;

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
  isEditing,
}: {
  reference: string;
  currentTopic: string;
  onContinue: () => void;
  isEditing: boolean;
}) => {
  const [comment, setComment] = useState("");
  const [normalisedCharCount, setNormalisedCharCount] = useState(0);
  const [validationError, setValidationError] = useState(false);

  useEffect(() => {
    const storedComment = localStorage.getItem(
      `comment_${currentTopic}_${reference}`,
    );
    if (storedComment) {
      setComment(storedComment);
      setNormalisedCharCount(normaliseAndCountChars(storedComment));
    } else {
      setComment("");
      setNormalisedCharCount(0);
    }
    setValidationError(false);
  }, [currentTopic, reference]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    if (newComment.length <= MAX_COMMENT_LENGTH) {
      setComment(newComment);
      setNormalisedCharCount(normaliseAndCountChars(newComment));
      setValidationError(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment && normalisedCharCount <= MAX_COMMENT_LENGTH) {
      localStorage.setItem(`comment_${currentTopic}_${reference}`, comment);
      onContinue();
    } else {
      setValidationError(true);
    }
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <form onSubmit={handleSubmit}>
          <div
            className={`govuk-form-group ${
              validationError ? "govuk-form-group--error" : ""
            }`}
          >
            {validationError && !comment && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error: </span> Your
                comment is required
              </p>
            )}
            <h1 className="govuk-label-wrapper">
              <label className="govuk-label govuk-label--l" htmlFor="comment">
                {topicLabels[currentTopic as keyof typeof topicLabels]}
              </label>
            </h1>
            <textarea
              className={`govuk-textarea ${
                validationError ? "govuk-textarea--error" : ""
              }`}
              id="comment"
              name="comment"
              rows={5}
              aria-describedby="comment-hint"
              value={comment}
              onChange={handleCommentChange}
              maxLength={MAX_COMMENT_LENGTH}
            ></textarea>
            <p
              className={`govuk-hint ${normalisedCharCount === MAX_COMMENT_LENGTH ? "govuk-error-message" : ""}`}
              id="comment-hint"
            >
              {normalisedCharCount === MAX_COMMENT_LENGTH ? (
                <>
                  You have reached the character limit of {MAX_COMMENT_LENGTH}{" "}
                  characters
                </>
              ) : (
                <>
                  {normalisedCharCount} / {MAX_COMMENT_LENGTH} characters
                </>
              )}
            </p>
          </div>
          <div className="govuk-button-group">
            <button
              type="submit"
              className="govuk-button"
              data-module="govuk-button"
            >
              {isEditing ? "Return to summary" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentTextEntry;

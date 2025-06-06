/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/button";
import { COMMENT_PUBLIC_TOPIC_OPTIONS } from "@/lib/comments";
import { trackClient } from "@/lib/dprAnalytics";

const MAX_COMMENT_LENGTH = 6000;

const normaliseAndCountChars = (text: string) => {
  return text.replace(/\s+/g, " ").trim().length;
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
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const textareaRef = useRef<HTMLDivElement>(null);

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

  const scrollAndFocusError = () => {
    if (
      textareaRef.current &&
      typeof textareaRef.current.scrollIntoView === "function"
    ) {
      textareaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      const textarea = textareaRef.current.querySelector("textarea");
      if (textarea) {
        textarea.focus();
      }
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    const newCount = normaliseAndCountChars(newComment);

    if (newCount <= MAX_COMMENT_LENGTH) {
      setComment(newComment);
      setNormalisedCharCount(newCount);
      setIsMaxLength(newCount === MAX_COMMENT_LENGTH);
      if (hasSubmitted) {
        setValidationError(false);
      }
    } else {
      setIsMaxLength(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (normalisedCharCount > 0 && normalisedCharCount <= MAX_COMMENT_LENGTH) {
      sessionStorage.setItem(`comment_${currentTopic}_${reference}`, comment);
      updateProgress(3);
      onContinue();
    } else {
      setValidationError(true);
      trackClient("comment_validation_error", {
        message: "error in comment text entry",
      });
      scrollAndFocusError();
    }
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <form onSubmit={handleSubmit} noValidate>
          <div
            ref={textareaRef}
            className={`govuk-form-group ${validationError || isMaxLength ? "govuk-form-group--error" : ""}`}
          >
            {validationError && normalisedCharCount === 0 && (
              <p
                id="comment-error"
                className="govuk-error-message"
                role="alert"
                aria-live="assertive"
              >
                <span className="govuk-visually-hidden">Error:</span> Your
                comment is required
              </p>
            )}
            {isMaxLength && (
              <p
                id="length-error"
                className="govuk-error-message"
                role="alert"
                aria-live="assertive"
              >
                <span className="govuk-visually-hidden">Error:</span> You have
                reached the character limit of {MAX_COMMENT_LENGTH} characters
              </p>
            )}

            <h2 className="govuk-label-wrapper">
              <label className="govuk-label govuk-label--m" htmlFor="comment">
                {
                  COMMENT_PUBLIC_TOPIC_OPTIONS.find(
                    (option) => option.value === currentTopic,
                  )?.hint
                }
              </label>
            </h2>

            <p className="govuk-hint">
              {
                COMMENT_PUBLIC_TOPIC_OPTIONS.find(
                  (option) => option.value === currentTopic,
                )?.description
              }
            </p>
            <p className="govuk-hint">
              {currentTopicIndex + 1} of {totalTopics}
            </p>

            <textarea
              className={`govuk-textarea ${validationError || isMaxLength ? "govuk-textarea--error" : ""}`}
              id="comment"
              name="comment"
              rows={5}
              value={comment}
              onChange={handleCommentChange}
              maxLength={MAX_COMMENT_LENGTH}
              aria-invalid={
                (validationError && normalisedCharCount === 0) || isMaxLength
              }
              aria-errormessage={
                validationError && normalisedCharCount === 0
                  ? "comment-error"
                  : isMaxLength
                    ? "length-error"
                    : undefined
              }
              autoComplete="off"
            ></textarea>
          </div>
          {!hideContinue && (
            <div className="govuk-button-group">
              <Button variant="default" type="submit" element="button">
                Continue
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CommentTextEntry;

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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { COMMENT_PUBLIC_SENTIMENT_OPTIONS } from "@/lib/comments";
import { trackClient } from "@/lib/dprAnalytics";

const CommentSentiment = ({
  reference,
  navigateToPage,
  updateProgress,
  hideContinue,
}: {
  reference: string;
  navigateToPage: (page: number, params?: object) => void;
  updateProgress: (completedPage: number) => void;
  hideContinue?: boolean;
}) => {
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [validationError, setValidationError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const radioGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedSentiment = sessionStorage.getItem(`sentiment_${reference}`);
    if (storedSentiment) {
      setSentiment(storedSentiment);
    }
    const storedTopics = sessionStorage.getItem(`selectedTopics_${reference}`);
    setIsEditing(!!storedTopics);
  }, [reference]);

  const scrollAndFocusError = () => {
    if (
      radioGroupRef.current &&
      typeof radioGroupRef.current.scrollIntoView === "function"
    ) {
      radioGroupRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      const firstRadio = radioGroupRef.current.querySelector(
        'input[type="radio"]',
      ) as HTMLInputElement;
      if (firstRadio) {
        firstRadio.focus();
      }
    }
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setHasSubmitted(true);

      if (sentiment) {
        sessionStorage.setItem(`sentiment_${reference}`, sentiment);
        updateProgress(1);
        const nextPage = isEditing ? 5 : 2;
        navigateToPage(nextPage);
      } else {
        setValidationError(true);
        trackClient("comment_validation_error", {
          message: "error in sentiment",
        });
        scrollAndFocusError();
      }
    },
    [sentiment, reference, updateProgress, isEditing, navigateToPage],
  );

  const handleSentimentChange = (value: string) => {
    setSentiment(value);
    if (hasSubmitted) {
      setValidationError(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="govuk-heading-l">
        How do you feel about this development?
      </h2>

      <div
        ref={radioGroupRef}
        className={`govuk-form-group ${validationError ? "govuk-form-group--error" : ""}`}
      >
        {validationError && (
          <p
            id="sentiment-error"
            className="govuk-error-message"
            role="alert"
            aria-live="assertive"
          >
            <span className="govuk-visually-hidden">Error:</span> Please select
            an option
          </p>
        )}

        <fieldset
          className="govuk-fieldset"
          aria-describedby={validationError ? "sentiment-error" : undefined}
        >
          <legend className="govuk-fieldset__legend govuk-visually-hidden">
            Select your sentiment about this development
          </legend>

          <div className="govuk-radios">
            {COMMENT_PUBLIC_SENTIMENT_OPTIONS.map((option) => (
              <div className="govuk-radios__item" key={option.value}>
                <input
                  className="govuk-radios__input"
                  id={option.value}
                  name="sentiment"
                  type="radio"
                  value={option.value}
                  checked={sentiment === option.value}
                  onChange={(e) => handleSentimentChange(e.target.value)}
                />
                <label
                  className="govuk-label govuk-radios__label"
                  htmlFor={option.value}
                  data-testid={option.value}
                >
                  <span className="govuk-body">{option.label}</span>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      {!hideContinue && (
        <button type="submit" className="govuk-button">
          Continue
        </button>
      )}
    </form>
  );
};

export default CommentSentiment;

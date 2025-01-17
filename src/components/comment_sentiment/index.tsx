"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

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
        sendGTMEvent({
          event: "comment_validation_error",
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

  const options = [
    { id: "objection", label: "Opposed" },
    { id: "neutral", label: "Neutral" },
    { id: "supportive", label: "Support" },
  ];

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

          <div className="govuk-radios dsn-sentiment">
            {options.map((option) => (
              <div className="govuk-radios__item" key={option.id}>
                <input
                  className="govuk-radios__input"
                  id={option.id}
                  name="sentiment"
                  type="radio"
                  value={option.id}
                  checked={sentiment === option.id}
                  onChange={(e) => handleSentimentChange(e.target.value)}
                />
                <label
                  className="govuk-label govuk-radios__label"
                  htmlFor={option.id}
                  data-testid={option.id}
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

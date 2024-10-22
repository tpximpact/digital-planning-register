"use client";
import React, { useCallback, useEffect, useState } from "react";
import { OpposedIcon, NeutralIcon, SupportIcon } from "../../../public/icons";
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

  useEffect(() => {
    const storedSentiment = sessionStorage.getItem(`sentiment_${reference}`);
    if (storedSentiment) {
      setSentiment(storedSentiment);
    }

    const storedTopics = sessionStorage.getItem(`selectedTopics_${reference}`);
    setIsEditing(!!storedTopics);
  }, [reference]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
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
      }
    },
    [sentiment, reference, updateProgress, isEditing, navigateToPage],
  );

  const handleSentimentChange = (value: string) => {
    setSentiment(value);
    setValidationError(false);
  };

  const options = [
    { id: "objection", label: "Opposed", Icon: OpposedIcon },
    { id: "neutral", label: "Neutral", Icon: NeutralIcon },
    { id: "supportive", label: "Support", Icon: SupportIcon },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="govuk-heading-l">
        How do you feel about this development?
      </h1>
      {validationError && (
        <p className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span> Please select an
          option
        </p>
      )}
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
              <option.Icon />
              <span className="govuk-body">{option.label}</span>
            </label>
          </div>
        ))}
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

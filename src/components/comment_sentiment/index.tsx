"use client";
import React, { useEffect, useState } from "react";
import { OpposedIcon, NeutralIcon, SupportIcon } from "../../../public/icons";

const CommentSentiment = ({
  reference,
  navigateToPage,
}: {
  reference: string;
  navigateToPage: (page: number, params?: object) => void;
}) => {
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [validationError, setValidationError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedSentiment = localStorage.getItem(`sentiment_${reference}`);
    if (storedSentiment) {
      setSentiment(storedSentiment);
    }

    // Check if there are already selected topics
    const storedTopics = localStorage.getItem(`selectedTopics_${reference}`);
    setIsEditing(!!storedTopics);
  }, [reference]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sentiment) {
      localStorage.setItem(`sentiment_${reference}`, sentiment);
      if (isEditing) {
        navigateToPage(5); // Go to check answers page if editing
      } else {
        navigateToPage(2); // Go to topic selection for new submissions
      }
    } else {
      setValidationError(true);
    }
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
              onChange={(e) => {
                setSentiment(e.target.value);
                setValidationError(false);
              }}
            />
            <label
              className="govuk-label govuk-radios__label"
              htmlFor={option.id}
            >
              <option.Icon />
              <span className="govuk-body">{option.label}</span>
            </label>
          </div>
        ))}
      </div>
      <button type="submit" className="govuk-button">
        Continue
      </button>
    </form>
  );
};

export default CommentSentiment;

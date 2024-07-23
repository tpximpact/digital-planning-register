/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";

const topics_selection = [
  {
    label: "Design, size or height of new buildings or extensions",
    value: "design",
  },
  { label: "Use and function of the proposed development", value: "use" },
  { label: "Impacts on natural light", value: "light" },
  { label: "Privacy of neighbours", value: "privacy" },
  { label: "Disabled persons' access", value: "access" },
  { label: "Noise from new uses", value: "noise" },
  { label: "Traffic, parking or road safety", value: "traffic" },
  { label: "Other", value: "other" },
];

const CommentTopicSelection = ({
  reference,
  onTopicSelection,
  updateProgress,
}: {
  reference: string;
  onTopicSelection: (topics: string[]) => void;
  updateProgress: (completedPage: number) => void;
}) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [validationError, setValidationError] = useState(false);

  useEffect(() => {
    const storedTopics = sessionStorage.getItem(`selectedTopics_${reference}`);
    if (storedTopics) {
      setSelectedTopics(storedTopics.split(","));
    }
  }, [reference]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTopics.length > 0) {
      sessionStorage.setItem(
        `selectedTopics_${reference}`,
        selectedTopics.join(","),
      );
      updateProgress(2);
      onTopicSelection(selectedTopics);
    } else {
      setValidationError(true);
    }
  };

  const handleTopicChange = (topic: string) => {
    setSelectedTopics((prev) => {
      if (prev.includes(topic)) {
        // Remove topic and associated comment
        sessionStorage.removeItem(`comment_${topic}_${reference}`);
        return prev.filter((t) => t !== topic);
      } else {
        return [...prev, topic];
      }
    });
    setValidationError(false);
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <form onSubmit={handleSubmit}>
          <fieldset className="govuk-fieldset" aria-describedby="waste-hint">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h1 className="govuk-fieldset__heading">
                What topics do you want to comment on?
              </h1>
            </legend>
            <div id="waste-hint" className="govuk-hint">
              Help us understand what your comments on this development are
              about. Select all the topics that apply.
            </div>
            <div
              className={`govuk-form-group ${
                validationError ? "govuk-form-group--error" : ""
              }`}
            >
              {validationError && (
                <p id="form-error" className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> Please
                  select at least one topic
                </p>
              )}
              <div
                className={`govuk-checkboxes ${
                  validationError ? "govuk-checkboxes--error" : ""
                }`}
                data-module="govuk-checkboxes"
              >
                {topics_selection.map((topic) => (
                  <div className="govuk-checkboxes__item" key={topic.value}>
                    <input
                      className={`govuk-checkboxes__input ${
                        validationError ? "govuk-input--error" : ""
                      }`}
                      id={topic.value}
                      name="topics"
                      type="checkbox"
                      value={topic.value}
                      checked={selectedTopics.includes(topic.value)}
                      onChange={() => handleTopicChange(topic.value)}
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor={topic.value}
                    >
                      {topic.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <details className="govuk-details">
              <summary className="govuk-details__summary">
                <span className="govuk-details__summary-text">
                  What happens to your comments
                </span>
              </summary>
              <div className="govuk-details__text">
                <p className="govuk-body">
                  As part of the negotiation, the case officer can take into
                  consideration all comments which are 'material considerations'
                  to the proposed development. These include (but aren't limited
                  to):
                </p>
                <ul className="govuk-list govuk-list--bullet">
                  <li>overlooking/loss of privacy</li>
                  <li>loss of light or overshadowing</li>
                  <li>traffic parking</li>
                  <li>highway safety</li>
                  <li>noise from new uses or plant equipment</li>
                  <li>effect on listed building and conservation area</li>
                  <li>scale of buildings and structures</li>
                  <li>layout and density of building</li>
                  <li>design, appearance and materials</li>
                  <li>disabled persons' access</li>
                  <li>
                    previous planning decisions (including appeal decisions)
                  </li>
                  <li>trees and nature conservation</li>
                </ul>
                <p className="govuk-body">
                  Issues such as loss of private view or negative impact on
                  property values, or civil matters like 'right to light', party
                  walls and property damage are not considered 'material
                  planning considerations'.
                </p>
                <p className="govuk-body">
                  The case officer will summarise their findings in the
                  officer's report and/or decision notice.
                </p>
                <p className="govuk-body">
                  We won't acknowledge receipt of your comments, or get in touch
                  with you directly about the issues you've raised. You can
                  check the officer's report or decision notice to see if your,
                  and other, comments have been logged.
                </p>
              </div>
            </details>
            <button
              type="submit"
              className="govuk-button"
              data-module="govuk-button"
            >
              Continue
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CommentTopicSelection;

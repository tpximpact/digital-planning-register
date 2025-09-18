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
import { trackClient } from "@/lib/dprAnalytics";
import { COMMENT_PUBLIC_TOPIC_OPTIONS } from "@/lib/comments";

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
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const checkboxGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedTopics = sessionStorage.getItem(`selectedTopics_${reference}`);
    if (storedTopics) {
      setSelectedTopics(storedTopics.split(","));
    }
  }, [reference]);

  const scrollAndFocusError = () => {
    if (
      checkboxGroupRef.current &&
      typeof checkboxGroupRef.current.scrollIntoView === "function"
    ) {
      checkboxGroupRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      const firstCheckbox = checkboxGroupRef.current.querySelector(
        'input[type="checkbox"]',
      ) as HTMLInputElement;
      if (firstCheckbox) {
        firstCheckbox.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (selectedTopics.length > 0) {
      sessionStorage.setItem(
        `selectedTopics_${reference}`,
        selectedTopics.join(","),
      );
      updateProgress(2);
      onTopicSelection(selectedTopics);
    } else {
      setValidationError(true);
      trackClient("comment_validation_error", {
        message: "error in topic selection",
      });
      scrollAndFocusError();
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

    if (hasSubmitted) {
      setValidationError(false);
    }
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <form onSubmit={handleSubmit} noValidate>
          <fieldset
            className="govuk-fieldset"
            aria-describedby={`topics-hint${validationError ? " topics-error" : ""}`}
          >
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h2 className="govuk-fieldset__heading">
                What topics do you want to comment on?
              </h2>
            </legend>

            <div id="topics-hint" className="govuk-hint">
              Help us understand what your comments on this development are
              about. Select all the topics that apply.
            </div>

            <div
              ref={checkboxGroupRef}
              className={`govuk-form-group ${
                validationError ? "govuk-form-group--error" : ""
              }`}
            >
              {validationError && (
                <p
                  id="topics-error"
                  className="govuk-error-message"
                  role="alert"
                  aria-live="assertive"
                >
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
                {COMMENT_PUBLIC_TOPIC_OPTIONS.map((topic) => (
                  <div className="govuk-checkboxes__item" key={topic.value}>
                    <input
                      className={`govuk-checkboxes__input ${
                        validationError ? "govuk-input--error" : ""
                      }`}
                      id={topic.value}
                      aria-describedby={`${topic.value}-hint`}
                      name={topic.value}
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
                    <div
                      id={`${topic.value}-hint`}
                      aria-describedby={`${topic.value}-hint`}
                      className="govuk-hint govuk-checkboxes__hint"
                    >
                      {topic.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button element="button" type="submit" variant="default">
              Continue
            </Button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CommentTopicSelection;

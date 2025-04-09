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
import { Details } from "../govukDpr/Details";
import { Button } from "@/components/button";
import { trackClient } from "@/lib/dprAnalytics";

export const topics_selection = [
  {
    label: "Design, size or height of new buildings or extensions",
    value: "design",
    hint: "Such as if a building is too tall, or does not fit into the surrounding environment.",
  },
  {
    label: "Use and function of the proposed development",
    value: "use",
    hint: "Such as a proposed business that would not serve the area well, or could cause problems due to its operation.",
  },
  {
    label: "Impacts on natural light",
    value: "light",
    hint: "Such as a building casting a shadow over residential buildings nearby.",
  },
  {
    label: "Privacy of neighbours",
    value: "privacy",
    hint: "Such as a large building overlooking houses and gardens next to it, or being too close to prevent viewing into neighbours windows.",
  },
  {
    label: "Disabled persons' access",
    value: "access",
    hint: "Such as a development not providing accessible access to it's entrance, or removing a previous accessible route.",
  },
  {
    label: "Noise from new uses",
    value: "noise",
    hint: "Such as a new business causing excessive noise in a residential area.",
  },
  {
    label: "Traffic, parking or road safety",
    value: "traffic",
    hint: "Such as the parking proposed being inadequate, or important parking provisions being removed.",
  },
  {
    label: "Other",
    value: "other",
    hint: "Anything that does not fit into other categories.",
  },
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
                {topics_selection.map((topic) => (
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
                      {topic.hint}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Details
              summaryText={"What happens to your comments"}
              text={
                <>
                  <p className="govuk-body">
                    As part of the negotiation, the case officer can take into
                    consideration all comments which are &apos;material
                    considerations&apos; to the proposed development. These
                    include (but aren&apos;t limited to):
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
                    <li>disabled persons&apos; access</li>
                    <li>
                      previous planning decisions (including appeal decisions)
                    </li>
                    <li>trees and nature conservation</li>
                  </ul>
                  <p className="govuk-body">
                    Issues such as loss of private view or negative impact on
                    property values, or civil matters like &apos;right to
                    light&apos;, party walls and property damage are not
                    considered &apos;material planning considerations&apos;.
                  </p>
                  <p className="govuk-body">
                    The case officer will summarise their findings in the
                    officer&apos;s report and/or decision notice.
                  </p>
                  <p className="govuk-body">
                    We won&apos;t acknowledge receipt of your comments, or get
                    in touch with you directly about the issues you&apos;ve
                    raised. You can check the officer&apos;s report or decision
                    notice to see if your, and other, comments have been logged.
                  </p>
                </>
              }
            />
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

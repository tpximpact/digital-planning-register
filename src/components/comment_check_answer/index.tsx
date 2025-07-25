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
import React, { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { ApiV1 } from "@/actions/api";
import { AppConfig } from "@/config/types";
import "./CommentCheckAnswer.scss";
import { Details } from "../govukDpr/Details";
import { TextButton } from "../TextButton";
import {
  COMMENT_PUBLIC_SENTIMENT_OPTIONS,
  COMMENT_PUBLIC_TOPIC_OPTIONS,
} from "@/lib/comments";
import { PersonalDetails } from "../comment_personal_details";
import { DprCommentSubmission } from "@/types";
import type { CommentSentiment } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/enums/CommentSentiment.ts";
import type { CommentTopic } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/enums/CommentTopic.ts";
import { trackClient } from "@/lib/dprAnalytics";

const CommentCheckAnswer = ({
  councilConfig,
  reference,
  navigateToPage,
  updateProgress,
}: {
  councilConfig: AppConfig["council"];
  reference: string;
  navigateToPage: (page: number, params?: object) => void;
  updateProgress: (completedPage: number) => void;
}) => {
  const [sentiment, setSentiment] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [personalDetails, setPersonalDetails] = useState<
    PersonalDetails | undefined
  >(undefined);
  const [comments, setComments] = useState<
    { topic: string; comment: string }[]
  >([]);
  const [submissionError, setSubmissionError] = useState(false);

  const contactPlanningAdviceLink =
    councilConfig?.pageContent?.council_reference_submit_comment_check_answer
      ?.contact_planning_advice_link;
  const corporatePrivacyLink =
    councilConfig?.pageContent?.council_reference_submit_comment_check_answer
      ?.corporate_privacy_statement_link;
  const planningServicePrivacyStatementLink =
    councilConfig?.pageContent?.council_reference_submit_comment_check_answer
      ?.planning_service_privacy_statement_link;
  const getInTouchURL = councilConfig?.contact || "https://www.gov.uk/";

  useEffect(() => {
    const loadData = () => {
      setSentiment(sessionStorage.getItem(`sentiment_${reference}`) || "");
      setSelectedTopics(
        sessionStorage.getItem(`selectedTopics_${reference}`)?.split(",") || [],
      );
      const storedPersonalDetails = sessionStorage.getItem(
        `personalDetails_${reference}`,
      );
      if (storedPersonalDetails) {
        setPersonalDetails(JSON.parse(storedPersonalDetails));
      }

      const storedTopics =
        sessionStorage.getItem(`selectedTopics_${reference}`)?.split(",") || [];
      const loadedComments = storedTopics.map((topic) => ({
        topic,
        comment: sessionStorage.getItem(`comment_${topic}_${reference}`) || "",
      }));
      setComments(loadedComments);
    };

    loadData();
  }, [reference]);

  const formatSelectedTopics = (topics: string[]) => {
    return topics
      .map((topic) => {
        const foundTopic = COMMENT_PUBLIC_TOPIC_OPTIONS.find(
          (t) => t.value === topic,
        );
        return foundTopic ? foundTopic.selectedLabel : "";
      })
      .filter((label) => label !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(false);

    if (!personalDetails) {
      trackClient("error_submission");
      setSubmissionError(true);
      window.scrollTo(0, 0);
      return false;
    }

    const apiData: DprCommentSubmission = {
      name: personalDetails.name,
      email: personalDetails.emailAddress,
      address: `${personalDetails.address}, ${personalDetails.postcode}`,
      response: comments
        .map(({ topic, comment }) => {
          const topicLabel = COMMENT_PUBLIC_TOPIC_OPTIONS.find(
            (t) => t.value === topic,
          )?.label;
          return `* ${topicLabel}: ${comment} `;
        })
        .join(" "),
      summary_tag: sentiment as CommentSentiment,
      tags: selectedTopics as CommentTopic[],
    };

    try {
      if (councilConfig) {
        const response = await ApiV1.postComment(
          councilConfig?.dataSource ?? "none",
          councilConfig?.slug,
          reference,
          apiData,
        );
        if (response?.status?.code === 200) {
          sessionStorage.setItem(`submissionComplete_${reference}`, "true");
          // google analytic
          trackClient("comment_submit");

          // Clear all other sessionStorage items for this reference
          Object.keys(sessionStorage).forEach((key) => {
            if (
              key.includes(reference) &&
              key !== `submissionComplete_${reference}`
            ) {
              sessionStorage.removeItem(key);
            }
          });
          updateProgress(5); // Update progress to allow access to confirmation page and redirect to it
          navigateToPage(6);
        } else {
          trackClient("error_submission");
          throw new Error(`Submission failed ${response.status.detail}`);
        }
      }
    } catch (error) {
      trackClient("error_submission");
      console.error("Error submitting comment:", error);
      setSubmissionError(true);
      window.scrollTo(0, 0);
    }
  };

  // @todo apply <SummaryList /> <SummaryCard /> components here
  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds-from-desktop">
          {submissionError && (
            <div
              className="govuk-error-summary"
              data-module="govuk-error-summary"
            >
              <div role="alert">
                <h2 className="govuk-error-summary__title">
                  There was a problem submitting your comment
                </h2>
                <div className="govuk-error-summary__body">
                  <ul className="govuk-list govuk-error-summary__list">
                    <li>
                      <div>
                        There was a technical issue when we tried to submit your
                        comment.
                      </div>
                    </li>
                    <li>
                      <div>Your comment has been kept in your browser.</div>
                    </li>
                    <li>
                      <div>
                        Please try again later, or{" "}
                        <a
                          className="govuk-link govuk-link--no-visited-state"
                          href={getInTouchURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          contact your council
                        </a>
                        .
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          <h2 className="govuk-heading-l">
            Check what you have written before sending your comment
          </h2>

          <form onSubmit={handleSubmit}>
            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                  How do you feel about this development
                </dt>
                <dd className="govuk-summary-list__value">
                  {
                    COMMENT_PUBLIC_SENTIMENT_OPTIONS.find(
                      (option) => option.value === sentiment,
                    )?.label
                  }
                </dd>
                <dd className="govuk-summary-list__actions">
                  <TextButton
                    element="button"
                    className="button-link-change"
                    onClick={() => navigateToPage(1, { edit: true })}
                    ariaLabel="Change how you feel about this development"
                    variant="plain"
                  >
                    Change
                  </TextButton>
                </dd>
              </div>
            </dl>

            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                  What topics do you want to comment on?
                </dt>
                <dd className="govuk-summary-list__value">
                  {formatSelectedTopics(selectedTopics).map((topic, index) => (
                    <p key={index} className="govuk-body">
                      {topic}
                    </p>
                  ))}
                </dd>
                <dd className="govuk-summary-list__actions">
                  <TextButton
                    element="button"
                    className="button-link-change"
                    onClick={() => navigateToPage(2, { edit: true })}
                    ariaLabel="Change what topics you want to comment on"
                    variant="plain"
                  >
                    Change
                  </TextButton>
                </dd>
              </div>
            </dl>

            {comments.map(({ topic, comment }, index) => {
              const foundTopic = COMMENT_PUBLIC_TOPIC_OPTIONS.find(
                (t) => t.value === topic,
              );
              const topicLabel = foundTopic ? foundTopic.selectedLabel : "";

              return (
                <dl className="govuk-summary-list" key={index}>
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">{topicLabel}</dt>
                    <dd className="govuk-summary-list__value">
                      <p className="govuk-body">
                        {comment || "No comment provided"}
                      </p>
                    </dd>
                    <dd className="govuk-summary-list__actions">
                      <TextButton
                        element="button"
                        className="button-link-change"
                        onClick={() =>
                          navigateToPage(3, { topicIndex: index, edit: true })
                        }
                        ariaLabel={`Change ${topicLabel} comment`}
                        variant="plain"
                      >
                        Change
                      </TextButton>
                    </dd>
                  </div>
                </dl>
              );
            })}

            <h2 className="govuk-heading-m">Your details</h2>

            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Name</dt>
                <dd className="govuk-summary-list__value">
                  <p className="govuk-body">{personalDetails?.name}</p>
                </dd>
                <dd className="govuk-summary-list__actions">
                  <TextButton
                    element="button"
                    className="button-link-change"
                    onClick={() => navigateToPage(4, { edit: true })}
                    ariaLabel="Change name"
                    variant="plain"
                  >
                    Change
                  </TextButton>
                </dd>
              </div>
            </dl>

            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Address</dt>
                <dd className="govuk-summary-list__value">
                  <p className="govuk-body">{personalDetails?.address}</p>
                </dd>
                <dd className="govuk-summary-list__actions">
                  <TextButton
                    element="button"
                    className="button-link-change"
                    onClick={() => navigateToPage(4, { edit: true })}
                    ariaLabel="Change address"
                    variant="plain"
                  >
                    Change
                  </TextButton>
                </dd>
              </div>
            </dl>

            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Postcode</dt>
                <dd className="govuk-summary-list__value">
                  <p className="govuk-body">{personalDetails?.postcode}</p>
                </dd>
                <dd className="govuk-summary-list__actions">
                  <TextButton
                    element="button"
                    className="button-link-change"
                    onClick={() => navigateToPage(4, { edit: true })}
                    ariaLabel="Change postcode"
                    variant="plain"
                  >
                    Change
                  </TextButton>
                </dd>
              </div>
            </dl>

            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Email address</dt>
                <dd className="govuk-summary-list__value">
                  <p className="govuk-body">{personalDetails?.emailAddress}</p>
                </dd>
                <dd className="govuk-summary-list__actions">
                  <TextButton
                    element="button"
                    className="button-link-change"
                    onClick={() => navigateToPage(4, { edit: true })}
                    ariaLabel="Change email address"
                    variant="plain"
                  >
                    Change
                  </TextButton>
                </dd>
              </div>
            </dl>

            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Telephone number</dt>
                <dd className="govuk-summary-list__value">
                  <p className="govuk-body">
                    {personalDetails?.telephoneNumber}
                  </p>
                </dd>
                <dd className="govuk-summary-list__actions">
                  <TextButton
                    element="button"
                    className="button-link-change"
                    onClick={() => navigateToPage(4, { edit: true })}
                    ariaLabel="Change telephone number"
                    variant="plain"
                  >
                    Change
                  </TextButton>
                </dd>
              </div>
            </dl>

            <h2 className="govuk-heading-m">Now send your comment</h2>
            <p className="govuk-body">
              By submitting this comment you are confirming that, to the best of
              your knowledge, the details you are providing are correct.
            </p>

            <Details
              summaryText={"How we handle your data"}
              text={
                <>
                  <p className="govuk-body">
                    We need your name and contact information because we can
                    only formally explore comments coming from people who live
                    close to the proposed development. We will also use this to
                    contact you if the planning decision regarding this
                    application is appealed.
                  </p>
                  <p className="govuk-body">
                    Your comments will be made available online for the public
                    to see.
                  </p>
                  <p className="govuk-body">
                    We&apos;ll make sure any other personal or sensitive
                    information is removed where needed, in line with the{" "}
                    <a
                      className="govuk-link govuk-link--no-visited-state"
                      href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/personal-information-what-is-it/what-is-personal-information-a-guide/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      General Data Protection Regulation (GDPR).
                    </a>{" "}
                    If you have concerns about any data you have sent being
                    published,{" "}
                    {contactPlanningAdviceLink ? (
                      <a
                        className="govuk-link govuk-link--no-visited-state"
                        href={contactPlanningAdviceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        contact the Planning Advice and Information Service.
                      </a>
                    ) : (
                      "contact the Planning Advice and Information Service."
                    )}
                  </p>
                  <p className="govuk-body">
                    Read our{" "}
                    {corporatePrivacyLink && (
                      <>
                        <a
                          className="govuk-link govuk-link--no-visited-state"
                          href={corporatePrivacyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          corporate privacy statement
                        </a>
                        {planningServicePrivacyStatementLink && " and our "}
                      </>
                    )}
                    {planningServicePrivacyStatementLink && (
                      <>
                        <a
                          className="govuk-link govuk-link--no-visited-state"
                          href={planningServicePrivacyStatementLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          planning service statement
                        </a>
                      </>
                    )}{" "}
                    for more information.
                  </p>
                </>
              }
            />
            <Button variant="default" element="button" type="submit">
              Accept and send
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentCheckAnswer;

/* eslint-disable react/no-unescaped-entities */
import config from "../../../util/config.json";
import { cookies } from "next/headers";
import { capitaliseWord } from "../../../util/capitaliseWord";
import { Config } from "../../../util/type";

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

export default async function CommentCheckAnswer({
  council,
  applicationId,
  reference,
}: {
  council: string;
  applicationId: number;
  reference: string;
}) {
  const councilConfig: Config = config;
  const contactPlanningAdvice = councilConfig[council]?.contact_planning_advice;
  const corporatePrivacy = councilConfig[council]?.corporate_privacy_statement;
  const planningServicePrivacyStatement =
    councilConfig[council]?.planning_service_privacy_statement;

  const sentiment = cookies().get("sentiment")?.value || "";
  const selectedTopics =
    cookies().get("selectedTopics")?.value?.split(",") || [];
  const commentCookie = cookies().get("commentData")?.value;
  const commentData = commentCookie ? JSON.parse(commentCookie) : {};
  const personalDetailsCookie = cookies().get("personalDetails")?.value;
  const personalDetails = personalDetailsCookie
    ? JSON.parse(personalDetailsCookie)
    : {};

  const submissionError = cookies().get("submissionError")?.value === "true";

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
                        Please try again later, or contact your council.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          <h1 className="govuk-heading-l">
            Check what you have written before sending your comment
          </h1>

          <form
            action={`/${council}/${reference}/submit-comment-redirect?page=5`}
            method="POST"
          >
            <input type="hidden" name="council" value={council} />
            <input type="hidden" name="reference" value={reference} />{" "}
            <input type="hidden" name="applicationId" value={applicationId} />{" "}
            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                  How do you feel about this development
                </dt>
                <dd className="govuk-summary-list__value">
                  <p className="govuk-body">{capitaliseWord(sentiment)}</p>
                </dd>
                <dd className="govuk-summary-list__actions">
                  <a
                    className="govuk-link"
                    href={`/${council}/${reference}/submit-comment?page=1`}
                  >
                    Change
                  </a>
                </dd>
              </div>
            </dl>
            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                  What topics do you want to comment on?
                </dt>
                <dd className="govuk-summary-list__value">
                  <ul className="govuk-list">
                    {selectedTopics.map((topic) => {
                      const foundTopic = topics_selection.find(
                        (t) => t.value === topic,
                      );
                      return foundTopic ? (
                        <li key={foundTopic.value}>{foundTopic.label}</li>
                      ) : null;
                    })}
                  </ul>
                </dd>
                <dd className="govuk-summary-list__actions">
                  <a
                    className="govuk-link"
                    href={`/${council}/${reference}/submit-comment?page=2`}
                  >
                    Change
                  </a>
                </dd>
              </div>
            </dl>
            {selectedTopics.map((topic, index) => {
              const foundTopic = topics_selection.find(
                (t) => t.value === topic,
              );
              const topicLabel = foundTopic ? foundTopic.label : "";

              return (
                <dl className="govuk-summary-list" key={index}>
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">
                      Comment on {topicLabel.toLowerCase()}
                    </dt>
                    <dd className="govuk-summary-list__value">
                      <p className="govuk-body">
                        {commentData[topic]
                          ? (commentData[topic] as string)
                          : "No comment provided"}
                      </p>
                    </dd>
                    <dd className="govuk-summary-list__actions">
                      <a
                        className="govuk-link"
                        href={`/${council}/${reference}/submit-comment?page=3`}
                      >
                        Change
                      </a>
                    </dd>
                  </div>
                </dl>
              );
            })}
            <h1 className="govuk-heading-l">
              Check your details before sending your comment
            </h1>
            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Name</dt>
                <dd className="govuk-summary-list__value">
                  <p className="govuk-body">{personalDetails.name}</p>
                </dd>
                <dd className="govuk-summary-list__actions">
                  <ul className="govuk-summary-list__actions-list">
                    <li className="govuk-summary-list__actions-list-item">
                      <a
                        className="govuk-link"
                        href={`/${council}/${reference}/submit-comment?page=4`}
                      >
                        Change
                      </a>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Address</dt>
                <dd className="govuk-summary-list__value">
                  <p className="govuk-body">{personalDetails.address}</p>
                </dd>
                <dd className="govuk-summary-list__actions">
                  <ul className="govuk-summary-list__actions-list">
                    <li className="govuk-summary-list__actions-list-item">
                      <a
                        className="govuk-link"
                        href={`/${council}/${reference}/submit-comment?page=4`}
                      >
                        Change
                      </a>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Postcode</dt>
                <dd className="govuk-summary-list__value">
                  <p className="govuk-body">{personalDetails.postcode}</p>
                </dd>
                <dd className="govuk-summary-list__actions">
                  <ul className="govuk-summary-list__actions-list">
                    <li className="govuk-summary-list__actions-list-item">
                      <a
                        className="govuk-link"
                        href={`/${council}/${reference}/submit-comment?page=4`}
                      >
                        Change
                      </a>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Email address</dt>
                <dd className="govuk-summary-list__value">
                  <p className="govuk-body">{personalDetails.emailAddress}</p>
                </dd>
                <dd className="govuk-summary-list__actions">
                  <ul className="govuk-summary-list__actions-list">
                    <li className="govuk-summary-list__actions-list-item">
                      <a
                        className="govuk-link"
                        href={`/${council}/${reference}/submit-comment?page=4`}
                      >
                        Change
                      </a>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Telephone number</dt>
                <dd className="govuk-summary-list__value">
                  <p className="govuk-body">
                    {personalDetails.telephoneNumber}
                  </p>
                </dd>
                <dd className="govuk-summary-list__actions">
                  <ul className="govuk-summary-list__actions-list">
                    <li className="govuk-summary-list__actions-list-item">
                      <a
                        className="govuk-link"
                        href={`/${council}/${reference}/submit-comment?page=4`}
                      >
                        Change
                      </a>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
            <h2 className="govuk-heading-m">Now send your comment</h2>
            <p className="govuk-body">
              By submitting this comment you are confirming that, to the best of
              your knowledge, the details you are providing are correct.
            </p>
            <details className="govuk-details">
              <summary className="govuk-details__summary">
                <span className="govuk-details__summary-text">
                  How we handle your data
                </span>
              </summary>
              <div className="govuk-details__text">
                <p className="govuk-body">
                  We need your name and contact information because can only
                  formally explore comments coming from people who live close to
                  the proposed development. We will also use this to contact you
                  if the planning decision regarding this application is
                  appealed.
                </p>
                <p className="govuk-body">
                  Your comments will be made available online for the public to
                  see. We will not include your name, address, telephone number
                  or email address.
                </p>
                <p className="govuk-body">
                  We'll make sure any other personal or sensitive information is
                  removed where needed, in line with the{" "}
                  <a
                    className="govuk-link govuk-link--no-visited-state"
                    href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/personal-information-what-is-it/what-is-personal-information-a-guide/"
                    target="_blank"
                  >
                    General Data Protection Regulation (GDPR).
                  </a>{" "}
                  {""}
                  If you have concerns about any data you have sent being
                  published,{" "}
                  <a
                    className="govuk-link govuk-link--no-visited-state"
                    href={contactPlanningAdvice}
                    target="_blank"
                  >
                    {" "}
                    contact the Planning Advice and Information Service.
                  </a>
                </p>
                <p className="govuk-body">
                  Read our {""}
                  <a
                    className="govuk-link govuk-link--no-visited-state"
                    href={corporatePrivacy}
                    target="_blank"
                  >
                    {""}
                    corporate privacy statement
                  </a>
                  and our {""}
                  <a
                    className="govuk-link govuk-link--no-visited-state"
                    href={planningServicePrivacyStatement}
                    target="_blank"
                  >
                    planning service statement
                  </a>{" "}
                  {""}
                  for more information.
                </p>
              </div>
            </details>
            <button type="submit" className="govuk-button">
              Accept and send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

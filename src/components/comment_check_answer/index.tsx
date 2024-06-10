/* eslint-disable react/no-unescaped-entities */
import config from "../../../util/config.json";
const dummy_answer = [
  {
    question: "How do you feel about this development",
    answer: "happy",
  },
  {
    question: "What topics do you want to comment on?",
    answer: "Exemple comment",
  },
  {
    question:
      "Comment on the design, size or height of new buildings or extensions",
    answer: "Exemple comment design",
  },
];

const dummy_personal_data = [
  {
    topic: "Name",
    answer: "Dummy Name",
  },
  {
    topic: "Address",
    answer: "Dummy address",
  },
  {
    topic: "Postcode",
    answer: "Dummy postcode",
  },
  {
    topic: "Email address",
    answer: "",
  },
  {
    topic: "Telephone number",
    answer: "",
  },
];
const CommentCheckAnswer = ({
  council,
  setFeedbackNumber,
}: {
  council: string;
  setFeedbackNumber: (e: number) => void;
}) => {
  const councilConfig = config as any;
  const contactPlanningAdvice = councilConfig[council]?.contact_planning_advice;
  const corporatePrivacy = councilConfig[council]?.corporate_privacy_statement;
  const planningServicePrivacyStatement =
    councilConfig[council]?.planning_service_privacy_statement;
  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds-from-desktop">
          <h1 className="govuk-heading-l">
            Check your comments before sending your application
          </h1>
          {dummy_answer &&
            dummy_answer.map((el, index) => {
              return (
                <dl className="govuk-summary-list" key={index}>
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">{el.question}</dt>
                    <dd className="govuk-summary-list__value">
                      <p className="govuk-body">{el.answer}</p>
                    </dd>
                    <dd className="govuk-summary-list__actions">
                      <a className="govuk-link" href="#">
                        Change
                      </a>
                    </dd>
                  </div>
                </dl>
              );
            })}

          <h1 className="govuk-heading-l">
            Check your details before sending your application
          </h1>

          {dummy_personal_data &&
            dummy_personal_data?.map((el, index) => {
              return (
                <dl className="govuk-summary-list" key={index}>
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">{el.topic}</dt>
                    <dd className="govuk-summary-list__value">
                      <p className="govuk-body">{el.answer}</p>
                    </dd>
                    <dd className="govuk-summary-list__actions">
                      <ul className="govuk-summary-list__actions-list">
                        <li className="govuk-summary-list__actions-list-item">
                          <a className="govuk-link" href="#">
                            Change
                          </a>
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              );
            })}

          <h2 className="govuk-heading-m">Now send your application</h2>

          <p className="govuk-body">
            {" "}
            By submitting this application you are confirming that, to the best
            of your knowledge, the details you are providing are correct.
          </p>
          <details className="govuk-details">
            <summary className="govuk-details__summary">
              <span className="govuk-details__summary-text">
                How we handle your data
              </span>
            </summary>
            <div className="govuk-details__text">
              We need your name and contact information because can only
              formally explore comments coming from people who live close to the
              proposed development. We will also use this to contact you if the
              planning decision regarding this application is appealed. Your
              comments will be made available online for the public to see. We
              will not include your name, address, telephone number or email
              address. We'll make sure any other personal or sensitive
              information is removed where needed, in line with the{" "}
              <a
                className="govuk-link govuk-link--no-visited-state"
                href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/personal-information-what-is-it/what-is-personal-information-a-guide/"
                target="_blank"
              >
                General Data Protection Regulation (GDPR).
              </a>
              If you have concerns about any data you have sent being published,
              <a
                className="govuk-link govuk-link--no-visited-state"
                href={contactPlanningAdvice}
                target="_blank"
              >
                contact the Planning Advice and Information Service.
              </a>
              Read our
              <a
                className="govuk-link govuk-link--no-visited-state"
                href={corporatePrivacy}
                target="_blank"
              >
                corporate privacy statement
              </a>{" "}
              and our{" "}
              <a
                className="govuk-link govuk-link--no-visited-state"
                href={planningServicePrivacyStatement}
                target="_blank"
              >
                planning service statement
              </a>{" "}
              for more information.
            </div>
          </details>

          <form action="confirmation" method="post" noValidate>
            <button
              type="submit"
              className="govuk-button"
              data-module="govuk-button"
              onClick={() => setFeedbackNumber(6)}
            >
              Accept and send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentCheckAnswer;

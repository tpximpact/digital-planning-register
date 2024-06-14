/* eslint-disable react/no-unescaped-entities */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import config from "../../../util/config.json";
import { capitaliseWord } from "../../../util/capitaliseWord";

const CommentPersonalDetails = async ({ council }: { council: string }) => {
  const councilConfig = config as any;
  const contactPlanningAdvice = councilConfig[council]?.contact_planning_advice;
  const corporatePrivacy = councilConfig[council]?.corporate_privacy_statement;
  const planningServicePrivacyStatement =
    councilConfig[council]?.planning_service_privacy_statement;

  async function handleSubmit(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const postcode = formData.get("postcode") as string;
    const emailAddress = formData.get("email-address") as string;
    const telephoneNumber = formData.get("telephone-number") as string;
    const consent = formData.get("consent") === "on";

    const errors: { [key: string]: boolean } = {
      name: !name,
      address: !address,
      postcode: !postcode,
      consent: !consent,
    };

    if (Object.values(errors).some((error) => error)) {
      cookies().set("validationErrors", JSON.stringify(errors));
      redirect(`/${council}/comment`);
      return;
    }

    const personalDetails = {
      name,
      address,
      postcode,
      emailAddress,
      telephoneNumber,
      consent,
    };

    cookies().set("personalDetails", JSON.stringify(personalDetails));
    cookies().set("feedbackNumber", "5");
    cookies().delete("validationErrors");
    redirect(`/${council}/comment`);
  }

  const validationErrors = cookies().get("validationErrors")?.value
    ? JSON.parse(cookies().get("validationErrors")?.value)
    : {};

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-l">Your details</h1>
        <form action={handleSubmit}>
          <div
            className={`govuk-form-group ${validationErrors.name ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="name">
              Name
            </label>
            {validationErrors.name && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> Your name
                is required
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-20 ${validationErrors.name ? "govuk-input--error" : ""}`}
              id="name"
              name="name"
              type="text"
            />
          </div>
          <div
            className={`govuk-form-group ${validationErrors.address ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="address">
              Address
            </label>
            {validationErrors.address && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> Your
                address is required
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-20 ${validationErrors.address ? "govuk-input--error" : ""}`}
              id="address"
              name="address"
              type="text"
            />
          </div>
          <div
            className={`govuk-form-group ${validationErrors.postcode ? "govuk-form-group--error" : ""}`}
          >
            <label className="govuk-label" htmlFor="postcode">
              Postcode
            </label>
            {validationErrors.postcode && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> Your
                postcode is required
              </p>
            )}
            <input
              className={`govuk-input govuk-input--width-10 ${validationErrors.postcode ? "govuk-input--error" : ""}`}
              id="postcode"
              name="postcode"
              type="text"
            />
          </div>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="email-address">
              Email address
            </label>
            <div className="govuk-hint">Optional</div>
            <input
              className="govuk-input govuk-input--width-20"
              id="email-address"
              name="email-address"
              type="text"
            />
          </div>
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="telephone-number">
              Telephone number
            </label>
            <div className="govuk-hint">Optional</div>
            <input
              className="govuk-input govuk-input--width-20"
              id="telephone-number"
              name="telephone-number"
              type="text"
            />
          </div>
          <div
            className={`govuk-form-group ${validationErrors.consent ? "govuk-form-group--error" : ""}`}
          >
            {validationErrors.consent && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error: </span> You need
                to consent
              </p>
            )}
            <div className="govuk-checkboxes" data-module="govuk-checkboxes">
              <div className="govuk-checkboxes__item">
                <input
                  className={`govuk-checkboxes__input ${validationErrors.consent ? "govuk-input--error" : ""}`}
                  id="consent"
                  name="consent"
                  type="checkbox"
                  value="on"
                />
                <label
                  className="govuk-label govuk-checkboxes__label"
                  htmlFor="consent"
                >
                  I consent to {capitaliseWord(council)} Council using my data
                  for the purposes of assessing this planning application
                </label>
              </div>
            </div>
          </div>
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
                if the planning decision regarding this application is appealed.
              </p>
              <p className="govuk-body">
                Your comments will be made available online for the public to
                see. We will not include your name, address, telephone number or
                email address.
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
          <button
            type="submit"
            className="govuk-button"
            data-module="govuk-button"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
export default CommentPersonalDetails;

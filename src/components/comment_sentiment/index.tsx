/* eslint-disable react/no-unescaped-entities */
"use server";
import { OpposedIcon, NeutralIcon, SupportIcon } from "../../../public/icons";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CommentSentiment = async ({
  council,
  reference,
}: {
  council: string;
  reference: string;
}) => {
  const sentiment = cookies().get("sentiment")?.value;
  const validationError = cookies().get("validationError")?.value === "true";

  return (
    <>
      <form
        action={async (formData) => {
          "use server";
          const selectedSentiment = formData.get("sentiment") as string;

          if (!selectedSentiment) {
            cookies().set("validationError", "true");
            redirect(`/${council}/${reference}/submit-comment?page=1`);
          } else {
            cookies().set("sentiment", selectedSentiment);
            cookies().delete("validationError");
            redirect(`/${council}/${reference}/submit-comment?page=2`);
          }
        }}
      >
        <input type="hidden" name="council" value={council} />
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 className="govuk-fieldset__heading">
            How do you feel about this development?
          </h1>
        </legend>
        {validationError && (
          <p id="form-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> Please select
            an option
          </p>
        )}
        <div
          className={`wrap-icons-feeling ${
            validationError ? "govuk-form-group--error" : ""
          }`}
          data-module="govuk-radios"
        >
          <div className="govuk-radios__item">
            <input
              className={`govuk-radios__input ${
                validationError ? "govuk-input--error" : ""
              }`}
              id="sentiment-opposed"
              name="sentiment"
              type="radio"
              value="opposed"
              defaultChecked={sentiment === "opposed"}
            />
            <label className="govuk-label" htmlFor="sentiment-opposed">
              <OpposedIcon
                color={sentiment === "opposed" ? "#AA2A16" : "transparent"}
              />
              <span className="govuk-body">Opposed</span>
            </label>
          </div>
          <div className="govuk-radios__item">
            <input
              className={`govuk-radios__input ${
                validationError ? "govuk-input--error" : ""
              }`}
              id="sentiment-neutral"
              name="sentiment"
              type="radio"
              value="neutral"
              defaultChecked={sentiment === "neutral"}
            />
            <label className="govuk-label" htmlFor="sentiment-neutral">
              <NeutralIcon
                color={sentiment === "neutral" ? "#1D70B8" : "transparent"}
              />
              <span className="govuk-body">Neutral</span>
            </label>
          </div>
          <div className="govuk-radios__item">
            <input
              className={`govuk-radios__input ${
                validationError ? "govuk-input--error" : ""
              }`}
              id="sentiment-support"
              name="sentiment"
              type="radio"
              value="support"
              defaultChecked={sentiment === "support"}
            />
            <label className="govuk-label" htmlFor="sentiment-support">
              <SupportIcon
                color={sentiment === "support" ? "#00703C" : "transparent"}
              />
              <span className="govuk-body">Support</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="govuk-button"
          data-module="govuk-button"
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default CommentSentiment;

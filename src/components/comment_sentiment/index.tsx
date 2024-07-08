import { getCookie } from "@/actions/cookies";
import { OpposedIcon, NeutralIcon, SupportIcon } from "../../../public/icons";

const CommentSentiment = async ({
  council,
  reference,
  applicationId,
  searchParams,
}: {
  council: string;
  reference: string;
  applicationId: number;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const sentiment = await getCookie("sentiment", reference);
  const validationErrorCookie = await getCookie("validationError", reference);
  const validationError = validationErrorCookie === "true";
  const isEditing = searchParams.edit === "true";

  const options = [
    { id: "objection", label: "Opposed", Icon: OpposedIcon },
    { id: "neutral", label: "Neutral", Icon: NeutralIcon },
    { id: "supportive", label: "Support", Icon: SupportIcon },
  ];

  return (
    <>
      <form
        action={`/${council}/${reference}/submit-comment-redirect?page=1${isEditing ? "&edit=true" : ""}`}
        method="POST"
      >
        <input type="hidden" name="council" value={council} />
        <input type="hidden" name="reference" value={reference} />
        <input type="hidden" name="applicationId" value={applicationId} />
        <input
          type="hidden"
          name="isEditing"
          value={isEditing ? "true" : "false"}
        />
        <div className="govuk-form-group">
          <fieldset className="govuk-fieldset">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h1 className="govuk-fieldset__heading">
                How do you feel about this development?
              </h1>
            </legend>
            {validationError && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> Please
                select an option
              </p>
            )}
            <div
              className={`govuk-radios dsn-sentiment ${
                validationError ? "govuk-form-group--error" : ""
              }`}
              data-module="govuk-radios"
            >
              {options.map((option) => {
                const isChecked = sentiment === option.id;
                return (
                  <div key={option.id} className="govuk-radios__item">
                    <input
                      className={`govuk-radios__input ${
                        validationError ? "govuk-input--error" : ""
                      }`}
                      id={`sentiment-${option.id}`}
                      name="sentiment"
                      type="radio"
                      value={option.id}
                      defaultChecked={isChecked}
                    />
                    <label
                      className="govuk-label govuk-radios__label"
                      htmlFor={`sentiment-${option.id}`}
                    >
                      <option.Icon />
                      <span className="govuk-body">{option.label}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>
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

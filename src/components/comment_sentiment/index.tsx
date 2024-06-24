import { getCookie } from "@/actions";
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
    { id: "opposed", label: "Opposed", Icon: OpposedIcon, color: "#AA2A16" },
    { id: "neutral", label: "Neutral", Icon: NeutralIcon, color: "#1D70B8" },
    { id: "support", label: "Support", Icon: SupportIcon, color: "#00703C" },
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
                  className="govuk-label"
                  htmlFor={`sentiment-${option.id}`}
                >
                  <option.Icon
                    color={isChecked ? option.color : "transparent"}
                  />
                  <span className="govuk-body">{option.label}</span>
                </label>
              </div>
            );
          })}
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

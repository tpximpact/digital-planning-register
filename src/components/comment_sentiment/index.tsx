/* eslint-disable react/no-unescaped-entities */
import { OpposedIcon, NeutralIcon, SupportIcon } from "../../../public/icons";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CommentSentiment = async ({ council }: { council: string }) => {
  const sentiment = cookies().get("sentiment")?.value;

  return (
    <>
      <form
        action={async (formData) => {
          "use server";
          const selectedSentiment = formData.get("sentiment") as string;
          cookies().set("sentiment", selectedSentiment);
          cookies().set("feedbackNumber", "2");
          redirect(`/${council}/comment`);
        }}
        method="POST"
      >
        <input type="hidden" name="council" value={council} />
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h1 className="govuk-fieldset__heading">
            How do you feel about this development?
          </h1>
        </legend>

        <div className="wrap-icons-feeling" data-module="govuk-radios">
          <div className="govuk-radios__item">
            <input
              className="govuk-radios__input"
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
              className="govuk-radios__input"
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
              className="govuk-radios__input"
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

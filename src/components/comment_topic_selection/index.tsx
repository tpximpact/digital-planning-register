/* eslint-disable react/no-unescaped-entities */
import { cookies } from "next/headers";
const topics_selection = [
  "Design, size or height of new buildings or extensions",
  "Use and function of the proposed development",
  "Impacts on natural light",
  "Privacy of neighbours",
  "Disabled persons' access",
  "Noise from new uses",
  "Traffic, parking or road safety",
  "Other",
];

const CommentTopicSelection = async () => {
  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-form-group">
            <fieldset className="govuk-fieldset" aria-describedby="waste-hint">
              <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                <h1 className="govuk-fieldset__heading">
                  What topics do you want to comment on?
                </h1>
              </legend>
              <div id="waste-hint" className="govuk-hint">
                Help us understand what your comments on this development are
                about. Select all the topics that apply.
              </div>
              <div className="govuk-checkboxes" data-module="govuk-checkboxes">
                {topics_selection.map((el: any) => {
                  return (
                    <div className="govuk-checkboxes__item" key={el}>
                      <input
                        className="govuk-checkboxes__input"
                        id={el}
                        name={el}
                        type="checkbox"
                        value={el}
                      />
                      <label
                        className="govuk-label govuk-checkboxes__label"
                        htmlFor={el}
                      >
                        {el}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          </div>
          <details className="govuk-details">
            <summary className="govuk-details__summary">
              <span className="govuk-details__summary-text">
                What happens to your comments
              </span>
            </summary>
            <div className="govuk-details__text">
              As part of the negotiation, the case officer can take into
              consideration all comments which are 'material considerations' to
              the proposed development. These include (but aren't limited to):
              overlooking/loss of privacy loss of light or overshadowing traffic
              parking highway safety noise from new uses or plant equipment
              effect on listed building and conservation area scale of buildings
              and structures layout and density of building design, appearance
              and materials disabled persons' access previous planning decisions
              (including appeal decisions) trees and nature conservation Issues
              such as loss of private view or negative impact on property
              values, or civil matters like 'right to light', party walls and
              property damage are not considered 'material planning
              considerations'. The case officer will summarise their findings in
              the officer's report and/or decision notice. We won't acknowledge
              receipt of your comments, or get in touch with you directly about
              the issues you've raised. You can check the officer's report or
              decision notice to see if your, and other, comments have been
              logged."
            </div>
          </details>
          <form
            action={async () => {
              "use server";
              cookies().set("feedbackNumber", "3");
            }}
          >
            <button
              type="submit"
              className="govuk-button"
              data-module="govuk-button"
              // onClick={() => setFeedbackNumber(3)}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentTopicSelection;

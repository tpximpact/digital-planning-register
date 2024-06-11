import { cookies } from "next/headers";

const CommentTextEntry = async () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <div className="govuk-form-group">
          <h1 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--l" htmlFor="more-detail">
              Comment on the design, size or height of new buildings or
              extensions
            </label>
          </h1>
          <div id="more-detail-hint" className="govuk-hint">
            1 of 8
          </div>
          <textarea
            className="govuk-textarea"
            id="more-detail"
            name="moreDetail"
            rows={5}
            aria-describedby="more-detail-hint"
          ></textarea>
        </div>
        <form
          action={async () => {
            "use server";
            cookies().set("feedbackNumber", "4");
          }}
        >
          <button
            type="submit"
            className="govuk-button"
            data-module="govuk-button"
            // onClick={() => setFeedbackNumber(4)}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentTextEntry;

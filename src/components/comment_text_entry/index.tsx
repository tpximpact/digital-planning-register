"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Topic {
  label: string;
  value: string;
}

const topics_selection: Topic[] = [
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

const CommentTextEntry = async ({
  council,
  reference,
}: {
  council: string;
  reference: string;
}) => {
  const selectedTopics =
    cookies().get("selectedTopics")?.value?.split(",") || [];
  const currentTopicIndex = parseInt(
    cookies().get("currentTopicIndex")?.value || "0",
  );
  const currentTopic = selectedTopics[currentTopicIndex] || "";
  const validationError = cookies().get("validationError")?.value === "true";

  if (!currentTopic) {
    redirect(`/${council}/${reference}/submit-comment?page=2`);
  }

  async function handleSubmit(formData: FormData) {
    "use server";
    const comment = formData.get("comment") as string;

    if (!comment) {
      cookies().set("validationError", "true");
      redirect(`/${council}/${reference}/submit-comment?page=3`);
    } else {
      const existingCommentsValue = cookies().get("commentData")?.value;
      const existingComments = existingCommentsValue
        ? JSON.parse(existingCommentsValue)
        : {};

      existingComments[currentTopic] = comment;
      cookies().set("commentData", JSON.stringify(existingComments));
      cookies().delete("validationError");

      if (currentTopicIndex < selectedTopics.length - 1) {
        cookies().set("currentTopicIndex", (currentTopicIndex + 1).toString());
        redirect(`/${council}/${reference}/submit-comment?page=3`);
      } else {
        cookies().delete("currentTopicIndex");
        redirect(`/${council}/${reference}/submit-comment?page=4`);
      }
    }
  }

  const currentTopicLabel =
    topics_selection.find((t) => t.value === currentTopic)?.label || "";

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <form action={handleSubmit}>
          <div
            className={`govuk-form-group ${
              validationError ? "govuk-form-group--error" : ""
            }`}
          >
            {validationError && (
              <p id="form-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error: </span> Your
                comment is required
              </p>
            )}
            <h1 className="govuk-label-wrapper">
              <label className="govuk-label govuk-label--l" htmlFor="comment">
                Comment on {currentTopicLabel.toLowerCase()}
              </label>
            </h1>
            <div id="comment-hint" className="govuk-hint">
              {currentTopicIndex + 1} of {selectedTopics.length}
            </div>
            <textarea
              className={`govuk-textarea ${
                validationError ? "govuk-input--error" : ""
              }`}
              id="comment"
              name="comment"
              rows={5}
              aria-describedby="comment-hint"
            ></textarea>
          </div>
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

export default CommentTextEntry;

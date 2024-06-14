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

const CommentTextEntry = async () => {
  const selectedTopics =
    cookies().get("selectedTopics")?.value?.split(",") || [];
  const council = cookies().get("council")?.value || "";
  const currentTopicIndex = parseInt(
    cookies().get("currentTopicIndex")?.value || "0",
  );
  const currentTopic = selectedTopics[currentTopicIndex] || "";

  if (!currentTopic) {
    redirect(`/${council}/comment`);
  }

  async function handleSubmit(formData: FormData) {
    "use server";
    const comment = formData.get("comment") as string;
    const existingCommentsValue = cookies().get("commentData")?.value;
    const existingComments = existingCommentsValue
      ? JSON.parse(existingCommentsValue)
      : {};

    existingComments[currentTopic] = comment;
    cookies().set("commentData", JSON.stringify(existingComments));

    if (currentTopicIndex < selectedTopics.length - 1) {
      cookies().set("currentTopicIndex", (currentTopicIndex + 1).toString());
      redirect(`/${council}/comment`);
    } else {
      cookies().delete("currentTopicIndex");
      cookies().set("feedbackNumber", "4");
      redirect(`/${council}/comment`);
    }
  }

  const currentTopicLabel =
    topics_selection.find((t) => t.value === currentTopic)?.label || "";

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <form action={handleSubmit}>
          <div className="govuk-form-group govuk-form-group--error">
            <p id="form-error" className="govuk-error-message">
              <span className="govuk-visually-hidden">Error: </span> Your
              comment is required
            </p>
            <h1 className="govuk-label-wrapper">
              <label className="govuk-label govuk-label--l" htmlFor="comment">
                Comment on {currentTopicLabel}
              </label>
            </h1>
            <div id="comment-hint" className="govuk-hint">
              {currentTopicIndex + 1} of {selectedTopics.length}
            </div>
            <textarea
              className="govuk-textarea govuk-input--error"
              id="comment"
              name="comment"
              rows={5}
              aria-describedby="comment-hint"
              defaultValue={""}
              required
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

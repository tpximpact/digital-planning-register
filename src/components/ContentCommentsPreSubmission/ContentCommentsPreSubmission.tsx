import { AppConfig } from "@/config/types";

export const ContentCommentsPreSubmission = ({
  councilConfig,
}: {
  councilConfig: AppConfig["council"];
}) => {
  const whatHappensToYourCommentsLink =
    councilConfig?.pageContent?.council_reference_submit_comment_pre_submission
      ?.what_happens_to_your_comments_link;
  return (
    <>
      <h1 className="govuk-heading-l">
        What you need to know before you comment
      </h1>
      <h2 className="govuk-heading-m">
        What isn&apos;t considered in planning approval
      </h2>
      <p className="govuk-body">
        There are issues that may be of concern to you, and are very important,
        but which generally cannot be considered as a material planning
        consideration when assessing a planning application. These include:
      </p>
      <ul className="govuk-list govuk-list--bullet">
        <li>
          disputes about civil matters, such as building freeholds or the
          &apos;right to light&apos;
        </li>
        <li>loss of property value</li>
        <li>
          issues which are dealt with by other forms of law, such as party wall
          matters.
        </li>
      </ul>
      <p className="govuk-body">
        We cannot refuse permission because of construction noise. However, we
        can restrict the hours of work to reduce disturbance to residents and
        other sensitive neighbours.
      </p>
      <p className="govuk-body">
        {/* <a href="#" className="govuk-link govuk-link--no-visited-state">
          What can you do if these things concern you?
        </a> */}
      </p>

      <h2 className="govuk-heading-m">Why your comments are important</h2>
      <p className="govuk-body">
        There are three main reasons we ask residents to comment on planning
        applications:
      </p>
      <ol className="govuk-list govuk-list--number">
        <li>
          <h3 className="govuk-heading-s">To use your knowledge of the area</h3>
          <p className="govuk-body">
            You may be able to highlight on-the-ground details we don&apos;t
            know about - for example, that a mature tree was left out of a
            developer&apos;s plans.
          </p>
        </li>
        <li>
          <h3 className="govuk-heading-s">To influence the details</h3>
          <p className="govuk-body">
            Your understanding of an area&apos;s needs can help planners decide
            on things like amount of open space, cycling facilities, or what
            materials are appropriate for a scheme.
          </p>
        </li>
        <li>
          <h3 className="govuk-heading-s">
            To make sure we balance our priorities
          </h3>
          <p className="govuk-body">
            It&apos;s useful know which priorities are most important to
            residents, so we can push developers to be more ambitious with their
            targets. Telling us what your priorities are can help planners make
            that decision.
          </p>
        </li>
      </ol>

      <h2 className="govuk-heading-m">What happens to your comments</h2>
      <p className="govuk-body">
        The case officer will take all comments which are{" "}
        {whatHappensToYourCommentsLink ? (
          <a
            href={whatHappensToYourCommentsLink}
            className="govuk-link govuk-link--no-visited-state"
            target="_blank"
            rel="noopener noreferrer"
          >
            material considerations
          </a>
        ) : (
          "material considerations"
        )}{" "}
        into account when deciding whether or not to approve the application. As
        part of this process, your comments will be posted online for the public
        to see. The case officer will summarise their findings in the
        officer&apos;s report and decision notice.
      </p>
    </>
  );
};

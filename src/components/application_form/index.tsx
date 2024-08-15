import { DprDocument } from "@/types";
import ApplicationMap from "../application_map";
import { convertApplicationSubmissionBops } from "@/lib/applicationSubmission";
import { RowProps, ApplicationFormProps } from "@/types";
/**
 * This generates a fake document - currently using the BopsNonStandardDocument type
 * @todo this will soon not be compatible with the new document type
 * Its added per page as opposed to at a higher level since we fetch the data at each load anyway,
 * it might be worth looking into if this affects caching for data fetching at some point though
 * @param council
 * @param reference
 * @returns
 */
export const ApplicationFormObject = (
  council: string,
  reference: string,
): DprDocument => {
  return {
    url: `/${council}/${reference}/application-form`,
    title: "Application form",
    metadata: {
      contentType: "text/html",
      byteSize: 0,
    },
  };
};

const isObject = (value: RowProps): boolean => {
  return value && typeof value === "object" && !Array.isArray(value);
};

const Row = ({ description, value, image }: RowProps) => {
  return (
    <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">{description}</dt>
      <dd className="govuk-summary-list__value">
        {image ? (
          <ApplicationMap mapData={value} />
        ) : isObject(value) ? (
          <dl className="govuk-summary-list">
            {Object.entries(value).map(([key, val], i) => (
              <Row key={i} description={key} value={val} />
            ))}
          </dl>
        ) : Array.isArray(value) ? (
          <ul>
            {value.map((item, i) => (
              <li key={i} className="govuk-body">
                {isObject(item) ? (
                  <dl className="govuk-summary-list">
                    {Object.entries(item).map(([key, val], j) => (
                      <Row key={j} description={key} value={val} />
                    ))}
                  </dl>
                ) : (
                  String(item)
                )}
              </li>
            ))}
          </ul>
        ) : (
          String(value)
        )}
      </dd>
    </div>
  );
};

const Section = ({ title, data }: any) => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h3 className="govuk-heading-m">{title}</h3>

        <dl className="govuk-summary-list">
          {data?.length
            ? data?.map((item: RowProps, i: number) => (
                <Row key={i} {...item} />
              ))
            : isObject(data) &&
              Object.entries(data).map(([key, val], i) =>
                Array.isArray(val) ? (
                  val.map((el, i) => <Row key={i} {...el} />)
                ) : (
                  <Row key={i} {...(val as RowProps)} />
                ),
              )}
        </dl>
      </div>
    </div>
  );
};

const ApplicationForm = ({ submission }: ApplicationFormProps) => {
  if (!submission) {
    return null;
  }
  const applicationSubmission = convertApplicationSubmissionBops(submission);
  return (
    <div className="govuk-grid-row faux-document">
      <div className="govuk-grid-column-full">
        {applicationSubmission?.map((el: any, i: number) => (
          <Section title={el.subtopic} data={el.value} key={i} />
        ))}
      </div>
    </div>
  );
};

export default ApplicationForm;

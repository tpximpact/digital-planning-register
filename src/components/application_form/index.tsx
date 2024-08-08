import { DprDocument } from "@/types";
import { capitaliseWord } from "../../../util/capitaliseWord";
import { BopsV2PlanningApplicationsSubmission } from "@/types/api/bops";

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

interface ApplicationFormProps
  extends Pick<BopsV2PlanningApplicationsSubmission, "submission"> {}

interface RowProps {
  description: string;
  value: any;
}

interface SectionProps {
  title: string;
  data: RowProps[];
}

const isObject = (value: any): boolean => {
  return value && typeof value === "object" && !Array.isArray(value);
};

const Row = ({ description, value }: RowProps) => {
  return (
    <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">{capitaliseWord(description)}</dt>
      <dd className="govuk-summary-list__value">
        {isObject(value) ? (
          <dl className="govuk-summary-list">
            {Object.entries(value).map(([key, val], i) => (
              <Row key={i} description={key} value={val} />
            ))}
          </dl>
        ) : Array.isArray(value) ? (
          <ul>
            {value.map((item, i) => (
              <li key={i}>
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

const Section = ({ title, data }: SectionProps) => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <h3 className="govuk-heading-m">{title}</h3>

        <dl className="govuk-summary-list">
          {data?.map((item, i) => <Row key={i} {...item} />)}
        </dl>
      </div>
    </div>
  );
};

const ApplicationForm = ({ submission }: ApplicationFormProps) => {
  if (!submission) {
    return null;
  }
  return (
    <div className="govuk-grid-row faux-document">
      <div className="govuk-grid-column-full">
        {Object.entries(submission.data).map(([key, value]) => {
          const data = Object.entries(value).map(([description, val]) => ({
            description,
            value: typeof val === "object" ? val : String(val),
          }));

          return <Section key={key} title={capitaliseWord(key)} data={data} />;
        })}
      </div>
    </div>
  );
};

export default ApplicationForm;

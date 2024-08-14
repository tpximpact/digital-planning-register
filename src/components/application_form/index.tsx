import { DprDocument } from "@/types";
import { BopsV2PlanningApplicationsSubmission } from "@/types/api/bops";
import { validateSecondTopic } from "../../../util/applicationForm";
import Map from "../map";

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
  image?: boolean;
}

interface SectionProps {
  title: string;
  data: RowProps[];
}

const isObject = (value: any): boolean => {
  return value && typeof value === "object" && !Array.isArray(value);
};

const Row = ({ description, value, image }: RowProps) => {
  const boundaryGeojson = value;

  let geometryType;
  let coordinates;

  if (boundaryGeojson?.type === "Feature") {
    geometryType = boundaryGeojson.geometry?.type;
    coordinates = boundaryGeojson.geometry?.coordinates;
  } else if (boundaryGeojson?.type === "FeatureCollection") {
    const features = boundaryGeojson.features;
    if (features && features.length > 0) {
      geometryType = features[0].geometry?.type;
      coordinates = features[0].geometry?.coordinates;
    }
  }

  return (
    <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">{description}</dt>
      <dd className="govuk-summary-list__value">
        {image && geometryType && coordinates ? (
          <Map
            geojsonData={JSON.stringify({
              type: "Feature",
              geometry: {
                type: geometryType,
                coordinates,
              },
            })}
          />
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
            ? data?.map((item: any, i: number) => <Row key={i} {...item} />)
            : isObject(data) &&
              Object.entries(data).map(([key, val], i) =>
                Array.isArray(val) ? (
                  val.map((el, i) => <Row key={i} {...el} />)
                ) : (
                  <>
                    <Row key={i} {...(val as RowProps)} />
                  </>
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
  const arr: any = [];

  Object.entries(submission).map(([key, val], i) => {
    switch (key) {
      case "data":
        Object.entries(val).map(([key, value], i) => {
          const data = validateSecondTopic(key, value);
          return data.subtopic !== undefined && arr.push(data);
        });
        return arr;
      case "files":
        const data = validateSecondTopic("files", val);
        arr.push(data);
        return arr;
      case "responses":
        let cleanData: any = [];
        Object.entries(val).map(([key, value], i) => {
          const data = validateSecondTopic(value?.metadata?.sectionName, value);
          if (cleanData[cleanData.length - 1]?.subtopic == data.subtopic) {
            cleanData[cleanData.length - 1]?.value?.push(data.value[0]);
          } else {
            cleanData.push(data);
          }
          return cleanData;
        });
        arr.push(...cleanData);
        return arr;
      default:
        return;
    }
  });
  return (
    <div className="govuk-grid-row faux-document">
      <div className="govuk-grid-column-full">
        {arr.map((el: any, i: number) => (
          <Section title={el.subtopic} data={el.value} key={i} />
        ))}
      </div>
    </div>
  );
};

export default ApplicationForm;

import { DprDocument } from "@/types";
import { capitaliseWord } from "../../../util/capitaliseWord";
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
}

interface SectionProps {
  title: string;
  data: RowProps[];
}

const isObject = (value: any): boolean => {
  return value && typeof value === "object" && !Array.isArray(value);
};

const Row = ({ description, value, image }: RowProps) => {
  // console.log({ value }, { description }, "val");
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
            ? data?.map((item, i) => <Row key={i} {...item} />)
            : isObject(data) &&
              Object.entries(data).map(([key, val], i) =>
                Array.isArray(val) ? (
                  val.map((el, i) => <Row key={i} {...el} />)
                ) : (
                  <Row key={i} {...val} />
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
  // validateMainTopic(submission);
  const title = [
    "Property",
    "Proposal",
    "Applicant",
    // agent: "Applicant's agent",
    "Application",
    "Files",

    "The Property",
    "About you",
    "The Project",
    "Your application",
    "Upload your documents",
    "Review and Confirm",
    "Pay and send",
  ];
  const arr: any = [];
  // Object.entries(submission.data).map(([key, value]) => {
  //   const data = Object.entries(value).map(([description, val]) =>
  //     validateSecondTopic(description, val),
  //   );
  //   arr.push(...data);
  // });
  // console.log(submission.responses)
  // Object.entries(submission).map(([key, value]) => {
  //   // console.log(key)
  //   const data =
  //     key !== "data" &&
  //     Object.entries(value).map(([description, val]) => ({
  //       description,
  //       value: typeof val === "object" ? val : String(val),
  //     }));
  //   arr.push(data);
  // });
  // console.log(arr);
  // console.log(submission);
  Object.entries(submission).map(([key, val], i) => {
    // console.log(val);
    switch (key) {
      case "data":
        Object.entries(val).map(([key, value], i) => {
          const data = validateSecondTopic(key, value);
          return data.subtopic !== undefined && arr.push(data);
        });
        return arr;
      case "files":
        Object.entries(val).map(([key, value], i) => {
          const data = validateSecondTopic("files", value);
          return arr.push(data);
        });
        return arr;
      case "metadata":
        Object.entries(val).map(([key, value], i) => {
          // console.log(value, 'key')
          // const data = validateSecondTopic("files", value);
          // return arr.push(data);
        });
        return 3;
      case "responses":
        let cleanData: any = [];
        Object.entries(val).map(([key, value], i) => {
          // console.log(value, 'key')
          const data = validateSecondTopic(value?.metadata?.sectionName, value);
          // console.log(data, 'data')
          if (cleanData[cleanData.length - 1]?.subtopic == data.subtopic) {
            cleanData[cleanData.length - 1]?.value?.push(data.value[0]);
          } else {
            cleanData.push(data);
          }
          return cleanData;
        });
        arr.push(...cleanData);
        return arr;
    }
  });
  return (
    <div className="govuk-grid-row faux-document">
      <div className="govuk-grid-column-full">
        {/* {console.log(arr)} */}
        {/* {console.log(arr)} */}
        {arr.map((el, i) => (
          <Section title={el.subtopic} data={el.value} key={i} />
        ))}
        {/* {Object.entries(submission.data).map(([key, value]) => {
          const data = Object.entries(value).map(([description, val]) => ({
            description,
            value: typeof val === "object" ? val : String(val),
          }));

          return <Section key={key} title={capitaliseWord(key)} data={arr} />;
        })} */}
        {/* {title.map((el, i) => (
          <Section title={el} data={submission} key={i} />
        ))} */}
        {/* <Section  title={capitaliseWord(key)} data={data} />; */}
      </div>
    </div>
  );
};

export default ApplicationForm;

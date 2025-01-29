import { findItemByKey } from "@/util";
import { Details } from "../govukDpr/Details";
import "./ImpactMeasures.scss";
import { DprContentPage } from "@/types";
import { contentImpactMeasures } from "./lib";
import { DataPoint, DataPoints } from "../DataPoints";

interface DprImpactMeasure {
  dataPoints?: DataPoint[];
  text?: React.ReactNode | string;
}

type DprImpactMeasureHousing = "housing";
type DprImpactMeasureOpenSpaces = "open-spaces";
type DprImpactMeasureJobs = "jobs";
type DprImpactMeasureCarbon = "carbon";
type DprImpactMeasureAccess = "access";
type DprImpactMeasureHealthcare = "healthcare";

export type DprImpactMeasureKey =
  | DprImpactMeasureHousing
  | DprImpactMeasureOpenSpaces
  | DprImpactMeasureJobs
  | DprImpactMeasureCarbon
  | DprImpactMeasureAccess
  | DprImpactMeasureHealthcare;

export type DprImpactMeasures = Record<
  DprImpactMeasureKey,
  DprImpactMeasure | null
>;

export const ImpactMeasures = () => {
  const data: DprImpactMeasures = {
    housing: {
      dataPoints: [
        { key: "New homes", value: "100" },
        { key: "affordable housing", value: "10%" },
      ],
    },
    "open-spaces": {
      dataPoints: [
        {
          key: "square metres",
          value: "1200",
        },
      ],
    },
    jobs: {
      dataPoints: [
        {
          key: "new roles",
          value: "45-100 ",
        },
      ],
    },
    carbon: {
      dataPoints: [
        {
          key: "less than minimum requirements",
          value: "66%",
        },
      ],
    },
    access: {
      text: "Two access points from Finchley Road to the east. One access point from Blackburn Road to the west.",
    },
    healthcare: null,
  };

  return (
    <div className="dpr-impact-measures" id="impact">
      <h1 className="dpr-impact-measures__heading">
        How this could impact you
      </h1>
      <p className="dpr-impact-measures__body">
        Any new development in your local area will have an effect on your
        community.
      </p>
      <p className="dpr-impact-measures__body">
        Here are some of the ways we think this development would impact your
        community. You can give us feedback on what is important for us to
        consider. We will use this feedback when we&rsquo;re deciding whether to
        give planning permission to a development.
      </p>
      {data && (
        <div className="dpr-impact-measures__sections">
          {Object.keys(data).map((section) => {
            const sectionContent = findItemByKey<DprContentPage>(
              contentImpactMeasures(),
              section,
            );
            const sectionData = data[section as DprImpactMeasureKey];

            if (!sectionContent || !sectionData) {
              return null;
            }

            return (
              <div
                className={`dpr-impact-measures__section dpr-impact-measures__section--${section}`}
                key={section}
              >
                <h3 className="dpr-impact-measures__section-heading">
                  {sectionContent.title}
                </h3>
                <div className="dpr-impact-measures__section-body">
                  {sectionData?.dataPoints && (
                    <DataPoints data={sectionData.dataPoints} />
                  )}
                  {sectionData?.text && <p>{sectionData.text}</p>}
                  {sectionData?.dataPoints && sectionContent.content && (
                    <Details
                      summaryText="How did we calculate this?"
                      text={sectionContent.content}
                      isInverted={true}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

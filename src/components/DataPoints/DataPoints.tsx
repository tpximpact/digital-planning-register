import React from "react";
import "./DataPoints.scss";

interface DataPointsProps {
  data: DataPoint[];
}

export type DataPoint = {
  key: string;
  value: string;
};

export const DataPoints = ({ data }: DataPointsProps) => {
  return (
    <>
      {data && data.length > 0 && (
        <dl className="dpr-data-points">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <dt>{item.value}</dt>
              <dd>{item.key}</dd>
            </React.Fragment>
          ))}
        </dl>
      )}
    </>
  );
};

/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

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

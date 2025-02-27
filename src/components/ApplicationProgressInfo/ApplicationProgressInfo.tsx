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

"use client";

import React, { useState, useEffect } from "react";
import "./ApplicationProgressInfo.scss";
import { uniqueID } from "./ApplicationProgressInfoUtils";
import {
  ApplicationProgressInfoSection,
  ProgressSection,
  ProgressSectionBase,
} from "./ApplicationProgressInfoSection";
import { ApplicationProgressInfoToggleButton } from "./ApplicationProgressInfoToggleButton";
import { Button } from "../button";
import { Details } from "../govukDpr/Details";

export interface ApplicationProgressInfoProps {
  sections: ProgressSectionBase[];
  withReadMore?: boolean;
  councilSlug: string;
  reference: string;
  decisionNoticeUrl?: string;
}

export const ApplicationProgressInfo = ({
  sections,
  withReadMore = false,
  councilSlug,
  reference,
  decisionNoticeUrl,
}: ApplicationProgressInfoProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const accordionSections: ProgressSection[] = sections.map((section, i) => ({
    ...section,
    accordionSectionId: i,
    isExpanded: false,
  }));

  const [showControls, setShowControls] = useState(false);
  const [openAll, setOpenAll] = useState(true);
  const [accordionStates, setAccordionStates] =
    useState<ProgressSection[]>(accordionSections);

  useEffect(() => {
    const anyOpen = accordionStates.find(
      (accordionState) => accordionState.isExpanded === true,
    );
    anyOpen ? setOpenAll(false) : setOpenAll(true);
    setShowControls(true);
  }, [accordionStates]);

  const updateAccordionState = (accordionSectionId: number, value: boolean) => {
    // when a section is toggled update the parent (this) isExpanded value
    const newStatus = accordionStates.map((accordionState) => {
      if (accordionState.accordionSectionId === accordionSectionId) {
        accordionState.isExpanded = value;
      }
      return accordionState;
    });
    setAccordionStates(newStatus);

    // update the text that shows open all / close all
    value ? setOpenAll(false) : setOpenAll(true);
  };

  const toggleAll = () => {
    setOpenAll(!openAll);
    const newStatus = accordionStates.map((accordionState) => {
      accordionState.isExpanded = openAll;
      return accordionState;
    });
    setAccordionStates(newStatus);
  };

  const accordionId = `accordion${uniqueID()}`;

  if (sections.length === 0) {
    return null;
  }

  return (
    <section
      className="dpr-progress-info__container"
      aria-labelledby="progress"
    >
      <h2 className="govuk-heading-l" id="progress">
        Progress
      </h2>

      {isClient ? (
        <div className="dpr-progress-info" id={accordionId}>
          {showControls && sections.length > 1 && (
            <div className="dpr-progress-info__controls">
              <ApplicationProgressInfoToggleButton
                toggleAll={toggleAll}
                openAll={openAll}
                showText="Show"
                hideText="Hide"
                textContinued="all sections"
              />
            </div>
          )}

          {accordionStates.map((section, i) => (
            <ApplicationProgressInfoSection
              {...section}
              key={i}
              onToggle={updateAccordionState}
            />
          ))}
        </div>
      ) : (
        <>
          {accordionStates.map((section, i) => (
            <Details
              key={i}
              summaryText={
                <>
                  {section.title} - {section.date}
                </>
              }
              text={section.content}
            />
          ))}
        </>
      )}
      {decisionNoticeUrl && (
        <Button variant="information" element="link" href={decisionNoticeUrl}>
          View decision notice
        </Button>
      )}
      {/* commented out until we do this work */}
      {/* {councilSlug && reference && (
        <div className="govuk-grid-row grid-row-extra-bottom-margin">
          <div className="govuk-grid-column-full">
            <Button
              variant="secondary"
              element="link"
              href={`/${councilSlug}/${reference}/progress`}
            >
              View application update history
            </Button>
          </div>
        </div>
      )} */}
    </section>
  );
};

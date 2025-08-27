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
import { Details } from "../govukDpr/Details";
import { FileList } from "@/components/FileList";
import { DprApplication } from "@/types";
export interface ApplicationProgressInfoProps {
  sections: ProgressSectionBase[];
  application?: DprApplication;
}

export const ApplicationProgressInfo = ({
  sections,
  application,
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
    setOpenAll(!anyOpen);
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
    setOpenAll(!value);
  };

  const toggleAll = () => {
    setOpenAll(!openAll);
    const newStatus = accordionStates.map((accordionState) => ({
      ...accordionState,
      isExpanded: openAll,
    }));
    setAccordionStates(newStatus);
  };

  const accordionId = `accordion${uniqueID()}`;

  if (sections.length === 0) {
    return null;
  }

  const decisionNoticeUrl = application?.data?.assessment?.decisionNotice?.url;
  const decisionDate =
    application?.data?.assessment?.planningOfficerDecisionDate;

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
        <div className="grid-row-extra-bottom-margin">
          <FileList
            documents={[
              {
                id: 1,
                name: "Decision notice",
                association: "application",
                type: ["otherDocument"],
                url: decisionNoticeUrl,
                metadata: {
                  size: {
                    bytes: 0,
                  },
                  mimeType: "application/pdf",
                  createdAt: decisionDate ?? new Date().toISOString(),
                  submittedAt: decisionDate ?? new Date().toISOString(),
                  validatedAt: decisionDate ?? new Date().toISOString(),
                  publishedAt: decisionDate ?? new Date().toISOString(),
                },
              },
            ]}
          />
        </div>
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

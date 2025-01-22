import React from "react";
import "./ApplicationProgressInfo.scss";
import { uniqueID } from "./ApplicationProgressInfoUtils";
import { ApplicationProgressInfoToggleButton } from "./ApplicationProgressInfoToggleButton";

export interface ProgressSectionBase {
  title: string;
  /**
   * YYYY-MM-DD
   */
  date: string | JSX.Element;
  content: JSX.Element;
  /**
   * Optional id = useful if we ever add auto opening of sections via url
   */
  sectionId?: string;
}

export interface ProgressSection extends ProgressSectionBase {
  isExpanded: boolean;
  accordionSectionId: number;
}

export interface ApplicationProgressInfoSectionProps extends ProgressSection {
  onToggle: (accordionSectionId: number, value: boolean) => void;
  withReadMore?: boolean;
}

export const ApplicationProgressInfoSection = ({
  title,
  date,
  content,
  sectionId,
  isExpanded,
  accordionSectionId,
  onToggle,
  withReadMore = false,
}: ApplicationProgressInfoSectionProps) => {
  const onSectionToggle = () =>
    isExpanded === true
      ? onToggle(accordionSectionId, false)
      : onToggle(accordionSectionId, true);

  const thisSectionId = sectionId
    ? sectionId
    : `accordion_section${uniqueID()}`;

  return (
    <div
      id={thisSectionId}
      className={`dpr-progress-info__section ${isExpanded ? "dpr-progress-info__section--expanded" : ""}`}
    >
      <div
        className="dpr-progress-info--section-header"
        onClick={onSectionToggle}
      >
        {/* h3 */}
        <h3 className="dpr-progress-info--section-heading">
          <button
            className="dpr-progress-info--section-button"
            title={isExpanded ? "Minimise " + title : "Expand " + title}
            id={`${thisSectionId}_${accordionSectionId}-heading`}
            aria-controls={`${thisSectionId}_${accordionSectionId}-content`}
            aria-expanded={isExpanded ? "true" : "false"}
          >
            <div
              className="dpr-progress-info--section-title"
              role="heading"
              aria-level={3}
            >
              {title}
            </div>

            {date && (
              <div
                className="dpr-progress-info--section-date"
                id={`${thisSectionId}_${accordionSectionId}-date`}
              >
                {date}
              </div>
            )}

            <ApplicationProgressInfoToggleButton
              showText="Show"
              hideText="Hide"
              textContinued="more info"
              title={"Open section showing more information about " + title}
              openAll={!isExpanded}
              isStatic={true}
            />
          </button>
        </h3>
      </div>
      <div
        className="dpr-progress-info__section-content"
        id={`${thisSectionId}_${accordionSectionId}-content`}
        aria-labelledby={`${thisSectionId}_${accordionSectionId}-heading`}
        // @TODO hidden should be until-found but jsx doesn't allow this https://github.com/facebook/react/issues/24740
        hidden={!isExpanded ? true : undefined}
        role="region"
      >
        {content}
        {isExpanded && withReadMore && (
          <button
            className="dpr-progress-info--show-less-button"
            onClick={onSectionToggle}
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

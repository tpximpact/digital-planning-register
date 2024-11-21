"use client";
import { useState } from "react";
import "./ApplicationProgressInfo.scss";
import { SecondaryButton } from "../button";

interface History {
  info: string;
  date: string;
  details: string;
}

interface ApplicationHistory {
  applicationHistory: History[];
  href: string;
}

export const ApplicationProgressInfo = ({
  applicationHistory,
  href,
}: ApplicationHistory) => {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [infoId, setInfoId] = useState<string>();
  return (
    <div
      className="accordion"
      data-module="govuk-accordion"
      id="accordion-default"
    >
      <h2 className="govuk-heading-l" id="progress">
        Progress
      </h2>

      <div
        className="accordion timeline"
        data-module="govuk-accordion"
        id="accordion-default"
      >
        {applicationHistory.length > 0 &&
          applicationHistory?.map((history: History, index: number) => (
            <div
              className={`accordion__section ${applicationHistory[applicationHistory.length - 1] == history && "timeline-end"}`}
              key={history?.info}
            >
              <div>
                <div className="accordion__section-header">
                  <h2 className="accordion__section-heading">
                    <button
                      onClick={() => {
                        if (infoId !== history?.info) {
                          setIsInfoOpen(true);
                          setInfoId(history?.info);
                        } else {
                          setIsInfoOpen(!isInfoOpen);
                          setInfoId(history?.info);
                        }
                      }}
                      className="govuk-accordion__section-button accordion__section-button"
                    >
                      <span
                        className="accordion__section-heading-text"
                        id={`accordion-default-heading-${index}`}
                      >
                        <span className="accordion__section-heading-text-focus">
                          {history?.info}{" "}
                        </span>
                        <span className="timeline-date">{history?.date}</span>
                      </span>
                      <span className="accordion__section-toggle">
                        <span
                          className={`accordion-nav__chevron ${(!isInfoOpen || infoId != history?.info) && "accordion-nav__chevron--down"}`}
                        ></span>
                        {isInfoOpen && infoId == history?.info
                          ? "Hide more info"
                          : "Show more info"}
                      </span>
                    </button>
                  </h2>
                </div>
                {isInfoOpen && infoId == history?.info && (
                  <div
                    id={`accordion-default-content-${index}`}
                    className="accordion__section-content govuk-accordion__section-content"
                  >
                    <p className="govuk-body">{history?.details}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      <SecondaryButton content="View application history" href={href} />
    </div>
  );
};

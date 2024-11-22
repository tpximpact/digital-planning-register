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
    <div data-module="govuk-accordion">
      <h2 className="govuk-heading-l" id="progress">
        Progress
      </h2>

      <div className="dpr-accordion-timeline" data-module="govuk-accordion">
        {applicationHistory.length > 0 &&
          applicationHistory?.map((history: History, index: number) => (
            <div className={`dpr-accordion-timeline__section`} key={index}>
              <div>
                <div>
                  <h2>
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
                      className="dpr-accordion-timeline__section-button"
                    >
                      <span
                        className="dpr-accordion-timeline__section-heading-text"
                        id={`accordion-default-heading-${index}`}
                      >
                        <span className="accordion__section-heading-text-focus">
                          {history?.info}{" "}
                        </span>
                        <span className="timeline-date">{history?.date}</span>
                      </span>
                      <span className="dpr-accordion-timeline__section-toggle">
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
                {isInfoOpen && infoId === history?.info && (
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

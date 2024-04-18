import Image from "next/image";
import file from "../../../public/images/file.jpg";
import { Data } from "../../../util/type";

const ApplicationFile = ({ documents }: Data) => {
  return (
    <>
      <h2 className="govuk-heading-l">Documents</h2>
      <p className="govuk-body">
        To find out more detailed information, please read the following
        document(s) provided by the applicant.
      </p>
      {documents && documents?.length > 0 ? (
        <>
          <div className="govuk-grid-row grid-row-extra-bottom-margin">
            <div className="govuk-grid-column-one-third-from-desktop">
              <div className="govuk-grid-column-one-third">
                <Image src="/public/images/file.jpg" alt="File" />
              </div>

              <div className="govuk-grid-column-two-thirds">
                <p className="govuk-body">
                  <a
                    href="#"
                    className="govuk-link govuk-link--no-visited-state"
                  >
                    Application form
                  </a>
                </p>
                <p className="govuk-hint">PDF, 8.94 MB, 62 pages</p>
                <p className="govuk-hint">
                  This file may not be suitable for users of assistive
                  technology.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="govuk-grid-row govuk-grid-column-two-thirds">
          <p className="govuk-hint">
            <em>No documents have been published at this time.</em>
          </p>
        </div>
      )}
    </>
  );
};

export default ApplicationFile;

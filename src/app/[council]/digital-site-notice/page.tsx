import { Config } from "@/types";
import config from "../../../../util/config.json";
import { redirect } from "next/navigation";

type Props = {
  params: { council: string };
};

const DigitalSiteNotice = ({ params }: Props) => {
  const council = params.council;
  const councilConfig = config as Config;
  if (!councilConfig[council].isShowDSN) {
    redirect(`/${council}`);
  }
  return (
    <div className="govuk-main-wrapper">
      <h1 className="govuk-heading-xl small-bottom-margin">
        Find digital site notices near you
      </h1>
      <p className="govuk-body grid-row-extra-bottom-margin">
        Digital site notices are created for significant planning applications
        that require public consultation. They present information differently
        to planning applications that do not require public consultation. This
        is to make it easier for you to access the information most important to
        the local community.
      </p>

      {councilConfig[council]?.pageContent?.digital_site_notice
        ?.sign_up_for_alerts_link && (
        <a
          className="govuk-button govuk-button--secondary"
          target="_blank"
          href={
            councilConfig[council]?.pageContent?.digital_site_notice
              ?.sign_up_for_alerts_link
          }
        >
          Sign up for alerts on applications near you
        </a>
      )}
    </div>
  );
};

export default DigitalSiteNotice;

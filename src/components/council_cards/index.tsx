import CouncilLogo from "../council_logo";
import config from "../../../util/config.json";
import Link from "next/link";

interface Council {
  name: string;
  contact?: string;
  logo?: string;
}

interface Config {
  [key: string]: Council;
}

export const CouncilCards = () => {
  const councilConfig = config as Config;
  const councils = Object.keys(councilConfig);

  return (
    <div className="logos-container">
      {councils.map((council) => {
        const { name, logo } = councilConfig[council];
        return (
          <Link
            href={`/${council}`}
            className="govuk-button govuk-button--secondary"
            title={`${name} Council`}
            key={council}
          >
            <CouncilLogo councilName={name} logoFileName={logo} />
          </Link>
        );
      })}
    </div>
  );
};

export default CouncilCards;

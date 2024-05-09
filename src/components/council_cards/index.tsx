import CouncilLogo from "../council_logo";
import config from "../../../util/config.json";

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
          <a
            href={`/${council}`}
            className="govuk-button govuk-button--secondary"
            title={`${name} Council`}
            key={council}
          >
            <CouncilLogo councilName={name} logoFileName={logo} />
          </a>
        );
      })}
    </div>
  );
};

export default CouncilCards;

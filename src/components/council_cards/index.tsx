import "./CouncilCards.scss";
import CouncilLogo from "../council_logo";
import Link from "next/link";
import { getConfig } from "@/lib/config";

export const CouncilCards = async () => {
  const councilConfig = await getConfig();

  const councils = Object.keys(councilConfig);

  return (
    <div className="logos-container">
      {councils.map((council) => {
        const { name, logo, isSelectable } = councilConfig[council];
        return (
          isSelectable?.toString() == "true" && (
            <Link
              href={`/${council}`}
              className="govuk-button govuk-button--secondary"
              title={`${name} Council`}
              key={council}
            >
              <CouncilLogo councilName={name} logoFileName={logo} />
            </Link>
          )
        );
      })}
    </div>
  );
};

export default CouncilCards;

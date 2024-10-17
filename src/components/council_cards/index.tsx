import { getAppConfig } from "@/config";
import CouncilLogo from "../council_logo";
import Link from "next/link";

export const CouncilCards = async () => {
  const appConfig = getAppConfig();
  const councils = appConfig.councils;

  return (
    <div className="logos-container">
      {councils.map(({ name, logo, visibility, slug }) => {
        return (
          visibility == "public" && (
            <Link
              href={`/${slug}`}
              className="govuk-button govuk-button--secondary"
              title={`${name} Council`}
              key={name}
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

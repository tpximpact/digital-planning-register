import Link from "next/link";
import { AppConfig } from "@/config/types";
import { CouncilLogo } from "@/components/CouncilLogo";
import "./CouncilCards.scss";

export const CouncilCards = ({
  councils,
}: {
  councils?: AppConfig["councils"];
}) => {
  const availableCouncils =
    councils && councils.filter((council) => council.visibility === "public");
  if (availableCouncils && availableCouncils.length > 0) {
    return (
      <div className="logos-container">
        {availableCouncils.map((council) => (
          <Link
            href={`/${council.slug}`}
            className="govuk-button govuk-button--secondary"
            title={`${council.name} Council`}
            key={council.slug}
            data-council-slug={council.slug}
          >
            <CouncilLogo
              councilName={council.name}
              logoFileName={council.logo}
            />
          </Link>
        ))}
      </div>
    );
  }
};

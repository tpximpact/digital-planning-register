import Link from "next/link";
import Image from "next/image";
import { AppConfig } from "@/config/types";
import "./CouncilCards.scss";
import { councilLogos } from "../CouncilLogos";

export const CouncilCards = ({
  councils,
}: {
  councils?: AppConfig["councils"];
}) => {
  const availableCouncils =
    councils && councils.filter((council) => council.visibility === "public");

  if (availableCouncils && availableCouncils.length > 0) {
    return (
      <>
        <h2 className="govuk-heading-m">
          Select your council to start exploring planning applications in your
          area
        </h2>
        <div className="govuk-grid-row logos-container">
          {availableCouncils.map((council) => (
            <div
              key={council.slug}
              className="govuk-grid-column-one-half govuk-grid-column-one-third-from-desktop"
            >
              <Link
                href={`/${council.slug}`}
                className="logos-container__logo govuk-button govuk-button--secondary"
                title={`${council.name} Council`}
                data-council-slug={council.slug}
              >
                {councilLogos[council.slug] ? (
                  councilLogos[council.slug]
                ) : (
                  <span>{council.name}</span>
                )}
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return null;
  }
};

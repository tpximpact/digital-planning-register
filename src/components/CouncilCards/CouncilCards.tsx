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

        <div className="dpr-council-cards">
          {availableCouncils.map((council) => {
            const logo = councilLogos[council.slug] ?? null;
            return (
              <Link
                key={council.slug}
                className={`dpr-council-card ${logo ? "dpr-council-card--logo" : ""}`}
                href={`/${council.slug}`}
                title={`${council.name} Council`}
                data-council-slug={council.slug}
              >
                {logo ? (
                  <>
                    {councilLogos[council.slug]}
                    <span className="govuk-visually-hidden">
                      {council.name}
                    </span>
                  </>
                ) : (
                  <span>{council.name}</span>
                )}
              </Link>
            );
          })}
        </div>
      </>
    );
  } else {
    return null;
  }
};

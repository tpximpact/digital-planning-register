import Link from "next/link";
import Image from "next/image";
import { AppConfig } from "@/config/types";
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
      <>
        <h2 className="govuk-heading-m">
          Select your council to start exploring planning applications in your
          area
        </h2>
        <div className="logos-container">
          {availableCouncils.map((council) => (
            <Link
              href={`/${council.slug}`}
              className="govuk-button govuk-button--secondary"
              key={council.slug}
              data-council-slug={council.slug}
              aria-label={`View planning applications for ${council.name} Council`}
            >
              {council.logo ? (
                <Image
                  src={`/images/logos/${council.logo}`}
                  alt={`${council.name} Logo`}
                  width={350}
                  height={75}
                  aria-label={`${council.name} Logo`}
                  role="img"
                />
              ) : (
                <span>{council.name}</span>
              )}
            </Link>
          ))}
        </div>
      </>
    );
  } else {
    return null;
  }
};

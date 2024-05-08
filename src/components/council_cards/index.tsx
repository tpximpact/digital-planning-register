import React from "react";
import Image from "next/image";
import fs from "fs";
import path from "path";
import config from "../../../util/config.json";

interface Council {
  name: string;
  contact: string;
  logo: string;
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
        const logoPath = path.join(
          process.cwd(),
          "public",
          "images",
          "logos",
          logo,
        );
        const logoExists = fs.existsSync(logoPath);

        return (
          <a
            href={`/${council}`}
            className="govuk-button govuk-button--secondary"
            title={`${name} Council`}
            key={council}
          >
            {logoExists ? (
              <Image
                src={`/images/logos/${logo}`}
                alt={`${name} Logo`}
                width={450}
                height={75}
              />
            ) : (
              <span>{name}</span>
            )}
          </a>
        );
      })}
    </div>
  );
};

export default CouncilCards;

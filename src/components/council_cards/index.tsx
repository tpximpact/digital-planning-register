import CouncilLogo from "../council_logo";
import Link from "next/link";
import { getConfig } from "@/actions";
import { useState, useEffect } from "react";
import { Config } from "@/types";

export const CouncilCards = () => {
  const [councilConfig, setCouncilConfig] = useState<Config>({});

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getConfig();
      setCouncilConfig(config);
    };

    fetchConfig();
  }, []);

  const councils = Object.keys(councilConfig);

  return (
    <div className="logos-container">
      {councils.map((council) => {
        const { name, logo, isSelectable } = councilConfig[council];
        return (
          isSelectable == "true" && (
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

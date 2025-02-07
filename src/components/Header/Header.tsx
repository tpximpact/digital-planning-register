"use client";
import Link from "next/link";
import { Menu } from "../Menu";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AppConfig } from "@/config/types";
import { councilLogos } from "../CouncilLogos";
import "./Header.scss";
import { addCouncilToName, capitaliseWord } from "@/util";

export const Header = ({ appConfig }: { appConfig: AppConfig }) => {
  const currentPath = usePathname();
  const [isExtended, setIsExtended] = useState(false);
  const councilConfig = appConfig?.council;

  useEffect(() => {
    async function initiateMockAPI() {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        const initMocks = (await import("../../../mocks")).default;
        await initMocks();
      }
    }

    initiateMockAPI();
  }, []);

  // only show a logo if it exists and if the council config has not disabled it in the header
  let logo = null;
  if (councilConfig?.features?.logoInHeader !== false && councilConfig?.slug) {
    logo = councilLogos[councilConfig?.slug] ?? null;
  }

  return (
    <header
      role="banner"
      className={`dpr-header${isExtended ? " dpr-header--menu-open" : ""}${councilConfig ? " dpr-header--council" : ""}`}
    >
      <div className="dpr-header__container">
        {councilConfig && (
          <Link
            key={councilConfig.slug}
            className={`dpr-header__link ${logo ? " dpr-header__logo" : "dpr-header__council-name"}`}
            href={`/${councilConfig.slug}`}
            aria-label={`${councilConfig.name} Council`}
            data-council-slug={councilConfig.slug}
          >
            {logo ? (
              <>
                {logo}
                <span className="govuk-visually-hidden">
                  {councilConfig.name}
                </span>
              </>
            ) : (
              <span>
                {capitaliseWord(addCouncilToName(councilConfig.name))}
              </span>
            )}
          </Link>
        )}

        <Link href="/" className="dpr-header__link dpr-header__service-name">
          Digital Planning Register
        </Link>

        <button
          type="button"
          className="dpr-header__menu-toggle"
          aria-controls="primary-menu"
          aria-label="Open and close the primary menu"
          aria-expanded={isExtended}
          onClick={() => setIsExtended(!isExtended)}
        >
          Menu
        </button>
      </div>
      <div className="dpr-header__menu" id="primary-menu">
        <Menu
          currentPath={currentPath}
          navigation={appConfig.navigation}
          councils={appConfig.councils}
          selectedCouncil={councilConfig}
        />
      </div>
    </header>
  );
};

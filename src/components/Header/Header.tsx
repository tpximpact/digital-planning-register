"use client";
import Link from "next/link";
import { Menu } from "../Menu";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AppConfig } from "@/config/types";
import { councilLogos } from "../CouncilLogos";
import "./Header.scss";

export const Header = ({
  appConfig,
  councilConfig,
}: {
  appConfig: AppConfig;
  councilConfig?: AppConfig["council"];
}) => {
  const currentPath = usePathname();
  const [isExtended, setIsExtended] = useState(false);

  const { name } = councilConfig ? councilConfig : {};

  useEffect(() => {
    async function initiateMockAPI() {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        const initMocks = (await import("../../../mocks")).default;
        await initMocks();
      }
    }

    initiateMockAPI();
  }, []);

  return (
    <>
      <header
        role="banner"
        className="govuk-header govuk-header--full-width-border"
        data-module="govuk-header"
      >
        <div className="govuk-header__container govuk-width-container">
          {councilConfig && (
            <div className="govuk-header__logo">
              <Link
                data-testid="page-council"
                href={`/${councilConfig.slug}`}
                className="govuk-header__link govuk-header__link--homepage"
                aria-label={`${name} application search page`}
              >
                {/* todo: remove !== medway when they decide about their logo */}
                {councilLogos[councilConfig.slug] &&
                councilConfig.slug !== "medway" ? (
                  <div className="logo-container">
                    {councilLogos[councilConfig.slug]}
                    <span className="govuk-visually-hidden">{name}</span>
                  </div>
                ) : (
                  <span>{name}</span>
                )}
              </Link>
            </div>
          )}
          <Link
            data-testid="page-title"
            href="/"
            className="govuk-header__link govuk-header__service-name govuk-header__content"
            role="link"
          >
            Digital Planning Register
          </Link>
          <button
            type="button"
            className="govuk-header__menu-button govuk-js-header-toggle"
            aria-controls="navigation"
            aria-expanded={isExtended}
            onClick={() => setIsExtended(!isExtended)}
            hidden={true}
          >
            Menu
          </button>
        </div>
      </header>
      {isExtended && (
        <div className="menu" id="navigation" aria-label="Navigation Menu">
          <Menu
            currentPath={currentPath}
            navigation={appConfig.navigation}
            councils={appConfig.councils}
            selectedCouncil={councilConfig}
          />
        </div>
      )}
      <div className="menu-desktop" id="navigation-desktop">
        <Menu
          currentPath={currentPath}
          navigation={appConfig.navigation}
          councils={appConfig.councils}
          selectedCouncil={councilConfig}
        />
      </div>
    </>
  );
};

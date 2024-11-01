"use client";
import Link from "next/link";
import { Menu } from "../Menu";
import Image from "next/image";
import path from "path";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AppConfig } from "@/config/types";
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

  const { logowhite: logo, name } = councilConfig ? councilConfig : {};
  const logoPath =
    logo &&
    logo !== "" &&
    path.join(process.cwd(), "public", "images", "logos", logo);

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
                {logoPath ? (
                  <>
                    <Image
                      src={`/images/logos/${logo}`}
                      alt={`${name} Logo`}
                      width={148}
                      height={31}
                    />
                    <span className="govuk-visually-hidden">{name}</span>
                  </>
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

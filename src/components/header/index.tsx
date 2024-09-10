"use client";
import Link from "next/link";
import Menu from "../menu";
import Image from "next/image";
import { useParams } from "next/navigation";
import path from "path";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getConfig } from "@/lib/config";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const councilConfig = getConfig();
  const params = useParams();
  const currentPath = usePathname();
  const council = params?.council as string;
  const [isExtended, setIsExtended] = useState(false);

  if (typeof window !== "undefined") {
    const govUk = require("govuk-frontend");
    govUk.initAll();
  }

  const logo = councilConfig[council]?.logowhite;
  const name = councilConfig[council]?.name;
  const isShowDSN = councilConfig[council]?.isShowDSN;
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
    <header className="govuk-header" role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        {council && (
          <div className="govuk-header__logo">
            <Link
              href={`/${council}`}
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
        <div>
          <Link
            href="/"
            className="govuk-header__link govuk-header__service-name govuk-header__content"
            role="link"
          >
            Digital Planning Register
          </Link>
        </div>
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
      {isExtended && (
        <div className="menu" id="navigation" aria-label="Navigation Menu">
          <Menu
            currentPath={currentPath}
            council={name}
            isShowDSN={isShowDSN}
            councilConfig={councilConfig}
          />
        </div>
      )}
      <div className="menu-desktop" id="navigation-desktop">
        <Menu
          currentPath={currentPath}
          council={name}
          isShowDSN={isShowDSN}
          councilConfig={councilConfig}
        />
      </div>
    </header>
  );
};

export default Header;

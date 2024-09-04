"use client";
import Link from "next/link";
import Menu from "../menu";
import Image from "next/image";
import { useParams } from "next/navigation";
import config from "../../../util/config.json";
import { Config } from "@/types";
import path from "path";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  councilConfig: Config;
}

const Header = ({ councilConfig }: HeaderProps) => {
  const params = useParams();
  const currentPath = usePathname();
  const council = params?.council as string;
  const [isExtended, setIsExtended] = useState(false);

  const logo = councilConfig[council]?.logowhite;
  const name = councilConfig[council]?.name;
  const isShowDSN = councilConfig[council]?.isShowDSN;
  const logoPath =
    logo &&
    logo !== "" &&
    path.join(process.cwd(), "public", "images", "logos", logo);

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

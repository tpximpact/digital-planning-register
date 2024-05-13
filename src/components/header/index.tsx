"use client";
import Link from "next/link";
import Menu from "../menu";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { useParams } from "next/navigation";
import config from "../../../util/config.json";
import { Config } from "../../../util/type";
import path from "path";

const Header = ({ currentPath }: { currentPath: string }) => {
  const params = useParams();
  const council = params?.council as string;

  const councilConfig = config as Config;
  const logo = councilConfig[council]?.logowhite;
  const name = councilConfig[council]?.name;
  const logoPath =
    logo &&
    logo !== "" &&
    path.join(process.cwd(), "public", "images", "logos", logo);
  return (
    <header className="govuk-header" role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          {council && (
            <Link
              href={`/${council}`}
              className="govuk-header__link govuk-header__link--homepage"
            >
              {logoPath ? (
                <Image
                  src={`/images/logos/${logo}`}
                  alt={`${name} Logo`}
                  width={148}
                  height={31}
                />
              ) : (
                <span>{name}</span>
              )}
            </Link>
          )}
        </div>
        <div>
          <Link
            href="/"
            className="govuk-header__link govuk-header__service-name"
            role="link"
          >
            Digital Planning Register
          </Link>
        </div>
      </div>
      <div className="govuk-header__menu">
        <label
          htmlFor="menu-toggle"
          className="govuk-header__menu-button menu-button"
          aria-controls="navigation"
          aria-label="Toggle menu"
        >
          Menu
        </label>
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <div className="menu" id="navigation" aria-labelledby="menu-toggle">
          <Menu currentPath={currentPath} council={name} />
        </div>
      </div>
    </header>
  );
};

export default Header;

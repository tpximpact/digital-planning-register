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

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const onlyWidth = useWindowWidth();
  const params = useParams();
  const council = params.council as string;

  const councilConfig = config as Config;
  const logo = councilConfig[council].logowhite;
  const logoPath =
    logo &&
    logo !== "" &&
    path.join(process.cwd(), "public", "images", "logos", logo);

  useEffect(() => {
    onlyWidth >= 769 ? setIsOpenMenu(true) : setIsOpenMenu(false);
  }, [onlyWidth]);
  return (
    <header className="govuk-header" role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          <Link
            href="/"
            className="govuk-header__link govuk-header__link--homepage"
          >
            {logoPath ? (
              <Image
                src={`/images/logos/${logo}`}
                alt={`${councilConfig[council].name} Logo`}
                width={148}
                height={31}
              />
            ) : (
              <span>{councilConfig[council].name}</span>
            )}
          </Link>
        </div>
        <div className="govuk-header__content">
          <Link
            href="/"
            className="govuk-header__link govuk-header__service-name"
            role="link"
          >
            Planning Index
          </Link>
          <button
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            type="button"
            className="govuk-header__menu-button menu"
            aria-controls="navigation"
          >
            Menu
          </button>
        </div>
      </div>
      {isOpenMenu && <Menu />}
    </header>
  );
};

export default Header;

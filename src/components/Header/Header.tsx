/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

"use client";
import Link from "next/link";
import { Menu } from "../Menu";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AppConfig } from "@/config/types";
import { councilLogos } from "../CouncilLogos";
import "./Header.scss";
import { addCouncilToString, capitaliseWord } from "@/util";

export const Header = ({ appConfig }: { appConfig: AppConfig }) => {
  const currentPath = usePathname();
  const [isExtended, setIsExtended] = useState(false);
  const councilConfig = appConfig?.council;

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
                {capitaliseWord(addCouncilToString(councilConfig.name))}
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
          selectedCouncil={councilConfig}
        />
      </div>
    </header>
  );
};

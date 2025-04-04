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

import Link from "next/link";
import { AppConfig } from "@/config/types";
import "./Menu.scss";

interface MenuProps {
  currentPath: string;
  navigation: AppConfig["navigation"];
  selectedCouncil?: AppConfig["council"];
}

/**
 * Show menu items based on the selected council, if no selected council show the home link but visually-hidden for accessiblity purposes
 * @param param0
 * @returns
 */
export const Menu = ({
  navigation,
  currentPath,
  selectedCouncil,
}: MenuProps) => {
  return (
    <div
      className={`dpr-menu govuk-service-navigation ${selectedCouncil ? "" : "govuk-visually-hidden"}`}
      data-module="govuk-service-navigation"
    >
      <div className="govuk-width-container">
        <div className="govuk-service-navigation__container">
          <nav aria-label="Menu" className="govuk-service-navigation__wrapper">
            <ul className="govuk-service-navigation__list" id="navigation">
              {selectedCouncil && navigation ? (
                navigation.map((item, index) => {
                  const href =
                    item.councilBase && selectedCouncil?.slug
                      ? `/${encodeURIComponent(selectedCouncil.slug)}${item.href}`
                      : item.href;

                  const active = currentPath === href;

                  // use showCondition to toggle visibility
                  let visibility = item.showCondition;
                  if (
                    item?.id &&
                    selectedCouncil?.features &&
                    Object.keys(
                      selectedCouncil.features as Record<string, boolean>,
                    ).includes(item.id)
                  ) {
                    visibility = (
                      selectedCouncil.features as Record<string, boolean>
                    )[item.id];
                  }

                  // if councilBase === true then the base of the url is the council slug
                  if (item.councilBase && !selectedCouncil) {
                    visibility = false;
                  }

                  if (!visibility) {
                    return null;
                  }
                  return (
                    <li
                      key={`service-nav-${index}`}
                      className={`govuk-service-navigation__item${active ? " govuk-service-navigation__item--active" : ""}`}
                    >
                      <Link
                        className={`govuk-service-navigation__link`}
                        role="link"
                        href={href}
                        aria-current={active ? true : undefined}
                      >
                        {active ? (
                          <strong className="govuk-service-navigation__active-fallback">
                            {item.label}
                          </strong>
                        ) : (
                          item.label
                        )}
                      </Link>
                    </li>
                  );
                })
              ) : (
                <li
                  className={`govuk-service-navigation__item${currentPath === "/" ? " govuk-service-navigation__item--active" : ""}`}
                >
                  <Link
                    className={`govuk-service-navigation__link`}
                    role="link"
                    href="/"
                    aria-current={currentPath === "/" ? true : undefined}
                  >
                    {currentPath === "/" ? (
                      <strong className="govuk-service-navigation__active-fallback">
                        Home
                      </strong>
                    ) : (
                      <>Home</>
                    )}
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

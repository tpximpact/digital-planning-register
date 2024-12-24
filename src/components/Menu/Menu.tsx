import Link from "next/link";
import { AppConfig } from "@/config/types";
import "./Menu.scss";

interface MenuProps {
  currentPath: string;
  navigation: AppConfig["navigation"];
  councils: AppConfig["councils"];
  selectedCouncil?: AppConfig["council"];
}
export const Menu = ({
  navigation,
  currentPath,
  councils,
  selectedCouncil,
}: MenuProps) => {
  return (
    <div
      className="dpr-menu govuk-service-navigation"
      data-module="govuk-service-navigation"
    >
      <div className="govuk-width-container">
        <div className="govuk-service-navigation__container">
          <nav aria-label="Menu" className="govuk-service-navigation__wrapper">
            <ul className="govuk-service-navigation__list" id="navigation">
              {navigation &&
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
                })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

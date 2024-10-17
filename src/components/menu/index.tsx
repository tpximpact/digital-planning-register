import Link from "next/link";
import CouncilSelector from "../council_selector";
import { AppConfig } from "@/types";

interface MenuProps {
  currentPath: string;
  navigation: AppConfig["navigation"];
  councils: AppConfig["councils"];
  selectedCouncil?: AppConfig["council"];
}

const Menu = ({
  navigation,
  currentPath,
  councils,
  selectedCouncil,
}: MenuProps) => {
  return (
    <nav aria-label="Menu" className="govuk-header__navigation">
      <ul
        id="navigation"
        className="govuk-header__navigation-list govuk-width-container"
      >
        <li className="govuk-header__navigation-item no-space">
          <CouncilSelector
            councils={councils}
            selectedCouncil={selectedCouncil}
          />
        </li>
        {navigation.map((item, index) => {
          const href =
            item.councilBase && selectedCouncil?.slug
              ? `/${encodeURIComponent(selectedCouncil.slug)}${item.href}`
              : item.href;

          const active = currentPath === href;

          if (!item.showCondition) {
            return null;
          }
          return (
            <li
              key={`service-nav-${index}`}
              className={`govuk-header__navigation-item${active ? " current-item" : ""}`}
            >
              <Link
                className={`govuk-header__link nav-link`}
                role="link"
                href={href}
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
  );
};

export default Menu;

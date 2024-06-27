import Link from "next/link";
import CouncilSelector from "../council_selector";

const Menu = ({
  currentPath,
  council,
}: {
  currentPath: string;
  council: string;
}) => {
  return (
    <nav aria-label="Menu" className="govuk-header__navigation">
      <ul
        id="navigation"
        className="govuk-header__navigation-list govuk-width-container"
      >
        <li className="govuk-header__navigation-item no-space">
          <CouncilSelector currentPath={currentPath} />
        </li>
        {currentPath !== "/" && (
          <>
            <li
              className={`govuk-header__navigation-item ${currentPath === "/" + council?.toLowerCase() && "current-item"}`}
            >
              <Link
                className="govuk-header__link nav-link"
                href={council ? `/${council.toLowerCase()}` : "/"}
                role="link"
              >
                Application search
              </Link>
            </li>
            <li
              className={`govuk-header__navigation-item ${currentPath === "/" + council?.toLowerCase() + "/planning-process" && "current-item"}`}
            >
              <Link
                className="govuk-header__link nav-link"
                href={`/${council?.toLowerCase()}/planning-process`}
              >
                Understanding planning
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;

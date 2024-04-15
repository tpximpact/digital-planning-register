import Link from "next/link";
const Menu = () => {
  return (
    <nav aria-label="Menu" className="govuk-header__navigation">
      <ul
        id="navigation"
        className="govuk-header__navigation-list govuk-width-container"
      >
        <li className="govuk-header__navigation-item current-item">
          <Link className="govuk-header__link nav-link" href="/">
            Application search
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;

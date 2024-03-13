import Link from "next/link";

const Header = () => {

  return (
    <header className="govuk-header" role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          <Link href="/"
          >
            <span
              className="govuk-header__logotype"
            >
              <span className="govuk-header__logotype-text" role="definition">
                Camden Public Planning Index
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { Page } from "./Pagination";

export const PageItem = ({ page, link }: { page: Page; link: string }) => {
  return (
    <li
      className={`govuk-pagination__item ${page.current ? "govuk-pagination__item--current" : ""} ${page.number === -1 ? "govuk-pagination__item--ellipses" : ""}`}
    >
      {page.number === -1 ? (
        <>&sdot;&sdot;&sdot;</>
      ) : (
        <a
          className="govuk-link govuk-pagination__link"
          href={`${link}?page=${page.number}`}
          aria-label={`Page ${page.number}`}
          aria-current={page.current ? "page" : undefined}
        >
          {page.number}
        </a>
      )}
    </li>
  );
};

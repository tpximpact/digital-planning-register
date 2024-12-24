import { Pagination } from "@/components/govuk/Pagination";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ArrowLink } from "@/components/govuk/Pagination/ArrowLink";
import {
  PageItem,
  PageItemProps,
} from "@/components/govuk/Pagination/PageItem";

jest.mock("@/components/govuk/Pagination/ArrowLink", () => ({
  ArrowLink: jest.fn(() => <div>Mocked ArrowLink</div>),
}));

jest.mock("@/components/govuk/Pagination/PageItem", () => ({
  PageItem: jest.fn(() => <div>Mocked PageItem</div>),
}));

describe("Pagination", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("first page", () => {
    const pagination = {
      page: 1,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    };
    const searchParams = {
      resultsPerPage: 10,
      page: 1,
      query: "value",
    };
    const baseUrl = "search";
    const { container } = render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(container).not.toHaveClass("govuk-pagination--block");

    expect(ArrowLink).toHaveBeenCalledTimes(1);
    expect(ArrowLink).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
          page: 2,
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(4);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: 2, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });
  it("second page", () => {
    const pagination = {
      page: 2,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    };
    const searchParams = {
      resultsPerPage: 10,
      page: 2,
      query: "value",
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(5);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: 2, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 3, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });
  it("third page", () => {
    const pagination = {
      page: 3,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    };
    const searchParams = {
      resultsPerPage: 10,
      page: 3,
      query: "value",
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(6);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: 2, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 3, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 4, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });
  it("fourth page", () => {
    const pagination = {
      page: 4,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    };
    const searchParams = {
      resultsPerPage: 10,
      page: 4,
      query: "value",
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(7);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 3, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 4, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        page: { number: 5, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });
  it("fifth page", () => {
    const pagination = {
      page: 5,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    };
    const searchParams = {
      resultsPerPage: 10,
      page: 5,
      query: "value",
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(7);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 4, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 5, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        page: { number: 6, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });
  it("ninety eighth page", () => {
    const pagination = {
      page: 98,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    };
    const searchParams = {
      resultsPerPage: 10,
      page: 98,
      query: "value",
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(6);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 97, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 98, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        page: { number: 99, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });
  it("ninety ninth page", () => {
    const pagination = {
      page: 99,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    };
    const searchParams = {
      resultsPerPage: 10,
      page: 99,
      query: "value",
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(5);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 98, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 99, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });
  it("last page", () => {
    const pagination = {
      page: 100,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    };
    const searchParams = {
      resultsPerPage: 10,
      page: 100,
      query: "value",
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(1);
    expect(ArrowLink).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
          page: 99,
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(4);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 99, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        page: { number: 100, current: true },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });
  it("improbable page", () => {
    const pagination = {
      page: 0,
      from: 0,
      to: 0,
      total_pages: 100,
      results: 10,
      total_results: 1000,
    };
    const searchParams = {
      resultsPerPage: 10,
      page: 0,
      query: "value",
    };
    const baseUrl = "search";
    render(
      <Pagination
        baseUrl={baseUrl}
        pagination={pagination}
        searchParams={searchParams}
      />,
    );

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: false,
        link: expect.objectContaining({
          href: baseUrl,
          searchParams: expect.objectContaining(searchParams),
        }),
      }),
      expect.anything(),
    );

    expect(PageItem).toHaveBeenCalledTimes(3);
    expect(PageItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        page: { number: 1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        page: { number: -1, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
    expect(PageItem).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        page: { number: 100, current: false },
        link: baseUrl,
      }),
      expect.anything(),
    );
  });
  it("block page", () => {
    const prev = {
      href: "prev-page",
    };
    const next = { href: "next-page" };
    const baseUrl = "search";
    render(<Pagination baseUrl={baseUrl} prev={prev} next={next} />);

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: true,
        link: expect.objectContaining(prev),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: true,
        link: expect.objectContaining(next),
      }),
      expect.anything(),
    );

    expect(PageItem).not.toHaveBeenCalled();
  });
  it("block page with description", () => {
    const prev = {
      labelText: "Applying for a provisional lorry or bus licence",
      href: "prev-page",
      page: 1,
    };
    const next = {
      labelText: "Driver CPC part 1 test: theory",
      href: "next-page",
      page: 2,
    };
    const baseUrl = "search";
    render(<Pagination baseUrl={baseUrl} prev={prev} next={next} />);

    expect(ArrowLink).toHaveBeenCalledTimes(2);
    expect(ArrowLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "prev",
        blockLevel: true,
        link: expect.objectContaining(prev),
      }),
      expect.anything(),
    );
    expect(ArrowLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "next",
        blockLevel: true,
        link: expect.objectContaining(next),
      }),
      expect.anything(),
    );

    expect(PageItem).not.toHaveBeenCalled();
  });
});

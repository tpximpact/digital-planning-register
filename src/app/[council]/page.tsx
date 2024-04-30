"use client";
import React, { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { getApplicationsByCouncil, getApplicationById } from "../../actions";
import Link from "next/link";
import { NextIcon, PreviousIcon } from "../../../public/icons";
import { Data } from "../../../util/type";
import Form from "../../components/form";
import DesktopHeader from "../../components/desktop-header";
import NoResult from "../../components/no-results";
import {
  usePathname,
  useSearchParams,
  useRouter,
  useParams,
} from "next/navigation";

const resultsPerPage = 10;

export default function Home() {
  const [data, setData] = useState<Data[] | undefined>([]);
  const [metaData, setMetaData] = useState<any>(undefined);
  const [idReference, setIdReference] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [council, setCouncil] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const param = useParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    (async () => {
      const paramsPage = searchParams.get("page");
      const paramsSearch = searchParams.get("search");
      const pageParams: any = paramsPage ? parseInt(paramsPage) : 1;
      const council = param?.council;

      if (paramsSearch) {
        const response = await getApplicationById(
          parseInt(paramsSearch),
          council as string,
        );
        let res = response.error ? undefined : [response];
        setData(res as Data[]);
        setMetaData(undefined);
      } else {
        const response = await getApplicationsByCouncil(
          pageParams,
          resultsPerPage,
          council as string,
        );
        setData(response.data);
        setMetaData(response.metadata);
      }
      setCouncil(council as string);
      setSelectedPage(pageParams - 1);
    })();
  }, [idReference, pathname, searchParams, param?.council]);

  async function handlePageClick(event: any) {
    const response = await getApplicationsByCouncil(
      event.selected + 1,
      resultsPerPage,
      council as string,
    );
    setData(response.data);
    setMetaData(response.metadata);
    setSelectedPage(event.selected);
    router.push(
      pathname +
        "?" +
        createQueryString("page", (event.selected + 1).toString()),
    );
  }

  // in the future it should change to byReferenceNumber
  async function searchById(event: any) {
    event.preventDefault();

    const data = await getApplicationById(idReference, council as string);
    if (!data.error) {
      setData([data] as Data[]);
      setMetaData(undefined);
    } else {
      setData(undefined);
    }
    router.push(
      pathname + "?" + createQueryString("search", idReference.toString()),
    );
  }

  const preview = metaData?.page === 1 ? "" : <PreviousIcon />;
  const next = metaData?.page == metaData?.total_pages ? "" : <NextIcon />;

  return (
    <main className="govuk-main-wrapper">
      <Form
        searchById={(event: any) => searchById(event)}
        setIdReference={setIdReference}
      />
      {data && data?.length > 0 && (
        <>
          <DesktopHeader />
          <div className="govuk-grid-row responsive-table-row">
            {data?.map((application: any, index: number) => (
              <div key={index} className="item">
                <div className="govuk-grid-column-one-quarter">
                  <div className="govuk-grid-column-one-half responsive-cell">
                    <h2 className="govuk-heading-s">Application Reference</h2>
                    <p className="govuk-body test">
                      <Link
                        href={`/${council}/${application?.id}`}
                        className="govuk-link"
                      >
                        {application.reference_in_full}
                      </Link>
                    </p>
                  </div>
                  <div className="govuk-grid-column-one-half responsive-cell">
                    <h2 className="govuk-heading-s">Address</h2>
                    <p className="govuk-body">
                      {application?.site?.address_1},{" "}
                      {application?.site?.postcode}
                    </p>
                  </div>
                </div>
                <div className="govuk-grid-column-one-half">
                  <div className="govuk-grid-column-two-thirds responsive-cell">
                    <h2 className="govuk-heading-s">Description</h2>
                    <p className="govuk-body">{application.description}</p>
                  </div>
                  <div className="govuk-grid-column-one-third responsive-cell">
                    <h2 className="govuk-heading-s">Application type</h2>
                    <p className="govuk-body">
                      {application?.application_type?.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
                <div className="govuk-grid-column-one-quarter">
                  <div className="govuk-grid-column-one-half responsive-cell">
                    <h2 className="govuk-heading-s">Date submitted</h2>
                    <p className="govuk-body">
                      {application?.created_at &&
                        `${format(new Date(application?.created_at), "dd MMM yyyy")}`}
                    </p>
                  </div>
                  <div className="govuk-grid-column-one-half responsive-cell">
                    <h2 className="govuk-heading-s">Status</h2>
                    <p className="govuk-body">
                      {application?.status &&
                        application?.status.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
                <div className="govuk-grid-row responsive-table-row"></div>
              </div>
            ))}
          </div>
          <section className="pagination-section">
            {metaData?.total_pages > 1 && (
              <>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={next}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={4}
                  marginPagesDisplayed={1}
                  pageCount={metaData?.total_pages}
                  previousLabel={preview}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active-page"
                  forcePage={selectedPage}
                  renderOnZeroPageCount={null}
                />
              </>
            )}
          </section>
        </>
      )}
      {data === undefined && <NoResult />}
    </main>
  );
}

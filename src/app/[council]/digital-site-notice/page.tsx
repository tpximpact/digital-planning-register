import ApplicationMap from "@/components/application_map";
import { ApiResponse, DprSearch, SearchParams } from "@/types";
import { Metadata } from "next";
import { capitaliseWord } from "../../../../util/capitaliseWord";
import Pagination from "@/components/pagination";
import { Config } from "@/types";
import config from "../../../../util/config.json";
import NotFound from "@/app/not-found";
import { ApiP05 } from "@/actions/api";
import NoResult from "@/components/no_results";
import { getCouncilDataSource } from "@/lib/config";

const resultsPerPage = 10;

interface DigitalSiteNoticeProps {
  params: {
    council: string;
  };
  searchParams?: SearchParams;
}

async function fetchData({
  params,
  searchParams,
}: DigitalSiteNoticeProps): Promise<ApiResponse<DprSearch | null>> {
  const { council } = params;

  const page = searchParams?.page ? searchParams.page : 1;
  const tweakedSearchParams = {
    type: "dsn",
    page,
    resultsPerPage: 10,
    ...searchParams,
  };

  const response = await ApiP05.search(
    getCouncilDataSource(council),
    council,
    tweakedSearchParams,
  );

  return response;
}

export async function generateMetadata({
  params,
  searchParams,
}: DigitalSiteNoticeProps): Promise<Metadata> {
  const response = await fetchData({ params, searchParams });

  if (!response.data) {
    return {
      title: "Error",
      description: "An error occurred",
    };
  }

  return {
    title: `Digital Site Notice`,
    description: `${capitaliseWord(params.council)} planning application`,
  };
}

const DigitalSiteNotice = async ({
  params,
  searchParams,
}: DigitalSiteNoticeProps) => {
  const councilConfig = config as Config;

  const response = await fetchData({ params, searchParams });
  const page = searchParams?.page ? searchParams.page : 1;
  const applications = response?.data?.data;
  const council = params.council;

  if (response?.status?.code !== 200 || !councilConfig[council]?.isShowDSN) {
    return <NotFound params={params} />;
  }

  return (
    <div className="govuk-main-wrapper">
      <h1 className="govuk-heading-xl small-bottom-margin">
        Find digital site notices near you
      </h1>
      <p className="govuk-body grid-row-extra-bottom-margin">
        Digital site notices are created for significant planning applications
        that require public consultation. They present information differently
        to planning applications that do not require public consultation. This
        is to make it easier for you to access the information most important to
        the local community.
      </p>
      {councilConfig[council]?.pageContent?.digital_site_notice
        ?.sign_up_for_alerts_link && (
        <a
          className="govuk-button govuk-button--secondary"
          target="_blank"
          href={
            councilConfig[council]?.pageContent?.digital_site_notice
              ?.sign_up_for_alerts_link
          }
        >
          Sign up for alerts on applications near you
        </a>
      )}
      <div className="govuk-grid-row grid-row-extra-bottom-margin ">
        {applications &&
          applications?.map((application, index) => {
            const reference = application.application.reference;
            const boundary_geojson = application.property.boundary.site;
            const address = application.property.address.singleLine;

            return (
              <div key={index} className="govuk-grid-column-one-third">
                <a href={`/${council}/${reference}`}>
                  <ApplicationMap mapData={boundary_geojson} staticMap={true} />
                  <div className="govuk-link govuk-link--no-visited-state govuk-heading-m dsn-link">
                    {reference}
                  </div>
                </a>
                <span>
                  <p className="govuk-body">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="20"
                      viewBox="0 -4 10 18"
                      fill="none"
                    >
                      <path
                        d="M5 0.163574C2.24311 0.163574 0 2.40641 0 5.16357C0 9.30637 4.44743 13.198 4.63677 13.3618L5 13.6759L5.36323 13.3618C5.55257 13.198 10 9.30637 10 5.16357C10 2.40641 7.75689 0.163574 5 0.163574ZM5 12.1834C3.97054 11.189 1.11111 8.15728 1.11111 5.16357C1.11111 3.01948 2.85563 1.27469 5 1.27469C7.14437 1.27469 8.88889 3.01948 8.88889 5.16357C8.88889 8.15728 6.02946 11.189 5 12.1834Z"
                        fill="#0B0C0C"
                      ></path>
                      <path
                        d="M5 2.75854C3.89727 2.75854 3 3.65581 3 4.75854C3 5.86128 3.89727 6.75854 5 6.75854C6.10273 6.75854 7 5.86128 7 4.75854C7 3.65581 6.10273 2.75854 5 2.75854ZM5 5.95854C4.33828 5.95854 3.8 5.42026 3.8 4.75854C3.8 4.09683 4.33828 3.55854 5 3.55854C5.66172 3.55854 6.2 4.09683 6.2 4.75854C6.2 5.42026 5.66172 5.95854 5 5.95854Z"
                        fill="#0B0C0C"
                      ></path>
                    </svg>{" "}
                    {address}
                  </p>
                </span>
              </div>
            );
          })}
      </div>
      {response?.data?.data && response?.data?.data.length > 0 ? (
        <>
          {response?.data?.pagination?.total_pages > 1 && (
            <Pagination
              currentPage={page - 1}
              totalItems={
                response?.data?.pagination?.total_pages * resultsPerPage
              }
              itemsPerPage={resultsPerPage}
              totalPages={response?.data?.pagination?.total_pages}
              baseUrl={`/${council}/digital-site-notice`}
              queryParams={searchParams}
            />
          )}
        </>
      ) : (
        <NoResult council={council} />
      )}
    </div>
  );
};

export default DigitalSiteNotice;

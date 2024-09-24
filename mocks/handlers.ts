import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import { BopsPlanningApplication } from "@/types/api/bops/definitions/application";
import { generateMockApplications } from "./generateMockApplications";

// Generate mock data
const mockApplications = generateMockApplications(100);

export const handlers = [
  // Handler for searching planning applications
  http.get("*/public/planning_applications/search*", async () => {
    const response = {
      metadata: {
        page: 1,
        results: 2,
        from: 1,
        to: 1,
        total_pages: 1,
        total_results: 2,
      },
      data: mockApplications,
    };
    return HttpResponse.json(response);
  }),

  // Handler for retrieving documents for a planning application
  http.get("*/public/planning_applications/*/documents", async () => {
    const response = {
      application: mockApplications[0].application,
      files: [
        {
          name: "document1.pdf",
          url: faker.internet.url(),
          type: [
            {
              value: "elevations.proposed",
              description: "Elevations - proposed",
            },
            { value: "sections.proposed", description: "Sections - proposed" },
          ],
          createdAt: faker.date.past().toISOString(),
          applicantDescription: null,
          metadata: {
            byteSize: 123456,
            contentType: "application/pdf",
            thumbnailUrl: faker.image.urlPicsumPhotos(),
          },
        },
        {
          name: "document2.pdf",
          url: faker.internet.url(),
          type: [
            {
              value: "elevations.existing",
              description: "Elevations - existing",
            },
            { value: "sections.existing", description: "Sections - existing" },
          ],
          createdAt: faker.date.past().toISOString(),
          applicantDescription: null,
          metadata: {
            byteSize: 123456,
            contentType: "application/pdf",
            thumbnailUrl: faker.image.urlPicsumPhotos(),
          },
        },
        {
          name: "document3.pdf",
          url: faker.internet.url(),
          type: [
            {
              value: "elevations.proposed",
              description: "Elevations - proposed",
            },
            { value: "sections.proposed", description: "Sections - proposed" },
          ],
          createdAt: faker.date.past().toISOString(),
          applicantDescription: null,
          metadata: {
            byteSize: 123456,
            contentType: "application/pdf",
            thumbnailUrl: faker.image.urlPicsumPhotos(),
          },
        },
      ],
      metadata: {
        results: 1,
        totalResults: 1,
      },
      decisionNotice: {
        name: `decision-notice-${mockApplications[0].application.reference}.pdf`,
        url: faker.internet.url(),
      },
    };
    return HttpResponse.json(response);
  }),

  // Handler for creating new neighbour response
  http.post("*/planning_applications/*/neighbour_responses", async () => {
    return HttpResponse.json({
      id: mockApplications[0].application.reference,
      message: "Response submitted",
    });
  }),

  // Handler for retrieving planning applications via advanced search (the filtering happens here whilst we don't have a real API)
  http.get(
    "*/public/planning_applications/advanced-search",
    async ({ request }) => {
      const url = new URL(request.url);
      const searchParams = Object.fromEntries(url.searchParams.entries());

      console.log(searchParams, "searchParams");

      const page = parseInt(searchParams.page || "1");
      const maxresults = parseInt(searchParams.maxresults || "10");

      const searchCriteria = searchParams.q
        ? searchParams.q.split(" ").reduce(
            (acc, curr) => {
              const [key, value] = curr.split(":");
              acc[key] = value;
              return acc;
            },
            {} as Record<string, string>,
          )
        : {};

      console.log(searchCriteria, "parsed search criteria");
      console.log(mockApplications, "mockApplications");

      let filteredApplications = mockApplications.filter(
        (app: BopsPlanningApplication) => {
          // Reference
          if (
            searchCriteria.reference &&
            !app.application.reference
              .toLowerCase()
              .includes(searchCriteria.reference.toLowerCase())
          ) {
            return false;
          }

          // Address
          if (
            searchCriteria.address &&
            !app.property.address.singleLine
              .toLowerCase()
              .includes(searchCriteria.address.toLowerCase())
          ) {
            return false;
          }

          // Postcode
          if (
            searchCriteria.postcode &&
            !app.property.address.postcode
              .toLowerCase()
              .includes(searchCriteria.postcode.toLowerCase())
          ) {
            return false;
          }

          // Description
          if (
            searchCriteria.description &&
            !app.proposal.description
              .toLowerCase()
              .includes(searchCriteria.description.toLowerCase())
          ) {
            return false;
          }
          return true;
        },
      );

      // Pagination
      const startIndex = (page - 1) * maxresults;
      const paginatedResults = filteredApplications.slice(
        startIndex,
        startIndex + maxresults,
      );

      const response = {
        status: { code: 200, message: "Success" },
        data: paginatedResults,
        metadata: {
          page,
          results: paginatedResults.length,
          from: startIndex + 1,
          to: startIndex + paginatedResults.length,
          total_pages: Math.ceil(filteredApplications.length / maxresults),
          total_results: filteredApplications.length,
        },
      };

      return HttpResponse.json(response);
    },
  ),

  http.get("*/public/planning_applications/*", async () => {
    return HttpResponse.json(mockApplications[0]);
  }),

  // Handler for retrieving a private planning application
  http.get("*/planning_applications/*", async () => {
    const app = mockApplications[0];
    return HttpResponse.json({
      ...app.application,
      ...app.property,
      ...app.proposal,
      ...app.digitalSiteNotice,
      agent_first_name: faker.person.firstName(),
      agent_last_name: faker.person.lastName(),
      agent_phone: faker.phone.number(),
      agent_email: faker.internet.email(),
      applicant_first_name: faker.person.firstName(),
      applicant_last_name: faker.person.lastName(),
      user_role: "agent",
      make_public: true,
    });
  }),
];

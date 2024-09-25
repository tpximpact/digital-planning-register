import { getConfig, getCouncilConfig } from "@/lib/config";
import { da } from "@faker-js/faker";
import { createSwaggerSpec } from "next-swagger-doc";

export async function getApiDocs() {
  const config = await getConfig();
  const councilList = Object.keys(config);
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: "src/api",
    definition: {
      openapi: "3.0.1",
      info: {
        title: 'Council public index "API"',
        version: "1.0",
        description: `<p>Our "API" is a series of server actions that return data from various sources into a format that is ODP schema compliant.</p>
          <p>This document is intended for <strong>development purposes only</strong>. Some of the endpoints we're connecting to can return sensitive data and as such we should not be exposing any data on the frontend. </p>
          <p>Currently we have two data sources each with their own data handler in <code>/src/api/handlers</code></p>
          <ul>
            <li><strong>local</strong></li>
            <li><strong>bops</strong></li>
          </ul>
          <p>On this page we document how to use the "API" (server actions) and what data they and the handlers return, using tags to group the server actions by feature. With this method we should be able to document and keep track of requested changes to the schema by BOPS whilst separating the frontend from the concerns of the backend.</p>`,
      },
      externalDocs: {
        description: "View server action outputs here",
        url: "http://localhost:3000/api/docs",
      },
      tags: [
        // {
        //   name: "Alpha",
        //   description: "Early, unstable, feature-incomplete (v1.0.0-alpha).",
        // },
        // {
        //   name: "Beta",
        //   description:
        //     "Feature-complete, more stable, still testing (v1.0.0-beta).",
        // },
        // {
        //   name: "Stable",
        //   description: "Fully tested, production-ready (v1.0.0).",
        // },
        // {
        //   name: "Release Candidate",
        //   description: "Final testing, almost stable (v1.0.0-rc).",
        // },
        // {
        //   name: "Experimental",
        //   description:
        //     "Testing new ideas or features, highly unstable (v1.0.0-experimental).",
        // },
        // {
        //   name: "Pending",
        //   description:
        //     "Waiting on another feature or dependency upgrade (v1.0.0-pending).",
        // },
        // {
        //   name: "Deprecated",
        //   description:
        //     "Outdated and will be removed in future releases (v1.0.0-deprecated).",
        // },
        // {
        //   name: "Hotfix",
        //   description: "Immediate fix for a critical issue (v1.0.1-hotfix).",
        // },

        {
          name: "ApiV1",
          description: "DPR ApiV1",
        },
        {
          name: "P01 Comment Submission",
          description: "DPR P01 - comment submission requirements DSNPI-448",
        },
      ],
      components: {
        schemas: {
          ApplicationSubmission: {
            type: "object",
            properties: {},
          },
          Documents: {
            type: "object",
            properties: {},
          },
          ApiError: {
            type: "object",
            properties: {
              data: {
                type: "string",
                defaultValue: null,
                example: null,
                nullable: true,
                required: true,
              },
              status: {
                properties: {
                  code: {
                    type: "integer",
                    format: "int32",
                    defaultValue: 400,
                    example: 400,
                    required: true,
                  },
                  message: {
                    type: "string",
                    defaultValue: "Bad request",
                    example: "Bad request",
                    required: true,
                  },
                  detail: {
                    type: "string",
                    defaultValue: "Invalid source",
                    example: "Invalid source",
                  },
                },
              },
            },
          },
        },
        parameters: {
          council: {
            name: "council",
            in: "query",
            required: false,
            schema: {
              type: "string",
              default: "camden",
              enum: councilList,
            },
          },
          source: {
            name: "source",
            in: "query",
            required: false,
            schema: {
              type: "string",
              default: "bops",
              enum: ["local", "bops"],
            },
          },
          reference: {
            name: "reference",
            in: "query",
            required: true,
            schema: {
              type: "string",
              example: "24-00128-PA1A",
            },
          },
          page: {
            name: "page",
            in: "query",
            required: false,
            schema: {
              type: "integer",
              default: 1,
            },
          },
          resultsPerPage: {
            name: "resultsPerPage",
            in: "query",
            required: false,
            schema: {
              type: "integer",
              default: 10,
            },
          },
          searchQuery: {
            name: "searchQuery",
            in: "query",
            required: false,
            schema: {
              type: "string",
            },
          },
          id: {
            name: "id",
            in: "query",
            required: true,
            schema: {
              type: "integer",
            },
          },
          // skipParam: {
          //   name: "skip",
          //   in: "query",
          //   description: "number of items to skip",
          //   required: true,
          //   schema: {
          //     type: "integer",
          //     format: "int32",
          //   },
          // },
          // limitParam: {
          //   name: "limit",
          //   in: "query",
          //   description: "max records to return",
          //   required: true,
          //   schema: {
          //     type: "integer",
          //     format: "int32",
          //   },
          // },
        },
        responses: {
          ApiError: {
            description: "Api Error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApiError",
                },
              },
            },
          },
          ApplicationSubmission: {
            description: "ApplicationSubmission",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ApplicationSubmission",
                },
              },
            },
          },
          Documents: {
            description: "Documents",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Documents",
                },
              },
            },
          },
        },
        securitySchemes: {
          // @todo only we need this api
          // api_key: {
          //   type: "apiKey",
          //   name: "api_key",
          //   in: "header",
          // },
        },
      },
    },
  });

  return spec;
}

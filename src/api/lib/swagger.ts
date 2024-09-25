import { createSwaggerSpec } from "next-swagger-doc";

export async function getApiDocs() {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: "src/api",
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Council public index API",
        version: "1.0",
        description: `The page documents the 'API's that we use to get data from BOPS and local data sources, and in the future Uniform and anything else
          
          @TODO: Finish documenting the API's and endpoints
          @TODO: Change application over to use the new API's
          @TODO: Update types to use those from odp repo
          @TODO: Validate our schema against ODP and BOPS's schema
          @TODO: Decide on a naming convention for our API's and endpoints especially features
          @TODO: Generate local endpoint data or import from BOPs examples
          @TODO: In development mode show the data from serverActions in swagger
          
          `,
      },
      externalDocs: {
        description: "View server action outputs here",
        url: "http://localhost:3000/api/docs",
      },
      tags: [
        {
          name: "V1",
          description: "DPR v1, uses mostly public endpoints at the moment",
        },
        {
          name: "P01",
          description: "DPR P01 - comment submission requirements DSNPI-448",
        },
        {
          name: "P05",
          description: "DPR P05 - advanced search DSNPI-423 ",
        },
      ],
      components: {
        schemas: {
          // GeneralError: {
          //   type: "object",
          //   properties: {
          //     code: {
          //       type: "integer",
          //       format: "int32",
          //     },
          //     message: {
          //       type: "string",
          //     },
          //   },
          // },
          // Category: {
          //   type: "object",
          //   properties: {
          //     id: {
          //       type: "integer",
          //       format: "int64",
          //     },
          //     name: {
          //       type: "string",
          //     },
          //   },
          // },
          // Tag: {
          //   type: "object",
          //   properties: {
          //     id: {
          //       type: "integer",
          //       format: "int64",
          //     },
          //     name: {
          //       type: "string",
          //     },
          //   },
          // },
        },
        parameters: {
          council: {
            name: "X-Council",
            in: "header",
            required: false,
            schema: {
              type: "string",
            },
          },
          source: {
            name: "X-Data-Source",
            in: "header",
            required: false,
            schema: {
              type: "string",
              default: "local",
              enum: ["local", "bops"],
            },
          },
          reference: {
            name: "reference",
            in: "query",
            required: true,
            schema: {
              type: "string",
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
          search: {
            name: "search",
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
          // NotFound: {
          //   description: "Entity not found.",
          // },
          // IllegalInput: {
          //   description: "Illegal input for operation.",
          // },
          // GeneralError: {
          //   description: "General Error",
          //   content: {
          //     "application/json": {
          //       schema: {
          //         $ref: "#/components/schemas/GeneralError",
          //       },
          //     },
          //   },
          // },
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

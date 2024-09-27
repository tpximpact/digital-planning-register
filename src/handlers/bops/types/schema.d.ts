/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/api/v2/ping": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Returns a healthcheck */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description with valid swagger credentials */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Healthcheck"];
          };
        };
        /** @description with a token from another api user */
        401: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["UnauthorizedError"];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v2/planning_applications": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieves planning applications */
    get: {
      parameters: {
        query?: {
          page?: number;
          maxresults?: number;
          "ids[]"?: number[];
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description returns planning applications with given ids */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
        /** @description with missing or invalid credentials */
        401: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["UnauthorizedError"];
          };
        };
      };
    };
    put?: never;
    /** Creates a new plannning application */
    post: {
      parameters: {
        query?: {
          send_email?: "true" | "false";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: {
        content: {
          "application/json": components["schemas"]["Submission"];
        };
      };
      responses: {
        /** @description with a valid request */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["SubmissionResponse"];
          };
        };
        /** @description with an invalid request */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["BadRequestError"];
          };
        };
        /** @description with a token from another api user */
        401: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["UnauthorizedError"];
          };
        };
        /** @description when the endpoint is disabled */
        403: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["ForbiddenError"];
          };
        };
        /** @description when a local authority isn't found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["NotFoundError"];
          };
        };
        /** @description when an application is invalid */
        422: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["UnprocessableEntityError"];
          };
        };
        /** @description when an internal server error occurs */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["InternalServerError"];
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v2/planning_applications/determined": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieves determined planning applications */
    get: {
      parameters: {
        query?: {
          page?: number;
          maxresults?: number;
          "ids[]"?: number[];
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description returns determined planning applications with given ids */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v2/planning_applications/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieves a planning application */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          id: string | number;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description returns a planning application given a reference */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
        /** @description when no planning application can be found */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["NotFoundError"];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v2/planning_applications/{reference}/submission": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieves the planning application submission given a reference */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          reference: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description returns planning application submission when searching by the reference */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["ApplicationSubmission"];
          };
        };
        /** @description with missing or invalid credentials */
        401: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["UnauthorizedError"];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v2/planning_applications/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieves planning applications based on a search criteria */
    get: {
      parameters: {
        query?: {
          page?: number;
          maxresults?: number;
          q?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description returns planning applications when searching by a reference or description */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Search"];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v2/public/planning_applications/{reference}/documents": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieves documents for a planning application */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          reference: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description returns a planning application's documents and decision notice given a reference */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Documents"];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v2/public/planning_applications/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieves planning applications based on a search criteria */
    get: {
      parameters: {
        query?: {
          page?: number;
          maxresults?: number;
          q?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description returns planning applications when searching by a reference or description */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["Search"];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/v2/public/planning_applications/{reference}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieves a planning application */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          reference: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description returns a planning application given a reference */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    Submission: {
      data: {
        applicant: components["definitions"]["Applicant"];
        application: components["definitions"]["Application"];
        files?: components["definitions"]["FilesAsData"];
        property: components["definitions"]["Property"];
        proposal: components["definitions"]["Proposal"];
        user: components["definitions"]["User"];
      };
      files: components["definitions"]["File"][];
      metadata: components["definitions"]["Metadata"];
      preAssessment?: components["definitions"]["PreAssessment"];
      responses: components["definitions"]["Responses"];
    };
    SubmissionResponse: {
      id: string;
      message: string;
    };
    Search: {
      metadata: {
        page: number;
        results: number;
        from: number;
        to: number;
        total_pages: number;
        total_results: number;
      };
      links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
      };
      data: [
        {
          application: components["definitions"]["ApplicationOverview"];
          property: {
            address: {
              latitude: number;
              longitude: number;
              title: string;
              singleLine: string;
              uprn: string;
              town: string;
              postcode: string;
            };
            boundary:
              | {
                  site: {
                    type: string;
                    geometry: {
                      type: string;
                      coordinates: [[[number, number]]];
                    };
                    properties: Record<string, never> | null;
                  };
                }
              | {
                  site: {
                    type: string;
                    features: {
                      type: string;
                      geometry: {
                        type: string;
                        coordinates: [[[number, number]]];
                      };
                      properties: Record<string, never> | null;
                    }[];
                  };
                };
          };
          proposal: {
            description: string;
          };
          applicant: {
            address: components["definitions"]["Address"] | null;
            agent: {
              address?: components["definitions"]["Address"] | null;
            } | null;
            ownership: components["definitions"]["Ownership"] | null;
            type: string | null;
          };
        },
      ];
    };
    ApplicationSubmission: {
      application: components["definitions"]["ApplicationOverview"];
      submission: {
        data: Record<string, never>;
        preAssessment?: unknown[];
        responses?: unknown[];
        files?: unknown[];
        metadata: Record<string, never>;
      } | null;
    };
    Documents: {
      metadata: {
        results: number;
        totalResults: number;
      };
      application: components["definitions"]["ApplicationOverview"];
      files: [
        {
          name: string;
          /** Format: url */
          url: string;
          type: {
            value: string;
            description: string;
          }[];
          /** Format: datetime */
          createdAt?: string | null;
          applicantDescription?: string | null;
          metadata: {
            byteSize: number;
            contentType: string;
          };
        },
      ];
      decisionNotice?: {
        name: string;
        url: string;
      };
    };
    Healthcheck: {
      /** @constant */
      message: "OK";
      /** Format: date-time */
      timestamp: string;
    };
    BadRequestError: {
      error: {
        /** @constant */
        code: 400;
        /** @constant */
        message: "Bad Request";
        detail?: string;
      };
    };
    UnauthorizedError: {
      error: {
        /** @constant */
        code: 401;
        /** @constant */
        message: "Unauthorized";
      };
    };
    ForbiddenError: {
      error: {
        /** @constant */
        code: 403;
        /** @constant */
        message: "Forbidden";
        detail?: string;
      };
    };
    NotFoundError: {
      error: {
        /** @constant */
        code: 404;
        /** @constant */
        message: "Not found";
        detail?: string;
      };
    };
    UnprocessableEntityError: {
      error: {
        /** @constant */
        code: 422;
        /** @constant */
        message: "Unprocessable Entity";
        detail?: string;
      };
    };
    InternalServerError: {
      error: {
        /** @constant */
        code: 500;
        /** @constant */
        message: "Internal Server Error";
        detail?: string;
      };
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;

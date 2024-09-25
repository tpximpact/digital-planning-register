export type dataSource = "local" | "bops";

/**
 * API response type
 * Standardises what we expect to be returned as BOPS either gives us data or an error
 */
export interface ApiResponse<T> {
  data: T | null;
  status?: {
    code: number;
    message: string;
    detail?: string;
  };
}

export interface SearchParams {
  query?: string;
  type?: "dsn";
  page: number;
  resultsPerPage: number;
}

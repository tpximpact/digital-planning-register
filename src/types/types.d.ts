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
  page: number;
  resultsPerPage: number;
  /**
   * beginning of advanced search P05
   * also used for comments filtering
   */
  type?: string;
}

/**
 * Pagination definition
 */
export interface DprPaginationBase {
  results: number;
  total_results: number;
}

export interface DprPagination extends DprPaginationBase {
  page: number;
  from: number;
  to: number;
  total_pages: number;
}

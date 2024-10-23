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

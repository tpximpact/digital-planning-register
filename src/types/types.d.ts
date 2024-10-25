/**
 * API response type
 * Standardises what we expect to be returned as BOPS either gives us data or an error
 */
export interface ApiResponse<T> {
  /**
   * The data returned from the API
   */
  data?: T;
  /**
   * Pagination information returned from the API (if relevant)
   */
  pagination?: {
    /**
     * The current page number
     */
    currentPage: number;
    /**
     * The total number of pages
     */
    totalPages: number;
    /**
     * The number of items per page
     */
    itemsPerPage: number;
    /**
     * The total number of items
     */
    totalItems: number;
  };
  /**
   * Any status information returned from the API
   */
  status?: {
    code: number;
    message: string;
    detail?: string;
  };
}

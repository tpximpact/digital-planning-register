/**
 * What our comments look like
 */
export interface DprComment {
  comment: string;
  /**
   * @todo Need to standardise date formats
   * Comes from bops as Tue Feb 20 2024 20:46:30 GMT+0000 (Greenwich Mean Time)
   */
  received_at: string;
  sentiment?: string;
}

export type DprCommentTypes = "consultee" | "published";

export interface BopsComment {
  comment: string;
  receivedAt: string;
  summaryTag?: string;
}

/**
 * Another one that goes along with the soon to be deprecated endpoint
 * @deprecated
 */
interface BopsNonStandardComment {
  comment: string;
  received_at: string;
  summary_tag?: string;
}

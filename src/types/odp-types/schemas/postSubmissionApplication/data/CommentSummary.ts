/**
 * Shows the summary of comments on a submission
 */

interface CommentSummaryBase {
  /**
   * How many comments have there been
   */
  totalComments: number;
  /**
   * Comment numbet broken down by sentiment count
   */

}

/**
 * @id #PublicCommentsSummary
 */
export interface PublicCommentSummary extends CommentSummaryBase {
  sentiment: {
    supportive: number;
    objection: number;
    neutral: number;
  };
};

/**
 * @id #SpecialistCommentsSummary
 */
export interface SpecialistCommentSummary extends CommentSummaryBase {
  /**
   * The total number of specialists consulted
   */
  totalConsulted: number;
  sentiment: {
    approved: number;
    amendmentsNeeded: number;
    objected: number;
  };
}

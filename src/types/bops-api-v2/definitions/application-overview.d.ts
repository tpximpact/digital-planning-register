/**
 * #/components/definitions/ApplicationOverview
 * https://camden.bops-staging.services/api/docs/v2/swagger_doc.yaml
 */
export interface ApplicationOverview {
  type: {
    value: string;
    description: string;
  };
  reference: string;
  fullReference: string;
  targetDate?: string | null;
  receivedAt: string;
  validAt: string | null;
  publishedAt?: string | null;
  determinedAt?: string | null;
  status: string;
  decision?: string | null;
  consultation: {
    startDate: string | null;
    endDate: string | null;
    publicUrl?: string | null;
    publishedComments?: {
      comment: string;
      receivedAt: string;
      summaryTag: string;
    }[];
    consulteeComments?: {
      comment: string;
      receivedAt: string;
    }[];
  };
}

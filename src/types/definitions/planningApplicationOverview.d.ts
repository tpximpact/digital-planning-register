import { DprComment } from "./comments";
import { DprDocument } from "./document";

export interface DprPlanningApplicationOverview {
  reference: string;
  type: {
    description: string;
  };
  status: string;
  consultation: {
    endDate: string | null;
    /**
     * NB: These are only included in BOPS details call not search one
     */
    publishedComments: DprComment[] | null;
    /**
     * NB: These are only included in BOPS details call not search one
     */
    consulteeComments: DprComment[] | null;
  };
  receivedAt: string;
  publishedAt?: string | null;
  determinedAt?: string | null;
  decision?: string | null;
  validAt: string | null;

  /**
   * @todo this is missing from the public BOPS response
   */
  id: number;
  /**
   * @todo this is missing from the public BOPS response
   */
  applicant_first_name: string;
  /**
   * @todo this is missing from the public BOPS response
   */
  applicant_last_name: string;
  /**
   * @todo this is missing from the public BOPS response
   */
  agent_first_name: string;
  /**
   * @todo this is missing from the public BOPS response
   */
  agent_last_name: string;

  /**
   * @todo this is missing from the public BOPS response BUT we have a new public endpoint for them
   */
  documents: DprDocument[] | null;
}

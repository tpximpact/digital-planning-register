/**
 * Config file definition
 * @todo this can be simplified
 */

export interface SiteConfig {
  /**
   * If this is true then show documents from the public documents endpoint (which includes site notices)
   */
  documentsPublicEndpoint: boolean;
}

export type CouncilVisibility = "public" | "private" | "unlisted";
export interface Council {
  name: string;
  contact?: string;
  logo?: string;
  logowhite?: string;
  dataSource: string;
  publicComments: boolean;
  specialistComments: boolean;
  pageContent?: PageContent;
  visibility: CouncilVisibility;
  isShowDSN?: boolean;
}

export interface Config {
  [key: string]: Council;
}

interface PageContentLinks {
  what_happens_to_your_comments_link?: string;
  contact_planning_advice_link?: string;
  corporate_privacy_statement_link?: string;
  planning_service_privacy_statement_link?: string;
  privacy_policy_link?: string;
  sign_up_for_alerts_link?: string;
}

interface PageContent {
  council_reference_submit_comment_pre_submission?: PageContentLinks;
  council_reference_submit_comment_personal_details?: PageContentLinks;
  council_reference_submit_comment_check_answer?: PageContentLinks;
  privacy_policy?: PageContentLinks;
  digital_site_notice?: PageContentLinks;
}

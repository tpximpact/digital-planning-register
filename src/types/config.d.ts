export interface Council {
  name: string;
  contact?: string;
  logo?: string;
  logowhite?: string;
  publicComments?: boolean;
  specialistComments?: boolean;
  pageContent?: PageContent;
}

export interface Config {
  [key: string]: Council;
}

interface PageContentLinks {
  what_happens_to_your_comments_link?: string;
  contact_planning_advice_link?: string;
  corporate_privacy_statement_link?: string;
  planning_service_privacy_statement_link?: string;
}

interface PageContent {
  council_reference_submit_comment_pre_submission?: PageContentLinks;
  council_reference_submit_comment_personal_details?: PageContentLinks;
  council_reference_submit_comment_check_answer?: PageContentLinks;
}

export interface AppConfig {
  features: {
    documentsPublicEndpoint: boolean;
  };
  /**
   * All the council configuration options
   */
  councils: Council[];
  /**
   * Current council configuration - this way we can pass AppConfig and use AppConfig.council in components
   */
  council?: Council;
  /**
   * Default settings for the application
   */
  defaults: {
    /**
     * Default results per page value
     */
    resultsPerPage: number;
  };
  /**
   * Navigation links
   */
  navigation: {
    label: string;
    href: string;
    /**
     * The condition that must be met for the link to be shown
     */
    showCondition: boolean;
    /**
     * Whether the link is based on the council slug
     */
    councilBase: boolean;
  }[];
}

export type CouncilVisibility = "public" | "private" | "unlisted";

export interface Council {
  name: string;
  slug: string;
  visibility: CouncilVisibility;
  dataSource: string;
  publicComments: boolean;
  specialistComments: boolean;
  isShowDSN?: boolean;
  contact?: string;
  logo?: string;
  logowhite?: string;
  pageContent: {
    privacy_policy: {
      privacy_policy_link: string;
    };
    council_reference_submit_comment_pre_submission?: {
      what_happens_to_your_comments_link: string;
    };
    council_reference_submit_comment_personal_details?: {
      contact_planning_advice_link: string;
      corporate_privacy_statement_link: string;
      planning_service_privacy_statement_link: string;
    };
    council_reference_submit_comment_check_answer?: {
      contact_planning_advice_link: string;
      corporate_privacy_statement_link: string;
      planning_service_privacy_statement_link: string;
    };
    digital_site_notice?: {
      sign_up_for_alerts_link: string;
    };
  };
}

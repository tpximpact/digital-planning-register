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
  council?: Council | null;
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

type CouncilVisibility = "public" | "private" | "unlisted";

export interface Council {
  name: string;
  slug: string;
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

/*
 * This file is part of the Digital Planning Register project.
 *
 * Digital Planning Register is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Digital Planning Register is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Digital Planning Register. If not, see <https://www.gnu.org/licenses/>.
 */

export interface AppConfig {
  features?: {
    /**
     * Set this to true to fetch id from the BOPs private endpoint for submitting comments
     */
    getApplicationIdFromPrivateEndpoint: boolean;

    /**
     * This is set to the OS_MAP_PROXY_URL environment variable
     * This is done so that we don't need to provide OS_MAP_PROXY_URL at build time so the map component can access it
     */
    osMapProxyUrl?: string | undefined;

    /**
     * Array of document filtering options that are enabled
     * This is used to disable certain filtering options in the document search until we have support for them
     */
    documentSearchFields?: string[];

    /**
     * Array of comment filtering options that are enabled
     * This is used to disable certain filtering options in the document search until we have support for them
     */
    commentSearchFields?: string[];

    /**
     * Array of application filtering options that are enabled
     * This is used to disable certain filtering options in the document search until we have support for them
     */
    applicationSearchFields?: string[];

    /**
     * Array of specialist filtering options that are enabled
     * This is used to disable certain filtering options in the document search until we have support for them
     */
    specialistSearchFields?: string[];
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
    /**
     * Default revalidate value
     */
    revalidate: number;
  };
  /**
   * Navigation links
   */
  navigation: {
    label: string;
    href: string;
    /**
     * Whether the link is based on the council slug
     */
    councilBase: boolean;
    /**
     * Whether or not the link should be shown (can be overridden by id)
     */
    showCondition: boolean;
    /**
     * id to check councilConfig for to determine visibility
     */
    id?: string;
  }[];
}

export type CouncilVisibility = "public" | "private" | "unlisted";

export type CouncilDataSource = "bops" | "local";

export type CouncilDataSourceExtended =
  | CouncilDataSource
  | "appConfig"
  | "none";

export interface Council {
  name: string;
  slug: string;
  visibility: CouncilVisibility;
  dataSource: CouncilDataSource;
  publicComments: boolean;
  specialistComments: boolean;
  contact?: string;
  features?: {
    logoInHeader?: boolean;
    alertsAllApplications?: boolean;
    alertsApplication?: boolean;
  };
  currentLiveRegister?: string;
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
    email_alerts?: {
      sign_up_for_alerts_link: string;
    };
    help?: {
      planning_process?: {
        council_local_plan_link: string;
      };
      concerns?: {
        parking_link?: string;
        building_control_link?: string;
        housing_repair_link?: string;
        street_issues_link?: string;
        abandoned_vehicles_link?: string;
        fly_tipping_link?: string;
        noise_link?: string;
        licensing_link?: string;
        apply_for_building_control_regularisation_link?: string;
      };
    };
  };
}

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

import {
  applicationSearchFields,
  commentSearchFields,
  documentSearchFields,
} from "@/config/featureFlag";
import { AppConfig, Council } from "@/config/types";
import { slugify } from "@/util";

/**
 * Test councils
 * Use these alongside these env vars to test different council visibility
 *
 * PUBLIC_OVERWRITTEN_BOPS_API_KEY=BLAH
 * PUBLIC_OVERWRITTEN_BOPS_API_URL=BLAH
 * PUBLIC_OVERWRITTEN_VISIBILITY=private
 *
 * # keep commented out - leaving here for reference
 * #PUBLIC_NO_BOPS_ENV_VARS_BOPS_API_KEY=BLAH
 * #PUBLIC_NO_BOPS_ENV_VARS_BOPS_API_URL=BLAH
 *
 * PUBLIC_COUNCIL_1_BOPS_API_KEY=blah
 * PUBLIC_COUNCIL_1_BOPS_API_URL=blah
 *
 * PUBLIC_COUNCIL_2_BOPS_API_KEY=blah
 * PUBLIC_COUNCIL_2_BOPS_API_URL=blah
 *
 * UNLISTED_COUNCIL_1_BOPS_API_KEY=blah
 * UNLISTED_COUNCIL_1_BOPS_API_URL=blah
 *
 * UNLISTED_COUNCIL_2_BOPS_API_KEY=blah
 * UNLISTED_COUNCIL_2_BOPS_API_URL=blah
 *
 * PRIVATE_COUNCIL_1_BOPS_API_KEY=blah
 * PRIVATE_COUNCIL_1_BOPS_API_URL=blah
 *
 * PRIVATE_COUNCIL_2_BOPS_API_KEY=blah
 * PRIVATE_COUNCIL_2_BOPS_API_URL=blah
 *
 * This will give you a public, private and unlisted council
 * It will also give you a public council with visibility overwritten (public overwritten)
 * It will also give you a public council with no bops env vars (public no bops env vars) that is set to public in the config but which should then default to private
 *
 */

/**
 * Creates a default application configuration object
 *
 * @returns {AppConfig} - The application configuration object.
 *
 * @example
 * // Create a default configuration
 * const config = createAppConfig();
 *
 */
export const createAppConfig = (council?: string): AppConfig => {
  const councilConfigs = getDefaultCouncilConfigs();
  const validCouncils = councilConfigs
    .map(
      (council) =>
        council.slug ?? council.name.toLowerCase().split(" ").join("-"),
    )
    .filter(Boolean);
  if (council && !validCouncils.includes(council)) {
    council = undefined;
  }

  const getCouncil = (councilSlug: string): Council | undefined => {
    return (
      councilConfigs.find(
        (councilConfig) => councilConfig.slug === councilSlug,
      ) ?? undefined
    );
  };

  return {
    council: council ? getCouncil(council) : undefined,
    councils: councilConfigs,
    features: {
      getApplicationIdFromPrivateEndpoint: true,
      documentSearchFields: documentSearchFields
        ? documentSearchFields
        : undefined,
      commentSearchFields: commentSearchFields
        ? commentSearchFields
        : undefined,
      applicationSearchFields: applicationSearchFields
        ? applicationSearchFields
        : undefined,
    },
    defaults: {
      resultsPerPage: 10,
      revalidate: 3600,
    },
    navigation: [
      {
        label: "Application search",
        href: "",
        showCondition: true,
        councilBase: true,
      },
      {
        label: "Help",
        href: "/help",
        showCondition: true,
        councilBase: true,
      },
    ],
  };
};

/**
 * Creates a council configuration object.
 *
 * @param {string} councilName - The name of the council.
 * @param {Council["visibility"]} [visibility] - The visibility of the council (public or private).
 * @param {Council["dataSource"]} [dataSource] - The data source for the council.
 * @param {Council["publicComments"]} [publicComments] - Whether public comments are allowed.
 * @param {Council["specialistComments"]} [specialistComments] - Whether specialist comments are allowed.
 * @param {Council["pageContent"]} [pageContent] - The page content for the council.
 * @returns {Council} - The council configuration object.
 *
 * @example
 * // Create a council configuration with default values
 * const councilConfig = createCouncilConfig("Council 1");
 *
 * @example
 * // Create a council configuration with custom values
 * const councilConfig = createCouncilConfig("Council 1", "private", "customSource", false, false, { privacy_policy: { privacy_policy_link: "custom-link" } });
 */
export const createCouncilConfig = ({
  councilName,
  visibility = "public",
  dataSource = "local",
  publicComments = true,
  specialistComments = true,
  pageContent,
  features,
  contact,
  currentLiveRegister,
}: {
  councilName: string;
  visibility?: Council["visibility"];
  dataSource?: Council["dataSource"];
  publicComments?: Council["publicComments"];
  specialistComments?: Council["specialistComments"];
  pageContent?: Council["pageContent"];
  features?: Council["features"];
  currentLiveRegister?: Council["currentLiveRegister"];
  contact?: Council["contact"];
}): Council => {
  const slug = slugify(councilName);
  const defaultPageContent = {
    privacy_policy: {
      privacy_policy_link: `${slug}-privacy-policy-link`,
    },
  };
  return {
    name: councilName,
    slug: slug,
    visibility,
    dataSource,
    publicComments,
    specialistComments,
    pageContent: pageContent ?? defaultPageContent,
    features,
    contact,
    currentLiveRegister,
  };
};

/**
 * Return all council configs - applies any filtering based on environment variables
 * @returns Council[]
 */
const getDefaultCouncilConfigs = (): Council[] => {
  return defaultCouncils;
};

const defaultCouncils: Council[] = [
  createCouncilConfig({
    councilName: "Public Council 1",
    visibility: "public",
    features: {},
  }),
  createCouncilConfig({
    councilName: "Public Council 2",
    visibility: "public",
    features: {
      logoInHeader: false,
    },
  }),
  createCouncilConfig({
    councilName: "Unlisted Council 1",
    visibility: "unlisted",
  }),
  createCouncilConfig({
    councilName: "Unlisted Council 2",
    visibility: "unlisted",
  }),
  createCouncilConfig({
    councilName: "Private Council 1",
    visibility: "private",
  }),
  createCouncilConfig({
    councilName: "Private Council 2",
    visibility: "private",
  }),
  createCouncilConfig({
    councilName: "Public overwritten",
    visibility: "public",
  }),
  createCouncilConfig({
    councilName: "Public no bops env vars",
    visibility: "public",
    dataSource: "bops",
  }),
];

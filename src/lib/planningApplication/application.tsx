import { DprApplication } from "@/types";
import { OSAddress, ProposedAddress } from "@/types/odp-types/shared/Addresses";

/**
 * Helper method to get the address for an application
 * @param address
 * @returns
 */
export const getPropertyAddress = (
  address: DprApplication["submission"]["data"]["property"]["address"],
) => {
  if (!address) {
    return undefined;
  }

  if ("singleLine" in address && address.singleLine) {
    return address.singleLine;
  }

  if ("title" in address && address.title) {
    return address.title;
  }

  return undefined;
};

/**
 * Helper method to get lat and long for an application as an alternative to address
 * @param address
 * @returns
 */
export const getPropertyAddressLatitudeLongitude = (
  address: OSAddress | ProposedAddress,
) => {
  if (
    "latitude" in address &&
    "longitude" in address &&
    address.latitude &&
    address.longitude
  ) {
    return { latitude: address.latitude, longitude: address.longitude };
  }
};

export const getDescription = (
  proposal: DprApplication["submission"]["data"]["proposal"],
): string => {
  if (!proposal) {
    return "No description";
  }

  if ("description" in proposal && proposal.description) {
    return proposal.description;
  }
  if ("reason" in proposal && proposal.reason) {
    return proposal.reason;
  }

  return "No description";
};

/**
 * Helper method to get the council decision date for an application
 * @param application
 * @returns
 */
export const getCouncilDecision = (application: DprApplication) => {
  return (
    application?.data?.assessment?.committeeDecision ||
    application?.data?.assessment?.planningOfficerDecision
  );
};

/**
 * Helper method to get the council decision date for an application
 * @param application
 * @returns
 */
export const getCouncilDecisionDate = (application: DprApplication) => {
  return (
    application?.data?.assessment?.committeeDecisionDate ||
    application?.data?.assessment?.planningOfficerDecisionDate
  );
};

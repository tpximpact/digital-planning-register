import { flattenPageContent } from "@/lib/applications";
import { flattenObjectIntoRow } from "@/lib/applicationSubmission";
import { DprApplicationSubmissionSubtopicValue } from "@/types";
import { capitalizeFirstLetter } from "@/util";

/**
 * Sorts the applicant data into a more readable format
 * @todo review the schema and update this function for missing data types
 * @param data
 * @returns
 */
export const BopsApplicant = (
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue[] => {
  return Object.entries(data)
    .map(([key, value]) => {
      let description = capitalizeFirstLetter(key);
      let rowData:
        | string
        | []
        | null
        | JSX.Element
        | DprApplicationSubmissionSubtopicValue[] =
        typeof value === "string" ? value : JSON.stringify(value);

      switch (key) {
        case "name":
          ({ description, value: rowData } = formatName(
            description,
            data["name"],
          ));
          break;
        case "type":
          description = "Applicant type";
          break;
        case "address":
          ({ description, value: rowData } = formatAddress(
            description,
            data["address"],
          ));
          break;
        case "ownership":
          rowData = formatOwnership(description, data["ownership"]);
          break;
        case "siteContact":
          ({ description, value: rowData } = formatSiteContact(
            description,
            data["siteContact"],
          ));
          break;
        case "agent":
          rowData = formatAgent(description, data["agent"]);
          break;
        case "phone":
          rowData = null;
          break;
        case "email":
          rowData = null;
          break;
      }

      return {
        description,
        value: rowData,
      };
    })
    .filter((d) => d.value !== null);
};

///// name

const formatName = (
  description: string,
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue => {
  const values = [];
  if (data?.first) {
    values.push(data?.first);
  }
  if (data?.last) {
    values.push(data?.last);
  }

  return {
    description: "Applicant name",
    value: values.length > 0 ? values.join(" ") : null,
  };
};

///// address

/**
 * Based on the Address type from BOPs will be used in many places
 * @param data
 * @returns
 */
const addressAsString = (data: Record<string, any>): string[] => {
  const values = [];
  if (data?.line1) {
    values.push(data?.line1);
  }
  if (data?.line2) {
    values.push(data?.line2);
  }
  if (data?.town) {
    values.push(data?.town);
  }
  if (data?.county) {
    values.push(data?.county);
  }
  if (data?.postcode) {
    values.push(data?.postcode);
  }
  if (data?.country) {
    values.push(data?.country);
  }
  return values;
};

const formatAddress = (
  description: string,
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue => {
  const values = [];

  if (data.sameAsSiteAddress) {
    values.push("Same as site address");
  } else {
    values.push(...addressAsString(data));
  }
  if (data?.first) {
    values.push(data?.first);
  }
  if (data?.last) {
    values.push(data?.last);
  }

  return {
    description: "Applicant address",
    value: values.length > 0 ? values.join(", ") : null,
  };
};

///// certificate

/**
 * @todo theres a lot of data not being shown here that we should show I think
 * @param description
 * @param data
 * @returns
 */
const formatOwnership = (
  description: string,
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue[] => {
  const ownership = flattenObjectIntoRow(data, "", ["certificate"]);

  const certificateValue: Record<string, string> = {
    a: "Certificate A - Sole owner",
    b: "Certificate B - Not a sole owner",
    c: "Certificate C - Some unknown owners",
    d: "Certificate D - Unknown owners",
  };

  return [
    {
      description: "Ownership",
      value: data?.certificate
        ? certificateValue[data?.certificate] || null
        : null,
    },
    // ...ownership.filter((d) => d.value !== null),
  ].filter((d) => d.value !== null);
};

///// siteContact

const formatSiteContact = (
  description: string,
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue => {
  let value = "";
  if (data?.role === "other") {
    let other = [];
    if (data?.name) {
      other.push(data?.name);
    }
    if (data?.email) {
      other.push(data?.email);
    }
    if (data?.phone) {
      other.push(data?.phone);
    }
    value = other.join(", ");
  } else {
    value = data?.role;
  }
  return {
    description: "Site contact",
    value: capitalizeFirstLetter(value) || null,
  };
};

///// certificate

/**
 * @todo theres a lot of data not being shown here that we should show I think
 * @param description
 * @param data
 * @returns
 */
const formatAgent = (
  description: string,
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue[] => {
  const agent = flattenObjectIntoRow(data, "Agent ", ["name"]);

  let agentName = [];
  if (data?.name?.first) {
    agentName.push(data?.name?.first);
  }
  if (data?.name?.last) {
    agentName.push(data?.name?.last);
  }

  return [
    {
      description: "Agent name",
      value: agentName.length > 0 ? agentName.join(" ") : null,
    },
    // ...agent.filter((d) => d.value !== null),
  ].filter((d) => d.value !== null);
};

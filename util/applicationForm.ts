import { formatDprDate } from "./formatDates";
import { capitaliseWord } from "./capitaliseWord";

function certificate(value: string) {
  const certificateValue: { [key: string]: string } = {
    a: "Certificate A - Sole owner",
    b: "Certificate B - Not a sole owner",
    c: "Certificate C - Some unkown owners",
    d: "Certificate D - Unkown owners",
  };
  return certificateValue[value] || "";
}

export function validateSecondTopic(value: string, res: any) {
  const subtopic: any = {
    property: "Property",
    proposal: "Proposal",
    applicant: "Applicant",
    application: "Application",
    files: "Files",
    "The property": "The Property",
    "About you": "About You",
    "The project": "The Project",
    "Your application": "Your Application",
    "Upload application documents": "Upload application documents",
    "Review and confirm": "Review and Confirm",
    "Pay and send": "Pay and send",
  };
  const topic: { [key: string]: any } = {
    property: {
      EPC: { description: "EPC", value: res["EPC"]?.known },
      type: { description: "Property type", value: res["type"]?.description },
      region: { description: "Region", value: res["region"] },
      address: [
        { description: "Address", value: res["address"]?.singleLine },
        {
          description: "Coordinates (lat, long)",
          value: `${res["address"]?.latitude}, ${res["address"]?.longitude}`,
        },
        {
          description: "UPRN",
          value: res["address"]?.uprn,
        },
        {
          description: "USRN",
          value: res["address"]?.usrn,
        },
      ],
      parking: {
        description: "Parking",
        value:
          res["parking"] &&
          Object.entries(res["parking"]).map(([key, val]: any) =>
            val.count > 0 ? `${key}: ${val.count} ` : "",
          ),
      },
      boundary: {
        description: "Area",
        value: `${res["boundary"]?.area?.squareMetres} m2 / ${res["boundary"]?.area?.hectares} hectares`,
      },
      planning: {
        description: "Planning designation",
        value: res["planning"]?.designations
          ?.filter((el: { intersects: string }) => el.intersects)
          .map((el: { description: string }) => el.description),
      },
      titleNumber: {
        description: "Title number",
        value: res["titleNumber"]?.number ? res["titleNumber"]?.number : "",
      },
      localAuthority: [
        {
          description: "Local authority",
          value: res["localAuthorityDistrict"],
        },
        {
          description: "Property boundary",
          value: res["boundary"]?.site,
          image: true,
        },
      ],
    },
    proposal: {
      date: {
        description: "Construction dates",
        value: `${res["date"]?.start && formatDprDate(res["date"]?.start)} to ${res["date"]?.completion && formatDprDate(res["date"]?.completion)}`,
      },
      extend: {
        description: "Extension size",
        value: res["extend"] ? `${res["extend"]?.area?.squareMetres} m2` : "",
      },
      parking: {
        description: "Additional parking",
        value:
          res["parking"] &&
          Object.entries(res["parking"]).map(([key, val]: any) =>
            val.count > 0 ? `${key}: +${val.count} ` : "",
          ),
      },
      boundary: [
        {
          description: "Proposed area",
          value: `${res["boundary"]?.area?.squareMetres} m2 / ${res["boundary"]?.area?.hectares} hectares`,
        },
        {
          description: "Proposed property boundary",
          value: res["boundary"]?.site,
          image: true,
        },
      ],
      description: { description: "Description", value: res?.description },
      projectType: {
        description: "Project type",
        value: res?.projectType?.map(
          (el: { description: string }) => el.description,
        ),
      },
    },
    applicant: {
      name: {
        description: "Applicant name",
        value: `${res.name?.first} ${res.name?.last}`,
      },
      type: { description: "Applicant type", value: res.type },
      address: {
        description: "Applicant address",
        value: res?.address?.sameAsSiteAddress && "Same as site address",
      },
      ownership: {
        description: "Ownership",
        value: certificate(res.ownership?.certificate),
      },
      siteContact: {
        description: "Site contact",
        value: capitaliseWord(res?.siteContact?.role),
      },
      agent: {
        description: "Agent name",
        value: res?.agent
          ? `${res.agent?.name?.first} ${res.agent?.name?.last}`
          : "",
      },
    },
    application: {
      type: { description: "Application type", value: res?.type?.description },
      preApp: {
        description: "Pre-application advice",
        value: res?.preApp
          ? [
              res?.preApp?.summary,
              `Date: ${res?.preApp?.date}`,
              `Reference: ${res?.preApp?.reference}`,
            ]
          : "",
      },
    },
    files: file(res),
    "The property": questions(res, value),
    "About you": questions(res, value),
    "The project": questions(res, value),
    "Your application": questions(res, value),
    "Upload application documents": questions(res, value),
    "Review and confirm": questions(res, value),
    "Pay and send": questions(res, value),
  };

  return { subtopic: subtopic[value], value: topic[value] };
}
function questions(value: any, key: string) {
  let arr: any = [];
  if (value.metadata?.sectionName == key) {
    arr.push({
      description: value.question,
      value: value.responses.map((el: { value: string }) => el.value),
    });
  }
  return arr;
}

function file(value: any) {
  let arr: any = [];
  const filesDoc =
    value &&
    Object.entries(value).map(([key, val]: any, i) => {
      return {
        description: "File upload",
        value: `${val?.type?.[0]?.description}: ${val?.type?.[0]?.value}`,
      };
    });
  return filesDoc;
}

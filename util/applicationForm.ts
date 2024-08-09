export function validateSecondTopic(value: any, res: any) {
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
  const topic: any = {
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
        value: [
          `cars: ${res["parking"]?.cars?.count}`,
          `vans: ${res["parking"]?.vans?.count}`,
          `buses: ${res["parking"]?.buses?.count}`,
          `other: ${res["parking"]?.other?.count}`,
          `cycles: ${res["parking"]?.cycles?.count}`,
          `car club: ${res["parking"]?.carClub?.count}`,
          `disabled: ${res["parking"]?.disabled?.count}`,
          `off street: ${res["parking"]?.offStreet?.residential?.count}`,
          `motorcycles: ${res["parking"]?.motorcycles?.count}`,
        ],
      },
      boundary: {
        description: "Area",
        value: `${res["boundary"]?.area?.squareMetres} m2 / ${res["boundary"]?.area?.hectares} hectares`,
      },
      planning: {
        description: "Planning designation",
        value: res["planning"]?.designations?.map((el: any) => el.description),
      },
      titleNumber: {
        description: "Title numbera",
        value: res["titleNumber"]?.known,
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
        value: `${res["date"]?.start} to ${res["date"]?.completion}`,
      },
      description: { description: "Description", value: res?.description },
      projectType: {
        description: "Project type",
        value: res?.projectType?.map((el) => el.description),
      },
      // boundary: { description: "Construction dates", value: ""}
    },
    applicant: {
      type: { description: "Applicant type", value: res?.type },
      address: {
        description: "Applicant address",
        value: res?.address?.sameAsSiteAddress && "Same as site address",
      },
      siteContact: {
        description: "Site contact",
        value: res?.siteContact?.role,
      },
    },
    application: {
      type: { description: "Application type", value: res?.type?.description },
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
function questions(value: any, key: any) {
  let arr: any = [];
  if (value.metadata?.sectionName == key) {
    arr.push({
      description: value.question,
      value: value.responses.map((el) => el.value),
    });
  }
  return arr;
}

function file(value: any) {
  const filesDoc =
    value.type &&
    Object.entries(value?.type).map(([key, val], i) => {
      return {
        description: "File upload",
        value: `${val?.description}: ${val?.value}`,
      };
    });
  return filesDoc;
}

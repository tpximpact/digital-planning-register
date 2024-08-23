import { DprApplicationSubmissionSubtopicValue } from "@/types";
import { capitalizeFirstLetter } from "@/util";

/**
 * Sorts the property data into a more readable format
 * @param data
 * @returns
 */
export const BopsProperty = (
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
        case "EPC":
          ({ description, value: rowData } = formatEpc(description, value));
          break;
        case "type":
          description = "Property type";
          rowData = data["type"]?.description;
          break;
        case "address":
          rowData = formatAddress(data["address"]);
          break;
        case "parking":
          const parking = parseParking(data["parking"]);
          ({ description, value: rowData } = formatParking(
            description,
            parking,
          ));
          break;
        case "boundary":
          rowData = formatBoundary(data["boundary"]);
          break;
        case "planning":
          ({ description, value: rowData } = formatPlanning(data["planning"]));
          break;
        case "titleNumber":
          ({ description, value: rowData } = formatTitleNumber(
            description,
            data["titleNumber"],
          ));
          break;
        case "localAuthorityDistrict":
          ({ description, value: rowData } = formatLocalAuthorityDistrict(
            description,
            data["localAuthorityDistrict"],
          ));
          break;
      }

      return {
        description,
        value: rowData,
      };
    })
    .filter((d) => d.value !== null);
};

///// EPC

/**
 *
 * @param description
 * @param data
 * @returns
 */
const formatEpc = (
  description: string,
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue => {
  return {
    description: "EPC",
    value: data?.known,
  };
};

///// Address

/**
 *
 * @param data
 * @returns
 */
const formatAddress = (data: Record<string, any>) => {
  return [
    {
      description: "Address",
      value: data?.singleLine,
    },
    {
      description: "Coordinates (lat, long)",
      value: `${data?.latitude}, ${data?.longitude}`,
    },
    {
      description: "UPRN",
      value: data?.uprn,
    },
    {
      description: "USRN",
      value: data?.usrn,
    },
  ];
};

///// planning

export const formatBoundary = (
  data: Record<string, any>,
  proposal: boolean = false,
) => {
  return [
    {
      description: proposal ? "Proposed area" : "Area",
      value: `${data?.area?.squareMetres} m2 / ${data?.area?.hectares} hectares`,
    },
    {
      description: proposal
        ? "Proposed property boundary"
        : "Property boundary",
      map: data?.site,
      value: data?.site && data?.site.length > 0 ? "" : null,
    },
  ];
};

///// planning

const formatPlanning = (data: Record<string, any>) => {
  const designations = data?.designations
    ?.filter((el: { intersects: string }) => el.intersects)
    .map((el: { description: string }) => el.description);

  const value =
    designations.length > 0 ? (
      <>
        {designations.map((d: string, i: number) => (
          <p key={i}>{d}</p>
        ))}
      </>
    ) : null;

  return {
    description: "Planning designations",
    value,
  };
};

///// titleNumber

/**
 *
 * @param description
 * @param data
 * @returns
 */
const formatTitleNumber = (
  description: string,
  data: Record<string, any>,
): DprApplicationSubmissionSubtopicValue => {
  const value = data?.number ? data?.number : null;

  return {
    description: "Title number",
    value,
  };
};

///// localAuthorityDistrict

/**
 *
 * @param description
 * @param data
 * @returns
 */
const formatLocalAuthorityDistrict = (
  description: string,
  data: string[],
): DprApplicationSubmissionSubtopicValue => {
  const value =
    data.length > 0 ? (
      <>
        {data.map((d, i) => (
          <p key={i}>{d}</p>
        ))}
      </>
    ) : null;

  return {
    description: "Local authority",
    value,
  };
};

///// parking

export const formatParking = (
  description: string,
  data: DprApplicationSubmissionSubtopicValue[],
) => {
  return {
    description,
    value:
      data.length > 0 ? (
        <>
          {data.map(({ description, value: val }, i) => (
            <p key={i}>
              {capitalizeFirstLetter(description)}: {val?.toString()}
            </p>
          ))}
        </>
      ) : null,
  };
};

/**
 * Parse the parking data into a more readable format
 * @param parking
 * @param prefix
 * @returns
 */
export const parseParking = (
  parking: Record<string, any>,
  prefix: String = "",
  valuePrefix: string = "",
  field: string = "count",
): DprApplicationSubmissionSubtopicValue[] => {
  return Object.entries(parking).reduce<
    DprApplicationSubmissionSubtopicValue[]
  >((accumulator, [type, value]) => {
    if (value[field] === undefined) {
      return [...accumulator, ...parseParking(value, type, valuePrefix, field)];
    } else {
      if (value[field] > 0) {
        return [
          ...accumulator,
          {
            description: prefix
              ? `${prefix} - ${capitalizeFirstLetter(type)}`
              : capitalizeFirstLetter(type),
            value: valuePrefix ? `${valuePrefix}${value[field]}` : value[field],
          },
        ];
      } else {
        return accumulator;
      }
    }
  }, []);
};

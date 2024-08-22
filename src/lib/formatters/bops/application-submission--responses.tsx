import {
  DprApplicationSubmissionSubtopic,
  DprApplicationSubmissionSubtopicValue,
} from "@/types";
import { capitalizeFirstLetter } from "@/util";

/**
 * Returns description and value from responses grouped by the metadata.sectionName
 *
 * "responses": [
 *  {
 *    "metadata": {
 *      "sectionName": "The property",
 *      "autoAnswered": true
 *    },
 *    "question": "Is the property in Camden?",
 *    "responses": [
 *      {
 *        "value": "Yes"
 *      }
 *    ]
 *  },
 *  {
 *    "metadata": {
 *      "sectionName": "The property",
 *      "autoAnswered": true
 *    },
 *    "question": "What type of property is it?",
 *    "responses": [
 *      {
 *        "value": "House"
 *      }
 *    ]
 *  }
 * ]
 * @param value
 * @returns
 */
export const BopsResponses = (
  data: Record<string, any>,
): DprApplicationSubmissionSubtopic[] => {
  const groupedData = data.reduce(
    (
      acc: { [key: string]: DprApplicationSubmissionSubtopicValue[] },
      item: Record<string, any>,
    ) => {
      // make section if it doesn already exist
      const sectionName = item.metadata.sectionName;
      if (!acc[sectionName]) {
        acc[sectionName] = [];
      }
      acc[sectionName] = [
        {
          description: item.question,
          value: getValueFromResponses(item),
        },
        ...acc[sectionName],
      ];
      return acc;
    },
    {},
  );
  return Object.keys(groupedData).map((sectionName) => ({
    subtopic: sectionName,
    value: groupedData[sectionName],
  }));
};

/**
 * According to schema it can either be array or string
 * @param item
 */
const getValueFromResponses = (item: Record<string, any>) => {
  let value;
  if (Array.isArray(item.responses)) {
    const responses = item.responses
      .map((el: { value: string }) => el.value)
      .filter((r: string) => r !== "REDACTED");
    value =
      responses && responses.length > 0 ? (
        <>
          {responses.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </>
      ) : null;
  } else {
    value = item.responses ?? null;
  }
  return value;
};

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

/**
 * Helpers related to comments
 */

import {
  DprApplication,
  DprCommentOrderBy,
  DprCommentSortBy,
  DprCommentTypes,
  SearchParamsComments,
  UnknownSearchParams,
} from "@/types";
import { AppConfig } from "@/config/types";

import type {
  CommentSentiment,
  SpecialistCommentSentiment,
} from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/enums/CommentSentiment.ts";
import { getValueFromUnknownSearchParams } from "./search";
import type { CommentTopic } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/enums/CommentTopic.ts";

/**
 * returns the type assuming its available in the config
 * @param council
 * @param searchParams
 * @returns
 */
export const getCommentTypeToShow = (
  council: AppConfig["council"],
  searchParams?: UnknownSearchParams,
): DprCommentTypes => {
  const searchParamsType = Array.isArray(searchParams?.type)
    ? searchParams?.type[0] // Use the first element if it's an array
    : searchParams?.type; // Use the value directly if it's a string

  let type: DprCommentTypes =
    (searchParamsType as DprCommentTypes) ??
    (council?.publicComments ? "public" : "specialist");

  // Ensure type is either "public" or "specialist"
  if (!["public", "specialist"].includes(type)) {
    type = council?.publicComments ? "public" : "specialist";
  }

  return type;
};

/**
 * Get the available comment types based on the appConfig
 * @param council
 * @returns DprCommentTypes[] or []
 */
export const getAvailableCommentTypes = (
  council: AppConfig["council"],
): DprCommentTypes[] => {
  return [
    council?.publicComments ? "public" : undefined,
    council?.specialistComments ? "specialist" : undefined,
  ].filter((type): type is DprCommentTypes => !!type);
};

export const pageTitles: Record<number, string> = {
  0: "What you need to know before you comment",
  1: "How do you feel about this development?",
  2: "What topics do you want to comment on?",
  3: "Write your comment",
  4: "Your details",
  5: "Check what you have written before sending your comment",
  6: "Comment submitted",
};

/**
 * Determine if comments are enabled for the application
 * This should already work with DprStatusSummary
 * @todo just need ot update to the new getApplicationStatusSummary method
 *
 * @param applicationType
 * @returns
 */
export const checkCommentsEnabled = (application: DprApplication): boolean => {
  const commentsAllowedInStatus = ["Consultation in progress"];
  if (
    application.data.localPlanningAuthority.publicCommentsAcceptedUntilDecision
  ) {
    commentsAllowedInStatus.push("Assessment in progress");
  }
  return commentsAllowedInStatus.includes(application.applicationStatusSummary);
};

/**
 * Return the default and valid sortBy and orderBy values from the searchParams
 */
export const COMMENT_TYPES = ["public", "specialist"];

// resultsPerPage
export const COMMENT_RESULTSPERPAGE_OPTIONS = [10, 25, 50];
export const COMMENT_RESULTSPERPAGE_DEFAULT = COMMENT_RESULTSPERPAGE_OPTIONS[0];

// sortBy
export const COMMENT_SORTBY_OPTIONS: DprCommentSortBy[] = ["receivedAt"];
export const COMMENT_SORTBY_DEFAULT = COMMENT_SORTBY_OPTIONS[0];

// orderBy
export const COMMENT_ORDERBY_OPTIONS = ["desc", "asc"];
export const COMMENT_ORDERBY_DEFAULT = COMMENT_ORDERBY_OPTIONS[0];

// sentiment - public
export const COMMENT_PUBLIC_SENTIMENT_OPTIONS: Array<{
  label: string;
  value: CommentSentiment;
}> = [
  {
    label: "Support",
    value: "supportive",
  },
  {
    label: "Neutral",
    value: "neutral",
  },
  {
    label: "Opposed",
    value: "objection",
  },
];

// sentiment - specialist
// @todo use SpecialistCommentSentiment not string for value when we have updated the schema
export const COMMENT_SPECIALIST_SENTIMENT_OPTIONS: Array<{
  label: string;
  value: SpecialistCommentSentiment | string;
}> = [
  {
    label: "Approved",
    value: "approved",
  },
  {
    label: "Amendments needed",
    value: "amendmentsNeeded",
  },
  {
    label: "Objected",
    value: "objected",
  },
];

/**
 * Converts a raw sentiment string (e.g., "amendmentsNeeded") to its display-friendly label (e.g., "Amendments needed").
 * Falls back to the original string if no matching label is found.
 */
export const formatSpecialistSentiment = (sentiment: string): string => {
  const option = COMMENT_SPECIALIST_SENTIMENT_OPTIONS.find(
    (opt) => opt.value === sentiment,
  );
  return option ? option.label : sentiment;
};

// topic
export const COMMENT_PUBLIC_TOPIC_OPTIONS: Array<{
  /**
   * Shown as the label when selecting a topic
   */
  label: string;
  /**
   * Shown as the label when entering text on the topic
   */
  hint: string;
  /**
   * Shown when reviewing the comments before submission
   */
  selectedLabel: string;
  /**
   * The value of the topic
   */
  value: CommentTopic;
  /**
   * Description of the topic - used as the hint when entering text for a topic
   */

  description: string;
}> = [
  {
    label: "Design, size or height of new buildings or extensions",
    hint: "Comment on the design, size or height of new buildings or extensions",
    selectedLabel: "The design, size or height of new buildings or extensions",
    value: "design",
    description:
      "Such as if a building is too tall, or does not fit into the surrounding environment.",
  },
  {
    label: "Use and function of the proposed development",
    hint: "Comment on the use and function of the proposed development",
    selectedLabel: "The use and function of the proposed development",
    value: "use",
    description:
      "Such as a proposed business that would not serve the area well, or could cause problems due to its operation.",
  },
  {
    label: "Impacts on natural light",
    hint: "Comment on impacts on natural light",
    selectedLabel: "Any impacts on natural light",
    value: "light",
    description:
      "Such as a building casting a shadow over residential buildings nearby.",
  },
  {
    label: "Privacy of neighbours",
    hint: "Comment on impacts to the privacy of neighbours",
    selectedLabel: "Impacts to the privacy of neighbours",
    value: "privacy",
    description:
      "Such as a large building overlooking houses and gardens next to it, or being too close to prevent viewing into neighbours windows.",
  },
  {
    label: "Disabled persons' access",
    hint: "Comment on impacts on disabled persons' access",
    selectedLabel: "Impacts on disabled persons&apos; access",
    value: "access",
    description:
      "Such as a development not providing accessible access to it's entrance, or removing a previous accessible route.",
  },
  {
    label: "Noise from new uses",
    hint: "Comment on any noise from new uses",
    selectedLabel: "Any noise from new uses",
    value: "noise",
    description:
      "Such as a new business causing excessive noise in a residential area.",
  },
  {
    label: "Traffic, parking or road safety",
    hint: "Comment on impacts to traffic, parking or road safety",
    selectedLabel: "Impacts to traffic, parking or road safety",
    value: "traffic",
    description:
      "Such as the parking proposed being inadequate, or important parking provisions being removed.",
  },
  {
    label: "Other",
    hint: "Comment on other things",
    selectedLabel: "Any other things",
    value: "other",
    description: "Anything that does not fit into other categories.",
  },
];

export const validateSearchParams = (
  appConfig: AppConfig,
  searchParams?: UnknownSearchParams,
): SearchParamsComments => {
  // page
  const validPage = (() => {
    // get the value if it exists
    const pageValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "page")
      : undefined;
    // parse it
    const pageNumber = parseInt(pageValue || "1", 10);
    // if its not a number or less than or equal to 0, return 1
    // otherwise return the number
    return isNaN(pageNumber) || pageNumber <= 0 ? 1 : pageNumber;
  })();

  // resultsPerPage
  const resultsPerPage = (() => {
    if (searchParams?.resultsPerPage) {
      const workingResultsPerPage = getValueFromUnknownSearchParams(
        searchParams,
        "resultsPerPage",
      );
      const parsedResultsPerPage = parseInt(workingResultsPerPage || "", 10);
      if (
        !isNaN(parsedResultsPerPage) &&
        COMMENT_RESULTSPERPAGE_OPTIONS.includes(parsedResultsPerPage)
      ) {
        return parsedResultsPerPage;
      }
    }

    return appConfig.defaults.resultsPerPage;
  })();

  // type
  const type = getCommentTypeToShow(appConfig.council, searchParams);

  // sortBy
  const sortBy: DprCommentSortBy | undefined = (() => {
    const sortByValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "sortBy")
      : undefined;

    if (
      sortByValue &&
      COMMENT_SORTBY_OPTIONS.includes(sortByValue as DprCommentSortBy)
    ) {
      return sortByValue as DprCommentSortBy;
    }

    return undefined;
  })();

  // orderBy
  const orderBy: DprCommentOrderBy | undefined = (() => {
    const orderByValue = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "orderBy")
      : undefined;

    if (
      orderByValue &&
      COMMENT_ORDERBY_OPTIONS.includes(orderByValue as DprCommentOrderBy)
    ) {
      return orderByValue as DprCommentOrderBy;
    }

    return undefined;
  })();

  // Ensure query is a string
  const query: string | undefined = searchParams
    ? getValueFromUnknownSearchParams(searchParams, "query")
    : undefined;

  // sentiment
  const sentiment = (() => {
    const sentiment: string | undefined = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "sentiment")
      : undefined;

    let validSentiment = undefined;
    if (type === "public") {
      validSentiment = COMMENT_PUBLIC_SENTIMENT_OPTIONS.find(
        (s) => s.value === sentiment,
      );
      return validSentiment ? validSentiment.value : undefined;
    } else if (type === "specialist") {
      validSentiment = COMMENT_SPECIALIST_SENTIMENT_OPTIONS.find(
        (s) => s.value === sentiment,
      );
      return validSentiment ? validSentiment.value : undefined;
    } else {
      return undefined;
    }
  })();

  // topic
  const topic = (() => {
    const topic: string | undefined = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "topic")
      : undefined;
    const validTopic = COMMENT_PUBLIC_TOPIC_OPTIONS.find(
      (s) => s.value === topic,
    );
    return validTopic ? validTopic.value : undefined;
  })();

  // publishedAtFrom publishedAtTo
  const { publishedAtFrom, publishedAtTo } = (() => {
    const publishedAtFrom = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "publishedAtFrom")
      : undefined;
    const publishedAtTo = searchParams
      ? getValueFromUnknownSearchParams(searchParams, "publishedAtTo")
      : undefined;

    // Helper function to validate YYYY-MM-DD format
    const isValidDate = (date: string | undefined): boolean => {
      return !!date && /^\d{4}-\d{2}-\d{2}$/.test(date);
    };

    // Validate both dates
    const isFromValid = isValidDate(publishedAtFrom);
    const isToValid = isValidDate(publishedAtTo);

    // If both are valid, ensure they are in the correct order
    if (isFromValid && isToValid) {
      const fromDate = new Date(publishedAtFrom!);
      const toDate = new Date(publishedAtTo!);

      if (fromDate <= toDate) {
        return { publishedAtFrom, publishedAtTo };
      } else {
        // If out of order, return undefined for both
        return { publishedAtFrom: undefined, publishedAtTo: undefined };
      }
    }

    // If only one is valid, set both to the same value
    if (isFromValid) {
      return { publishedAtFrom, publishedAtTo: publishedAtFrom };
    }
    if (isToValid) {
      return { publishedAtFrom: publishedAtTo, publishedAtTo };
    }

    // If neither is valid, set both to undefined
    return { publishedAtFrom: undefined, publishedAtTo: undefined };
  })();

  const newSearchParams: SearchParamsComments = {
    page: validPage,
    resultsPerPage,
    type,
    ...(query && { query }),
    ...(sortBy && { sortBy }),
    ...(orderBy && { orderBy }),
    ...(sentiment && { sentiment }),
    ...(topic && { topic }),
    ...(publishedAtFrom && publishedAtTo && { publishedAtFrom, publishedAtTo }),
  };

  return newSearchParams;
};

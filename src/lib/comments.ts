/**
 * Helpers related to comments
 */

import {
  DprComment,
  DprCommentTypes,
  DprPagination,
  DprPlanningApplication,
  SearchParams,
} from "@/types";
import { AppConfig } from "@/config/types";
import { createItemPagination } from "./pagination";

/**
 * Sort comments by newest first
 * @param comments
 * @returns
 */
export const sortComments = (comments: DprComment[]) => {
  return comments?.sort((a, b) => {
    const dateA = a.receivedDate ? new Date(a.receivedDate).getTime() : 0;
    const dateB = b.receivedDate ? new Date(b.receivedDate).getTime() : 0;
    return dateB - dateA;
  });
};

/**
 * returns the type assuming its available in the config
 * @param council
 * @param searchParams
 * @returns
 */
export const getCommentTypeToShow = (
  council: AppConfig["council"],
  searchParams?: SearchParams,
): DprCommentTypes => {
  let type: DprCommentTypes =
    (searchParams?.type as DprCommentTypes) ??
    (council?.publicComments ? "public" : "specialist");

  // Ensure type is either "public" or "specialist"
  if (!["public", "specialist"].includes(type)) {
    type = council?.publicComments ? "public" : "specialist";
  }

  return type;
};

/**
 * Builds the comments result into our format so that it looks like it came from the API
 */
export const buildCommentResult = (
  appConfig: AppConfig,
  type: DprCommentTypes,
  application: DprPlanningApplication,
  searchParams?: SearchParams,
) => {
  const comments =
    type === "specialist"
      ? application.application?.consultation.consulteeComments
      : type === "public"
        ? application.application?.consultation.publishedComments
        : null;

  const totalComments = comments ? comments.length : 0;
  const currentPage = Number(searchParams?.page ?? 1);

  const commentData: { pagination: DprPagination; data: DprComment[] } = {
    pagination: {
      ...createItemPagination(
        totalComments,
        currentPage,
        appConfig.defaults.resultsPerPage,
      ),
    },
    data: comments ? [...comments] : [],
  };

  return commentData;
};

export const sentiment_options = [
  { id: "objection", label: "Opposed" },
  { id: "neutral", label: "Neutral" },
  { id: "supportive", label: "Support" },
];

export const topicLabels = {
  design:
    "Comment on the design, size or height of new buildings or extensions",
  use: "Comment on the use and function of the proposed development",
  light: "Comment on impacts on natural light",
  privacy: "Comment on impacts to the privacy of neighbours",
  access: "Comment on impacts on disabled persons' access",
  noise: "Comment on any noise from new uses",
  traffic: "Comment on impacts to traffic, parking or road safety",
  other: "Comment on other things",
};

export const topicLabelsHint = {
  design:
    "Such as if a building is too tall, or does not fit into the surrounding environment.",
  use: "Such as a proposed business that would not serve the area well, or could cause problems due to its operation.",
  light:
    "Such as a building casting a shadow over residential buildings nearby.",
  privacy:
    "Such as a large building overlooking houses and gardens next to it, or being too close to prevent viewing into neighbours windows.",
  access:
    "Such as a development not providing accessible access to it's entrance, or removing a previous accessible route.",
  noise:
    "Such as a new business causing excessive noise in a residential area.",
  traffic:
    "Such as the parking proposed being inadequate, or important parking provisions being removed.",
  other: "Anything that does not fit into other categories.",
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

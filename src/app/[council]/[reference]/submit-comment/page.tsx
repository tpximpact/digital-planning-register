"use client";
import React, { useEffect, useState } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import PreSubmission from "@/components/comment_pre_submission";
import CommentSentiment from "@/components/comment_sentiment";
import CommentTopicSelection from "@/components/comment_topic_selection";
import CommentHeader from "@/components/comment-header";
import CommentTextEntry from "@/components/comment_text_entry";
import CommentPersonalDetails from "@/components/comment_personal_details";
import CommentCheckAnswer from "@/components/comment_check_answer";
import CommentConfirmation from "@/components/comment_confirmation";
import { BackLink } from "@/components/button";
import { getApplicationByReference } from "@/actions";
import NotFound from "@/app/not-found";
import { BoundaryGeojson } from "../../../../../util/type";

type Props = {
  params: { reference: string; council: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

interface ApplicationData {
  id: number;
  boundary_geojson: BoundaryGeojson;
  site: { address_1: string; postcode: string };
  [key: string]: any;
}

const Comment = ({ params }: Props) => {
  const { reference, council } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(0);
  const [applicationData, setApplicationData] =
    useState<ApplicationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [newTopics, setNewTopics] = useState<string[]>([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [personalDetailsSubmitted, setPersonalDetailsSubmitted] =
    useState(false);

  const checkExistingProgress = React.useCallback(() => {
    const sentiment = localStorage.getItem(`sentiment_${reference}`);
    const storedTopics = localStorage.getItem(`selectedTopics_${reference}`);
    const storedPersonalDetails = localStorage.getItem(
      `personalDetails_${reference}`,
    );

    if (storedPersonalDetails) {
      return 5; // Go to check answers if personal details are submitted
    } else if (storedTopics) {
      const topics = storedTopics.split(",");
      const hasUncommentedTopic = topics.some(
        (topic) => !localStorage.getItem(`comment_${topic}_${reference}`),
      );
      return hasUncommentedTopic ? 3 : 4; // Go to text entry or personal details
    } else if (sentiment) {
      return 2; // Go to topic selection if sentiment is set
    } else if (localStorage.getItem(`presubmission_${reference}`)) {
      return 1; // Go to sentiment if presubmission is completed
    }
    return 0; // Start from PreSubmission if no progress
  }, [reference]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApplicationByReference(reference, council);
        if ("error" in data) {
          setError(data.error);
        } else {
          setApplicationData(data as ApplicationData);
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    };
    fetchData();
  }, [reference, council]);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const editParam = searchParams.get("edit");
    const topicIndexParam = searchParams.get("topicIndex");

    if (pageParam) {
      setPage(parseInt(pageParam));
    } else {
      const startingPage = checkExistingProgress();
      setPage(startingPage);
    }

    setIsEditing(editParam === "true");
    if (topicIndexParam) {
      setCurrentTopicIndex(parseInt(topicIndexParam));
    }

    const storedTopics = localStorage.getItem(`selectedTopics_${reference}`);
    if (storedTopics) {
      setSelectedTopics(storedTopics.split(","));
    }

    const storedPersonalDetails = localStorage.getItem(
      `personalDetails_${reference}`,
    );
    setPersonalDetailsSubmitted(!!storedPersonalDetails);
  }, [searchParams, reference, checkExistingProgress]);

  const navigateToPage = (newPage: number, params: object = {}) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", newPage.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === "string" || typeof value === "number") {
        url.searchParams.set(key, value.toString());
      }
    });
    router.push(url.toString());
  };

  const handleTopicSubmission = (topics: string[]) => {
    const previousTopics = selectedTopics;
    setSelectedTopics(topics);

    const newlyAddedTopics = topics.filter(
      (topic) => !previousTopics.includes(topic),
    );
    setNewTopics(newlyAddedTopics);

    if (newlyAddedTopics.length > 0) {
      const firstNewTopicIndex = topics.indexOf(newlyAddedTopics[0]);
      setCurrentTopicIndex(firstNewTopicIndex);
      navigateToPage(3, { topicIndex: firstNewTopicIndex, edit: isEditing });
    } else if (isEditing) {
      navigateToPage(5); // Go to check answers if no new topics during editing
    } else {
      navigateToNextTopic(topics);
    }
  };

  const handleTopicNavigation = () => {
    if (isEditing) {
      const nextNewTopicIndex = newTopics.findIndex(
        (topic) => selectedTopics.indexOf(topic) > currentTopicIndex,
      );

      if (nextNewTopicIndex !== -1) {
        const nextIndex = selectedTopics.indexOf(newTopics[nextNewTopicIndex]);
        setCurrentTopicIndex(nextIndex);
        navigateToPage(3, { topicIndex: nextIndex, edit: true });
      } else {
        navigateToPage(5); // Go to check answers if no more new topics
      }
    } else {
      navigateToNextTopic(selectedTopics);
    }
  };

  const navigateToNextTopic = (topics: string[]) => {
    const nextUncommentedTopic = topics.find((topic) => {
      const comment = localStorage.getItem(`comment_${topic}_${reference}`);
      return !comment || comment.trim() === "";
    });

    if (nextUncommentedTopic) {
      const nextIndex = topics.indexOf(nextUncommentedTopic);
      setCurrentTopicIndex(nextIndex);
      navigateToPage(3, { topicIndex: nextIndex });
    } else if (personalDetailsSubmitted) {
      navigateToPage(5); // Go to check answers if all topics have comments and personal details are submitted
    } else {
      navigateToPage(4); // Go to personal details if not yet submitted
    }
  };

  if (error) {
    return <NotFound params={params} />;
  }

  const renderComponent = () => {
    if (!applicationData) {
      return null;
    }

    const commonProps = {
      reference,
      navigateToPage,
      isEditing,
      council,
    };

    switch (page) {
      case 0:
        return <PreSubmission {...commonProps} />;
      case 1:
        return <CommentSentiment {...commonProps} />;
      case 2:
        return (
          <CommentTopicSelection
            {...commonProps}
            onTopicSelection={handleTopicSubmission}
          />
        );
      case 3:
        return (
          <CommentTextEntry
            {...commonProps}
            currentTopic={selectedTopics[currentTopicIndex]}
            onContinue={handleTopicNavigation}
          />
        );
      case 4:
        return <CommentPersonalDetails {...commonProps} />;
      case 5:
        return (
          <CommentCheckAnswer
            {...commonProps}
            applicationId={applicationData.id}
          />
        );
      case 6:
        return (
          <CommentConfirmation
            {...commonProps}
            site={applicationData.site}
            boundary_geojson={applicationData.boundary_geojson}
          />
        );
      default:
        return <PreSubmission {...commonProps} />;
    }
  };

  const getBackLinkHref = () => {
    if (page === 0) {
      return `/${council}/${reference}/`;
    } else if (page === 1) {
      return `/${council}/${reference}/submit-comment?page=0`;
    } else if (page === 2) {
      return `/${council}/${reference}/submit-comment?page=1`;
    } else if (page === 3) {
      if (currentTopicIndex > 0) {
        return `/${council}/${reference}/submit-comment?page=3&topicIndex=${currentTopicIndex - 1}${isEditing ? "&edit=true" : ""}`;
      } else {
        return `/${council}/${reference}/submit-comment?page=2${isEditing ? "&edit=true" : ""}`;
      }
    } else if (page === 4) {
      return `/${council}/${reference}/submit-comment?page=3&topicIndex=${selectedTopics.length - 1}`;
    } else if (page === 5) {
      return isEditing
        ? `/${council}/${reference}/submit-comment?page=2&edit=true`
        : `/${council}/${reference}/submit-comment?page=4`;
    } else {
      const previousPage = Math.max(0, page - 1);
      return `/${council}/${reference}/submit-comment?page=${previousPage}`;
    }
  };

  return (
    <>
      {page < 6 && (
        <>
          {page > 0 && page < 6 && applicationData && (
            <BackLink href={getBackLinkHref()} />
          )}
          {applicationData && (
            <CommentHeader
              council={council}
              reference={reference}
              boundary_geojson={applicationData?.boundary_geojson}
              site={applicationData.site}
            />
          )}
        </>
      )}
      {renderComponent()}
    </>
  );
};

export default Comment;

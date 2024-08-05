"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { NonStandardBoundaryGeojson } from "@/types";

type Props = {
  params: { reference: string; council: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

interface ApplicationData {
  id: number;
  boundary_geojson: NonStandardBoundaryGeojson;
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
  const [maxAllowedPage, setMaxAllowedPage] = useState(0);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Function to update the URL with the new page number
  const updateURL = useCallback(
    (newPage: number) => {
      const url = new URL(window.location.href);
      url.searchParams.set("page", newPage.toString());
      router.replace(url.toString());
    },
    [router],
  );

  // Function to check the user's progress in the comment submission process
  const checkExistingProgress = useCallback(() => {
    // Check various sessionStorage items to determine the user's progress
    const submissionCompleteFlag = sessionStorage.getItem(
      `submissionComplete_${reference}`,
    );
    const presubmission = sessionStorage.getItem(`presubmission_${reference}`);
    const sentiment = sessionStorage.getItem(`sentiment_${reference}`);
    const storedTopics = sessionStorage.getItem(`selectedTopics_${reference}`);
    const storedPersonalDetails = sessionStorage.getItem(
      `personalDetails_${reference}`,
    );

    // Return the appropriate page number based on the user's progress
    if (submissionCompleteFlag) {
      setSubmissionComplete(true);
      return 6;
    } else if (storedPersonalDetails) {
      return 5;
    } else if (storedTopics) {
      const topics = storedTopics.split(",");
      const hasUncommentedTopic = topics.some(
        (topic) => !sessionStorage.getItem(`comment_${topic}_${reference}`),
      );
      return hasUncommentedTopic ? 3 : 4;
    } else if (sentiment) {
      return 2;
    } else if (presubmission) {
      return 1;
    }
    return 0;
  }, [reference]);

  // Fetch application data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApplicationByReference(reference, council);
        if (response?.status?.code !== 200) {
          setError(response?.status?.message || "An unexpected error occurred");
        } else {
          setApplicationData(response.data as ApplicationData);
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    };
    fetchData();
  }, [reference, council]);

  // Set up the initial page and handle URL parameters
  useEffect(() => {
    const startingPage = checkExistingProgress();
    setMaxAllowedPage(startingPage);

    const pageParam = searchParams.get("page");
    const editParam = searchParams.get("edit");
    const topicIndexParam = searchParams.get("topicIndex");

    // Set the current page based on URL parameters and user progress
    if (pageParam) {
      const requestedPage = parseInt(pageParam);
      if (requestedPage <= Math.max(startingPage, 6)) {
        setPage(requestedPage);
      } else {
        setPage(startingPage);
        setShouldRedirect(true);
      }
    } else {
      setPage(startingPage);
      setShouldRedirect(true);
    }

    setIsEditing(editParam === "true");
    if (topicIndexParam) {
      setCurrentTopicIndex(parseInt(topicIndexParam));
    }

    // Load stored topics and personal details
    const storedTopics = sessionStorage.getItem(`selectedTopics_${reference}`);
    if (storedTopics) {
      setSelectedTopics(storedTopics.split(","));
    }

    const storedPersonalDetails = sessionStorage.getItem(
      `personalDetails_${reference}`,
    );
    setPersonalDetailsSubmitted(!!storedPersonalDetails);
  }, [searchParams, reference, checkExistingProgress]);

  // Handle URL updates when redirection is needed
  useEffect(() => {
    if (shouldRedirect) {
      updateURL(page);
      setShouldRedirect(false);
    }
  }, [shouldRedirect, page, updateURL]);

  // Reset submission state when navigating away from the confirmation page
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? parseInt(pageParam) : 0;

    if (submissionComplete && currentPage !== 6) {
      sessionStorage.removeItem(`submissionComplete_${reference}`);
      setSubmissionComplete(false);
    }
  }, [submissionComplete, reference, searchParams]);

  // Function to navigate to a specific page
  const navigateToPage = useCallback(
    (newPage: number, params: object = {}) => {
      setPage(newPage);
      setMaxAllowedPage((prevMax) => Math.max(prevMax, newPage));
      const url = new URL(window.location.href);
      url.searchParams.set("page", newPage.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (typeof value === "string" || typeof value === "number") {
          url.searchParams.set(key, value.toString());
        }
      });
      router.push(url.toString());

      // Reset submission state when navigating away from confirmation page
      if (submissionComplete && newPage !== 6) {
        const timeoutId = setTimeout(() => {
          sessionStorage.removeItem(`submissionComplete_${reference}`);
          setSubmissionComplete(false);
        }, 0);
        return () => clearTimeout(timeoutId);
      }
    },
    [router, submissionComplete, reference],
  );

  // Function to update the maximum allowed page
  const updateProgress = useCallback((completedPage: number) => {
    setMaxAllowedPage((prevMax) => Math.max(prevMax, completedPage + 1));
  }, []);

  // Function to navigate to the next uncommented topic
  const navigateToNextTopic = useMemo(
    () => (topics: string[]) => {
      const nextUncommentedTopic = topics.find((topic) => {
        const comment = sessionStorage.getItem(`comment_${topic}_${reference}`);
        return !comment || comment.trim() === "";
      });

      if (nextUncommentedTopic) {
        const nextIndex = topics.indexOf(nextUncommentedTopic);
        setCurrentTopicIndex(nextIndex);
        navigateToPage(3, { topicIndex: nextIndex });
      } else if (personalDetailsSubmitted) {
        navigateToPage(5);
      } else {
        navigateToPage(4);
      }
    },
    [reference, personalDetailsSubmitted, navigateToPage],
  );
  // Function to handle topic submission
  const handleTopicSubmission = useCallback(
    (topics: string[]) => {
      const previousTopics = selectedTopics;
      setSelectedTopics(topics);

      const newlyAddedTopics = topics.filter(
        (topic) => !previousTopics.includes(topic),
      );
      setNewTopics(newlyAddedTopics);

      if (newlyAddedTopics.length > 0) {
        const firstNewTopicIndex = topics.indexOf(newlyAddedTopics[0]);
        setCurrentTopicIndex(firstNewTopicIndex);
        navigateToPage(3, {
          topicIndex: firstNewTopicIndex,
          ...(isEditing && { edit: "true" }),
        });
      } else if (isEditing) {
        navigateToPage(5);
      } else {
        navigateToNextTopic(topics);
      }
    },
    [selectedTopics, isEditing, navigateToPage, navigateToNextTopic],
  );

  // Function to handle navigation between topics
  const handleTopicNavigation = useCallback(() => {
    if (isEditing) {
      const nextNewTopicIndex = newTopics.findIndex(
        (topic) => selectedTopics.indexOf(topic) > currentTopicIndex,
      );

      if (nextNewTopicIndex !== -1) {
        const nextIndex = selectedTopics.indexOf(newTopics[nextNewTopicIndex]);
        setCurrentTopicIndex(nextIndex);
        navigateToPage(3, { topicIndex: nextIndex, edit: "true" });
      } else {
        navigateToPage(5);
      }
    } else {
      navigateToNextTopic(selectedTopics);
    }
  }, [
    isEditing,
    newTopics,
    selectedTopics,
    currentTopicIndex,
    navigateToPage,
    navigateToNextTopic,
  ]);

  // Function to render the appropriate component based on the current page
  const renderComponent = () => {
    if (!applicationData) {
      return null;
    }

    const commonProps = {
      reference,
      council,
      navigateToPage,
      updateProgress,
      isEditing,
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

  // Function to get the href for the back link
  const getBackLinkHref = useCallback(() => {
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
  }, [page, council, reference, currentTopicIndex, isEditing, selectedTopics]);

  // Render NotFound component if there's an error
  if (error) {
    return <NotFound params={params} />;
  }

  // Handle redirection if the current page exceeds the maximum allowed page
  if (page > maxAllowedPage) {
    if (!shouldRedirect) {
      setShouldRedirect(true);
      setPage(maxAllowedPage);
    }
    return null;
  }

  // Render the main component
  return (
    <>
      {page < 6 && (
        <>
          {page < 6 && applicationData && <BackLink link={getBackLinkHref()} />}
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

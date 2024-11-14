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
import { DprShowApiResponse, SearchParams } from "@/types";
import { ApiV1 } from "@/actions/api";
import { PageWrapper } from "@/components/PageWrapper";
import { ContentError } from "@/components/ContentError";
import { getAppConfigClientSide } from "@/config/getAppConfigClientSide";
import { AppConfig } from "@/config/types";
import { redirect } from "next/navigation";

type Props = {
  params: { reference: string; council: string };
  searchParams:
    | { [key: string]: string | string[] | undefined }
    | Pick<SearchParams, "page">;
};

const Comment = ({ params, searchParams: searchParamsFromPage }: Props) => {
  const { reference, council } = params;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [appConfig, setAppConfig] = useState<AppConfig | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [applicationData, setApplicationData] =
    useState<DprShowApiResponse | null>(null);
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
  const [isClient, setIsClient] = useState(false);
  const [applicationType, setApplicationType] = useState<string>();

  useEffect(() => {
    setIsClient(true);
    const type = sessionStorage.getItem("applicationType");
    setApplicationType(type?.toString());
  }, []);
  if (applicationType === "lawfulness_certificate") {
    redirect(`/${council}/${reference}`);
  }

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
        const appConfig = await getAppConfigClientSide(council);
        setAppConfig(appConfig);
        const response = await ApiV1.show(
          appConfig?.council?.dataSource ?? "none",
          council,
          reference,
        );
        if (response?.status?.code !== 200) {
          setError(response?.status?.message || "An unexpected error occurred");
        } else {
          setApplicationData(response.data);
          if (response?.data?.application.status === "determined") {
            router.push(`/${council}/${reference}`);
          }
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    };
    fetchData();
  }, [reference, council, router]);

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

      if (isEditing) {
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

  // Handle beforeunload event to alert the user when closing tab/browser that their changes may not be saved
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (page > 1 && page < 6) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [page]);

  // Function to render the appropriate component based on the current page
  const renderComponent = () => {
    if (!applicationData) {
      return null;
    }

    const boundary_geojson = applicationData?.property.boundary.site;
    const address = applicationData?.property.address.singleLine;

    const commonProps = {
      reference,
      council,
      navigateToPage,
      updateProgress,
      isEditing,
    };

    switch (page) {
      case 0:
        return (
          <PreSubmission councilConfig={appConfig?.council} {...commonProps} />
        );
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
            currentTopicIndex={currentTopicIndex}
            totalTopics={selectedTopics.length}
          />
        );
      case 4:
        return (
          <CommentPersonalDetails
            councilConfig={appConfig?.council}
            {...commonProps}
          />
        );
      case 5:
        return (
          <CommentCheckAnswer
            councilConfig={appConfig?.council}
            {...commonProps}
            applicationId={applicationData.application.id}
          />
        );
      case 6:
        return (
          <CommentConfirmation
            {...commonProps}
            address={address}
            boundary_geojson={boundary_geojson}
          />
        );
      default:
        return (
          <PreSubmission councilConfig={appConfig?.council} {...commonProps} />
        );
    }
  };

  if (error) {
    return (
      <PageWrapper>
        <ContentError />
      </PageWrapper>
    );
  }

  // single page version of comment form for server version
  // TODO when we're ready this is the beginings of a server side version of the comment form
  if (!isClient) {
    return (
      <PageWrapper>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h2 className="govuk-heading-s" role="title">
              Javascript is required to submit comments
            </h2>
            <p className="govuk-body">
              Please enable javascript to submit comments.
            </p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Handle redirection if the current page exceeds the maximum allowed page
  if (page > maxAllowedPage) {
    if (!shouldRedirect) {
      setShouldRedirect(true);
      setPage(maxAllowedPage);
    }
    return null;
  }

  const boundary_geojson = applicationData?.property.boundary.site;
  const address = applicationData?.property.address.singleLine;

  // Render the main component
  return (
    <>
      {page < 6 && applicationData && <BackLink />}
      {page <= 6 && (
        <div className="govuk-main-wrapper">
          {page >= 1 && page < 6 && applicationData && (
            <CommentHeader
              council={council}
              reference={reference}
              boundary_geojson={boundary_geojson}
              address={address}
            />
          )}
          {renderComponent()}
        </div>
      )}
    </>
  );
};

export default Comment;

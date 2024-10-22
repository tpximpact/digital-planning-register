"use client";
import { getAppConfig } from "@/config";
import React from "react";
import { ContentCommentsPreSubmission } from "../ContentCommentsPreSubmission";
import { StartButton } from "../button";

const PreSubmission = ({
  council,
  reference,
  navigateToPage,
  updateProgress,
}: {
  council: string;
  reference: string;
  navigateToPage: (page: number, params?: object) => void;
  updateProgress: (completedPage: number) => void;
}) => {
  const appConfig = getAppConfig(council);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem(`presubmission_${reference}`, "completed");
    updateProgress(0);
    navigateToPage(1);
  };

  return (
    <>
      <ContentCommentsPreSubmission council={council} />
      <form onSubmit={handleSubmit}>
        <StartButton />
      </form>
    </>
  );
};

export default PreSubmission;

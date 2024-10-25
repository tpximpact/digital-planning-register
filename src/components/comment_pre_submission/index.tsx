"use client";
import React from "react";
import { ContentCommentsPreSubmission } from "../ContentCommentsPreSubmission";
import { StartButton } from "../button";
import { AppConfig } from "@/config/types";
import "./CommentPreSubmission.scss";

const PreSubmission = ({
  councilConfig,
  reference,
  navigateToPage,
  updateProgress,
}: {
  councilConfig: AppConfig["council"];
  reference: string;
  navigateToPage: (page: number, params?: object) => void;
  updateProgress: (completedPage: number) => void;
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem(`presubmission_${reference}`, "completed");
    updateProgress(0);
    navigateToPage(1);
  };

  return (
    <>
      <ContentCommentsPreSubmission councilConfig={councilConfig} />
      <form onSubmit={handleSubmit}>
        <StartButton />
      </form>
    </>
  );
};

export default PreSubmission;

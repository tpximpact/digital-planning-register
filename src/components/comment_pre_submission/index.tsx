"use client";
import React from "react";
import { ContentCommentsPreSubmission } from "../ContentCommentsPreSubmission";
import { Button } from "../govuk/Button";
import { AppConfig } from "@/config/types";
import { StartIcon } from "public/icons";

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
        <Button variant="start" content="Start now" type="submit" />
      </form>
    </>
  );
};

export default PreSubmission;

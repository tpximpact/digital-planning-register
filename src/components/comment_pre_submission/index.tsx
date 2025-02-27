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

"use client";
import React from "react";
import { ContentCommentsPreSubmission } from "../ContentCommentsPreSubmission";
import { AppConfig } from "@/config/types";
import { StartButton } from "../StartButton";

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
        <StartButton type="submit" />
      </form>
    </>
  );
};

export default PreSubmission;

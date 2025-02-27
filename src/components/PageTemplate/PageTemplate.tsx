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

import { PhaseBanner } from "@/components/govuk/PhaseBanner";
import { Header } from "@/components/Header";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { AppConfig } from "@/config/types";
import { PageCenter } from "../PageCenter";

export interface PageTemplateProps {
  children: React.ReactNode;
  appConfig: AppConfig;
}

export const PageTemplate = ({ children, appConfig }: PageTemplateProps) => {
  return (
    <>
      <Header appConfig={appConfig} />
      <PageCenter>
        <PhaseBanner />
        <Suspense>{children}</Suspense>
      </PageCenter>
      <Footer councilConfig={appConfig.council} />
    </>
  );
};

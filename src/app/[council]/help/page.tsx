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

import { ContentError } from "@/components/ContentError";
import { PageHelp } from "@/components/PageHelp";
import { PageMain } from "@/components/PageMain";
import { getAppConfig } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help using the Digital Planning Register",
};

interface HelpProps {
  params: {
    council: string;
  };
}

const Help = ({ params }: HelpProps) => {
  const { council } = params;
  const appConfig = getAppConfig(council);

  if (appConfig.council === undefined) {
    return (
      <PageMain>
        <ContentError />
      </PageMain>
    );
  }

  return <PageHelp councilConfig={appConfig?.council} />;
};

export default Help;

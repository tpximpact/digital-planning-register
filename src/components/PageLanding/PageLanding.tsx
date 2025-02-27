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

import { AppConfig } from "@/config/types";
import { CouncilCards } from "@/components/CouncilCards";

export interface PageLandingProps {
  councils: AppConfig["councils"];
}

export const PageLanding = ({ councils }: PageLandingProps) => {
  return (
    <>
      <h1 className="govuk-heading-l">
        Welcome to the Digital Planning Register
      </h1>
      <p className="govuk-body">
        This site allows you to find planning applications submitted through the
        Open Digital Planning system for your local council planning authority.
      </p>
      <p className="govuk-body">
        Not all planning applications will be available through this register,
        and you may need to check individual council&apos;s websites to see what
        records are kept here.
      </p>

      {councils && councils.length > 0 ? (
        <>
          <CouncilCards councils={councils} />
        </>
      ) : null}
    </>
  );
};

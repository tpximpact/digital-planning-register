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

// "use client";
// import { SkipLink as GovUkSkipLink, createAll } from "govuk-frontend";
// import { useState, useEffect } from "react";
import "./SkipLink.scss";

export interface SkipLinkProps {
  href: string;
}

export const SkipLink = ({ href }: Required<SkipLinkProps>) => {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (isClient) {
  //   createAll(GovUkSkipLink);
  // }

  return (
    <a href={href} className="govuk-skip-link" data-module="govuk-skip-link">
      Skip to main content
    </a>
  );
};

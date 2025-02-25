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

import { DprContentPage } from "@/types";
import { slugify } from "@/util";
import Link from "next/link";

export const contentImportantDates = (): DprContentPage[] => {
  return [
    {
      key: slugify("Council process"),
      title: "Council process",
      content: (
        <>
          <p className="govuk-body">
            These dates are the important events for applications while they are
            being handled by the local council planning authority.
          </p>
        </>
      ),
      children: [
        {
          key: slugify("Received date"),
          title: "Received date",
          content: (
            <>
              <p className="govuk-body">
                This is the date that the application is received by the
                council. It may not be the date it was sent, if there have been
                delays in the submission process.
              </p>
            </>
          ),
        },
        {
          key: slugify("Valid from date"),
          title: "Valid from date",
          content: (
            <>
              <p className="govuk-body">
                This is the date that the application is considered a valid
                application. Usually this will be the same as the received date,
                but sometimes applications are submitted incorrectly, and need
                correcting to be valid. This is the date that processing the
                application officially begins.
              </p>
            </>
          ),
        },
        {
          key: slugify("Published date"),
          title: "Published date",
          content: (
            <>
              {" "}
              <p className="govuk-body">
                This is the date the application is registered by the council
                and published on the digital planning register. It may be
                different from the date the application is valid from, as it can
                take time to put a valid application online.
              </p>
            </>
          ),
        },
        {
          key: slugify("Consultation end date"),
          title: "Consultation end date",
          content: (
            <>
              <p className="govuk-body">
                This is the date that the statutory consultation will end for
                the application.
              </p>
              <p className="govuk-body">
                Once an application has been submitted, there are at least 21
                days (excluding bank/public holidays) where the council is not
                permitted to make a decision. This is the statutory consultation
                period. It can go on for longer than 21 days, but it cannot be
                any less.
              </p>
              <p className="govuk-body">
                During this time, comments can be submitted for consideration by
                the planning team. Some councils allow comments to be submitted
                until a decision has been made, but they all must accept
                comments during the consultation.
              </p>
            </>
          ),
        },
        {
          key: slugify("Decision date"),
          title: "Decision date",
          content: (
            <>
              <p className="govuk-body">
                The date the council made a formal decision to grant or refuse
                the planning application.
              </p>
            </>
          ),
        },
      ],
    },
    {
      key: slugify("Appeals process"),
      title: "Appeals process",
      content: (
        <>
          <p className="govuk-body">
            These dates are the important events for applications that are going
            through the appeal process, or have gone through it. Appeals are
            handled by the{" "}
            <Link
              className="govuk-link"
              href="https://www.gov.uk/government/organisations/planning-inspectorate"
            >
              planning inspectorate
            </Link>
            .
          </p>
        </>
      ),
      children: [
        {
          key: slugify("Appeal lodged date"),
          title: "Appeal lodged date",
          content: (
            <>
              <p className="govuk-body">
                The date an appeal was lodged with the planning inspectorate. At
                this stage the appeal still needs to be checked that it valid.
              </p>
            </>
          ),
        },
        {
          key: slugify("Appeal valid from date"),
          title: "Appeal valid from date",
          content: (
            <>
              <p className="govuk-body">
                The date the appeal was confirmed to be valid. This appeal can
                now be examined in detail by the planning inspectorate.
              </p>
            </>
          ),
        },
        {
          key: slugify("Appeal started date"),
          title: "Appeal started date",
          content: (
            <>
              {" "}
              <p className="govuk-body">
                The date the appeal began to be assessed by the planning
                inspectorate.{" "}
                <Link
                  className="govuk-link"
                  href="https://www.gov.uk/guidance/appeals-average-timescales-for-arranging-inquiries-and-hearings"
                >
                  There is guidance available on how long this process is likely
                  to take.
                </Link>
              </p>
            </>
          ),
        },
        {
          key: slugify("Appeal decision date"),
          title: "Appeal decided date",
          content: (
            <>
              {" "}
              <p className="govuk-body">
                The date the planning inspectorate published their decision
                about the appeal. This decision is final.
              </p>
            </>
          ),
        },
      ],
    },
  ];
};

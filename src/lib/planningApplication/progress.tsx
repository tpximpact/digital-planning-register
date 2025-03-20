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

/**
 * The progress of a planning application should always follow the order: received, validated, published, consulted on, (appealed), decided

 * "received",
 * "validFrom",
 * "published",
 * "consultationEnded",
 * "councilDecisionMade",
 * "appealLodged",
 * "appealValidFrom",
 * "appealStarted",
 * "appealDecided",
 * 
 * 
 */

import { ProgressSectionBase } from "@/components/ApplicationProgressInfo/ApplicationProgressInfoSection";
import { DprContentPage, DprPlanningApplication } from "@/types";
import {
  findItemByKey,
  formatDateTimeToDprDate,
  formatDateToDprDate,
  slugify,
} from "@/util";
import { contentImportantDates } from "./date";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const buildApplicationProgress = (
  application: DprPlanningApplication,
): ProgressSectionBase[] => {
  const progressData: ProgressSectionBase[] = [];
  const importantDates = contentImportantDates();

  // 01 received
  if (application.application?.receivedAt) {
    const receivedAtContent = findItemByKey<DprContentPage>(
      importantDates,
      slugify("Received date"),
    )?.content;
    progressData.push({
      title: "Received",
      date: (
        <time dateTime={application.application.receivedAt}>
          {formatDateTimeToDprDate(application.application.receivedAt)}
        </time>
      ),
      content: receivedAtContent ?? <></>,
    });
  }

  // 02 validFrom

  if (application.application?.validAt) {
    const validAtContent = findItemByKey<DprContentPage>(
      importantDates,
      slugify("Valid from date"),
    )?.content;
    progressData.push({
      title: "Valid from",
      date: (
        <time dateTime={application.application.validAt}>
          {formatDateTimeToDprDate(application.application.validAt)}
        </time>
      ),
      content: validAtContent ?? <></>,
    });
  }

  // 03 published

  if (application.application?.publishedAt) {
    const publishedAtContent = findItemByKey<DprContentPage>(
      importantDates,
      slugify("Published date"),
    )?.content;
    progressData.push({
      title: "Published",
      date: (
        <time dateTime={application.application.publishedAt}>
          {formatDateTimeToDprDate(application.application.publishedAt)}
        </time>
      ),
      content: publishedAtContent ?? <></>,
    });
  }

  // 04 consultationEnded

  if (application.application?.consultation?.endDate) {
    const consultationEndDate = dayjs.utc(
      application.application.consultation.endDate,
    );
    const now = dayjs.utc();
    const title = consultationEndDate.isBefore(now, "day")
      ? "Consultation ended"
      : "Consultation ends";

    const consultationEndDateContent = findItemByKey<DprContentPage>(
      importantDates,
      slugify("Consultation end date"),
    )?.content;
    progressData.push({
      title,
      date: formatDateToDprDate(application.application.consultation.endDate),
      content: consultationEndDateContent ?? <></>,
    });
  }

  // 05 councilDecisionMade

  if (
    application.application?.decision &&
    application.application.determinedAt
  ) {
    const councilDecisionMadeContent = findItemByKey<DprContentPage>(
      importantDates,
      slugify("Council decision date"),
    )?.content;
    progressData.push({
      title: "Council decision made",
      date: (
        <time dateTime={application.application.determinedAt}>
          {formatDateTimeToDprDate(application.application.determinedAt)}
        </time>
      ),
      content: councilDecisionMadeContent ?? <></>,
    });
  }

  // 06 appealLodged

  if (application?.data?.appeal?.lodgedDate) {
    const appealLodgedDateContent = findItemByKey<DprContentPage>(
      importantDates,
      slugify("Appeal lodged date"),
    )?.content;
    progressData.push({
      title: "Appeal lodged",
      date: formatDateToDprDate(application.data.appeal.lodgedDate),
      content: appealLodgedDateContent ?? <></>,
    });
  }

  // 07 appealValidFrom

  if (application?.data?.appeal?.validatedDate) {
    const appealValidatedDateContent = findItemByKey<DprContentPage>(
      importantDates,
      slugify("Appeal valid from date"),
    )?.content;
    progressData.push({
      title: "Appeal valid from",
      date: formatDateToDprDate(application.data.appeal.validatedDate),
      content: appealValidatedDateContent ?? <></>,
    });
  }

  // 08 appealStarted

  if (application?.data?.appeal?.startedDate) {
    const appealStartedDateContent = findItemByKey<DprContentPage>(
      importantDates,
      slugify("Appeal started date"),
    )?.content;

    // const appealStartedDateContent = <>hello</>;
    progressData.push({
      title: "Appeal started",
      date: formatDateToDprDate(application.data.appeal.startedDate),
      content: appealStartedDateContent ?? <></>,
    });
  }

  // 09 appealDecided

  if (application?.data?.appeal?.decisionDate) {
    const decisionDateContent = findItemByKey<DprContentPage>(
      importantDates,
      slugify("Appeal decided date"),
    )?.content;
    progressData.push({
      title: "Appeal decided",
      date: formatDateToDprDate(application.data.appeal.decisionDate),
      content: decisionDateContent ?? <></>,
    });
  }

  return progressData;
};

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

  // 01 received
  if (application.application?.receivedDate) {
    progressData.push({
      title: "Received",
      date: formatDateToDprDate(application.application.receivedDate),
      content: findItemByKey<DprContentPage>(
        contentImportantDates(),
        slugify("Received date"),
      )?.content ?? <></>,
    });
  }

  // 02 validFrom

  if (application.application?.validDate) {
    progressData.push({
      title: "Valid from",
      date: formatDateToDprDate(application.application.validDate),
      content: findItemByKey<DprContentPage>(
        contentImportantDates(),
        slugify("Valid from date"),
      )?.content ?? <></>,
    });
  }

  // 03 published

  if (application.application?.publishedDate) {
    progressData.push({
      title: "Published",
      date: formatDateToDprDate(application.application.publishedDate),
      content: findItemByKey<DprContentPage>(
        contentImportantDates(),
        slugify("Published date"),
      )?.content ?? <></>,
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

    progressData.push({
      title,
      date: formatDateToDprDate(application.application.consultation.endDate),
      content: findItemByKey<DprContentPage>(
        contentImportantDates(),
        slugify("Consultation end date"),
      )?.content ?? <></>,
    });
  }

  // 05 councilDecisionMade

  if (
    application.application?.decision &&
    application.application.determinedAt
  ) {
    progressData.push({
      title: "Council decision made",
      date: (
        <time dateTime={application.application.determinedAt}>
          {formatDateTimeToDprDate(application.application.determinedAt)}
        </time>
      ),
      content: findItemByKey<DprContentPage>(
        contentImportantDates(),
        slugify("Decision date"),
      )?.content ?? <></>,
    });
  }

  // 06 appealLodged

  if (application?.data?.appeal?.lodgedDate) {
    progressData.push({
      title: "Appeal lodged",
      date: formatDateToDprDate(application.data.appeal.lodgedDate),
      content: findItemByKey<DprContentPage>(
        contentImportantDates(),
        slugify("Appeal lodged date"),
      )?.content ?? <></>,
    });
  }

  // 07 appealValidFrom

  if (application?.data?.appeal?.validatedDate) {
    progressData.push({
      title: "Appeal valid from",
      date: formatDateToDprDate(application.data.appeal.validatedDate),
      content: findItemByKey<DprContentPage>(
        contentImportantDates(),
        slugify("Appeal valid from date"),
      )?.content ?? <></>,
    });
  }

  // 08 appealStarted

  if (application?.data?.appeal?.startedDate) {
    progressData.push({
      title: "Appeal started",
      date: formatDateToDprDate(application.data.appeal.startedDate),
      content: findItemByKey<DprContentPage>(
        contentImportantDates(),
        slugify("Appeal started date"),
      )?.content ?? <></>,
    });
  }

  // 09 appealDecided

  if (application?.data?.appeal?.decisionDate) {
    progressData.push({
      title: "Appeal decided",
      date: formatDateToDprDate(application.data.appeal.decisionDate),
      content: findItemByKey<DprContentPage>(
        contentImportantDates(),
        slugify("Appeal decided date"),
      )?.content ?? <></>,
    });
  }

  return progressData;
};

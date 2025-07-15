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
import { DprApplication, DprContentPage } from "@/types";
import {
  findItemByKey,
  formatDateTimeToDprDate,
  formatDateToDprDate,
  slugify,
} from "@/util";
import { contentImportantDates } from "./date";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getCouncilDecision, getCouncilDecisionDate } from "./application";
dayjs.extend(utc);

export const buildApplicationProgress = (
  application: DprApplication,
): ProgressSectionBase[] => {
  const progressData: ProgressSectionBase[] = [];
  const importantDates = contentImportantDates();

  // 01 received
  if (application?.data?.validation?.receivedAt) {
    const receivedAtContent = findItemByKey<DprContentPage>(
      importantDates,
      slugify("Received date"),
    )?.content;
    progressData.push({
      title: "Received",
      date: (
        <time dateTime={application?.data?.validation?.receivedAt}>
          {formatDateTimeToDprDate(application?.data?.validation?.receivedAt)}
        </time>
      ),
      content: receivedAtContent ?? <></>,
    });
  }

  // 02 validFrom

  if (application?.data?.validation?.validatedAt) {
    const validAtContent = findItemByKey<DprContentPage>(
      importantDates,
      slugify("Valid from date"),
    )?.content;
    progressData.push({
      title: "Valid from",
      date: (
        <time dateTime={application?.data?.validation?.validatedAt}>
          {formatDateTimeToDprDate(application?.data?.validation?.validatedAt)}
        </time>
      ),
      content: validAtContent ?? <></>,
    });
  }

  // 03 published

  if (application.data.application?.publishedAt) {
    const publishedAtContent = findItemByKey<DprContentPage>(
      importantDates,
      slugify("Published date"),
    )?.content;
    progressData.push({
      title: "Published",
      date: (
        <time dateTime={application.data.application.publishedAt}>
          {formatDateTimeToDprDate(application.data.application.publishedAt)}
        </time>
      ),
      content: publishedAtContent ?? <></>,
    });
  }

  // 04 consultationEnded

  if (application.data?.consultation?.endDate) {
    const consultationEndDate = dayjs.utc(
      application.data.consultation.endDate,
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
      date: formatDateToDprDate(application.data.consultation.endDate),
      content: consultationEndDateContent ?? <></>,
    });
  }

  // 05 councilDecisionMade

  const councilDecisionDate = getCouncilDecisionDate(application);
  if (getCouncilDecision(application) && councilDecisionDate) {
    const councilDecisionMadeContent = findItemByKey<DprContentPage>(
      importantDates,
      slugify("Council decision date"),
    )?.content;
    progressData.push({
      title: "Council decision made",
      date: formatDateTimeToDprDate(councilDecisionDate),
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

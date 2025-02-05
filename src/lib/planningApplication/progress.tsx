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

export const buildApplicationProgress = (
  application: DprPlanningApplication,
): ProgressSectionBase[] => {
  let progressData: ProgressSectionBase[] = [];

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
    progressData.push({
      title: "Consultation ended",
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

  return progressData;
};

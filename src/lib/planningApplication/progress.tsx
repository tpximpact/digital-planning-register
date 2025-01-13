/**
 * The progress of a planning application should always follow the order: recieved, validated, published, consulted on, (appealed), decided

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
import { contentPlanningProcess } from "@/components/PagePlanningProcess";
import { DprContentPage, DprPlanningApplication } from "@/types";
import {
  findItemByKey,
  formatDateTimeToDprDate,
  formatDateToDprDate,
  slugify,
} from "@/util";

export const buildApplicationProgress = (
  application: DprPlanningApplication,
): ProgressSectionBase[] => {
  let progressData: ProgressSectionBase[] = [];

  // 01 received
  if (application.application?.receivedDate) {
    progressData.push({
      title: "Recieved",
      date: formatDateToDprDate(application.application.receivedDate),
      content: findItemByKey<DprContentPage>(
        contentPlanningProcess(),
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
        contentPlanningProcess(),
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
        contentPlanningProcess(),
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
        contentPlanningProcess(),
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
        contentPlanningProcess(),
        slugify("Council decision date"),
      )?.content ?? <></>,
    });
  }

  return progressData;
};

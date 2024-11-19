import { DprContentPage } from "@/types";
import { slugify } from "@/util";
import {
  contentApplicationDecisions,
  contentApplicationStatuses,
  contentApplicationTypes,
} from "@/lib/planningApplication";

export const contentPlanningProcess = (): DprContentPage[] => [
  {
    key: slugify("Application statuses"),
    title: "Application statuses",
    children: contentApplicationStatuses,
  },
  {
    key: slugify("Important dates"),
    title: "Important dates",
    children: [
      {
        key: slugify("Received date"),
        title: "Received date",
        content: (
          <>
            <p className="govuk-body">
              This is the date that the application is received by the council.
              It may not be the date it was sent, if there have been delays in
              the submission process.
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
            <p className="govuk-body">
              This is the date the application is registered by the council and
              published on the digital planning register. It may be different
              from the date the application is valid from, as it can take time
              to put a valid application online.
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
              This is the date that the statutory consultation will end for the
              application.
            </p>
            <p className="govuk-body">
              Once an application has been submitted, there are 21 working days
              where neighbours and the local community must be consulted. This
              is the statutory consultation period. It can go on for longer than
              21 working days, but it cannot be any less.
            </p>
            <p className="govuk-body">
              During this time, comments can be submitted for consideration by
              the planning team. Some councils allow comments to be submitted
              until a decision has been made, but they all must accept comments
              during the consultation.
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
              The date the council made a formal decision to grant or refuse the
              planning application.
            </p>
          </>
        ),
      },
    ],
  },
  {
    key: slugify("Decisions"),
    title: "Decisions",
    children: contentApplicationDecisions,
  },
  {
    key: slugify("Application types"),
    title: "Application types",
    children: contentApplicationTypes,
  },
];

/* eslint-disable react/no-unescaped-entities */

import { getAppConfig } from "@/config";
import { DprContentPage } from "@/types";
import { slugify } from "@/util";

export const contentDecisions = (council?: string): DprContentPage[] => [
  {
    key: slugify("Granted"),
    title: "Granted",
    content: (
      <>
        {" "}
        <p className="govuk-body">
          Planning applications which have been granted are given permission to
          go ahead. The work must begin within three years of approval, unless
          special circumstances apply. If the work is not started within three
          years, another application would need to be submitted.
        </p>
        <p className="govuk-body">
          Granted permissions can be conditional on certain criteria being met.
          These will be published in the decision notice for the application.
        </p>
      </>
    ),
  },
  {
    key: slugify("Refused"),
    title: "Refused",
    content: (
      <>
        {" "}
        <p className="govuk-body">
          Refused planning applications do not have permission to go ahead. The
          applicant is not allowed to perform the work they applied to do. The
          reasons for the rejection will be included in the decision notice for
          the application.
        </p>
        <p className="govuk-body">
          Refused planning applications can be appealed by applicants or their
          agents.
        </p>
      </>
    ),
  },
  {
    key: slugify("Prior approval required and approved"),
    title: "Prior approval required and approved",
    content: (
      <>
        <p className="govuk-body">
          When a{" "}
          <a href={`/${council}/help/application-types#prior-approval`}>
            prior approval
          </a>{" "}
          application has been examined, it was found that the proposal requires
          prior approval, and prior approval has been granted.
        </p>
        <p className="govuk-body">
          This means that the work proposed can go ahead, and does not require
          planning permission.
        </p>
      </>
    ),
  },
  {
    key: slugify("Prior approval not required"),
    title: "Prior approval not required",
    content: (
      <>
        <p className="govuk-body">
          When a{" "}
          <a href={`/${council}/help/application-types#prior-approval`}>
            prior approval
          </a>{" "}
          application has been examined, it was found that the proposal does not
          require prior approval.
        </p>
        <p className="govuk-body">
          This means that the works can go ahead without prior approval or
          planning permission.
        </p>
      </>
    ),
  },
  {
    key: slugify("Prior approval required and refused"),
    title: "Prior approval required and refused",
    content: (
      <>
        {" "}
        <p className="govuk-body">
          When a{" "}
          <a href={`/${council}/help/application-types#prior-approval`}>
            prior approval
          </a>{" "}
          application has been examined, it was found that the proposal requires
          prior approval, and prior approval has been refused.
        </p>
        <p className="govuk-body">
          This means that the work proposed cannot go ahead without submitting
          an application for planning permission.
        </p>
      </>
    ),
  },
];

/* eslint-disable react/no-unescaped-entities */

import { getAppConfig } from "@/config";
import { DprContentPage } from "@/types";
import { slugify } from "@/util";

export const contentApplicationTypes = (council: string): DprContentPage[] => {
  return [
    {
      key: slugify("Householder"),
      title: "Householder",
      content: (
        <>
          <p className="govuk-body">
            Applying for planning permission to make changes to a single house.
            This does not include works to flats.
          </p>
        </>
      ),
    },
    {
      key: slugify("Full planning permission"),
      title: "Full planning permission",
      content: (
        <>
          <p className="govuk-body">
            This is the most common type of planning application. This type can
            be a wide range of different proposals. Most applications are
            covered by two kinds of full planning permission.
          </p>
        </>
      ),
      children: [
        {
          key: slugify("Minor changes of use"),
          title: "Minor changes of use",
          content: (
            <>
              <p className="govuk-body">Applying for planning permission to:</p>
              <ul className="govuk-list govuk-list--bullet">
                <li>extend or alter flats or non-residential property</li>
                <li>change the use of a property</li>
                <li>
                  get permission to construct small buildings, either
                  residential or non-residential
                </li>
              </ul>
            </>
          ),
        },
        {
          key: slugify("Major"),
          title: "Major",
          content: (
            <>
              <p className="govuk-body">
                Applying for planning permission to significantly extend
                buildings, or to construct large buildings. These can be
                residential or non-residential.
              </p>
            </>
          ),
        },
      ],
    },
    {
      key: slugify("Outline planning permission"),
      title: "Outline planning permission",
      content: (
        <>
          <p className="govuk-body">
            Assesses whether the nature of a development is acceptable, saving
            the details for future applications.
          </p>
        </>
      ),
    },
    {
      key: slugify("Lawful development certificate"),
      title: "Lawful development certificate",
      content: (
        <>
          <p className="govuk-body">
            Applying for a certificate which verifies that something being
            proposed, or which has already been built, is lawful.
          </p>
          <p className="govuk-body">
            For existing buildings or changes to buildings, this certificate can
            be applied for retrospectively, and there are many ways that
            something can be deemed lawful in this situation.
          </p>
        </>
      ),
    },
    {
      key: slugify("Prior approval"),
      title: "Prior approval",
      content: (
        <>
          <p className="govuk-body">
            This checks whether the proposal is considered 'permitted
            development' according to national legislation. If the proposal does
            not receive or is not eligible for prior approval, a planning
            application needs to be submitted. If the proposal is considered
            'permitted development' it can be done without further planning
            applications.
          </p>
          <p className="govuk-body">
            This covers a wide range of changes or additions to buildings,
            including:
          </p>
          <ul className="govuk-list govuk-list--bullet">
            <li>certain changes of use</li>
            <li>extensions to buildings</li>
            <li>non-domestic solar panels</li>
            <li>certain demolitions</li>
          </ul>
          <p className="govuk-body">
            You can find out what is eligible for permitted development by
            reading{" "}
            <a
              className="govuk-link"
              href="https://www.gov.uk/guidance/when-is-permission-required#What-are-permitted-development-rights"
              target="_blank"
            >
              the gov.uk guidance on planning.
            </a>
          </p>
        </>
      ),
    },
    {
      key: slugify("Approval of reserved matters"),
      title: "Approval of reserved matters",
      content: (
        <>
          <p className="govuk-body">
            An application for reserved matters provides details of a
            development that has been agreed in principle through outline
            planning permission. The level of details are similar to a full
            planning application.
          </p>
        </>
      ),
    },
    {
      key: slugify("Non-planning consents"),
      title: "Non-planning consents",
      content: (
        <>
          <p className="govuk-body">
            These kinds of applications cover things such as getting consent for
            advertisements, making changes to protected trees, or dealing with
            hazardous substances. The description of these application types
            will provide more information about them.
          </p>
        </>
      ),
    },
  ];
};

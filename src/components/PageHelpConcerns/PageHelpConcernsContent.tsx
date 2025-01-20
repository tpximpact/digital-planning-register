/* eslint-disable react/no-unescaped-entities */

import { getAppConfig } from "@/config";
import { DprContentPage } from "@/types";
import { slugify } from "@/util";
import Link from "next/link";
import { title } from "process";

export const contentConcerns = (council: string): DprContentPage[] => {
  const appConfig = getAppConfig(council);
  const parkingLink =
    appConfig?.council?.pageContent?.help?.concerns?.parking_link;
  const buildingControlLink =
    appConfig?.council?.pageContent?.help?.concerns?.building_control_link;
  const housingRepairLink =
    appConfig?.council?.pageContent?.help?.concerns?.housing_repair_link;
  const streetIssuesLink =
    appConfig?.council?.pageContent?.help?.concerns?.street_issues_link;
  const abandonedVehiclesLink =
    appConfig?.council?.pageContent?.help?.concerns?.abandoned_vehicles_link;
  const flyTippingLink =
    appConfig?.council?.pageContent?.help?.concerns?.fly_tipping_link;
  const noiseLink = appConfig?.council?.pageContent?.help?.concerns?.noise_link;
  const licensingLink =
    appConfig?.council?.pageContent?.help?.concerns?.licensing_link;
  const applyForBuildingControlRegularisationLink =
    appConfig?.council?.pageContent?.help?.concerns
      ?.apply_for_building_control_regularisation_link;
  const contactCouncilLink = appConfig?.council?.contact;
  return [
    {
      key: slugify("Loss of property value"),
      title: "Loss of property value",
      content: (
        <>
          {" "}
          <p className="govuk-body">
            This is not something the council or government can address at this
            time. If this is something you feel strongly about, we can suggest
            contacting your local councillors or MP.
          </p>
        </>
      ),
    },
    {
      key: slugify("Disputes about civil matters"),
      title: "Disputes about civil matters",
      content: (
        <>
          <p className="govuk-body">These sort of matters include:</p>
          <ul className="govuk-list govuk-list--bullet">
            <li>Personal disputes with neighbours</li>
            <li>Disputes around 'right to light'</li>
          </ul>
          <p className="govuk-body">
            These are concerned with the private affairs of citizens. If you are
            concerned about one or more of these issues, it is recommended that
            you seek legal advice or contact{" "}
            <a
              className="govuk-link"
              href="https://www.citizensadvice.org.uk/"
              target="_blank"
            >
              Citizens Advice
            </a>
            .
          </p>
          <p className="govuk-body">
            You can also find{" "}
            <a
              href="https://www.gov.uk/government/publications/rights-to-light"
              target="_blank"
              className="govuk-link"
            >
              additional information about 'right to light' on gov.uk
            </a>
          </p>
        </>
      ),
    },
    {
      key: slugify("Property and ownership disputes"),
      title: "Property and ownership disputes",
      content: (
        <>
          <p className="govuk-body">These sort of disputes include:</p>
          <ul className="govuk-list govuk-list--bullet">
            <li>Property boundary disputes</li>
            <li>Property ownership disputes</li>
            <li>Party wall disputes</li>
          </ul>
          <p className="govuk-body">
            These are concerned with the private affairs of citizens. If you are
            concerned about one or more of these issues, it is recommended that
            you seek legal advice or contact{" "}
            <a
              className="govuk-link"
              href="https://www.citizensadvice.org.uk/"
              target="_blank"
            >
              Citizens Advice
            </a>
            .
          </p>
          <p className="govuk-body">
            You can also refer to{" "}
            <a
              className="govuk-link"
              href="https://www.gov.uk/party-walls-building-works"
              target="_blank"
            >
              the government's advice on party wall disputes
            </a>
            .
          </p>
          <p className="govuk-body">
            You may also find the records available at{" "}
            <a
              className="govuk-link"
              href="https://www.gov.uk/government/organisations/land-registry"
              target="_blank"
            >
              HM Land Registry
            </a>{" "}
            may help resolve some of these disputes.
          </p>
        </>
      ),
    },
    {
      key: slugify("Views"),
      title: "Views",
      content: (
        <>
          <p className="govuk-body">
            Most changes to views are not protected by law or considered by
            planning officers. This is not something the council or government
            can address at this time. If this is something you feel strongly
            about, we can suggest contacting your local councillors or MP.
          </p>
          <p className="govuk-body">
            There are some legally protected views. If you are concerned about
            something related to a protected view, please raise it as a comment
            on the relevant application.
          </p>
        </>
      ),
    },
    {
      key: slugify("Other council matters"),
      title: "Other council matters",
      content: (
        <>
          <p className="govuk-body">
            There are matters that may seem to be relevant to planning, but
            which are actually addressed by other local government departments.
          </p>
        </>
      ),
      children: [
        {
          key: slugify("Parking"),
          title: "Parking",
          content: (
            <>
              <p className="govuk-body">
                Changes to parking as part of a planning application are
                considered by planning officers during assessment. But if you
                have concerns about existing parking arrangements, you can find
                more information about who to contact{" "}
                <a
                  href="https://www.camden.gov.uk/parking"
                  className="govuk-link"
                >
                  on your council's website
                </a>
                .
              </p>
            </>
          ),
        },
        {
          key: slugify("Damaged or unsafe buildings"),
          title: "Damaged or unsafe buildings",
          content: (
            <>
              <p className="govuk-body">This includes:</p>
              <ul className="govuk-list govuk-list--bullet">
                <li>Existing property damage</li>
                <li>Structures in danger of collapse</li>
              </ul>
              <p className="govuk-body">
                If you have concerns relating to an existing building which
                poses a current safety risk, please{" "}
                {buildingControlLink ? (
                  <Link
                    className="govuk-link"
                    href={buildingControlLink}
                    target="_blank"
                  >
                    report this to the council
                  </Link>
                ) : (
                  <span>report this to the council</span>
                )}
                .
              </p>
            </>
          ),
        },
        {
          key: slugify("Repairs needed to council housing"),
          title: "Repairs needed to council housing",
          content: (
            <>
              <p className="govuk-body">This includes:</p>
              <ul className="govuk-list govuk-list--bullet">
                <li>Emergency repairs such as gas or water leaks</li>
                <li>Mould</li>
                <li>Non-emergency repairs</li>
              </ul>
              <p className="govuk-body">
                If you have concerns relating to council housing in need of
                repair, please{" "}
                {housingRepairLink ? (
                  <Link
                    className="govuk-link"
                    href={housingRepairLink}
                    target="_blank"
                  >
                    report this to the council
                  </Link>
                ) : (
                  <span>report this to the council</span>
                )}
                .
              </p>
            </>
          ),
        },
        {
          key: slugify("Damage to highways"),
          title: "Damage to highways",
          content: (
            <>
              <p className="govuk-body">
                {" "}
                If you have concerns about a road which you believe poses a
                current safety risk, please{" "}
                {streetIssuesLink ? (
                  <Link
                    className="govuk-link"
                    href={streetIssuesLink}
                    target="_blank"
                  >
                    report this to the council
                  </Link>
                ) : (
                  <span>report this to the council</span>
                )}
                .
              </p>
            </>
          ),
        },
        {
          key: slugify("Abandoned vehicles"),
          title: "Abandoned vehicles",
          content: (
            <>
              {" "}
              <p className="govuk-body">
                {" "}
                If you have concerns about a vehicle you believe has been
                abandoned, please{" "}
                {abandonedVehiclesLink ? (
                  <Link
                    className="govuk-link"
                    href={abandonedVehiclesLink}
                    target="_blank"
                  >
                    report this to the council
                  </Link>
                ) : (
                  <span>report this to the council</span>
                )}
                .
              </p>
            </>
          ),
        },
        {
          key: slugify("Fly tipping"),
          title: "Fly tipping",
          content: (
            <>
              <p className="govuk-body">
                If you have concerns about illegally dumped rubbish, please{" "}
                {flyTippingLink ? (
                  <Link
                    className="govuk-link"
                    href={flyTippingLink}
                    target="_blank"
                  >
                    report this to the council
                  </Link>
                ) : (
                  <span>report this to the council</span>
                )}
                .
              </p>
            </>
          ),
        },
        {
          key: slugify("Noise and other nuisances"),
          title: "Noise and other nuisances",
          content: (
            <>
              <p className="govuk-body">This includes:</p>
              <ul className="govuk-list govuk-list--bullet">
                <li>Noise</li>
                <li>Smoke</li>
                <li>Dust</li>
                <li>Odour</li>
                <li>Light pollution</li>
              </ul>
              <p className="govuk-body">
                If you have concerns about any of these issues, please{" "}
                {noiseLink ? (
                  <Link className="govuk-link" href={noiseLink} target="_blank">
                    report this to the council
                  </Link>
                ) : (
                  <span>report this to the council</span>
                )}
                .
              </p>
            </>
          ),
        },
        {
          key: slugify("Licensing"),
          title: "Licensing",
          content: (
            <>
              <p className="govuk-body">
                If you are concerned about a building or business operating
                without a licence, or believe a building is in violation of its
                licence, you should{" "}
                {licensingLink ? (
                  <Link
                    className="govuk-link"
                    href={licensingLink}
                    target="_blank"
                  >
                    report this to the council
                  </Link>
                ) : (
                  <span>report this to the council</span>
                )}
                .
              </p>
            </>
          ),
        },
        {
          key: slugify("Regularisation certificates"),
          title: "Regularisation certificates",
          content: (
            <>
              {" "}
              <p className="govuk-body">
                If you need a regularisation certificate for work done to a
                property, you can{" "}
                {applyForBuildingControlRegularisationLink ? (
                  <Link
                    className="govuk-link"
                    href={applyForBuildingControlRegularisationLink}
                    target="_blank"
                  >
                    apply via your council
                  </Link>
                ) : (
                  <span>apply via your council</span>
                )}
                .
              </p>
            </>
          ),
        },
        {
          key: slugify("Other concerns"),
          title: "Other concerns",
          content: (
            <>
              {" "}
              <p className="govuk-body">
                If you are unsure who to contact about your concern, general
                enquiries can be made to{" "}
                {contactCouncilLink ? (
                  <Link
                    className="govuk-link"
                    href={contactCouncilLink}
                    target="_blank"
                  >
                    {appConfig.council?.name} council
                  </Link>
                ) : (
                  <span>{appConfig.council?.name} council</span>
                )}
              </p>
            </>
          ),
        },
      ],
    },
  ];
};

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

import Link from "next/link";

export const PageAccessibilityStatement = () => {
  return (
    <div className="dpr-accessibility-statement grid-row-extra-bottom-margin">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-l">Accessibility statement</h1>
          <p className="govuk-body">
            Open Digital Planning (ODP) is committed to making its website
            accessible, in accordance with the Public Sector Bodies (Websites
            and Mobile Applications) (No. 2) Accessibility Regulations 2018.
          </p>

          <p className="govuk-body">
            This accessibility statement applies to the Digital Planning
            Register (DPR) at planningregister.org.
          </p>

          <p className="govuk-body">
            This website is run by{" "}
            <Link
              className="govuk-link"
              href="https://opendigitalplanning.org/"
            >
              Open Digital Planning (ODP)
            </Link>{" "}
            funded by the Ministry of Housing, Communities and Local Government
            (MHCLG).
          </p>
          <p className="govuk-body">
            We want as many people as possible to be able to use this website.
            For example, that means you should be able to:
          </p>
          <ul className="govuk-list govuk-list--bullet">
            <li>
              Change colours, contrast levels and fonts using browser or device
              settings
            </li>
            <li>Zoom in up to 400% without the text spilling off the screen</li>
            <li>
              Navigate most of the website using a keyboard or speech
              recognition software
            </li>
            <li>
              Listen to most of the website using a screen reader (including the
              most recent versions of JAWS, NVDA and VoiceOver)
            </li>
          </ul>

          <p className="govuk-body">
            We&apos;ve also made the website text as simple as possible to
            understand.
          </p>

          <p className="govuk-body">
            <Link className="govuk-link" href="https://mcmw.abilitynet.org.uk/">
              AbilityNet
            </Link>{" "}
            has advice on making your device easier to use if you have a
            disability.
          </p>

          <h2 className="govuk-heading-m">Compliance status</h2>

          <p className="govuk-body">
            This website is fully compliant with the Web Content Accessibility
            Guidelines (WCAG) version 2.2 AA standard.
          </p>

          <p className="govuk-body">
            This website was last tested on 27th February 2025. The test was
            carried out independently by Digital Accessibility Centre (DAC) and
            included:
          </p>

          <ul className="govuk-list govuk-list--bullet">
            <li>Manual testing using common assistive technologies.</li>
            <li>User testing with disabled people.</li>
            <li>Browser and Assistive Technology (AT) combinations.</li>
          </ul>

          <p className="govuk-body">
            If you find any problems not listed on this page or think we&apos;re
            not meeting accessibility requirements, please contact us using the
            feedback form.
          </p>

          <p className="govuk-body">
            When contacting about accessibility issues, please specify:
          </p>

          <ul className="govuk-list govuk-list--bullet">
            <li>
              The URL (web address) of the content you&apos;re having problems
              with.
            </li>
            <li>
              The local planning authority if relating to specific planning
              content.
            </li>
            <li>Your name and email address.</li>
            <li>The device and software you&apos;re using.</li>
            <li>
              What the problem is and how it affects your use of the service.
            </li>
          </ul>

          <p className="govuk-body">
            Please note that each local planning authority is responsible for:
          </p>

          <ul className="govuk-list govuk-list--bullet">
            <li>The content of their planning applications.</li>
            <li>Processing planning applications.</li>
            <li>Responding to queries about specific applications.</li>
            <li>
              Providing accessible alternatives for their planning documents.
            </li>
          </ul>

          <h2 className="govuk-heading-m">Enforcement procedure</h2>

          <p className="govuk-body">
            The Equality and Human Rights Commission (EHRC) is responsible for
            enforcing the Public Sector Bodies (Websites and Mobile
            Applications) (No. 2) Accessibility Regulations 2018 (the
            &apos;accessibility regulations&apos;).
          </p>

          <p className="govuk-body">
            If you&apos;re not happy with how we respond to your complaint,
            contact the{" "}
            <Link
              className="govuk-link"
              href="https://www.equalityadvisoryservice.com/"
            >
              Equality Advisory and Support Service (EASS)
            </Link>
            .
          </p>

          <h2 className="govuk-heading-m">
            Preparation of this accessibility statement
          </h2>

          <p className="govuk-body">
            This statement was first prepared on 27th February 2025. The
            statement was last reviewed on 27th February 2025.
          </p>

          <p className="govuk-body">
            This website was last tested on 27th February 2025 against the WCAG
            2.2 AA standard.
          </p>

          <p className="govuk-body">
            The test was carried out by Digital Accessibility Centre.
          </p>

          <p className="govuk-body">
            Read the full{" "}
            <Link
              className="govuk-link"
              href={`/assets/accessibility-report-digital-planning-register-27-02-2025.pdf`}
            >
              accessibility report here
            </Link>
            . Please note this document is a PDF and may not be suitable for
            users of assistive technology.
          </p>
        </div>
      </div>
    </div>
  );
};

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

import { Council } from "@/config/types";
import { capitalizeFirstLetter } from "@/util";
import { SummaryList } from "@/components/govuk/SummaryList";
import { SummaryCard } from "@/components/govuk/SummaryCard";
import { councilLogos } from "@/components/CouncilLogos";

export interface CouncilDetailProps {
  council: Council;
}

export const CouncilPageContentList = ({
  content,
}: {
  content: Council["pageContent"];
}) => {
  if (!content || typeof content !== "object") return null;

  /**
   * Generic function to render a list of key-value pairs
   * for the council page content.
   * @param obj
   * @returns
   */
  const renderList = (obj: Council["pageContent"]) => (
    <ul className="govuk-list govuk-list--bullet govuk-list--indented">
      {Object.entries(obj).map(([key, value]) => (
        <li key={key}>
          <strong>{capitalizeFirstLetter(key.replace(/_/g, " "))}:</strong>{" "}
          {Array.isArray(value) ? (
            <ul>
              {value.map((item, idx) => (
                <li key={idx}>
                  {typeof item === "object" && item !== null
                    ? renderList(item as Council["pageContent"])
                    : String(item)}
                </li>
              ))}
            </ul>
          ) : typeof value === "object" && value !== null ? (
            renderList(value as Council["pageContent"])
          ) : typeof value === "string" ? (
            (value as string).startsWith("http") ? (
              <a href={value as string} className="govuk-link">
                {value}
              </a>
            ) : (
              value
            )
          ) : (
            String(value)
          )}
        </li>
      ))}
    </ul>
  );

  return renderList(content);
};

export const CouncilDetail = ({ council }: CouncilDetailProps) => {
  return (
    <SummaryCard
      title={{ text: council.name }}
      key={council.slug}
      id={council.slug}
      actions={{
        items: [
          {
            href: `/${council.slug}`,
            text: `View in planning register`,
            visuallyHiddenText: ` for ${council.name}`,
          },
          {
            href: `/admin/council/applications?council=${council.slug}`,
            text: `View applications`,
            visuallyHiddenText: ` for ${council.name}`,
          },
        ],
      }}
    >
      <SummaryList
        rows={[
          {
            key: { text: "Logo" },
            value: {
              text: (
                <div style={{ width: "300px" }}>
                  {councilLogos[council.slug]}
                </div>
              ),
            },
          },
          {
            key: { text: "Slug" },
            value: {
              text: (
                <>
                  <code>{council.slug}</code>
                </>
              ),
            },
          },
          {
            key: { text: "Visibility" },
            value: { text: council.visibility },
          },
          {
            key: { text: "Data source" },
            value: { text: council.dataSource },
          },
          {
            key: { text: "Public comments enabled?" },
            value: { text: council.publicComments ? "true" : "false" },
          },
          {
            key: { text: "Specialist comments enabled?" },
            value: {
              text: council.specialistComments ? "true" : "false",
            },
          },
          {
            key: { text: "Contact" },
            value: {
              text: council.contact ? (
                <a href={`${council.contact}`} className="govuk-link">
                  {council.contact}
                </a>
              ) : (
                "Not set"
              ),
            },
          },
          {
            key: { text: "Features" },
            value: {
              text: (
                <>
                  {council.features ? (
                    <>
                      <p className="govuk-body">
                        <strong>Logo in header:</strong>{" "}
                        {council.features.logoInHeader ? "true" : "false"}
                      </p>
                    </>
                  ) : (
                    "None set"
                  )}
                </>
              ),
            },
          },
          {
            key: { text: "Page content" },
            value: {
              text: (
                <>
                  {council.pageContent ? (
                    <>
                      <CouncilPageContentList content={council.pageContent} />
                    </>
                  ) : (
                    "None set"
                  )}
                </>
              ),
            },
          },
        ]}
      />
    </SummaryCard>
  );
};

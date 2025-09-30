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

import { SpecialistRedacted } from "digital-planning-data-schemas/types/schemas/postSubmissionApplication/data/SpecialistComment.js";
import "./SpecialistDetailsCard.scss";
import { ApplicationDataField } from "../ApplicationDataField";
import { SpecialistReason } from "../SpecialistReason";
import {
  capitalizeFirstLetter,
  formatDateTimeToDprDate,
  pascalToSentenceCase,
} from "@/util";

export interface SpecialistDetailsCardProps {
  specialist: SpecialistRedacted;
}

export const SpecialistDetailsCard = ({
  specialist,
}: SpecialistDetailsCardProps) => {
  return (
    <div className="govuk-grid-row dpr-specialist-details-card">
      <div className="govuk-grid-column-full">
        <dl className="dpr-specialist-details-card__fields">
          {specialist.name.singleLine && (
            <ApplicationDataField
              title="Consultee Name"
              value={specialist.name.singleLine}
            />
          )}

          {specialist.organisationSpecialism && (
            <ApplicationDataField
              title="Organisation / Specialism"
              value={specialist.organisationSpecialism}
            />
          )}

          {specialist.reason && (
            <ApplicationDataField
              title="Reason / Constraint"
              value={
                <SpecialistReason
                  reason={specialist.reason}
                  constraints={specialist.constraints}
                />
              }
            />
          )}

          {specialist.firstConsultedAt && (
            <ApplicationDataField
              title="Date consulted"
              value={
                <time dateTime={specialist.firstConsultedAt}>
                  {formatDateTimeToDprDate(specialist.firstConsultedAt)}
                </time>
              }
            />
          )}

          {Array.isArray(specialist.comments) &&
            specialist.comments.length > 0 &&
            specialist.comments[0].sentiment && (
              <ApplicationDataField
                title="Sentiment towards application"
                value={capitalizeFirstLetter(
                  pascalToSentenceCase(specialist.comments[0].sentiment),
                )}
              />
            )}
        </dl>
      </div>
    </div>
  );
};

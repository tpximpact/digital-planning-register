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

import { checkCommentsEnabled } from "@/lib/comments";
import { DprApplication } from "@/types";
import { generateDprApplication } from "@mocks/dprNewApplicationFactory";

describe("checkCommentsEnabled", () => {
  it("Application not in consultation should now allow comments", () => {
    const application = generateDprApplication({
      customStatus: "assessmentInProgress",
    });
    application.data.localPlanningAuthority.commentsAcceptedUntilDecision =
      false;

    const commentsEnabled = checkCommentsEnabled(application);
    expect(commentsEnabled).toBe(false);
  });

  it("Application in consultation should allow comments", () => {
    const application = generateDprApplication({
      applicationType: "pp.full.householder", // explicitly choose a type that allows consultation
      customStatus: "consultationInProgress",
    });

    const commentsEnabled = checkCommentsEnabled(application);
    expect(commentsEnabled).toBe(true);
  });

  it("Application not in consultation and not yet determined but which the LPA allows comments until determination should allow comments", () => {
    const application = generateDprApplication({
      customStatus: "assessmentInProgress",
    });
    application.data.localPlanningAuthority.commentsAcceptedUntilDecision =
      true;

    const commentsEnabled = checkCommentsEnabled(application);
    expect(commentsEnabled).toBe(true);
  });

  it("Application determined but which the LPA allows comments until determination should not allow comments", () => {
    const application = generateDprApplication({
      customStatus: "assessmentCouncilDetermined",
    });
    application.data.localPlanningAuthority.commentsAcceptedUntilDecision =
      true;

    const commentsEnabled = checkCommentsEnabled(application);
    expect(commentsEnabled).toBe(false);
  });
});

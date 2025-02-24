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
import { DprPlanningApplication } from "@/types";
import { formatDateToYmd } from "@/util";

describe("checkCommentsEnabled", () => {
  it("Application not in consultation should now allow comments", () => {
    const today = new Date();
    const startDate = formatDateToYmd(new Date(today.getTime() - 86400000 * 2));
    const endDate = formatDateToYmd(new Date(today.getTime() - 86400000));
    const application = {
      applicationType: "pp.full",
      data: {
        localPlanningAuthority: {
          commentsAcceptedUntilDecision: false,
        },
      },
      application: {
        status: "determined",
        consultation: {
          startDate,
          endDate,
        },
      },
    };
    const commentsEnabled = checkCommentsEnabled(
      application as unknown as DprPlanningApplication,
    );
    expect(commentsEnabled).toBe(false);
  });

  it("Application in consultation should allow comments", () => {
    const today = new Date();
    const startDate = formatDateToYmd(new Date(today.getTime() - 86400000));
    const endDate = formatDateToYmd(new Date(today));
    const application = {
      applicationType: "pp.full",
      data: {
        localPlanningAuthority: {
          commentsAcceptedUntilDecision: false,
        },
      },
      application: {
        status: "in_assessment",
        consultation: {
          startDate,
          endDate,
        },
      },
    };
    const commentsEnabled = checkCommentsEnabled(
      application as unknown as DprPlanningApplication,
    );
    expect(commentsEnabled).toBe(true);
  });

  it("Application not in consultation and not yet determined but which the LPA allows comments until determination should allow comments", () => {
    const application = {
      applicationType: "pp.full",
      data: {
        localPlanningAuthority: {
          commentsAcceptedUntilDecision: true,
        },
      },
      application: {
        status: "in_assessment",
        consultation: {
          startDate: undefined,
          endDate: undefined,
        },
      },
    };
    const commentsEnabled = checkCommentsEnabled(
      application as unknown as DprPlanningApplication,
    );
    expect(commentsEnabled).toBe(true);
  });

  it("Application determined but which the LPA allows comments until determination should not allow comments", () => {
    const application = {
      applicationType: "pp.full",
      data: {
        localPlanningAuthority: {
          commentsAcceptedUntilDecision: true,
        },
      },
      application: {
        status: "determined",
        consultation: {
          startDate: undefined,
          endDate: undefined,
        },
      },
    };
    const commentsEnabled = checkCommentsEnabled(
      application as unknown as DprPlanningApplication,
    );
    expect(commentsEnabled).toBe(false);
  });
});

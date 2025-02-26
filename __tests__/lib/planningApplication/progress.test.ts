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

import { buildApplicationProgress } from "@/lib/planningApplication/progress";
import { generateDprApplication } from "@mocks/dprApplicationFactory";

describe("buildApplicationProgress", () => {
  it('should show "Consultation ended" when consultation end date is in the past', () => {
    const application = generateDprApplication();
    application.application.consultation.endDate = new Date(
      Date.now() - 86400000,
    ).toISOString();
    const progressData = buildApplicationProgress(application);
    expect(progressData[3].title).toBe("Consultation ended");
  });
  it('should show "Consultation ends" when consultation end date is in the future', () => {
    const application = generateDprApplication();
    application.application.consultation.endDate = new Date(
      Date.now() + 86400000,
    ).toISOString();
    const progressData = buildApplicationProgress(application);
    expect(progressData[3].title).toBe("Consultation ends");
  });
});

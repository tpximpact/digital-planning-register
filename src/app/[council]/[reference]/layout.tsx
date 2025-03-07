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

import { getAppConfig } from "@/config";
import { ReactNode } from "react";

/**
 * genertes default title for every page undeer this
 * @param param0
 * @returns
 */
export async function generateMetadata({
  params,
}: {
  params: { council: string; reference: string };
}) {
  const { reference, council } = params;
  const councilName = getAppConfig(council)?.council?.name ?? "";

  return {
    title: `Application ${reference} | ${councilName} Digital Planning Register`,
    description: `${councilName} planning application ${reference}`,
  };
}

export default function ReferenceLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

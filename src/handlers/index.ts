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
import { createExternalHandler } from "./external";
import { bopsExtras } from "./external/bops";
import { localHandler } from "./local";
import type { ApiHandler } from "./types";

export type { ApiHandler } from "./types";

/**
 * Handlers by the council's `dataSource` config value.
 *
 * There are only two kinds, `local` and `external`. A source that needs a few
 * extra steps (like bops) is the external handler plus its own extras.
 */
const handlers: Readonly<Record<string, ApiHandler>> = {
  local: localHandler,
  external: createExternalHandler("external"),
  bops: createExternalHandler("bops", bopsExtras),
};

/**
 * Looks up the handler for a council from the app config.
 * Returns undefined when the council has no (known) data source.
 */
export const resolveHandler = (council: string): ApiHandler | undefined => {
  const source = getAppConfig(council).council?.dataSource ?? "none";
  return Object.hasOwn(handlers, source) ? handlers[source] : undefined;
};

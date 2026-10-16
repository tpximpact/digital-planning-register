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

import type { SearchParamsApplication } from "@/types";

type Key<T> = keyof T & string;

export interface QuerySpec<T> {
  /** Params copied to the query string when they hold a value */
  keys: readonly Key<T>[];
  /** Query string name, where it differs from the param name */
  rename?: Partial<Record<Key<T>, string>>;
  /** Value used when the param is missing */
  defaults?: Partial<Record<Key<T>, string | number>>;
  /** Pairs that are only sent together, e.g. a from/to date range */
  pairs?: readonly (readonly [Key<T>, Key<T>])[];
}

const hasValue = (value: unknown) =>
  value !== undefined && value !== null && value !== "";

/**
 * Builds a query string (including the leading `?`, or "" when empty) from a
 * params object using a declarative spec, instead of one `if` per param.
 */
export function buildQuery<T extends object>(
  params: T | undefined,
  spec: QuerySpec<T>,
  extra: Record<string, string> = {},
): string {
  if (!params) return "";

  const query = new URLSearchParams();

  const set = (key: Key<T>) => {
    const value = hasValue(params[key]) ? params[key] : spec.defaults?.[key];
    if (hasValue(value)) query.set(spec.rename?.[key] ?? key, String(value));
  };

  spec.keys.forEach(set);

  for (const [from, to] of spec.pairs ?? []) {
    if (hasValue(params[from]) && hasValue(params[to])) {
      set(from);
      set(to);
    }
  }

  for (const [name, value] of Object.entries(extra)) {
    query.set(name, value);
  }

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

/* -------------------------------------------------------------------------- */
/*  Application search date ranges                                            */
/* -------------------------------------------------------------------------- */

const isoDate = (date: Date) => date.toISOString().slice(0, 10);

const rangeStart = (today: Date, range: string): Date | undefined => {
  const date = new Date(today);
  switch (range) {
    case "week":
      date.setDate(date.getDate() - 7);
      return date;
    case "month":
      date.setMonth(date.getMonth() - 1);
      return date;
    case "quarter":
      date.setMonth(date.getMonth() - 3);
      return date;
    case "year":
      date.setFullYear(date.getFullYear() - 1);
      return date;
    default:
      return undefined;
  }
};

/**
 * Turns `dateType` + `dateRange` into the `<dateType>From` / `<dateType>To`
 * params the backend expects. Returns {} when there is nothing to filter on.
 */
export function resolveDateRange(
  params?: Pick<
    SearchParamsApplication,
    "dateType" | "dateRange" | "dateRangeFrom" | "dateRangeTo"
  >,
): Record<string, string> {
  if (!params?.dateType || !params.dateRange) return {};

  const { dateType, dateRange } = params;
  const today = new Date();

  let from: string | undefined;
  let to: string | undefined = isoDate(today);

  if (dateRange === "fixed") {
    from = params.dateRangeFrom;
    to = params.dateRangeTo;
  } else {
    const start = rangeStart(today, dateRange);
    from = start && isoDate(start);
  }

  return from && to ? { [`${dateType}From`]: from, [`${dateType}To`]: to } : {};
}

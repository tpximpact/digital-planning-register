import { AllowedPropertyValues } from "../utils";
import { eventGtm } from "./gtm";

export function event(
  name: string,
  properties?: Record<string, AllowedPropertyValues>,
): void {
  eventGtm(name, properties);
}

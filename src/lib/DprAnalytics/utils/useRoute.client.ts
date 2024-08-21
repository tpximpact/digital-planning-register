"use client";
import { useParams, usePathname, useSearchParams } from "next/navigation.js";
import { computeRoute } from ".";

export const useRoute = (): {
  route: string | null;
  path: string;
} => {
  const params = useParams();
  const searchParams = useSearchParams();
  const path = usePathname();

  const finalParams = {
    ...Object.fromEntries(searchParams.entries()),
    ...(params || {}),
  };

  return {
    route: params ? computeRoute(path, finalParams) : null,
    path,
  };
};

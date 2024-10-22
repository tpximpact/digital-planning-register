import { PageCookiePolicy } from "@/components/PageCookiePolicy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies",
};

const Cookies = () => {
  return <PageCookiePolicy />;
};

export default Cookies;

import { trackServer } from "@/lib/DprAnalytics";

export const AServerComponent = () => {
  trackServer("A server component was rendered", {
    message: "This is a message from the server component",
  });
  return (
    <p className="govuk-body">
      A client component and server component walk into a bar...I&apos;ll log
      that says the DprAnalytics component
    </p>
  );
};

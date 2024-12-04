import { Button } from "@/components/button";

interface BackButtonProps {
  baseUrl: string;
  searchParams?: Record<string, string>;
  className?: string;
}

export const BackButton = ({
  baseUrl,
  searchParams,
  className = "",
}: BackButtonProps) => {
  const href = baseUrl
    ? searchParams
      ? {
          pathname: baseUrl,
          query: searchParams,
        }
      : baseUrl
    : "#";

  return (
    <Button
      element="link"
      href={href}
      className={`govuk-back-link ${className}`.trim()}
      variant="text-only"
    >
      Back
    </Button>
  );
};

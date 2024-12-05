import Link from "next/link";

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
    <Link href={href} className={`govuk-back-link ${className}`.trim()}>
      Back
    </Link>
  );
};

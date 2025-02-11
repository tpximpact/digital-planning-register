import Link from "next/link";
import "./InfoIcon.scss";
import { useId } from "react";

interface InfoIconProps {
  href: string;
  title: string;
  ariaLabel?: string;
  className?: string;
}

export const InfoIcon = ({
  href,
  title,
  ariaLabel,
  className = "",
}: InfoIconProps) => {
  if (!href) {
    return null;
  }

  if (!ariaLabel) {
    ariaLabel = title;
  }

  return (
    <Link
      className={`info-icon ${className}`.trim()}
      href={href}
      title={title}
      aria-label={ariaLabel}
    >
      <InfoIconSvg />
      <span className="govuk-visually-hidden">{title}</span>
    </Link>
  );
};

export const InfoIconSvg = () => {
  const maskId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 200 200"
      width="20"
      height="20"
      role="img"
      aria-hidden="true"
    >
      <g clipPath={`url(#${maskId})`}>
        <mask
          id={maskId}
          width="240"
          height="240"
          x="-20"
          y="-20"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <path
            fill="currentColor"
            d="M99.975-20a120 120 0 1 1 0 240 120 120 0 0 1 0-240Zm17.999 73.675c8.913 0 16.147-6.188 16.147-15.36 0-9.17-7.251-15.358-16.147-15.358-8.914 0-16.113 6.188-16.113 15.359 0 9.17 7.199 15.359 16.113 15.359Zm3.137 96.456c0-1.834.634-6.6.274-9.308l-14.09 16.216c-2.914 3.068-6.566 5.194-8.28 4.628a3.48 3.48 0 0 1-2.211-3.943l23.484-74.188c1.92-9.411-3.36-18-14.553-19.096-11.81 0-29.192 11.982-39.769 27.186 0 1.817-.343 6.343.017 9.051l14.073-16.233c2.915-3.034 6.309-5.177 8.023-4.594a3.429 3.429 0 0 1 2.091 4.32l-23.278 73.829c-2.691 8.639 2.4 17.107 14.742 19.027 18.17 0 28.9-11.691 39.494-26.895h-.017Z"
          />
        </mask>
        <g mask={`url(#${maskId})`}>
          <circle cx="100" cy="100" r="100" fill="currentColor" />
        </g>
      </g>
    </svg>
  );
};

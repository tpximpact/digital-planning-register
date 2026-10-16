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

// ============= New Button Components =============
import "./Button.scss";
import Link from "next/link";

// The types for the Button component are defined here
type ButtonElement = "button" | "link" | "span" | "div";
type ButtonVariant =
  | "primary"
  | "secondary"
  | "default"
  | "information"
  | "warning"
  | "text-only";

type LinkHref =
  | string
  | {
      pathname: string;
      query?: Record<string, string>;
    };

interface ButtonProps {
  children: React.ReactNode;
  element?: ButtonElement;
  type?: "button" | "submit" | "reset";
  href?: LinkHref;
  className?: string;
  onClick?: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement | HTMLDivElement
  >;
  ariaLabel?: string;
  variant?: ButtonVariant;
  value?: string;
  name?: string;
}

export const Button = ({
  children,
  element = "button",
  type = "button",
  href,
  className = "",
  onClick,
  ariaLabel,
  variant = "default",
  value,
  name,
}: ButtonProps) => {
  const getVariantClass = (variant: ButtonVariant) => {
    switch (variant) {
      case "primary":
        return "govuk-button--primary";
      case "secondary":
        return "govuk-button--secondary";
      case "warning":
        return "govuk-button--warning";
      case "information":
        return "dpr-button--information";
      case "text-only":
        return "govuk-link";
      default:
        return "";
    }
  };

  // If it is text-only variant, we don't want to add the govuk-button class
  const baseClassName = `${
    variant === "text-only" ? "" : "govuk-button"
  } ${getVariantClass(variant)} ${className}`.trim();

  const optionalProps = {
    ...(ariaLabel && { "aria-label": ariaLabel }),
    ...(value && { value }),
    ...(name && { name }),
  };

  if (element === "link" && href) {
    return (
      <Link
        href={href}
        className={baseClassName}
        onClick={onClick}
        role={variant === "text-only" ? undefined : "button"}
        data-module={variant === "text-only" ? undefined : "govuk-button"}
        {...optionalProps}
      >
        {children}
      </Link>
    );
  }

  if (element === "span" || element === "div") {
    const Element = element;
    return (
      <Element
        className={baseClassName}
        onClick={onClick}
        role="button"
        {...optionalProps}
      >
        {children}
      </Element>
    );
  }

  if (element === "button") {
    return (
      <button
        type={type}
        className={baseClassName}
        onClick={onClick}
        data-module={variant === "text-only" ? undefined : "govuk-button"}
        data-prevent-double-click="true"
        {...optionalProps}
      >
        {children}
      </button>
    );
  }

  return null;
};

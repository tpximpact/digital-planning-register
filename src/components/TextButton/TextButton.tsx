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

import { Button } from "../button";
import "./TextButton.scss";

type TextButtonElement = "button" | "link";
type TextButtonVariant = "default" | "plain";

interface TextButtonProps {
  children: React.ReactNode;
  element?: TextButtonElement;
  href?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  variant?: TextButtonVariant;
  ariaLabel?: string;
}

export const TextButton = ({
  children,
  element = "link",
  href = "#",
  className = "",
  onClick,
  variant = "default",
  ariaLabel,
}: TextButtonProps) => (
  <Button
    element={element}
    href={href}
    className={`dpr-text-button ${variant === "plain" ? "dpr-text-button--plain" : ""} ${className}`}
    onClick={onClick}
    ariaLabel={ariaLabel}
    variant="text-only"
  >
    {children}
  </Button>
);

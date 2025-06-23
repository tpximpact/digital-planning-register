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
import { Details } from "../govukDpr/Details";
import { Council } from "@/config/types";

type ContentNotOnDprYetProps = {
  council?: Council;
};

export const ContentNotOnDprYet = ({ council }: ContentNotOnDprYetProps) => {
  const currentLiveRegister = council?.currentLiveRegister;

  return (
    <>
      <Details
        summaryText={
          "Not all planning applications are available on this register."
        }
        text={
          <>
            <p>
              This register is being used as part of a pilot scheme to test Open
              Digital Planning products in real-world settings.{" "}
              <Button
                element="link"
                variant="text-only"
                href="https://opendigitalplanning.org/end-end-product-pilot"
              >
                Find out more about this pilot scheme.
              </Button>
            </p>
            <p>
              This means that only a limited set of applications are being
              published here.
            </p>
            <p>
              If you cannot find an application here,{" "}
              {currentLiveRegister ? (
                <Button
                  element="link"
                  variant="text-only"
                  href={currentLiveRegister}
                >
                  visit the primary planning register for {council?.name}.
                </Button>
              ) : (
                <>visit the primary planning register for {council?.name}.</>
              )}
            </p>
          </>
        }
      />
    </>
  );
};

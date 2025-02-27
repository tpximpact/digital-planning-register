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

"use client";
import { getCouncilConfig } from "@/config";
import { AppConfig } from "@/config/types";
import { useParams } from "next/navigation";
import { Suspense } from "react";

/**
 * @deprecated
 * This is a client component that wraps another component in order to fetch the council config, that way the component context stays clean
 * It is really only intended to be used outside of the pages, e.g., header and footer, which need config but also don't need config.
 * We don't want to convert things to client components unnecessarily since we have a requirement to be JS-free; this approach is a compromise.
 *
 * @param {AppConfig} appConfig - The application configuration.
 * @param {React.ComponentType<any>} Component - The component to be wrapped.
 * @param {object} props - Additional props to be passed to the wrapped component.
 * @returns {JSX.Element} - The wrapped component with council config.
 *
 * @example
 * // Usage example
 * <CouncilConfigComponent appConfig={appConfig} Component={Footer} />
 */
export const CouncilConfigComponent = ({
  appConfig,
  Component,
  ...props
}: {
  appConfig: AppConfig;
  Component: React.ComponentType<any>;
}) => {
  const { council } = useParams<{ council?: string; reference?: string }>();
  const councilConfig = council
    ? getCouncilConfig(council, appConfig.councils)
    : undefined;
  appConfig.council = councilConfig;
  return (
    <>
      <Suspense>
        <Component
          {...props}
          appConfig={appConfig}
          councilConfig={appConfig.council}
        />
      </Suspense>
    </>
  );
};

export default CouncilConfigComponent;

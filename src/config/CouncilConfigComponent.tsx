"use client";
import { getCouncilConfig } from "@/config";
import { AppConfig } from "@/config/types";
import { useParams } from "next/navigation";
import { Suspense } from "react";

/**
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
  const councilConfig =
    council && appConfig?.councils
      ? getCouncilConfig(council, appConfig.councils)
      : undefined;
  return (
    <>
      <Suspense>
        <Component
          {...props}
          appConfig={appConfig}
          councilConfig={councilConfig}
        />
      </Suspense>
    </>
  );
};

export default CouncilConfigComponent;

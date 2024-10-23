export interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return <div className="govuk-main-wrapper">{children}</div>;
};
